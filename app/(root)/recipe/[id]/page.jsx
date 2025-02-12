'use client';

import { use, useEffect, useState } from "react";
import axios from "axios";

import Image from "next/image";

export default function Page({ params }) {
   const { id } = use(params);
   const [recipe, setRecipe] = useState();

   useEffect(() => {
      axios.get(`/api/recipe/${id}`)
         .then(response => setRecipe(response.data))
         .catch(error => console.error(error));
   }, [])

   useEffect(() => {
      console.log(recipe);
   }, [recipe])

   return <div className="w-1/2 mx-auto mt-10 flex flex-col gap-8 items-center text-left">
      <h1 className="text-7xl">{recipe?.title}</h1>

      <div>

         <Image
            src={`/background/2.png`}
            height={800}
            width={800}
         />
      </div>
   </div>
}
