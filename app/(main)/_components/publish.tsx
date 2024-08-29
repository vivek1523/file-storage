"use client";

import { Doc } from "@/convex/_generated/dataModel";
import {
    PopoverTrigger,
    Popover,
    PopoverContent
} from "@/components/ui/popover"
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";

interface PublishProps {
    initialData : Doc<"documents">
}; 

export const Publish = ({
    initialData 
} : PublishProps) => {

    const origin = useOrigin();
    const update = useMutation(api.documents.Update);

    const [copy, setCopy] = useState(false);
    const [submit, setSubmit] = useState(false);

    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setSubmit(true);

        const promise  = update({
            id: initialData._id,
            isPublished: true,
        }).finally(() => setSubmit(false));

        toast.promise(promise, {
            loading: "Publishing...",
            success: "Note Published Successfully",
            error: "Faild to Publish Note",
        });
    };

    const onUnPublish = () => {
        setSubmit(true);

        const promise  = update({
            id: initialData._id,
            isPublished: false,
        }).finally(() => setSubmit(false));

        toast.promise(promise, {
            loading: "Unpublishing...",
            success: "Note Unpublished Successfully",
            error: "Faild to Unpublish Note",
        });
    };

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopy(true);

        setTimeout(()=>{
          setCopy(false);
        },1000)
    }

    return(
        <Popover>
            <PopoverTrigger asChild>
              <Button>
                 Publish
                 {initialData.isPublished && (
                    <Globe
                    className="text-sky-500 w-4 h-4 ml-2"
                    />
                 )}
              </Button>
            </PopoverTrigger>

            <PopoverContent 
            className="w-72"
            align="end"
            alignOffset={8}
            forceMount
            >
               {initialData.isPublished ? (
                <div className="space-y-4">
                   <div className="flex items-center gap-x-2">
                     <Globe
                     className="text-sky-500 animate-pulse h-4 w-4"
                     />
                     <p className= "text-xs font-medium text-sky-500">
                        This Note is live on Web.
                     </p> 
                     </div>
                     <div className="flex items-center">
                       <input
                       value={url}
                       className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted-truncate"
                       disabled
                       />

                       <Button
                       onClick={onCopy}
                       disabled={copy}
                       className="h-8 rounded-l-none"
                       >
                        {copy ? (
                            <Check className="h-4 w-4"/>
                        ) : (
                            <Copy className="h-4 w-4"/>
                        )} 
                       </Button>  
                     
                   </div>
                   <Button
                     size={"sm"}
                     className="w-full text-xs"
                     disabled={submit}
                     onClick={onUnPublish}
                     >
                       Unpublish
                     </Button>
                </div>
               ) : (
                <div className="flex flex-col items-center justify-center">
                  <Globe
                  className="h-8 w-8 text-muted-foreground mb-2"/>

                  <p className="text-sm font-medium mb-2">
                    Publish this Note
                  </p>

                  <span className="text-xs text-muted-foreground mb-4">
                    Share the Note with your Friends. 
                  </span> 

                  <Button
                  disabled={submit}
                  onClick={onPublish}
                  className="w-full text-xs"
                  size={"sm"}
                  >
                    Publish
                  </Button>
                </div>
               )}
            </PopoverContent>
        </Popover> 
    )
}