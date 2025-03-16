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
        clientSecret: mockClientSecret,
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
        clientSecret: mockClientSecret,
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
        clientSecret: mockClientSecret,
      });
    });

    expect(result.current.tokenResponse).toEqual({
      success: false,
      message: `Error 400: invalid_grant Invalid authorization code`,
    });
  });
});
