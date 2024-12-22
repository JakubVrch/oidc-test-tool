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
  additional_params?: ({ name?: string; value?: string } | undefined)[] | undefined;
}

export interface UrlResult {
  url?: string;
  error?: string;
}

export interface ParseResult {
  params?: UrlParams;
  error?: string;
}

export const constructUrl = (params: UrlParams): UrlResult => {
  
  if (!params.auth_endpoint) return { error: 'Authorization Endpoint is required'} ;
  if (!params.client_id) return  { error: 'Client ID is required' };
  if (!params.redirect_uri) return { error: 'Redirect URI is required' };
  if (!params.scope) return { error: 'Scope is required'};
  if (!params.response_type_code && !params.response_type_token && !params.response_type_id_token) {
    return { error: 'At least one response type is required' };
  }

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
    additional_params,
  } = params;

  const responseTypeArray = [];
  if (response_type_code) responseTypeArray.push('code');
  if (response_type_token) responseTypeArray.push('token');
  if (response_type_id_token) responseTypeArray.push('id_token');

  if (responseTypeArray.length === 0) {
    return { error: 'Response Type is required' };
  }

  const url = new URL(auth_endpoint ?? '');
  url.searchParams.append('client_id', client_id);
  url.searchParams.append('redirect_uri', redirect_uri);
  url.searchParams.append('scope', scope);
  url.searchParams.append('response_type', responseTypeArray.join(' '));
  if (response_mode) url.searchParams.append('response_mode', response_mode);
  if (state) url.searchParams.append('state', state);
  if (nonce) url.searchParams.append('nonce', nonce);
  if (prompt) url.searchParams.append('prompt', prompt);

  if (additional_params && Array.isArray(additional_params)) {
    additional_params.forEach(param => {
      if (param?.name && param.value) {
        url.searchParams.append(param.name, param.value);
      }
    });
  }

  return { url: url.toString() };
};