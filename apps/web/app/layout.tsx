import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme/theme-provider";
// import ErrorBoundary from "@/app/components/ErrorBoundary";

export const metadata: Metadata = {
  title: 'Fixmate App',
  description: 'Think of Uber But For Repairs',
  icons: {
    icon: '/favicon-32x32.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
    </html>
  )
}