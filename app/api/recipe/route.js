import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
   try {
      const session = await getServerSession(authOptions);

      const recipes = await prisma.recipe.findMany({
         where: {
            OR: [
               { userId: session.user.id },
               { private: false },
            ]
         },
         include: {
            ingredients: true,
            instructions: true,
         },
      });

      return NextResponse.json(recipes, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}

export async function POST(req) {
   try {
      const session = await getServerSession(authOptions);

      const recipeData = await req.json();

      const newRecipe = await prisma.$transaction(async (tx) => {
         console.log("here1")
         const recipe = await tx.recipe.create({
            data: {
               title: recipeData.name,
               description: recipeData.description,
               image: recipeData.image || null,
               private: recipeData.private,
               prepTime: +recipeData.prepTime,

               user: { connect: { id: session.user.id } },

               category: { connect: { id: recipeData.category } },

               ingredients: {
                  create: recipeData.ingredients.map((ingredient) => ({
                     name: ingredient.name,
                     quantity: +ingredient.quantity,
                     unit: ingredient.unit,
                  })),
               },

               instructions: {
                  create: recipeData.instructions.map((instruction) => ({
                     content: instruction.content,
                     step: +instruction.step,
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
