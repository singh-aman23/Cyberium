
export const metadata = {
  title: 'Cyberium',
  description: 'A simple Twitter-like text posting app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
