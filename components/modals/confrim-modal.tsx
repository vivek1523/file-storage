import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle, 
   AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface ConfrimModalProps {
    children: React.ReactNode;
    onConfrim: ()=> void;
}

export const ConfrimModal = ({
    children,
    onConfrim
}: ConfrimModalProps) => {

    const handleConfrim = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        onConfrim();
    }; 

    return (
        <AlertDialog>
          <AlertDialogTrigger
          onClick={(e)=> e.stopPropagation()}
          asChild 
          > 
          {children}
          </AlertDialogTrigger>
          <AlertDialogContent>
             <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be Undone.
                </AlertDialogDescription>
             </AlertDialogHeader> 

             <AlertDialogFooter>
                <AlertDialogCancel onClick={e => e.stopPropagation()}>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleConfrim}>
                    Confrim
                </AlertDialogAction>
             </AlertDialogFooter>  
          </AlertDialogContent>
        </AlertDialog>
    )
}