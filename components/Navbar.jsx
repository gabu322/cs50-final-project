'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Select from "./Select";

export default function Navbar() {
   const { data: session } = useSession();
   const [recipes, setRecipes] = useState([]);

   useEffect(() => {
      console.log(session);
   }, [session]);

   return <nav className="bg-orange-400 text-white py-4 px-10 fixed top-0 left-0 w-full z-10 flex flex-row justify-between items-center">
      <h2 className="text-2xl">CookBook</h2>

      <Select
         className="w-5/12"
         options={recipes}
         label="Select a recipe"
         placeholder="Select a recipe"
         rounded
      />
   </nav>;
}
