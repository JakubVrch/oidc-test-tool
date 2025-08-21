import {
  ResponseModeValue,
  ResponseTypeValue,
} from "../types/responseTypeAndValue";
import { constructUrl } from "./urlManager";
import { UrlParams, UrlResult } from "./types";
import { PKCEMethod } from "../types/pkceMethod";

describe("constructUrl", () => {
  it("should return error if mandatory params are missing", () => {
    const params: UrlParams = {
      clientId: "client",
      redirectUri: "http://localhost",
      scope: "openid",
    };
    const result: UrlResult = constructUrl(params);
    expect(result.error).toBe("Authorization Endpoint is required");
  });

  it("should construct URL with all params", () => {
    const params: UrlParams = {
      authEndpoint: "http://example.com/auth",
      clientId: "client",
      redirectUri: "http://localhost",
      scope: "openid",
      responseType: [
        ResponseTypeValue.CODE,
        ResponseTypeValue.TOKEN,
        ResponseTypeValue.ID_TOKEN,
      ],
      responseMode: ResponseModeValue.QUERY,
      state: "state",
      nonce: "nonce",
      prompt: "login",
      additionalParams: [
        { name: "param1", value: "value1" },
        { name: "param2", value: "value2" },
      ],
    };
    const result: UrlResult = constructUrl(params);
    expect(result.url).toBe(
      "http://example.com/auth?client_id=client&redirect_uri=http%3A%2F%2Flocalhost&scope=openid&response_type=code+token+id_token&response_mode=query&state=state&nonce=nonce&prompt=login&param1=value1&param2=value2",
    );
  });

  it("should construct URL with minimal params", () => {
    const params: UrlParams = {
      authEndpoint: "http://example.com/auth",
      clientId: "client",
      redirectUri: "http://localhost",
      scope: "openid",
      responseType: [ResponseTypeValue.CODE],
    };
    const result: UrlResult = constructUrl(params);
    expect(result.url).toBe(
      "http://example.com/auth?client_id=client&redirect_uri=http%3A%2F%2Flocalhost&scope=openid&response_type=code",
    );
  });

  it("should include PKCE parameters when PKCE is enabled with S256", () => {
    const params: UrlParams = {
      authEndpoint: "http://example.com/auth",
      clientId: "client",
      redirectUri: "http://localhost",
      scope: "openid",
      responseType: [ResponseTypeValue.CODE],
      pkceEnabled: true,
      pkceMethod: PKCEMethod.S256,
      codeChallenge: "challenge",
      codeVerifier: "verifier",
    };
    const result = constructUrl(params);
    expect(result.url).toBe(
      "http://example.com/auth?client_id=client&redirect_uri=http%3A%2F%2Flocalhost&scope=openid&response_type=code&code_challenge=challenge&code_challenge_method=S256"
    );
  });

  it("should include PKCE parameters when PKCE is enabled with plain method", () => {
    const params: UrlParams = {
      authEndpoint: "http://example.com/auth",
      clientId: "client",
      redirectUri: "http://localhost",
      scope: "openid",
      responseType: [ResponseTypeValue.CODE],
      pkceEnabled: true,
      pkceMethod: PKCEMethod.PLAIN,
      codeChallenge: "challenge",
      codeVerifier: "verifier",
    };
    const result = constructUrl(params);
    expect(result.url).toBe(
      "http://example.com/auth?client_id=client&redirect_uri=http%3A%2F%2Flocalhost&scope=openid&response_type=code&code_challenge=challenge&code_challenge_method=PLAIN"
    );
  });

  it("should store code verifier in localStorage when PKCE is enabled", () => {
    // Mock localStorage
    const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
    
    const params: UrlParams = {
      authEndpoint: "http://example.com/auth",
      clientId: "client",
      redirectUri: "http://localhost",
      scope: "openid",
      responseType: [ResponseTypeValue.CODE],
      pkceEnabled: true,
      pkceMethod: PKCEMethod.S256,
      codeChallenge: "challenge",
      codeVerifier: "verifier",
    };
    constructUrl(params);
    expect(mockSetItem).toHaveBeenCalledWith("pkce_code_verifier", "verifier");
    
    // Clean up
    mockSetItem.mockRestore();
  });
});
