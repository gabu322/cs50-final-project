'use client';

import { SessionProvider } from "next-auth/react";

import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
   return <main>
      <div className="top-0 h-[72px]" />
      <SessionProvider>
         <Navbar />
         {children}
      </SessionProvider>
   </main>;
}
