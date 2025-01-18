'use client';

import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
   const { data: session } = useSession();

   // useEffect(() => {
   //    console.log(session)
   // }, [session]);
   return <div className="w-3/4 mx-auto mt-10 flex flex-col gap-8 ">
      <h1 className="text-4xl font-bold">Welcome {session?.user.name || session?.user.email.split("@")[0]}!</h1>

      <h4>Here you can see your saved recipies or the ones shared by the comunity!</h4>

      <div className="flex flex-row gap-4">
         <div className="flex flex-row justify-between w-full">
            <h2 className="text-2xl font-bold">Your recipies</h2>
            <Button
               text={"Create new recipe"}
               href={"/create"}
            />
         </div>

      </div>
   </div>
}
