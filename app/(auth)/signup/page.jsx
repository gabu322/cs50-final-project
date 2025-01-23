'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";

import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Page({ }) {
   const router = useRouter();
   const [signup, setSignup] = useState({
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setSignup((prev) => ({ ...prev, [name]: value }));
   }

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (signup.password !== signup.confirmPassword) {
         console.error("Passwords do not match");
         return;
      }

      try {
         // Call the custom register API
         const response = await axios.post("/api/auth/register", signup);

         if (!response.ok) {
            throw new Error("Failed to register");
         }

         // Automatically log in the user
         const loginResponse = await signIn("credentials", {
            redirect: false,
            email: signup.email,
            password: signup.password,
         });

         if (loginResponse.ok) {
            router.push("/");
         } else {
            console.error("Login failed:", loginResponse.error);
            throw new Error("Failed to login");
         }
      } catch (error) {
         console.error("Signup failed:", error);
      }
   };

   return <div className="flex flex-col justify-center items-center w-full gap-4 bg-white py-6 rounded-3xl shadow-lg max-w-sm">
      <h1 className="text-2xl">Signup</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full px-6">
         <Input
            name="name"
            label="Name"
            type="text"
            onChange={handleChange}
            rounded
         />

         <Input
            name="email"
            label="Email"
            type="email"
            onChange={handleChange}
            rounded
            required
         />

         <Input
            name="password"
            label="Password"
            type="password"
            onChange={handleChange}
            rounded
            required
         />

         <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            onChange={handleChange}
            rounded
            required
         />

         <Button
            className="w-full"
            type="submit"
            text={"Sign Up"}
            bgColor={"bg-orange-300"}
            hoverColor={"hover:bg-orange-400"}
            rounded
         />
      </form>
   </div>;
};
