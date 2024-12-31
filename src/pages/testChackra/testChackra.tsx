import * as React from "react"
import {
  Button,
  Input,
  SelectRoot,
  SelectLabel,
  SelectValueText,
  SelectTrigger,
  SelectContent,
  SelectItem
} from '@chakra-ui/react';

import { createListCollection } from "@chakra-ui/react"

import { Checkbox as ChakraCheckbox } from "@chakra-ui/react"
import DefaultTemplate from "@/templates/Default/Default";

export interface CheckboxProps extends ChakraCheckbox.RootProps {
  icon?: React.ReactNode
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  rootRef?: React.Ref<HTMLLabelElement>
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const { icon, children, inputProps, rootRef, ...rest } = props
    return (
      <ChakraCheckbox.Root ref={rootRef} {...rest}>
        <ChakraCheckbox.HiddenInput ref={ref} {...inputProps} />
        <ChakraCheckbox.Control>
          {icon ?? <ChakraCheckbox.Indicator />}
        </ChakraCheckbox.Control>
        {children != null && (
          <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>
        )}
      </ChakraCheckbox.Root>
    )
  },
)


const TestChackraPage: React.FC = () => {

  return (
    <DefaultTemplate title="Welcome to My App">
      <div><Button >Test Me</Button></div>
      <div><Input></Input></div>
      <div><Checkbox >Accept terms and conditions</Checkbox></div>
      <div> <SelectRoot collection={frameworks} size="sm" width="320px">
        <SelectLabel>Select framework</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Select movie" />
        </SelectTrigger>
        <SelectContent>
          {frameworks.items.map((movie) => (
            <SelectItem item={movie} key={movie.value}>
              {movie.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot></div>
    </DefaultTemplate>
  );

};

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})

export default TestChackraPage;