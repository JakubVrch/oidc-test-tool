import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { FormValues } from './ConstructRequestForm';

const useAutofill = (setValue: UseFormSetValue<FormValues>) => {
  useEffect(() => {
    // Register autofilled values for text inputs and selects
    const inputs = document.querySelectorAll('input[type="text"], input[type="url"], select');
    inputs.forEach(input => {
      const element = input as HTMLInputElement | HTMLSelectElement;
      if (element.value) {
        setValue(element.name as keyof FormValues, element.value);
      }
    });

    // Handle checkboxes separately
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      const element = checkbox as HTMLInputElement;
      setValue(element.name as keyof FormValues, element.checked);
    });
  }, [setValue]);
};

export default useAutofill;