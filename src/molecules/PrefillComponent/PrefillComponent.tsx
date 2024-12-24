import { ReactNode, SetStateAction, useState } from 'react';
import { FieldValues } from 'react-hook-form';

interface ConfigItem<T extends FieldValues> { 
  label: string;
  data: T;
}

export type PrefillConfig<T extends FieldValues> = ConfigItem<T>[];

interface PrefillProps<T extends FieldValues> {
  prefillConfig: PrefillConfig<T>;
  onPrefill?: (data: T) => void;
}

const Prefill = <T extends FieldValues,>({ onPrefill, prefillConfig}:PrefillProps<T>): ReactNode | Promise<ReactNode> => {
  const [selectedConfig, setSelectedConfig] = useState('');

  const handleConfigChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedConfig(event.target.value);
  };

  const handlePrefillClick = () => {
    if (selectedConfig && onPrefill) {
      const config = prefillConfig.find((c) => c.label === selectedConfig);
        if(config) {
          console.log(config.data);  
          onPrefill(config.data);
        }
    }
  };

  return (
    <div>
      <div>
      <label htmlFor="config-select">Select Config:</label>
      <select id="config-select" value={selectedConfig} onChange={handleConfigChange}>
        <option value="">Select a config</option> {/* Default option */}
        {prefillConfig.map((config) => (
          <option key={config.label} value={config.label}>
            {config.label}
          </option>
        ))}
      </select>
      <button type="button" onClick={handlePrefillClick}>
        Prefill
      </button>
    </div>
    </div>
  );
};

export default Prefill;
