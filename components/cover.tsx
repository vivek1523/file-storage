"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-Cover";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "@/components/ui/skeleton";

interface coverImageProps {
    url?: string;
    preview?: boolean;
}

export const Cover = ({
    url,
    preview
} : coverImageProps) => {

    const coverImage = useCoverImage();
    const params = useParams();
    const removeCover = useMutation(api.documents.removeCoverImage); 

    const { edgestore } = useEdgeStore();

    const onRemove = async() =>{
        if(url){
           await edgestore.publicFiles.delete({
                url: url
            })
        }
        removeCover({
            id: params.documentsId as Id<"documents">  
        });
    };

    return(
        <div className={cn("relative w-full h-[40vh] group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )} >
            {!!url && (
               <Image
               src={url} 
               fill
               alt="Cover"
               className="object-cover"
               />  
            )} 

            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute
                bottom-5 right-5 flex items-center gap-x-2">
                   <Button
                   onClick={()=> coverImage.onReplace(url) }
                   className="text-muted-foreground text-xs"
                   variant={"outline"}
                   size={"sm"}
                   >
                     <ImageIcon className="h-4 w-4 mr-2"/>
                     Change Cover
                   </Button>

                   <Button
                   onClick={onRemove}
                   className="text-muted-foreground text-xs"
                   variant={"outline"}
                   size={"sm"}
                   >
                     <X className="h-4 w-4 mr-2"/>
                     Remove
                   </Button> 
                </div>
            )}
        </div>
    )
}

Cover.Skeleton = function CoverSkeleton() {
    return (
        <Skeleton className="w-full h-[12vh]"/> 
    )
}