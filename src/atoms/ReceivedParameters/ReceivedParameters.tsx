import React from 'react';

interface ReceivedParametersProps {
  storedParams: { state?: string | null; };
  responseData: { params?: URLSearchParams | null; };
}

const ReceivedParameters: React.FC<ReceivedParametersProps> = ({ storedParams: { state }, responseData: { params } }) => {
  if (!params) {
    return null; // No parameters to display
  }

  const paramEntries = Array.from(params.entries()); 

  return (
    <div>
      <h2>Received Parameters:</h2>
      <ul>
        {paramEntries.map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {String(value)} 
            {key === 'state' && state && (
              <span> 
                {state && value === state ? 
                  `(Matches request: ${String(state)})` : 
                  `(Does not match request: ${String(state)})` 
                }
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceivedParameters;