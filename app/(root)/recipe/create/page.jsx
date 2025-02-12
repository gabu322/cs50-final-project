'use client';

import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
   const router = useRouter();
   const [recipe, setRecipe] = useState({
      name: "",
      description: "",
      private: true,
   });
   const [categories, setCategories] = useState([]);
   const [ingredients, setIngredients] = useState([{ name: "", quantity: "", unit: "" }]);
   const [instructions, setInstructions] = useState([{ step: 1, content: "" }]);

   useEffect(() => {
      try {
         axios.get("/api/category")
            .then((response) => setCategories(response.data));
      } catch (error) {
         console.error(error);
      }
   }, []);

   const handleChange = (event) => {
      const { name, value } = event.target;
      setRecipe((prev) => ({ ...prev, [name]: value }));
   };

   const handleIngredientChange = (event, index) => {
      const { name, value } = event.target;
      const formattedName = name.slice(0, -2);
      setIngredients((prev) => {
         const newIngredients = [...prev];
         newIngredients[index] = { ...newIngredients[index], [formattedName]: value };
         return newIngredients;
      });
   };

   const handleInstructionChange = (event, index) => {
      const { value } = event.target;
      setInstructions((prev) => {
         const newInstructions = [...prev];
         newInstructions[index] = { ...newInstructions[index], content: value };
         return newInstructions;
      });
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      const fullRecipe = { ...recipe, ingredients, instructions };

      try {
         axios.post("/api/recipe", fullRecipe);

         router.push("/");
      } catch (error) {
         console.log(error)
      }
   };

   return <form className="middle-section" onSubmit={handleSubmit}>
      <h1>Create a new recipe!</h1>

      <div className="flex flex-col gap-4">
         <Input
            label="Name"
            name="name"
            onChange={handleChange}
            rounded
            required
         />

         <Input
            label="Description"
            name="description"
            onChange={handleChange}
            rounded
            required
         />

         <div className="w-full flex flex-row gap-4">
            <Select
               className="w-1/2"
               label="Visibility"
               options={[
                  { value: true, text: "Private", selected: true },
                  { value: false, text: "Public" },
               ]}
               name="private"
               onChange={handleChange}
               rounded
               required
            />

            <Select
               className="w-1/2"
               label="Category"
               name="category"
               options={[...categories.map((category) => ({ value: category.id, text: category.name }))]}
               onChange={handleChange}
               rounded
               required
            />
         </div>

         <Input
            label="Preparation time (in minutes)"
            name="prepTime"
            type="number"
            onChange={handleChange}
            rounded
            required
         />
      </div>

      <div className="flex flex-col gap-4">
         <div className="flex flex-row justify-between w-full">
            <h2>Ingredients</h2>

            <Button
               text="Add ingredient"
               onClick={() => setIngredients((prev) => [...prev, { name: "", quantity: "", unit: "" }])}
               bgColor={"bg-orange-400"}
               hoverColor={"hover:bg-orange-500"}
               rounded
            />
         </div>

         {ingredients.map((ingredient, index) => <div key={index} className="flex flex-row gap-2">
            <Input
               label="Name"
               name={`name-${index}`}
               className="w-2/5"
               onChange={(e) => handleIngredientChange(e, index)}
               rounded
               required
            />

            <Input
               label="Quantity"
               name={`quantity-${index}`}
               type="number"
               className="w-2/5"
               onChange={(e) => handleIngredientChange(e, index)}
               rounded
               required
            />

            <Select
               label="Unit"
               name={`unit-${index}`}
               className="w-1/5"
               onChange={(e) => handleIngredientChange(e, index)}
               options={[
                  { value: "g", text: "Grams" },
                  { value: "kg", text: "Kilograms" },
                  { value: "ml", text: "Milliliters" },
                  { value: "l", text: "Liters" },
                  { value: "tbsp", text: "Tablespoons" },
                  { value: "tsp", text: "Teaspoons" },
                  { value: "cup", text: "Cups" },
                  { value: "unit", text: "Units" }]}
               rounded
               required
            />

            {ingredients.length > 1 && <Button
               text="X"
               color="red"
               onClick={() => setIngredients((prev) => prev.filter((_, i) => i !== index))}
               className="w-10"
               rounded
            />}
         </div>)}
      </div>

      <div className="flex flex-col gap-4">
         <div className="flex flex-row justify-between w-full">
            <h2>Instructions</h2>

            <Button
               text="Add step"
               onClick={() => setInstructions((prev) => [...prev, { step: prev.length + 1, content: "" },])}
               bgColor={"bg-orange-400"}
               hoverColor={"hover:bg-orange-500"}
               rounded
            />
         </div>

         {instructions.map((instruction, index) => <div key={index} className="flex flex-row gap-2">
            <Input
               label={`Step ${instruction.step}`}
               name={`step-${index}`}
               className="w-full"
               onChange={(e) => handleInstructionChange(e, index)}
               rounded
               required
            />

            {instructions.length > 1 && <Button
               text="X"
               color="red"
               onClick={() => setInstructions((prev) => prev.filter((_, i) => i !== index))}
               className="w-10"
               rounded
            />}
         </div>)}
      </div>

      <Button
         text="Submit Recipe"
         type="submit"
         bgColor={"bg-orange-400"}
         hoverColor={"hover:bg-orange-500"}
         rounded
      />
   </form>;
}
