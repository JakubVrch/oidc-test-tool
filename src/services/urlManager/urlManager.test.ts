import { constructUrl, parseUrl, UrlParams, UrlResult, ParseResult } from './urlManager';

describe('urlManager', () => {
  describe('constructUrl', () => {
    it('should return an error if mandatory parameters are missing', () => {
      const params: Partial<UrlParams> = {
        auth_endpoint: '',
        client_id: '',
        redirect_uri: '',
        scope: ''
      };

      const result: UrlResult = constructUrl(params as UrlParams);
      expect(result.error).toBeTruthy();
    });

    it('should return a valid URL if all mandatory parameters are provided', () => {
      const params: UrlParams = {
        auth_endpoint: 'https://example.com/auth',
        client_id: 'client123',
        redirect_uri: 'https://example.com/callback',
        scope: 'openid profile',
        response_type_code: true
      };

      const result: UrlResult = constructUrl(params);
      expect(result.url).toContain('https://example.com/auth');
      expect(result.url).toContain('client_id=client123');
      expect(result.url).toContain('redirect_uri=https%3A%2F%2Fexample.com%2Fcallback');
      expect(result.url).toContain('scope=openid+profile');
      expect(result.url).toContain('response_type=code');
    });

    it('should return an error if response type is missing', () => {
      const params: UrlParams = {
        auth_endpoint: 'https://example.com/auth',
        client_id: 'client123',
        redirect_uri: 'https://example.com/callback',
        scope: 'openid profile'
      };

      const result: UrlResult = constructUrl(params);
      expect(result.error).toBe('Response Type is required');
    });
  });

  describe('parseUrl', () => {
    it('should return an error if the URL is invalid', () => {
      const result: ParseResult = parseUrl('invalid-url');
      expect(result.error).toBe('Invalid URL');
    });

    it('should return an error if mandatory parameters are missing', () => {
      const url = 'https://example.com/auth?client_id=&redirect_uri=&scope=';
      const result: ParseResult = parseUrl(url);
      expect(result.error).toBeTruthy();
    });

    it('should return UrlParams if the URL is valid and contains all mandatory parameters', () => {
      const url = 'https://example.com/auth?client_id=client123&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=openid%20profile&response_type=code';
      const result: ParseResult = parseUrl(url);
      expect(result.params).toEqual({
        auth_endpoint: 'https://example.com/auth',
        client_id: 'client123',
        redirect_uri: 'https://example.com/callback',
        scope: 'openid profile',
        response_type_code: true,
        response_type_token: false,
        response_type_id_token: false,
        response_mode: null,
        state: undefined,
        nonce: undefined,
        prompt: undefined,
        token_endpoint: undefined
      });
    });
  });
});