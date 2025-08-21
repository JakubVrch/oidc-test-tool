import { createListCollection } from "@chakra-ui/react";

export function mapEnumToOptions(enumValue: Record<string, string | number>) {
  return createListCollection({
    items: Object.values(enumValue).map((value) => ({
      value,
      label: value,
    })),
  });
}