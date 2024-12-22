import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConstructRequestForm from './ConstructRequestForm';

const mockOnSubmit = jest.fn();

describe('ConstructRequestForm', () => {
  beforeEach(() => {
    render(<ConstructRequestForm onSubmit={mockOnSubmit} />);
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
    expect(screen.getByLabelText(/Response Mode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nonce/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prompt/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    fireEvent.input(screen.getByLabelText(/Authorization Endpoint/i), { target: { value: 'http://example.com/auth' } });
    fireEvent.input(screen.getByLabelText(/Client ID/i), { target: { value: 'client' } });
    fireEvent.input(screen.getByLabelText(/Redirect URI/i), { target: { value: 'http://localhost' } });
    fireEvent.input(screen.getByLabelText(/Scope/i), { target: { value: 'openid' } });
    fireEvent.click(screen.getByLabelText(/code/i));

    fireEvent.submit(screen.getByRole('button', { name: /Redirect/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        auth_endpoint: 'http://example.com/auth',
        client_id: 'client',
        redirect_uri: 'http://localhost',
        scope: 'openid',
        response_type_code: true,
        response_type_token: false,
        response_type_id_token: false,
        response_mode: '',
        state: '',
        nonce: '',
        prompt: '',
        token_endpoint: ''
      }, expect.anything());
    });
  });

  it('shows error messages for missing required fields', async () => {
    fireEvent.submit(screen.getByRole('button', { name: /Redirect/i }));

    await waitFor(() => {
      const errorMessagesRequired = screen.getAllByText(/This field is required/i);
      expect(errorMessagesRequired.length).toBe(4);
      expect(screen.getByText(/At least one response type is required/i)).toBeInTheDocument();
    });
  });

  it('constructs URL based on form input changes', async () => {
    fireEvent.input(screen.getByLabelText(/Authorization Endpoint/i), { target: { value: 'http://example.com/auth' } });
    fireEvent.input(screen.getByLabelText(/Client ID/i), { target: { value: 'client' } });
    fireEvent.input(screen.getByLabelText(/Redirect URI/i), { target: { value: 'http://localhost' } });
    fireEvent.input(screen.getByLabelText(/Scope/i), { target: { value: 'openid' } });
    fireEvent.click(screen.getByLabelText(/code/i));

    await waitFor(() => {
      expect(screen.getByText(/Constructed URL/i)).toBeInTheDocument();
      expect(screen.getByText(/http:\/\/example\.com\/auth\?client_id=client&redirect_uri=http%3A%2F%2Flocalhost&scope=openid&response_type=code/i)).toBeInTheDocument();
    });
  });
});