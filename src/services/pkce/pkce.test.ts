/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Ensure window.crypto and window.crypto.subtle.digest exist for Jest spyOn
if (!window.crypto) {
  // @ts-expect-error: window.crypto may not exist in the test environment
  window.crypto = {};
}
if (!window.crypto.subtle) {
  // @ts-expect-error: window.crypto.subtle may not exist in the test environment
  window.crypto.subtle = {};
}
if (typeof window.crypto.subtle.digest !== "function") {
  window.crypto.subtle.digest = () => Promise.resolve(new ArrayBuffer(0));
}
import { generateCodeVerifier, generateCodeChallenge } from "./pkce";

describe("generateCodeVerifier", () => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let getRandomValuesSpy: jest.SpyInstance;

  beforeAll(() => {
    const mockGetRandomValues: typeof window.crypto.getRandomValues = (
      array,
    ) => {
      if (!array) {
        throw new Error("getRandomValues mock: array must be provided");
      }
      // Fill the provided array using its own type
      if (
        array instanceof Uint8Array ||
        array instanceof Uint16Array ||
        array instanceof Uint32Array
      ) {
        for (let i = 0; i < array.length; i++) {
          array[i] = i;
        }
        return array;
      }

      throw new Error("getRandomValues mock: unsupported array type");
    };

    getRandomValuesSpy = jest
      .spyOn(window.crypto, "getRandomValues")
      .mockImplementation(mockGetRandomValues);
  });

  afterAll(() => {
    getRandomValuesSpy.mockRestore();
  });

  it("should generate verifier correctly", () => {
    const length = charset.length;
    const verifier = generateCodeVerifier(length);
    expect(getRandomValuesSpy).toHaveBeenCalled();
    const callArg = (
      getRandomValuesSpy.mock.calls as unknown[][]
    )[0][0] as Uint32Array;
    expect(callArg).toBeInstanceOf(Uint32Array);
    expect(callArg.length).toBe(length);
    expect(verifier).toBe(charset);
  });
});

describe("generateCodeChallenge", () => {
  let digestSpy: jest.SpyInstance;
  const verifier =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

  beforeAll(() => {
    // Mock the digest function to return a predictable hash
    // Input [251, 255] corresponds to Standard base64: +/8= and Base64url: -_8
    digestSpy = jest
      .spyOn(window.crypto.subtle, "digest")
      .mockImplementation(
        (algorithm: AlgorithmIdentifier, _data: BufferSource) => {
          if (algorithm === "SHA-256") {
            const hashBuffer = new Uint8Array([251, 255]);
            return Promise.resolve(hashBuffer.buffer);
          }
          return Promise.reject(new Error("Unsupported algorithm"));
        },
      );
  });

  afterAll(() => {
    digestSpy.mockRestore();
  });

  it("should return the verifier for plain method", async () => {
    const challenge = await generateCodeChallenge(verifier, "plain");
    expect(challenge).toBe(verifier);
  });

  it("should base64url-encode output, replacing +, /, =", async () => {
    const verifier = "abcABC+/=";
    const challenge = await generateCodeChallenge(verifier, "S256");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const callArgs = digestSpy.mock.calls[0];
    expect(callArgs[0]).toBe("SHA-256");
    expect(new Uint8Array(callArgs[1])).toEqual(
      new Uint8Array([97, 98, 99, 65, 66, 67, 43, 47, 61]),
    );
    // Calculate expected base64url
    expect(challenge).toBe("-_8");
  });

  it("should handle long code verifier input", async () => {
    const verifier = "A".repeat(128); // RFC7636 allows up to 128 characters
    const challenge = await generateCodeChallenge(verifier, "S256");
    expect(typeof challenge).toBe("string");
    // Base64url string should not contain +, / or =
    expect(challenge).not.toMatch(/[+/=]/);
  });

  it("should handle special characters in code verifier", async () => {
    const verifier = "Hello!@#$%^&*()_+-=[]{}|;:,.<>?";
    const challengePlain = await generateCodeChallenge(verifier, "plain");
    const challengeS256 = await generateCodeChallenge(verifier, "S256");

    expect(challengePlain).toBe(verifier);
    expect(typeof challengeS256).toBe("string");
    expect(challengeS256).not.toBe(verifier);
    expect(challengeS256).not.toMatch(/[+/=]/);
  });
});
