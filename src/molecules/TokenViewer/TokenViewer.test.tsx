import { screen } from "@testing-library/react";
import { render } from "@/testing/render";
import TokenViewer from "./TokenViewer";

describe("TokenViewer Component", () => {
  it("renders null when no token is provided", () => {
    render(<TokenViewer token={null} tokenName="Test Token" />);
    expect(
      screen.queryByText(/Test Token Information/i),
    ).not.toBeInTheDocument();
  });

  it("renders token when valid JWT is provided", () => {
    const mockToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw-0";

    render(<TokenViewer token={mockToken} tokenName="Test Token" />);

    expect(screen.getByText(/Test Token Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Header:/i)).toBeInTheDocument();
    expect(screen.getByText(/Body:/i)).toBeInTheDocument();

    // Check if the rendered header and body data match the expected values
    expect(screen.getByText(/"sub": "1234567890",/i)).toBeInTheDocument();
    expect(screen.getByText(/"name": "John Doe",/i)).toBeInTheDocument();
    expect(screen.getByText(/"alg": "HS256",/i)).toBeInTheDocument();
    expect(screen.getByText(/"typ": "JWT"/i)).toBeInTheDocument();
  });

  it("renders token when invalid JWT is provided", () => {
    const invalidToken = "invalid_token";

    render(<TokenViewer token={invalidToken} tokenName="Test Token" />);

    expect(screen.getByText(/Token Information/i)).toBeInTheDocument();
    expect(screen.getByText(/invalid_token/i)).toBeInTheDocument();
  });
});
