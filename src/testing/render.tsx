import { Provider } from "@/atoms/ui/ChakraProvider";
import { render as rtlRender } from "@testing-library/react";

export function render(ui: React.ReactNode) {
  return rtlRender(<>{ui}</>, {
    wrapper: (props: React.PropsWithChildren) => (
      <Provider>{props.children}</Provider>
    ),
  });
}
