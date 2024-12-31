"use client"

import { ListCollection } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/atoms/Select/ChakraSelect"
import { ControllerRenderProps } from "react-hook-form";

interface SelectProps {
  collection: ListCollection<{label: string; value:string}>;
  field: ControllerRenderProps;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ collection, field, placeholder }:SelectProps) => {
  return (
    <SelectRoot
      name={field.name}
      value={[field.value]}
      onValueChange={({ value }) => field.onChange(value.length > 0 ? value[0] : null)}
      onInteractOutside={() => field.onBlur()}
      collection={collection}
    >
      <SelectTrigger>
        <SelectValueText {... { placeholder }} />
      </SelectTrigger>
      <SelectContent>
        {collection.items.map((item) => (
          <SelectItem item={item} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}

export default Select