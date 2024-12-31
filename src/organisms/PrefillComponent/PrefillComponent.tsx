import { useForm, FieldValues, FormProvider } from 'react-hook-form';
import SelectInput from '../../molecules/SelectInput/SelectInput';
import Button from '@/atoms/Button/Button';
import { createListCollection } from '@chakra-ui/react';

interface ConfigItem<T extends FieldValues> {
  label: string;
  description?: string;
  data: T;
}

export type PrefillConfig<T extends FieldValues> = ConfigItem<T>[];

interface PrefillProps<T extends FieldValues> {
  prefillConfig: PrefillConfig<T>;
  onPrefill?: (data: T) => void;
}

interface FormValues {
  selectedConfig?: string
}

const Prefill = <T extends FieldValues>({ onPrefill, prefillConfig }: PrefillProps<T>) => {
  const methods = useForm<FormValues>();
  const { handleSubmit, watch } = methods;
  const selectedConfigLabel = watch('selectedConfig');

  const dropdownOptions = createListCollection({
    items: [
      ...prefillConfig.map((config) => ({
        value: config.label,
        label: config.label,
      }))
    ]
  })
 
  const findSelectedConfig = (label?: string) =>
    label
      ? prefillConfig.find((config) => config.label === label)
      : null;

  const selectedConfig = findSelectedConfig(selectedConfigLabel);

  const onSubmit = (data: FormValues) => {
    const selectedConfig = findSelectedConfig(data.selectedConfig);
    if (selectedConfig?.data && onPrefill) {
      onPrefill(selectedConfig.data);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectInput id="selectedConfig" label="Select Config:" options={dropdownOptions} />
        {selectedConfig?.description && (
          <div>
            <label>Description:</label>
            <p>{selectedConfig.description}</p>
          </div>
        )}
        <Button type="submit">Prefill</Button>
      </form>
    </FormProvider>
  );
};

export default Prefill;