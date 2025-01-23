import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
   try {
      const session = await getServerSession(authOptions);

      if (!session || !session.user || !session.user.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

      const recipeData = await req.json();

      const newRecipe = await prisma.$transaction(async (tx) => {
         console.log("here1")
         const recipe = await tx.recipe.create({
            data: {
               title: recipeData.title,
               description: recipeData.description,
               image: recipeData.image || null,
               userId: session.user.id,

               ingredients: {
                  create: recipeData.ingredients.map((ingredient) => ({
                     name: ingredient.name,
                     quantity: ingredient.quantity,
                     unit: ingredient.unit,
                  })),
               },

               instructions: {
                  create: recipeData.instructions.map((instruction) => ({
                     content: instruction.content,
                     step: instruction.step,
                  })),
               },
            },
         });
         console.log("here2")
         return recipe;
      });

      return NextResponse.json(newRecipe, { status: 201 });
   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
