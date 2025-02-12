import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(req, res) {
   const { id } = await res.params;
   try {
      console.log(id)
      const recipe = await prisma.recipe.findFirst({
         where: {
            id: Number(id),
         },
         include: {
            ingredients: true,
            instructions: true
         }
      });

      return NextResponse.json(recipe, { status: 200 });
   } catch (error) {
      console.log("b ")
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
}
