import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormValues } from '../ConstructRequestForm/ConstructRequestForm'; //TODO: remove dependency on ConstructRequestForm

interface Config extends Array<{
  label: string;
  data: FormValues;
}> {}

const prefillConfigs:Config = [
  {
    label: 'Config 1',
    data: {
      auth_endpoint: 'https://auth.example.com',
      client_id: 'client_id_1',
      redirect_uri: 'https://redirect.example.com',
      scope: 'scope1',
      response_type_code: true,
      response_type_token: false,
      response_type_id_token: false,
      token_endpoint: 'https://token.example.com',
      additional_params: [
        { name: 'param1', value: 'value1' },
        { name: 'param2', value: 'value2' },
      ],
    },
  },
];

interface PrefillProps {
  onPrefill?: (data: FieldValues) => void;
}

const Prefill: React.FC = ({ onPrefill }:PrefillProps) => {
  const [selectedConfig, setSelectedConfig] = useState('');

  const handleConfigChange = (event) => {
    setSelectedConfig(event.target.value);
  };

  const handlePrefillClick = () => {
    if (selectedConfig && onPrefill) {
      const config = prefillConfigs.find((c) => c.label === selectedConfig);
        if(config) {
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
        {prefillConfigs.map((config) => (
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
