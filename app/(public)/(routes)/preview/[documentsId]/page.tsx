"use client"

import "../../../../../components/styles.css" 
import { Cover } from "@/components/cover" 
import { Toolbar } from "@/components/toolbar"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import dynamic from "next/dynamic"
import { useMemo } from "react"


 interface DocumentIdPageProps {
   params: {
    documentsId: Id<"documents">
   } 
 }

const DocumentIdPage = ({
  params
} : DocumentIdPageProps) => {
 
  const Editor = useMemo(() => dynamic(()=> import("@/components/editor"),
{ ssr: false }),[]);

   const update = useMutation(api.documents.Update);

  const onChange = (content: string) => {
    update({
      id: params.documentsId,
      content
    });
  };

  const document = useQuery(api.documents.getById, {
    documentsId: params.documentsId
  });
  
  if(document === undefined) {
    return(
        <div>
          <Cover.Skeleton/>
          <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
            <div className="space-y-4 pl-8 pt-4">
              <Skeleton className="h-14 w-[50%]"/>
              <Skeleton className="h-4 w-[80%]"/>
              <Skeleton className="h-4 w-[40%]"/>
              <Skeleton className="h-4 w-[60%]"/> 
            </div>
          </div>
        </div>
    )
  }

  if(document === null) {
    return(
        <div>
          Not Found
        </div>
    ) 
  }
  return (
    <div className="pb-40">

      <Cover preview url={document.coverImage}/>  

      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar preview initialData={document} /> 
         
        <Editor
        editable={false}
        onChange={onChange} 
        initialContent={document.content}
        data-theming-css-variables-demo  
        />
        
        
      </div>
    </div>
  )
}

export default DocumentIdPage