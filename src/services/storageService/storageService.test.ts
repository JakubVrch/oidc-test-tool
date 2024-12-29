import {
  OidcParams,
  storeOidcParams,
  getStoredOidcParams,
  clearStoredOidcParams,
} from './storageService';

describe('oidcStorage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should store and retrieve OidcParams correctly', () => {
    const testParams: OidcParams = {
      nonce: 'test-nonce',
      state: 'test-state',
      token_endpoint: 'https://example.com/token',
      client_id: 'my-client-id',
      redirect_uri: 'https://example.com/callback',
    };

    storeOidcParams(testParams);

    const retrievedParams = getStoredOidcParams();

    expect(retrievedParams).toEqual(testParams);
  });

  it('should handle null values gracefully', () => {
    const testParams: OidcParams = {
      nonce: null,
      state: 'test-state',
      token_endpoint: null,
      client_id: null,
      redirect_uri: null,
    };

    storeOidcParams(testParams);

    const retrievedParams = getStoredOidcParams();

    expect(retrievedParams).toEqual(testParams);
  });

  it('should clear stored OidcParams', () => {
    const testParams: OidcParams = {
      nonce: 'test-nonce',
      state: 'test-state',
      token_endpoint: 'https://example.com/token',
      client_id: 'my-client-id',
      redirect_uri: 'https://example.com/callback',
    };

    storeOidcParams(testParams);
    clearStoredOidcParams();

    const retrievedParams = getStoredOidcParams();

    expect(retrievedParams).toEqual({
      nonce: null,
      state: null,
      token_endpoint: null,
      client_id: null,
      redirect_uri: null,
    });
  });
});