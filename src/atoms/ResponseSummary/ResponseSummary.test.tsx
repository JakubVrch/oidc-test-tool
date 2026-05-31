import { screen } from "@testing-library/react";
import { render } from "@/testing/render";
import { ResponseMode, ResponseType } from "@/services/types/oidcResponseTypeAndMode";
import ResponseSummary from "./ResponseSummary";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
}));

describe("ResponseSummary Component", () => {
  it('should render "Success" and display mode and response type when both are provided', () => {
    const mode = ResponseMode.Fragment;
    const responseType = ResponseType.Code;

    render(<ResponseSummary mode={mode} responseType={responseType} />);

    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText(`Mode: ${mode.valueOf()}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Response Type: ${responseType.valueOf()}`),
    ).toBeInTheDocument();
  });

  it('should render "Response is invalid" when responseType is null', () => {
    render(
      <ResponseSummary mode={ResponseMode.Fragment} responseType={null} />,
    );
    expect(screen.getByText("Response is invalid")).toBeInTheDocument();
  });

  it('should render "Response is invalid" when mode is null', () => {
    render(<ResponseSummary mode={null} responseType={ResponseType.Code} />);
    expect(screen.getByText("Response is invalid")).toBeInTheDocument();
  });
});
