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
        <body className="flex flex-col min-h-screen custom-gradient">
          {/* Header */}
           <header className="py-10 flex items-center justify-center relative">
             <div className="text-center">
               <h1 className="text-5xl font-extrabold text-green-700 dark:text-blue-400 tracking-tight drop-shadow-sm">
               Giving AI Agent For Nomad
               </h1>
               <p className="mt-2 text-base text-gray-600 dark:text-gray-300 italic font-light">
               福岡の非営利団体に寄付できるノマド向けAIエージェントです(any language available)
               </p>
            </div>
          </header>

        {/* Main Content (Dynamic, Grows but Doesn't Force Scroll) */}
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
