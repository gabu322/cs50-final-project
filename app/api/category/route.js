import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, res) {
   try {
      const categories = await prisma.category.findMany();

      return NextResponse.json(categories, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}

export async function POST(req, res) {
   try {
      const { category } = await req.json();

      const newCategory = await prisma.category.create({
         data: {
            name: category,
         },
      });

      return NextResponse.json(newCategory, { status: 201 });
   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
