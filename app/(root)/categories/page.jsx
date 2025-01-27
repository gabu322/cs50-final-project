'use client';

import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Page() {
   const router = useRouter();
   const [category, setCategory] = useState();

   const handleChange = (event) => {
      const { name, value } = event.target;
      setCategory((prev) => ({ ...prev, [name]: value }));
   }

   const handleSubmit = (event) => {
      event.preventDefault();
      try {
         axios.post("/api/category", category);

         router.push("/");
      } catch (error) {
         console.error(error);
      }
      console.log(category);
   }

   return <form className="middle-section" onSubmit={handleSubmit}>
      <h1>Create a new category!</h1>

      <div className="flex flex-col gap-4">
         <Input
            label="Category"
            name="category"
            onChange={handleChange}
            rounded
            required
         />
      </div>

      <Button
         text="Create"
         type="submit"
         bgColor={"bg-orange-400"}
         hoverColor={"hover:bg-orange-500"}
         rounded
      />
   </form>
}
