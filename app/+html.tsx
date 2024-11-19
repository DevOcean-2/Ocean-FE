import '../uilib-config';

import React from 'react';
import { ScrollViewStyleReset } from 'expo-router/html';
import { Provider } from 'jotai';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { View } from 'react-native-ui-lib';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 2000,
      staleTime: 600000,
    },
  },
});

export default function Root({ children }: { children: React.ReactNode }) {
  useReactQueryDevTools(queryClient);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>
        <Provider>
          <QueryClientProvider client={queryClient}>
            <View flex>{children}</View>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #EDF1F7;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;
