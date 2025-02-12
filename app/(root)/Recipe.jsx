import Bookmark from "@/public/icons/bookmark";
import Next from "@/public/icons/next";
import Star from "@/public/icons/star";
import Image from "next/image";
import Link from "next/link";

export function Recipe({ recipe }) {
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
      <Link className="absolute bottom-4 right-4" href={`/recipe/${recipe.id}`}>
         <Next color={"black"} className="w-10" />
      </Link>
   </div>
}
