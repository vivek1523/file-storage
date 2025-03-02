const PublishLayout = ({
    children
} : {
    children : React.ReactNode;
}) => {
   return (
    <div className="h-auto dark:bg-[#1F1F1F] ">
      {children}
    </div>
   );
}

export default PublishLayout