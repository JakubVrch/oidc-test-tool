import { ReactNode, useState } from 'react';
import { FieldValues } from 'react-hook-form';

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

const Prefill = <T extends FieldValues,>({ onPrefill, prefillConfig }: PrefillProps<T>): ReactNode | Promise<ReactNode> => {
  const [selectedConfig, setSelectedConfig] = useState<ConfigItem<T> | null>(null);

  const handleConfigChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const config = selectedValue 
      ? prefillConfig.find(c => c.label === selectedValue) ?? null
      : null; 
    setSelectedConfig(config); 
  };

  const handlePrefillClick = () => {
    if (selectedConfig?.data && onPrefill) {
      onPrefill(selectedConfig.data);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="config-select">Select Config:</label>
        <select id="config-select" value={selectedConfig?.label} onChange={handleConfigChange}>
          <option value="">Select a config</option> {/* Default option */}
          {prefillConfig.map((config) => (
            <option key={config.label} value={config.label}>
              {config.label}
            </option>
          ))}
        </select>
        {selectedConfig?.description && 
        <div>
          <label>Description:</label>
          <p>{selectedConfig.description}</p>
        </div>
        }
        <button type="button" onClick={handlePrefillClick}>
          Prefill
        </button>
      </div>
    </div>
  );
};

export default Prefill;
