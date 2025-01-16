import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";

export async function POST(req) {
   try {
      const userData = await req.json();

      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
      if (existingUser) {
         return NextResponse.json({ error: "User already exists" }, { status: 400 });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create the user
      const user = await prisma.user.create({
         data: {
            email: userData.email,
            password: hashedPassword,
            name: userData.name || null,
         },
      });

      return NextResponse.json({ message: "User registered", user: { id: user.id, email: user.email } }, { status: 201 });
   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
