import './globals.css';
import { TokenSyncProvider } from '@/components/TokenSyncProvider';

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <TokenSyncProvider>
          {children}
        </TokenSyncProvider>
      </body>
    </html>
  );
}
