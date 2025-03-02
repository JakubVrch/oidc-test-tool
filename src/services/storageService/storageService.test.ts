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
      tokenEndpoint: 'https://example.com/token',
      clientId: 'my-client-id',
      redirectUri: 'https://example.com/callback',
    };

    storeOidcParams(testParams);

    const retrievedParams = getStoredOidcParams();

    expect(retrievedParams).toEqual(testParams);
  });

  it('should handle null values gracefully', () => {
    const testParams: OidcParams = {
      nonce: null,
      state: 'test-state',
      tokenEndpoint: null,
      clientId: null,
      redirectUri: null,
    };

    storeOidcParams(testParams);

    const retrievedParams = getStoredOidcParams();

    expect(retrievedParams).toEqual(testParams);
  });

  it('should clear stored OidcParams', () => {
    const testParams: OidcParams = {
      nonce: 'test-nonce',
      state: 'test-state',
      tokenEndpoint: 'https://example.com/token',
      clientId: 'my-client-id',
      redirectUri: 'https://example.com/callback',
    };

    storeOidcParams(testParams);
    clearStoredOidcParams();

    const retrievedParams = getStoredOidcParams();

    expect(retrievedParams).toEqual({
      nonce: null,
      state: null,
      tokenEndpoint: null,
      clientId: null,
      redirectUri: null,
    });
  });
});