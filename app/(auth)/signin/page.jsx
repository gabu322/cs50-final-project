'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";

import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Page({ }) {
   const [login, setLogin] = useState({
      email: "",
      password: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setLogin((prev) => ({ ...prev, [name]: value }));
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      const result = await signIn("credentials", {
         redirect: false,
         email: login.email,
         password: login.password,
      });

      if (result.error) {
         console.error(result.error);
      } else {
         console.log("Login successful");
         // Do a 5sec timeout and redirect to home
         setTimeout(() => {
            window.location.href = "/";
         }, 5000);
      }
   }

   return <div className="flex flex-col justify-center items-center w-full gap-4 bg-white py-6 rounded-lg shadow-lg max-w-md">
      <h1 className="text-2xl">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-4/5">
         <Input
            name="email"
            label="Email"
            type="email"
            onChange={handleChange}
            required
         />

         <Input
            name="password"
            label="Senha"
            type="password"
            onChange={handleChange}
            required
         />

         <Button
            type="submit"
            text={"Entrar"}
         />
         <hr />

         <p className="text-left">Ainda não possui cadastro?</p>
         <Button
            className="w-full"
            text={"Cadastrar"}
            href={"/signup"}
         />
      </form>
   </div>;
};
