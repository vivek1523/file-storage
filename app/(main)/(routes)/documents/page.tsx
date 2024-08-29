"use client" 

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react'
import { PlusCircle } from 'lucide-react';
import Image from 'next/image'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const DocumentsPage = () => {

   const { user } = useUser();
   const router = useRouter();

   const Create = useMutation(api.documents.Create);

   const onCreate = () => {
    const promise = Create({ title: "Untitled" }) 
    .then((documentId) => router.push(`/documents/${documentId}`))

    toast.promise(promise, {
      loading: "Creating a new note....",
      success: "New note Created!",
      error: "Failed to Create a new note."
    });
   }

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
       <Image
       src="/Notion-empty-lightmode.png"
       height="300"
       width="300"
       alt='Empty'
       className='dark:hidden'    
       />

       <Image
       src="/Notion-empty-darkmodes.png"
       height="300"
       width="300"
       alt='Empty'
       className='hidden dark:block'    
       />  

       <h2 className='text-lg font-medium'>
        Welcome to {user?.firstName}&apos;s Notion
       </h2>
       <Button onClick={onCreate}>
         <PlusCircle className='h-4 w-4 mr-2'/>
         Create a note
       </Button>
    </div>
  )
}

export default DocumentsPage