import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExchangeCodeForm from './ExchangeCodeForm';

const mockOnSubmit = jest.fn();

describe('ExchangeCodeForm', () => {
  beforeEach(() => { 
    render(<ExchangeCodeForm onSubmit={mockOnSubmit} />);
  });
  
  it('renders the form with a password input and submit button', () => {
    expect(screen.getByLabelText(/Client Secret:/i)).toHaveAttribute('type', 'password');
    expect(screen.getByRole('button')).toHaveTextContent('Exchange Code');
  });

  it('calls onSubmit with the correct data on form submission', async () => {
    await userEvent.type(screen.getByLabelText(/Client Secret:/i), 'testSecret');
    await userEvent.click(screen.getByRole('button', { name: /Exchange Code/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        clientSecret: 'testSecret',
      }, expect.anything());
    });
  });

  it('displays an error message when clientSecret is empty', async () => {
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });
});