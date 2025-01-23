'use client';

import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import axios from "axios";
import { useState } from "react";

export default function Page() {
   const [recipe, setRecipe] = useState({
      name: "",
      description: "",
      private: true,
   });
   const [ingredients, setIngredients] = useState([{ name: "", quantity: "", unit: "" }]);
   const [instructions, setInstructions] = useState([{ step: 1, content: "" }]);

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
      console.log(fullRecipe);
      axios.post("/api/recipe", fullRecipe);
   };

   return <form className="middle-section" onSubmit={handleSubmit}>
      <h1>Create a new recipe!</h1>

      <div className="flex flex-col gap-4">
         <Input
            label="Name"
            name="name"
            onChange={handleChange}
            required
         />
         <Input
            label="Description"
            name="description"
            onChange={handleChange}
            required
         />

         <div className="w-full flex flex-row gap-4">
            <h4>Visibility:</h4>
            <Button
               text={recipe.private ? "Private" : "Public"}
               color={recipe.private ? "gray" : "green"}
               onClick={() => setRecipe((prev) => ({ ...prev, private: !prev.private }))}
            />
         </div>
      </div>

      <div className="flex flex-col gap-4">
         <div className="flex flex-row justify-between w-full">
            <h2>Ingredients</h2>
            <Button
               text="Add ingredient"
               onClick={() => setIngredients((prev) => [...prev, { name: "", quantity: "", unit: "" }])}
            />
         </div>
         {ingredients.map((ingredient, index) => <div key={index} className="flex flex-row gap-2">
            <Input
               label="Name"
               name={`name-${index}`}
               className="w-2/5"
               onChange={(e) => handleIngredientChange(e, index)}
               required
            />

            <Input
               label="Quantity"
               name={`quantity-${index}`}
               className="w-2/5"
               onChange={(e) => handleIngredientChange(e, index)}
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
               required
            />
            {ingredients.length > 1 && <Button
               text="X"
               color="red"
               onClick={() => setIngredients((prev) => prev.filter((_, i) => i !== index))}
               square
            />}
         </div>)}
      </div>

      <div className="flex flex-col gap-4">
         <div className="flex flex-row justify-between w-full">
            <h2>Instructions</h2>
            <Button
               text="Add step"
               onClick={() => setInstructions((prev) => [...prev, { step: prev.length + 1, content: "" },])}
            />
         </div>
         {instructions.map((instruction, index) => <div key={index} className="flex flex-row gap-2">
            <Input
               label={`Step ${instruction.step}`}
               name={`step-${index}`}
               className="w-full"
               onChange={(e) => handleInstructionChange(e, index)}
               required
            />

            {instructions.length > 1 && <Button
               text="X"
               color="red"
               onClick={() => setInstructions((prev) => prev.filter((_, i) => i !== index))}
            />}
         </div>)}
      </div>
      <Button
         text="Console"
         onClick={() => console.log({ recipe, ingredients, instructions })}
      />
      <Button text="Submit Recipe" type="submit" />
   </form>;
}
