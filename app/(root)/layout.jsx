'use client';

import { SessionProvider } from "next-auth/react";

import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
   return <>
      <div className="top-0 h-[72px]" />

      <main>
         <SessionProvider>
            <Navbar />

            {children}
         </SessionProvider>
      </main>
   </>;
}
