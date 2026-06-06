import { screen } from "@testing-library/react";
import { render } from "@/testing/render";
import userEvent from "@testing-library/user-event";
import GetTokenComponent from "./GetTokenComponent";
import useTokenExchange from "./useTokenExchange";

jest.mock("./useTokenExchange");

describe("GetTokenComponent", () => {
  const props = {
    tokenEndpoint: "https://example.com/token",
    redirectUri: "https://example.com/callback",
    clientId: "your_client_id",
    code: "your_authorization_code",
  };

  it("renders ExchangeCodeForm", () => {
    (useTokenExchange as jest.Mock).mockImplementation(() => ({
      tokenResponse: null,
      isLoading: false,
      handleExchangeCode: jest.fn(),
    }));

    render(<GetTokenComponent {...props} />);
    expect(screen.getByLabelText(/Client Secret:/i)).toBeInTheDocument();
  });

  it("renders success message and tokens on successful exchange", async () => {
    const mockTokenResponse = {
      success: true,
      message: "Token exchange successful",
      idToken: "your_id_token",
      accessToken: "your_access_token",
    };
    (useTokenExchange as jest.Mock).mockImplementation(() => ({
      tokenResponse: mockTokenResponse,
      isLoading: false,
      handleExchangeCode: jest.fn(),
    }));

    render(<GetTokenComponent {...props} />);

    // Simulate form submission (you might need to adjust this based on your ExchangeCodeForm implementation)
    // For example, if ExchangeCodeForm has a submit button:
    await userEvent.type(
      screen.getByLabelText(/Client Secret:/i),
      "testSecret",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /Exchange Code/i }),
    );

    expect(screen.getByText("Token exchange successful")).toBeInTheDocument();
    expect(screen.getByText(/ID Token Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Access Token Information/i)).toBeInTheDocument();
  });

  it("renders error message on unsuccessful exchange", async () => {
    const mockTokenResponse = {
      success: false,
      message: "Token exchange failed",
    };
    (useTokenExchange as jest.Mock).mockImplementation(() => ({
      tokenResponse: mockTokenResponse,
      isLoading: false,
      handleExchangeCode: jest.fn(),
    }));

    render(<GetTokenComponent {...props} />);

    // Simulate form submission (you might need to adjust this based on your ExchangeCodeForm implementation)
    await userEvent.type(
      screen.getByLabelText(/Client Secret:/i),
      "testSecret",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /Exchange Code/i }),
    );

    expect(screen.getByText("Token exchange failed")).toBeInTheDocument();
  });

  it("disables exchange button while loading", () => {
    (useTokenExchange as jest.Mock).mockImplementation(() => ({
      tokenResponse: null,
      isLoading: true,
      handleExchangeCode: jest.fn(),
    }));

    render(<GetTokenComponent {...props} />);

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
