import type { Metadata } from "next";
import "./globals.css";
import Layout from "./(public)/layout";


export const metadata: Metadata = {
  title: 'Emon - Portfolio',
  description: 'Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Layout children={children} />
      </body>
    </html>
  );
}
