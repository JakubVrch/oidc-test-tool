import { renderHook } from '@testing-library/react';
import useStoredOidcParams from './useStoredOIDCParams';
import { getStoredOidcParams, OidcParams } from '../../services/storageService/storageService';

jest.mock('../../services/storageService/storageService');

describe('useStoredOidcParams', () => {

  it('should fetch and store OidcParams on initial render', () => {
    const mockStoredParams: OidcParams = {
      nonce: 'test-nonce',
      state: 'test-state',
      token_endpoint: 'test-token-endpoint',
      client_id: 'test-client-id',
      redirect_uri: 'test-redirect-uri',
    };
    (getStoredOidcParams as jest.Mock).mockReturnValueOnce(mockStoredParams);

    const { result,  } = renderHook(() => useStoredOidcParams());

    expect(result.current).toEqual(mockStoredParams);
    expect(getStoredOidcParams).toHaveBeenCalledTimes(1);
  });

  it('should not fetch OidcParams on subsequent renders', () => {
    const mockStoredParams: OidcParams = {
      nonce: 'test-nonce',
      state: 'test-state',
      token_endpoint: 'test-token-endpoint',
      client_id: 'test-client-id',
      redirect_uri: 'test-redirect-uri',
    };
    (getStoredOidcParams as jest.Mock).mockReturnValueOnce(mockStoredParams);

    renderHook(() => useStoredOidcParams());

    expect(getStoredOidcParams).toHaveBeenCalledTimes(1); 
  });
});