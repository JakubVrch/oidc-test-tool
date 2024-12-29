import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GetTokenComponent from './GetTokenComponent';
import useTokenExchange from './useTokenExchange';

jest.mock('./useTokenExchange');

describe('GetTokenComponent', () => {
	const props = {
		token_endpoint: 'https://example.com/token',
		redirect_uri: 'https://example.com/callback',
		client_id: 'your_client_id',
		code: 'your_authorization_code',
	};

	it('renders ExchangeCodeForm', () => {
		(useTokenExchange as jest.Mock).mockImplementation(() => ({
			tokenResponse: null,
			handleExchangeCode: jest.fn(),
		}));

		render(<GetTokenComponent {...props} />);
		expect(screen.getByLabelText(/Client Secret:/i)).toBeInTheDocument();
	});

	it('renders success message and tokens on successful exchange', async () => {
		const mockTokenResponse = {
			success: true,
			message: 'Token exchange successful',
			id_token: 'your_id_token',
			access_token: 'your_access_token',
		};
		(useTokenExchange as jest.Mock).mockImplementation(() => ({
			tokenResponse: mockTokenResponse,
			handleExchangeCode: jest.fn(),
		}));

		render(<GetTokenComponent {...props} />);

		// Simulate form submission (you might need to adjust this based on your ExchangeCodeForm implementation)
		// For example, if ExchangeCodeForm has a submit button:
		await userEvent.type(screen.getByLabelText(/Client Secret:/i), 'testSecret');
		await userEvent.click(screen.getByRole('button', { name: /Exchange Code/i }));

		expect(screen.getByText('Token exchange successful')).toBeInTheDocument();
		expect(screen.getByText(/ID Token Information/i)).toBeInTheDocument();
		expect(screen.getByText(/Access Token Information/i)).toBeInTheDocument();
	});

	it('renders error message on unsuccessful exchange', async () => {
		const mockTokenResponse = {
			success: false,
			message: 'Token exchange failed',
		};
		(useTokenExchange as jest.Mock).mockImplementation(() => ({
			tokenResponse: mockTokenResponse,
			handleExchangeCode: jest.fn(),
		}));

		render(<GetTokenComponent {...props} />);

		// Simulate form submission (you might need to adjust this based on your ExchangeCodeForm implementation)
		await userEvent.type(screen.getByLabelText(/Client Secret:/i), 'testSecret');
		await userEvent.click(screen.getByRole('button', { name: /Exchange Code/i }));

		expect(screen.getByText('Token exchange failed')).toBeInTheDocument();
	});
});