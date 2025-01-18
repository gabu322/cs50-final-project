import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
   subsets: ["latin"],
   weight: ['200', '300', '400', '500', '700', '900'],
});

export const metadata = {
   title: "CookBook",
   description: "A web application so you can save, search and share your recipes.",
};

export default function RootLayout({ children }) {
   return <html lang="en">
      <body className={nunito.className}>
         {children}
      </body>
   </html>;
}
