export interface UrlParams {
  auth_endpoint?: string;
  client_id?: string;
  redirect_uri?: string;
  scope?: string;
  response_type_code?: boolean;
  response_type_token?: boolean;
  response_type_id_token?: boolean;
  response_mode?: 'query' | 'fragment' | 'form_post';
  state?: string;
  nonce?: string;
  prompt?: string;
  token_endpoint?: string;
}

export interface UrlResult {
  url?: string;
  error?: string;
}

export interface ParseResult {
  params?: UrlParams;
  error?: string;
}

const validateMandatoryParams = (params: Partial<UrlParams>): string | null => {
  if (!params.auth_endpoint) return 'Authorization Endpoint is required';
  if (!params.client_id) return 'Client ID is required';
  if (!params.redirect_uri) return 'Redirect URI is required';
  if (!params.scope) return 'Scope is required';
  return null;
};

export const constructUrl = (params: UrlParams): UrlResult => {
  const error = validateMandatoryParams(params);
  if (error)
    return { error: error };

  const {
    auth_endpoint,
    client_id,
    redirect_uri,
    scope,
    response_type_code,
    response_type_token,
    response_type_id_token,
    response_mode,
    state,
    nonce,
    prompt,
    token_endpoint
  } = params
  const responseTypeArray = [];
  if (response_type_code) responseTypeArray.push('code');
  if (response_type_token) responseTypeArray.push('token');
  if (response_type_id_token) responseTypeArray.push('id_token');

  if (responseTypeArray.length === 0) {
    return { error: 'Response Type is required' };
  }

  const url = new URL(auth_endpoint ?? '');
  url.searchParams.append('client_id', client_id!);
  url.searchParams.append('redirect_uri', redirect_uri!);
  url.searchParams.append('scope', scope!);
  url.searchParams.append('response_type', responseTypeArray.join(' '));
  if (response_mode) url.searchParams.append('response_mode', response_mode);
  if (state) url.searchParams.append('state', state);
  if (nonce) url.searchParams.append('nonce', nonce);
  if (prompt) url.searchParams.append('prompt', prompt);
  if (token_endpoint) url.searchParams.append('token_endpoint', token_endpoint);

  return { url: url.toString() };


};

export const parseUrl = (urlString: string): ParseResult => {
  try {
    const url = new URL(urlString);
    const params = url.searchParams;

    const responseType = params.get('response_type')?.split(' ') ?? [];
    const response_type_code = responseType.includes('code');
    const response_type_token = responseType.includes('token');
    const response_type_id_token = responseType.includes('id_token');

    const auth_endpoint = url.origin + url.pathname;
    const client_id = params.get('client_id') ?? '';
    const redirect_uri = params.get('redirect_uri') ?? '';
    const scope = params.get('scope') ?? '';

    const error = validateMandatoryParams({ auth_endpoint, client_id, redirect_uri, scope });
    if (error) return { error };

    return {
      params: {
        auth_endpoint,
        client_id,
        redirect_uri,
        scope,
        response_type_code,
        response_type_token,
        response_type_id_token,
        response_mode: params.get('response_mode') as 'query' | 'fragment' | 'form_post',
        state: params.get('state') ?? undefined,
        nonce: params.get('nonce') ?? undefined,
        prompt: params.get('prompt') ?? undefined,
        token_endpoint: params.get('token_endpoint') ?? undefined
      }
    };
  } catch (_error) {
    return { error: 'Invalid URL' };
  }
};