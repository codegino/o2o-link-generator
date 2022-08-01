import React, {FC} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import LinkGenerator from './components/LinkGenerator';

const App: FC = () => {
  return (
    <div className="flex items-center flex-col text-center p-8">
      <h1 className="text-3xl">Link Generator</h1>
      <br />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <LinkGenerator />
      </ErrorBoundary>
    </div>
  );
};

export default App;
