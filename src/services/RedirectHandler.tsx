import React, { useState } from 'react';

interface RedirectHandlerProps {
  children: (url: string, setUrl: (url: string) => void, redirect: () => void) => React.ReactNode;
}

const RedirectHandler: React.FC<RedirectHandlerProps> = ({ children }) => {
  const [url, setUrl] = useState('');

  const redirect = () => {
    if (url) {
      window.location.href = url;
    }
  };

  return <>{children(url, setUrl, redirect)}</>;
};

export default RedirectHandler;