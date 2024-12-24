// Mocking libraries
import { render, fireEvent, screen } from '@testing-library/react';

// Component under test
import Prefill from './PrefillComponent';

// Mock data
const mockPrefillConfig = [
  {
    label: 'Config 1',
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
  
  test('Prefill component renders correctly', () => {

    expect(screen.getByLabelText('Select Config:')).toBeInTheDocument();
    expect(screen.getByText('Prefill')).toBeInTheDocument();
  });

  test('Prefill button calls onPrefill with selected config data', () => {

    fireEvent.change(screen.getByLabelText('Select Config:'), { target: { value: 'Config 1' } });
    fireEvent.click(screen.getByText('Prefill'));

    expect(mockOnPrefill).toHaveBeenCalledWith(mockPrefillConfig[0].data);
  });

  test('Prefill button does not call onPrefill if no config is selected', () => {

    fireEvent.click(screen.getByText('Prefill'));

    expect(mockOnPrefill).not.toHaveBeenCalled();
  });

});