import { act, screen, waitFor } from "@testing-library/react";
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  const flushFormEffects = async () => {
    await act(async () => {
      await Promise.resolve();
    });
  };

  it("calls useTokenExchange with request parameters", async () => {
    (useTokenExchange as jest.Mock).mockReturnValue({
      tokenResponse: null,
      isLoading: false,
      handleExchangeCode: jest.fn(),
    });

    render(<GetTokenComponent {...props} />);
    await flushFormEffects();

    expect(useTokenExchange).toHaveBeenCalledWith({
      tokenEndpoint: props.tokenEndpoint,
      redirectUri: props.redirectUri,
      clientId: props.clientId,
      code: props.code,
    });
  });

  it("submits ExchangeCodeForm and triggers hook handler", async () => {
    const handleExchangeCode = jest.fn();
    (useTokenExchange as jest.Mock).mockReturnValue({
      tokenResponse: null,
      isLoading: false,
      handleExchangeCode,
    });

    render(<GetTokenComponent {...props} />);
    await flushFormEffects();

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/Client Secret:/i), "testSecret");
    await user.click(screen.getByRole("button", { name: /Exchange Code/i }));

    await waitFor(() => {
      expect(handleExchangeCode).toHaveBeenCalledWith(
        expect.objectContaining({
          useClientSecret: true,
          clientSecret: "testSecret",
          useCodeVerifier: false,
          codeVerifier: "",
        }),
        expect.anything(),
      );
    });
  });

  it("renders success output for successful hook state", async () => {
    const mockTokenResponse = {
      success: true,
      message: "Token exchange successful",
      idToken: "your_id_token",
      accessToken: "your_access_token",
    };
    (useTokenExchange as jest.Mock).mockReturnValue({
      tokenResponse: mockTokenResponse,
      isLoading: false,
      handleExchangeCode: jest.fn(),
    });

    render(<GetTokenComponent {...props} />);
    await flushFormEffects();

    expect(screen.getByText("Token exchange successful")).toBeInTheDocument();
    expect(screen.getByText(/ID Token Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Access Token Information/i)).toBeInTheDocument();
  });

  it("renders error output for unsuccessful hook state", async () => {
    const mockTokenResponse = {
      success: false,
      message: "Token exchange failed",
    };
    (useTokenExchange as jest.Mock).mockReturnValue({
      tokenResponse: mockTokenResponse,
      isLoading: false,
      handleExchangeCode: jest.fn(),
    });

    render(<GetTokenComponent {...props} />);
    await flushFormEffects();

    expect(screen.getByText("Token exchange failed")).toBeInTheDocument();
  });

  it("disables exchange button while loading", async () => {
    (useTokenExchange as jest.Mock).mockImplementation(() => ({
      tokenResponse: null,
      isLoading: true,
      handleExchangeCode: jest.fn(),
    }));

    render(<GetTokenComponent {...props} />);
    await flushFormEffects();

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
