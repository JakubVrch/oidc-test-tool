import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from "@/testing/render"
import Prefill from './PrefillComponent';

// Mock data
const mockPrefillConfig = [
  {
    label: 'Config 1',
    description: 'This is a sample config.',
    data: {
      auth_endpoint: 'https://auth.example.com',
      client_id: 'client_id_1',
      redirect_uri: 'https://redirect.example.com',
      scope: 'scope1',
      response_type_code: true,
      response_type_token: false,
      response_type_id_token: false,
      token_endpoint: 'https://token.example.com',
      additional_params: [
        { name: 'param1', value: 'value1' },
        { name: 'param2', value: 'value2' },
      ],
    },
  },
];

// Mock onPrefill function
const mockOnPrefill = jest.fn();

describe('PrefillComponent', () => {

  beforeEach(() => {
    render(<Prefill onPrefill={mockOnPrefill} prefillConfig={mockPrefillConfig} />);
  });

  afterEach(() => {
    mockOnPrefill.mockClear();
  });
  
  test('Prefill component renders correctly', () => {
    expect(screen.getByRole('combobox', { name: /Select Config:/i })).toBeInTheDocument();
    expect(screen.getByText('Prefill')).toBeInTheDocument();
  });

  test('Prefill component shows description', async () => {

    await userEvent.click(screen.getByRole('combobox', { name: /Select Config:/i }));
    await userEvent.click(screen.getByRole('option', { name: 'Config 1' }));

    await waitFor(() => {
      expect(screen.getByText('Config 1', { selector: '[data-part="value-text"]' })).toBeInTheDocument()
      expect(screen.getByText('This is a sample config.')).toBeInTheDocument()
    });
  });

  test('Prefill button calls onPrefill with selected config data', async () => {
    
    await userEvent.click(screen.getByRole('combobox', { name: /Select Config:/i }));
    await userEvent.click(screen.getByRole('option', { name: 'Config 1' }));
    await userEvent.click(screen.getByText('Prefill'));
    
    await waitFor(() => {
      expect(mockOnPrefill).toHaveBeenCalledWith(mockPrefillConfig[0].data); 
    });
  });

  test('Prefill button does not call onPrefill if no config is selected', async () => {

    await userEvent.click(screen.getByText('Prefill'));

    expect(mockOnPrefill).not.toHaveBeenCalled();
  });

});