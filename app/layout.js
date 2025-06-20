// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

export const metadata = {
  title: 'LumaOne',
  description: 'LumaOne',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0a0a0a' }}>
        <MantineProvider defaultColorScheme="dark" theme={{
          fontFamily: 'Inter, sans-serif',
          headings: {
            fontFamily: 'Inter, sans-serif',
          },
          colors: {
            dark: [
              '#e2e8f0',
              '#94a3b8',
              '#64748b',
              '#475569',
              '#334155',
              '#1e293b',
              '#0f172a',
              '#0a0a0a',
              '#000000',
              '#000000',
            ],
          },
          primaryColor: 'green',
        }}>{children}</MantineProvider>
      </body>
    </html>
  );
}