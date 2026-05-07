import { screen, waitFor, act } from "@testing-library/react";
import { render } from "@/testing/render";
import userEvent from "@testing-library/user-event";
import ExchangeCodeForm from "./ExchangeCodeForm";

const mockOnSubmit = jest.fn();

describe("ExchangeCodeForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("without codeVerifier prop (non-PKCE)", () => {
    beforeEach(async () => {
      render(<ExchangeCodeForm onSubmit={mockOnSubmit} />);
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await act(async () => {});
    });

    it("pre-checks Use Client Secret and renders password input", () => {
      expect(screen.getByLabelText(/Client Secret:/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Exchange Code/i })).toBeInTheDocument();
    });

    it("does not render Use Code Verifier option", () => {
      expect(screen.queryByLabelText(/Use Code Verifier/i)).not.toBeInTheDocument();
    });

    it("calls onSubmit with clientSecret on valid submission", async () => {
      await userEvent.type(screen.getByLabelText(/Client Secret:/i), "testSecret");
      await userEvent.click(screen.getByRole("button", { name: /Exchange Code/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            useClientSecret: true,
            clientSecret: "testSecret",
          }),
          expect.anything(),
        );
      });
    });

    it("displays error when clientSecret is empty", async () => {
      await userEvent.click(screen.getByRole("button", { name: /Exchange Code/i }));

      await waitFor(() => {
        expect(screen.getByText("Client Secret is required")).toBeInTheDocument();
      });
    });
  });

  describe("with codeVerifier prop (PKCE)", () => {
    const mockCodeVerifier = "mock-code-verifier";

    beforeEach(async () => {
      render(
        <ExchangeCodeForm onSubmit={mockOnSubmit} codeVerifier={mockCodeVerifier} />,
      );
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await act(async () => {});
    });

    it("pre-checks Use Code Verifier and renders pre-filled input", () => {
      expect(screen.getByLabelText(/Code Verifier:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Code Verifier:/i)).toHaveValue(mockCodeVerifier);
    });

    it("always renders Client Secret input even when Use Client Secret is unchecked", () => {
      expect(screen.getByLabelText(/Client Secret:/i)).toBeInTheDocument();
    });

    it("calls onSubmit with codeVerifier only by default", async () => {
      await userEvent.click(screen.getByRole("button", { name: /Exchange Code/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            useClientSecret: false,
            useCodeVerifier: true,
            codeVerifier: mockCodeVerifier,
          }),
          expect.anything(),
        );
      });
    });

    it("shows error in real-time when all auth methods are unchecked", async () => {
      await userEvent.click(screen.getByLabelText(/Use Code Verifier/i));

      await waitFor(() => {
        expect(
          screen.getByText("Select at least one authentication method"),
        ).toBeInTheDocument();
      });
    });

    it("clears error when an auth method is re-checked", async () => {
      await userEvent.click(screen.getByLabelText(/Use Code Verifier/i));
      await waitFor(() =>
        expect(screen.getByText("Select at least one authentication method")).toBeInTheDocument(),
      );

      await userEvent.click(screen.getByLabelText(/Use Client Secret/i));
      await waitFor(() =>
        expect(screen.queryByText("Select at least one authentication method")).not.toBeInTheDocument(),
      );
    });
  });
});

