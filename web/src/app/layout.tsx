import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/config/Providers";
import Layout from "@/components/common/Layout";
import CheckConnection from "@/components/config/CheckConnection";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Decentralized Blog",
  description: "A blog using blockchain technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Layout>
            <CheckConnection>{children}</CheckConnection>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
