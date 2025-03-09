import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from "@/testing/render"
import ConstructRequestForm from './ConstructRequestForm';

const mockOnSubmit = jest.fn();

describe('ConstructRequestForm', () => {
  beforeEach(() => {
    render(
      <ConstructRequestForm onSubmit={mockOnSubmit} />
    );
  });

  afterEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders the form fields', () => {
    expect(screen.getByLabelText(/Authorization Endpoint/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Client ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Redirect URI/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Token Endpoint/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Scope/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/id_token/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/token/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('combobox', { name: /Response Mode/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nonce/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prompt/i)).toBeInTheDocument();
  });

  it('submits the form with minimal valid data', async () => {
    await userEvent.type(screen.getByLabelText(/Authorization Endpoint/i), 'http://example.com/auth');
    await userEvent.type(screen.getByLabelText(/Client ID/i), 'client');
    await userEvent.type(screen.getByLabelText(/Redirect URI/i), 'http://localhost');
    await userEvent.type(screen.getByLabelText(/Scope/i), 'openid');
    await userEvent.click(screen.getByLabelText(/code/i));

    await userEvent.click(screen.getByRole('button', { name: /Redirect/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        authEndpoint: 'http://example.com/auth',
        clientId: 'client',
        redirectUri: 'http://localhost',
        scope: 'openid',
        responseType: ["code"],
        responseMode: undefined,
        state: '',
        nonce: '',
        prompt: '',
        tokenEndpoint: '',
        additionalParams: []
      }, expect.anything());
    });
  });

  it('shows error messages for missing required fields', async () => {
    await userEvent.click(screen.getByRole('button', { name: /Redirect/i }));

    await waitFor(() => {
      const errorMessagesRequired = screen.getAllByText(/This field is required/i);
      expect(errorMessagesRequired.length).toBe(4);
      expect(screen.getByText(/At least one response type is required/i)).toBeInTheDocument();
    });
  });

  it('constructs URL based on minimal form input changes', async () => {
    await userEvent.type(screen.getByLabelText(/Authorization Endpoint/i), 'http://example.com/auth');
    await userEvent.type(screen.getByLabelText(/Client ID/i), 'client');
    await userEvent.type(screen.getByLabelText(/Redirect URI/i), 'http://localhost');
    await userEvent.type(screen.getByLabelText(/Scope/i), 'openid');
    await userEvent.click(screen.getByLabelText(/code/i));

    await waitFor(() => {
      expect(screen.getByText(/Constructed URL/i)).toBeInTheDocument();
      expect(screen.getByText(/http:\/\/example\.com\/auth\?client_id=client&redirect_uri=http%3A%2F%2Flocalhost&scope=openid&response_type=code/i)).toBeInTheDocument();
    });
  });

  it('submits the form with optional parameters', async () => {
    await userEvent.type(screen.getByLabelText(/Authorization Endpoint/i), 'http://example.com/auth');
    await userEvent.type(screen.getByLabelText(/Client ID/i), 'client');
    await userEvent.type(screen.getByLabelText(/Redirect URI/i), 'http://localhost');
    await userEvent.type(screen.getByLabelText(/Scope/i), 'openid');
    await userEvent.click(screen.getByLabelText(/code/i));
    await userEvent.click(screen.getByLabelText(/id_token/i));
    await userEvent.type(screen.getByLabelText(/Token Endpoint/i), 'http://example.com/token');
    await userEvent.type(screen.getByLabelText(/State/i), 'state');
    await userEvent.type(screen.getByLabelText(/Nonce/i), 'nonce');
    await userEvent.type(screen.getByLabelText(/Prompt/i), 'prompt');
    await userEvent.click(screen.getByRole('combobox', { name: /Response Mode/i }));
    await userEvent.click(screen.getByRole('option', { name: 'form_post' }));

    await userEvent.click(screen.getByRole('button', { name: /Add Parameter/i }));
    await userEvent.click(screen.getByRole('button', { name: /Add Parameter/i }));
    await userEvent.type(screen.getAllByLabelText(/Name/i)[0], 'name1');
    await userEvent.type(screen.getAllByLabelText(/Value/i)[0], 'value1');
    await userEvent.type(screen.getAllByLabelText(/Name/i)[1], 'name2');
    await userEvent.type(screen.getAllByLabelText(/Value/i)[1], 'value2');

    await userEvent.click(screen.getByRole('button', { name: /Redirect/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        authEndpoint: 'http://example.com/auth',
        clientId: 'client',
        redirectUri: 'http://localhost',
        scope: 'openid',
        responseType: ["code", "id_token"],
        responseMode: 'form_post',
        state: 'state',
        nonce: 'nonce',
        prompt: 'prompt',
        tokenEndpoint: 'http://example.com/token',
        additionalParams: [
          { name: 'name1', value: 'value1' },
          { name: 'name2', value: 'value2' },
        ]
      }, expect.anything());
    });
  });

  it('removes additional parameters', async () => {
    await userEvent.type(screen.getByLabelText(/Authorization Endpoint/i), 'http://example.com/auth');
    await userEvent.type(screen.getByLabelText(/Client ID/i), 'client');
    await userEvent.type(screen.getByLabelText(/Redirect URI/i), 'http://localhost');
    await userEvent.type(screen.getByLabelText(/Scope/i), 'openid');
    await userEvent.click(screen.getByLabelText(/code/i));

    await userEvent.click(screen.getByRole('button', { name: /Add Parameter/i }));
    await userEvent.click(screen.getByRole('button', { name: /Add Parameter/i }));

    await userEvent.click(screen.getAllByRole('button', { name: /Remove/i })[0]);

    await waitFor(() => {
      expect(screen.getAllByLabelText(/Name/i).length).toBe(1);
      expect(screen.getAllByLabelText(/Value/i).length).toBe(1);
    });
  });
});