import { Navbar } from "./_components/navbar";

const MarketingLayout = ({
    children
}: {
    children: React.ReactNode;
}) =>{
    return(
        <div className="h-100px dark:bg-[#1F1F1F]">
           <Navbar/> 
          <main className="h-full pt-28">
            {children}
          </main>
        </div>
    )
}

export default MarketingLayout;