'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

import Button from "@/components/Button";
import Image from "next/image";
import Bookmark from "@/public/icons/bookmark";
import Star from "@/public/icons/star";
import Next from "@/public/icons/next";

export default function Page() {
   const { data: session } = useSession();
   const [recipes, setRecipes] = useState([]);

   useEffect(() => {
      axios.get("/api/recipe")
         .then(response => setRecipes(response.data))
         .catch(error => console.error(error));
   }, []);

   return <div className="middle-section">
      <h1 className="text-4xl font-bold">Welcome {session?.user.name || session?.user.email.split("@")[0]}!</h1>

      <h4>Here you can see your saved recipes or the ones shared by the comunity!</h4>

      <div className="flex flex-col gap-4">
         <div className="flex flex-row justify-between w-full">
            <h2 className="text-2xl font-bold">Your recipes</h2>
            <Button
               bgColor={"bg-orange-400"}
               hoverColor={"hover:bg-orange-500"}
               text={"Create new recipe"}
               href={"/create"}
               rounded
            />
         </div>

         <div className="flex flex-row gap-4 pt-6 pb-2 overflow-x-scroll">
            {recipes.map((recipe, index) => <Recipes key={index} recipe={recipe} />)}
         </div>
      </div>
   </div>
}

export function Recipes({ recipe }) {
   return <div className="min-w-[400px] bg-white rounded-lg overflow-hidden shadow-md relative">
      {/* Saves */}
      <div className="absolute top-3 left-3 p-1 rounded-full bg-white flex flex-row items-center gap-1 font-medium">
         <Bookmark color={"black"} className="w-4" />

         {/* Provisory */}
         {"123"}
      </div>

      {/* Rating */}
      <div className="absolute top-3 right-3 p-1 rounded-full bg-white flex flex-row items-center gap-1 font-medium">
         {/* Provisory */}
         {"4.5"}

         <Star color={"black"} className="w-4" />
      </div>

      <Image
         src={recipe.image || "/background/2.png"}
         alt={recipe.title}
         width={400}
         height={200}
         className="object-cover w-full h-[240px]"
      />

      <div className="p-4 pt-2">
         <h3 className="text-lg font-semibold">{recipe.title}</h3>

         <p className="text-sm text-gray-600 truncate">{recipe.description}</p>
      </div>

      {/* Enter the recipe */}
      <div className="absolute bottom-4 right-4">
         <Next color={"black"} className="w-10" />
      </div>
   </div>
}
