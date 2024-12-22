import { constructUrl, UrlParams, UrlResult } from './urlManager';

describe('constructUrl', () => {
  it('should return error if mandatory params are missing', () => {
    const params: UrlParams = { client_id: 'client', redirect_uri: 'http://localhost', scope: 'openid' };
    const result: UrlResult = constructUrl(params);
    expect(result.error).toBe('Authorization Endpoint is required');
  });

  it('should construct URL with all params', () => {
    const params: UrlParams = {
      auth_endpoint: 'http://example.com/auth',
      client_id: 'client',
      redirect_uri: 'http://localhost',
      scope: 'openid',
      response_type_code: true,
      response_type_token: true,
      response_type_id_token: true,
      response_mode: 'query',
      state: 'state',
      nonce: 'nonce',
      prompt: 'login',
      additional_params: [
        { name: 'param1', value: 'value1' },
        { name: 'param2', value: 'value2' }
      ]
    };
    const result: UrlResult = constructUrl(params);
    expect(result.url).toBe('http://example.com/auth?client_id=client&redirect_uri=http%3A%2F%2Flocalhost&scope=openid&response_type=code+token+id_token&response_mode=query&state=state&nonce=nonce&prompt=login&param1=value1&param2=value2');
  });

  it('should construct URL with minimal params', () => {
    const params: UrlParams = {
      auth_endpoint: 'http://example.com/auth',
      client_id: 'client',
      redirect_uri: 'http://localhost',
      scope: 'openid',
      response_type_code: true
    };
    const result: UrlResult = constructUrl(params);
    expect(result.url).toBe('http://example.com/auth?client_id=client&redirect_uri=http%3A%2F%2Flocalhost&scope=openid&response_type=code');
  });
});