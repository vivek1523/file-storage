"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-Cover";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModal = () => {
    const [file, setFile] = useState<File>();
    const [isSubmit, setIsSubmit] = useState(false);

    const coverImage = useCoverImage();
    const { edgestore } = useEdgeStore();
    const update = useMutation(api.documents.Update);
    const params = useParams();

    const onClose = () => {
        setFile(undefined);
        setIsSubmit(false);
        coverImage.onClose();
    }

    const onChange = async (file?: File) => {
        if(file){
            setIsSubmit(true);
            setFile(file);

            let res; 

            if(coverImage.url){
                res = await edgestore.publicFiles.upload({
                 file,
                 options:{
                  replaceTargetUrl: coverImage.url,
                 }
                })
            }else{
                res = await edgestore.publicFiles.upload({
                    file
                })
            } 

            await update({
                id: params.documentsId as Id<"documents">,
                coverImage: res.url
            });

            onClose();
        }
    }

    return(
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
          <DialogContent>
            <DialogHeader>
               <h2 className="text-center text-lg font-semibold">
                 Cover Image
               </h2> 
            </DialogHeader>
            <div>
               <SingleImageDropzone
               className="w-full outline-none"
               disabled={isSubmit}
               value={file}
               onChange={onChange}
               />  
            </div>
          </DialogContent>
        </Dialog>
    );
}