import React from 'react';

interface ConstructedUrlDisplayProps {
  url: string | null;
}

const ConstructedUrlDisplay: React.FC<ConstructedUrlDisplayProps> = ({ url }) => {
  if (!url) return null;

  return (
    <div>
      <h3>Constructed URL</h3>
      <p>{url}</p>
    </div>
  );
};

export default ConstructedUrlDisplay;