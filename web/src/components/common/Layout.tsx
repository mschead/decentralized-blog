import AddPostButton from "@/components/domain/AddPostButton";
import ConnectButton from "@/components/domain/ConnectButton";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 mb-8 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <span className="mx-auto text-cyan-400">Decentralized Blog</span>
          </Link>
          <div>
            <AddPostButton />
            <ConnectButton />
          </div>
        </div>
      </header>
      <main className="container mx-auto flex-1">{children}</main>
      <footer className="bg-gray-800 mt-8 py-4">
        <div className="container mx-auto flex justify-center text-cyan-400">
          &copy; Marcos Schead - 2023
        </div>
      </footer>
    </div>
  );
}
