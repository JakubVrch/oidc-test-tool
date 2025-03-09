import { Code } from '@chakra-ui/react';
import React from 'react';

interface ConstructedUrlDisplayProps {
  url: string | null;
}

const ConstructedUrlDisplay: React.FC<ConstructedUrlDisplayProps> = ({ url }) => {
  if (!url) return null;

  return (
    <div>
      <h3>Constructed URL</h3>
      <Code
        size="md"
        maxWidth="100%"
        wordBreak="break-all"
      >
        {url}
      </Code>
    </div>
  );
};

export default ConstructedUrlDisplay;