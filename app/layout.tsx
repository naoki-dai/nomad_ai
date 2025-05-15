import type { Metadata } from "next";
import "./globals.css";

/**
 * Metadata for the page
 */
export const metadata: Metadata = {
  title: "Giving AI Agent For Nomad",
  description: "福岡の非営利団体に寄付できるノマド向けAIエージェントです",
};

/**
 * Root layout for the page
 *
 * @param {object} props - The props for the root layout
 * @param {React.ReactNode} props.children - The children for the root layout
 * @returns {React.ReactNode} The root layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 dark flex flex-col min-h-screen">
        {/* Header (Fixed Height) */}
        <header className="py-20 flex items-center justify-between relative">

          <span className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-green-700 dark:text-blue-400">
          Giving AI Agent For Nomad
          </span>
        </header>

        {/* Main Content (Dynamic, Grows but Doesn't Force Scroll) */}
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
