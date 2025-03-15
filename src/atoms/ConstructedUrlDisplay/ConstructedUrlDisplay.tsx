import { Code, Text } from '@chakra-ui/react';
import React from 'react';

interface ConstructedUrlDisplayProps {
  url: string | null;
}

const ConstructedUrlDisplay: React.FC<ConstructedUrlDisplayProps> = ({ url }) => {
  if (!url) return null;

  return (
    <div>
      <Text>Constructed URL</Text>
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