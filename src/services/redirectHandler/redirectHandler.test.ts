import { ConstructRequestFormValues } from "@/services/types/constructRequestForm";
import { storeOidcParams } from "@/services/storageService/storageService";
import { ResponseTypeValue } from "@/services/types/responseTypeAndValue";
import { constructUrl } from "@/services/urlManager/urlManager";
import { redirectToOidcProvider } from "./redirectHandler";
import { setLocationHref } from "./setLocationHref";

jest.mock("@/services/storageService/storageService");
jest.mock("@/services/urlManager/urlManager");
jest.mock("./setLocationHref");

describe("oidcRedirect", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should redirect to OIDC provider with minimal valid params", () => {
    const mockFormValues: ConstructRequestFormValues = {
      clientId: "test_client_id",
      redirectUri: "http://localhost:3000/callback",
      authEndpoint: "https://example.com/authorize",
      scope: "openid",
      responseType: [ResponseTypeValue.CODE],
    };

    const mockUrlResult = {
      url: "http://localhost:3000/callback",
    };

    (constructUrl as jest.Mock).mockReturnValueOnce(mockUrlResult);

    redirectToOidcProvider(mockFormValues);

    expect(constructUrl).toHaveBeenCalledWith(mockFormValues);
    expect(storeOidcParams).toHaveBeenCalledWith({
      clientId: "test_client_id",
      nonce: null,
      redirectUri: "http://localhost:3000/callback",
      state: null,
      tokenEndpoint: null,
      codeVerifier: null,
    });
    //FIXME: Resolve when this issue is complete: https://github.com/jsdom/jsdom/issues/3492
    expect(setLocationHref).toHaveBeenCalledWith(
      "http://localhost:3000/callback",
    );
  });

  it("should store codeVerifier when PKCE is enabled", () => {
    const mockFormValues: ConstructRequestFormValues = {
      clientId: "test_client_id",
      redirectUri: "http://localhost:3000/callback",
      authEndpoint: "https://example.com/authorize",
      scope: "openid",
      responseType: [ResponseTypeValue.CODE],
      pkceEnabled: true,
      codeVerifier: "test-code-verifier",
    };

    const mockUrlResult = { url: "http://localhost:3000/callback" };
    (constructUrl as jest.Mock).mockReturnValueOnce(mockUrlResult);

    redirectToOidcProvider(mockFormValues);

    expect(storeOidcParams).toHaveBeenCalledWith(
      expect.objectContaining({ codeVerifier: "test-code-verifier" }),
    );
  });

  it("should not redirect and log error if URL construction fails", () => {
    const mockFormValues: ConstructRequestFormValues = {
      authEndpoint: "",
      clientId: "test_client_id",
      redirectUri: "http://localhost:3000/callback",
      scope: "",
      responseType: [],
    };

    const mockUrlResult = {
      url: null,
      error: "Error constructing URL",
    };

    (constructUrl as jest.Mock).mockReturnValueOnce(mockUrlResult);

    console.error = jest.fn();

    redirectToOidcProvider(mockFormValues);

    expect(constructUrl).toHaveBeenCalledWith(mockFormValues);
    expect(storeOidcParams).not.toHaveBeenCalled();
    //expect(window.location.href).toBe("http://localhost/"); <- See above
    expect(console.error).toHaveBeenCalledWith(
      "Error constructing URL:",
      "Error constructing URL",
    );
    expect(setLocationHref).not.toHaveBeenCalled();
  });
});
