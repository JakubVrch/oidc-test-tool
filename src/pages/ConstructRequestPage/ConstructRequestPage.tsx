import React from 'react';
import RedirectHandler from '../../services/RedirectHandler';

const ConstructRequestPage: React.FC = () => {
  return (
    <RedirectHandler>
      {(url, setUrl, redirect) => (
        <div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
          />
          <button onClick={redirect}>Go</button>
        </div>
      )}
    </RedirectHandler>
  );
};

export default ConstructRequestPage;