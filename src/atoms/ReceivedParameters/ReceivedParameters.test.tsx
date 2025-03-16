import { screen } from "@testing-library/react";
import { render } from "@/testing/render";
import ReceivedParameters from "./ReceivedParameters";

describe("ReceivedParameters component", () => {
  it("renders received parameters without a state match", () => {
    const params = new URLSearchParams({ foo: "bar" });
    render(<ReceivedParameters params={params} state={null} />);

    expect(screen.getByText("Received Parameters:")).toBeInTheDocument();
    expect(screen.getByText("foo")).toBeInTheDocument();
    expect(screen.getByText("bar")).toBeInTheDocument();
    expect(screen.queryByText("(Matches request:)")).not.toBeInTheDocument();
  });

  it("renders received parameters with a matching state", () => {
    const params = new URLSearchParams({ state: "active" });
    const state = "active";
    render(<ReceivedParameters params={params} state={state} />);

    expect(screen.getByText("Received Parameters:")).toBeInTheDocument();
    expect(screen.getByText("state")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
    expect(screen.getByText("Matches request: active")).toBeInTheDocument();
  });

  it("renders received parameters with a non-matching state", () => {
    const params = new URLSearchParams({ state: "inactive" });
    const state = "active";
    render(<ReceivedParameters params={params} state={state} />);

    expect(screen.getByText("Received Parameters:")).toBeInTheDocument();
    expect(screen.getByText("state")).toBeInTheDocument();
    expect(screen.getByText("inactive")).toBeInTheDocument();
    expect(
      screen.getByText("Does not match request: active"),
    ).toBeInTheDocument();
  });
});
