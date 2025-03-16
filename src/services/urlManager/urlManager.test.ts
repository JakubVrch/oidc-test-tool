import {
  ResponseModeValue,
  ResponseTypeValue,
} from "../types/responseTypeAndValue";
import { constructUrl, UrlParams, UrlResult } from "./urlManager";

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
});
