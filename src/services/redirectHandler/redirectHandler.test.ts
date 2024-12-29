import { FormValues } from '../../organisms/ConstructRequestForm/ConstructRequestForm';
import { storeOidcParams } from '../storageService/storageService';
import { constructUrl } from '../urlManager/urlManager';
import { redirectToOidcProvider } from './redirectHandler';
import { setLocationHref } from './setLocationHref';

jest.mock('../storageService/storageService');
jest.mock('../urlManager/urlManager');
jest.mock('./setLocationHref');


describe('oidcRedirect', () => {


  it('should redirect to OIDC provider with minimal valid params', () => {
    const mockFormValues: FormValues = {
      client_id: 'test_client_id',
      redirect_uri: 'http://localhost:3000/callback',
      auth_endpoint: 'https://example.com/authorize',
      scope: 'openid',
      response_type_code: true,
      response_type_token: false,
      response_type_id_token: false,
    };

    const mockUrlResult = {
      url: 'http://localhost:3000/callback'
    };

    (constructUrl as jest.Mock).mockReturnValueOnce(mockUrlResult);

    redirectToOidcProvider(mockFormValues);

    expect(constructUrl).toHaveBeenCalledWith(mockFormValues);
    expect(storeOidcParams).toHaveBeenCalledWith({
      client_id: "test_client_id",
      nonce: null,
      redirect_uri: "http://localhost:3000/callback",
      state: null,
      token_endpoint: null,
    });
    //FIXME: Resolve when this issue is complete: https://github.com/jsdom/jsdom/issues/3492
    expect(setLocationHref).toHaveBeenCalledWith( 'http://localhost:3000/callback' )
  });

  it('should not redirect and log error if URL construction fails', () => {
    const mockFormValues: FormValues = {
      auth_endpoint: '',
      client_id: 'test_client_id',
      redirect_uri: 'http://localhost:3000/callback',
      scope: '',
      response_type_code: false,
      response_type_token: false,
      response_type_id_token: false
    };

    const mockUrlResult = {
      url: null,
      error: 'Error constructing URL',
    };

    (constructUrl as jest.Mock).mockReturnValueOnce(mockUrlResult);

    console.error = jest.fn();

    redirectToOidcProvider(mockFormValues);

    expect(constructUrl).toHaveBeenCalledWith(mockFormValues);
    expect(storeOidcParams).not.toHaveBeenCalled();
    //expect(window.location.href).toBe("http://localhost/"); <- See above
    expect(console.error).toHaveBeenCalledWith('Error constructing URL:', 'Error constructing URL');
    //expect(window.location.assign as jest.Mock).not.toHaveBeenCalled();
  });
});