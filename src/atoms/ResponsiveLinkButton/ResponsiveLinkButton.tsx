import { Link as ChakraLink, IconButton } from "@chakra-ui/react";
import type { IconButtonProps, LinkProps } from "@chakra-ui/react";
import type { ComponentProps, ReactElement, ReactNode } from "react";

interface ResponsiveLinkButtonProps<
  TCommonProps extends Partial<LinkProps & IconButtonProps>,
> {
  breakpoint?: string | NonNullable<LinkProps["hideBelow"]>;
  href: ComponentProps<"a">["href"];
  target?: ComponentProps<"a">["target"];
  rel?: ComponentProps<"a">["rel"];
  commonProps?: TCommonProps;
  desktopProps: Omit<
    LinkProps,
    "children" | "href" | "target" | "rel" | "hideBelow" | keyof TCommonProps
  > & { label: ReactNode };
  mobileProps: Omit<
    IconButtonProps,
    | "asChild"
    | "children"
    | "icon"
    | "hideFrom"
    | "aria-label"
    | keyof TCommonProps
  > & {
    "aria-label": string;
    icon: ReactElement;
  };
}

const ResponsiveLinkButton = <
  TCommonProps extends Partial<LinkProps & IconButtonProps>,
>({
  breakpoint = "sm",
  href,
  target,
  rel,
  commonProps,
  desktopProps,
  mobileProps,
}: ResponsiveLinkButtonProps<TCommonProps>) => {
  const { label, ...restDesktopProps } = desktopProps;
  const {
    icon,
    "aria-label": mobileAriaLabel,
    ...restMobileProps
  } = mobileProps;

  return (
    <>
      <ChakraLink
        href={href}
        target={target}
        rel={rel}
        hideBelow={breakpoint}
        {...commonProps}
        {...restDesktopProps}
      >
        {label}
      </ChakraLink>

      <IconButton
        asChild
        hideFrom={breakpoint}
        aria-label={mobileAriaLabel}
        {...commonProps}
        {...restMobileProps}
      >
        <a href={href} target={target} rel={rel}>
          {icon}
        </a>
      </IconButton>
    </>
  );
};

export default ResponsiveLinkButton;
