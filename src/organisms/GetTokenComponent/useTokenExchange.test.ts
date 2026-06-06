import { renderHook, act } from "@testing-library/react";
import useTokenExchange from "./useTokenExchange";

global.fetch = jest.fn();

describe("useTokenExchange", () => {
  const mockTokenEndpoint = "/token";
  const mockRedirectUri = "http://localhost:3000/callback";
  const mockClientId = "your_client_id";
  const mockCode = "your_authorization_code";
  const mockClientSecret = "your_client_secret";

  it("should successfully exchange code for tokens or return null token", async () => {
    const mockResponse = {
      id_token: "mock_id_token",
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const { result } = renderHook(() =>
      useTokenExchange({
        tokenEndpoint: mockTokenEndpoint,
        redirectUri: mockRedirectUri,
        clientId: mockClientId,
        code: mockCode,
      }),
    );

    await act(async () => {
      await result.current.handleExchangeCode({
        useClientSecret: true,
        clientSecret: mockClientSecret,
        useCodeVerifier: false,
      });
    });

    expect(result.current.tokenResponse).toEqual({
      success: true,
      message: JSON.stringify(mockResponse, null, 2),
      idToken: "mock_id_token",
      accessToken: null,
    });
  });

  it("should handle network errors", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network Error"));

    const { result } = renderHook(() =>
      useTokenExchange({
        tokenEndpoint: mockTokenEndpoint,
        redirectUri: mockRedirectUri,
        clientId: mockClientId,
        code: mockCode,
      }),
    );

    await act(async () => {
      await result.current.handleExchangeCode({
        useClientSecret: true,
        clientSecret: mockClientSecret,
        useCodeVerifier: false,
      });
    });

    expect(result.current.tokenResponse).toEqual({
      success: false,
      message: "Failed to retrieve token: Network Error",
    });
  });

  it("should handle server errors", async () => {
    const mockErrorResponse = {
      error: "invalid_grant",
      error_description: "Invalid authorization code",
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: () => Promise.resolve(mockErrorResponse),
    });

    const { result } = renderHook(() =>
      useTokenExchange({
        tokenEndpoint: mockTokenEndpoint,
        redirectUri: mockRedirectUri,
        clientId: mockClientId,
        code: mockCode,
      }),
    );

    await act(async () => {
      await result.current.handleExchangeCode({
        useClientSecret: true,
        clientSecret: mockClientSecret,
        useCodeVerifier: false,
      });
    });

    expect(result.current.tokenResponse).toEqual({
      success: false,
      message: `Error 400: invalid_grant Invalid authorization code`,
    });
  });

  it("should include code_verifier and omit client_secret for PKCE", async () => {
    const mockCodeVerifier = "test-code-verifier";
    const mockResponse = { access_token: "mock_access_token" };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const { result } = renderHook(() =>
      useTokenExchange({
        tokenEndpoint: mockTokenEndpoint,
        redirectUri: mockRedirectUri,
        clientId: mockClientId,
        code: mockCode,
      }),
    );

    await act(async () => {
      await result.current.handleExchangeCode({
        useClientSecret: false,
        useCodeVerifier: true,
        codeVerifier: mockCodeVerifier,
      });
    });

    const callBody = (global.fetch as jest.Mock).mock.calls[0][1]
      .body as URLSearchParams;
    expect(callBody.get("code_verifier")).toBe(mockCodeVerifier);
    expect(callBody.has("client_secret")).toBe(false);
    expect(result.current.tokenResponse?.success).toBe(true);
  });

  it("should include both client_secret and code_verifier when both are selected", async () => {
    const mockCodeVerifier = "test-code-verifier";
    const mockResponse = { access_token: "mock_access_token" };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const { result } = renderHook(() =>
      useTokenExchange({
        tokenEndpoint: mockTokenEndpoint,
        redirectUri: mockRedirectUri,
        clientId: mockClientId,
        code: mockCode,
      }),
    );

    await act(async () => {
      await result.current.handleExchangeCode({
        useClientSecret: true,
        clientSecret: mockClientSecret,
        useCodeVerifier: true,
        codeVerifier: mockCodeVerifier,
      });
    });

    const callBody = (global.fetch as jest.Mock).mock.calls[0][1]
      .body as URLSearchParams;
    expect(callBody.get("client_secret")).toBe(mockClientSecret);
    expect(callBody.get("code_verifier")).toBe(mockCodeVerifier);
  });

  it("should expose loading state while exchange is in-flight", async () => {
    let resolveFetch: ((value: unknown) => void) | undefined;
    const pendingFetch = new Promise((resolve) => {
      resolveFetch = resolve;
    });

    global.fetch = jest.fn().mockReturnValueOnce(pendingFetch);

    const { result } = renderHook(() =>
      useTokenExchange({
        tokenEndpoint: mockTokenEndpoint,
        redirectUri: mockRedirectUri,
        clientId: mockClientId,
        code: mockCode,
      }),
    );

    let exchangePromise: Promise<void> | undefined;
    await act(async () => {
      exchangePromise = result.current.handleExchangeCode({
        useClientSecret: true,
        clientSecret: mockClientSecret,
        useCodeVerifier: false,
      });
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolveFetch?.({
        ok: true,
        json: () => Promise.resolve({ access_token: "mock_access_token" }),
      });
      await exchangePromise;
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("should ignore duplicate submissions while a request is in-flight", async () => {
    let resolveFetch: ((value: unknown) => void) | undefined;
    const pendingFetch = new Promise((resolve) => {
      resolveFetch = resolve;
    });

    global.fetch = jest.fn().mockReturnValueOnce(pendingFetch);

    const { result } = renderHook(() =>
      useTokenExchange({
        tokenEndpoint: mockTokenEndpoint,
        redirectUri: mockRedirectUri,
        clientId: mockClientId,
        code: mockCode,
      }),
    );

    let firstRequest: Promise<void> | undefined;
    let secondRequest: Promise<void> | undefined;
    await act(async () => {
      firstRequest = result.current.handleExchangeCode({
        useClientSecret: true,
        clientSecret: mockClientSecret,
        useCodeVerifier: false,
      });
      secondRequest = result.current.handleExchangeCode({
        useClientSecret: true,
        clientSecret: mockClientSecret,
        useCodeVerifier: false,
      });
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveFetch?.({
        ok: true,
        json: () => Promise.resolve({ access_token: "mock_access_token" }),
      });
      await firstRequest;
      await secondRequest;
    });
  });
});
