"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link"; 

const Error = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center
         space-y-4 dark:bg-[#1F1F1F] ">
           <Image
           src="/Notion-Error-Light.png"
           height={"300"}
           width={"300"}
           alt="Error"
           className="dark:hidden" 
           />

           <Image
           src="/Notion-Error-Dark-Mode-Exact-removebg-preview.png"
           height={"300"}
           width={"300"}
           alt="Error"
           className="hidden dark:block" 
           />

           <h2 className="text-xl font-medium">
             Something went Wrong!
           </h2>

           <Button asChild>
             <Link href="/documents" >
              Go Back
             </Link>
           </Button>
        </div>
    )
}


export default Error;