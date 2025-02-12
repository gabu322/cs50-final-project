'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

import Button from "@/components/Button";
import { Recipe } from "./Recipe";

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
               href={"/recipe/create"}
               rounded
            />
         </div>

         <div className="flex flex-row gap-4 pt-6 pb-2 overflow-x-scroll">
            {recipes
               .filter(recipe => recipe.userId === session?.user.id)
               .map((recipe, index) =>
                  <Recipe key={index} recipe={recipe} />
               )
            }
         </div>
      </div>
   </div>
}
