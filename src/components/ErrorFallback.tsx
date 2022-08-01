import React from 'react';
import {FC} from 'react';

const ErrorFallback: FC<{error: Error}> = ({error}) => {
  return (
    <div role="alert">
      <h2 className="text-xl">Something went wrong:</h2>
      <pre>{error.message}</pre>
      <br />
      <p>Please refresh the page.</p>
    </div>
  );
};

export default ErrorFallback;
