"use client"
import { ConfrimModal } from "@/components/modals/confrim-modal"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

  

interface BannerProps {
    documentId: Id<"documents"> 
}

export const Banner = ({
    documentId
}: BannerProps) => {

   const router = useRouter();
   const remove = useMutation(api.documents.Remove);
   const restore = useMutation(api.documents.Restore);

   const onRemove = () => {
    const promise = remove({ id:documentId })
     
    
    toast.promise(promise, {
        loading: "Deleting note...",
        success: "Note Deleted!",
        error: "Failed to Delete note."
    });
 
    router.push("/documents");
   }

   const onRestore = () => {
    const promise = restore({ id:documentId });
    
    toast.promise(promise, {
        loading: "Restoring note...",
        success: "Note Restored!",
        error: "Failed to Restore note."
    })
   }

  return ( 
    <div className="w-full bg-red-500 text-center text-sm p-2
    text-white flex items-center gap-x-2 justify-center">
        <p>
        This Page is Moved to Trash Can
        </p> 
        <Button
        size="sm"
        onClick={onRestore}
        variant={"outline"}
        className="border-white bg-transparent hover:bg-primary/5 
        text-white hover:text-white p-1 px-2 h-auto font-normal" 
        >
            Restore Page
        </Button>
        <ConfrimModal onConfrim={onRemove}>
        <Button
        size="sm" 
        variant={"outline"}
        className="border-white bg-transparent hover:bg-primary/5 
        text-white hover:text-white p-1 px-2 h-auto font-normal" 
        >
            Delete Page
        </Button>
        </ConfrimModal> 
    </div>
  )
}
 