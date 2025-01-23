import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
   subsets: ["latin"],
   weight: ['300', '400', '500', '700'],
});

export const metadata = {
   title: "CookBook",
   description: "A web application so you can save, search and share your recipes.",
};

const randomNumber = Math.floor(Math.random() * 3) + 1;
const backgroundImage = `/background/${randomNumber}.png`;

export default function RootLayout({ children }) {
   return <html lang="en">
      <body
         className={quicksand.className}
         style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
         }}
      >
         <div className="absolute top-0 left-0 w-full h-full bg-[#fff8ef] opacity-[97%] -z-10" />
         {children}
      </body>
   </html>;
}
