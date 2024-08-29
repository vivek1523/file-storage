import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion App",
  description: "Do What Ever You want",
  icons:{
    icon:[
      {
        media:"(prefers-color-scheme: light)",
        url: "/Notion-logo.svg.png",
        href: "/Notion-logo.svg.png" 
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={inter.className}>
        <ConvexClientProvider>
        <EdgeStoreProvider>  
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="Notion-theme"
        > 
        <Toaster position="bottom-center"/>
        <ModalProvider/>
        {children} 
        </ThemeProvider> 
        </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
