import Image from "next/image"

export const Heros = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
      <div className="flex items-center">
        <div className="relative w-[200px] h-[200px] sm:w-[350px] sm:h-[350px]
        md:w-[400px] md:h-[400px] pl-10 ">
         <Image
          src="/documents-light-mode.png"
          fill
          className="object-contain dark:hidden" 
          alt="Document" 
         />
         <Image
          src="/documents-dark-mode-removebg.png"
          fill
          className="object-contain hidden dark:block" 
          alt="Document" 
         />
        </div>
        <div className="relative h-[400px] w-[400px] hidden md:block">
          <Image
            src="/Reading-notion-light-mode.png"
            fill
            className="object-contain dark:hidden"
            alt="Reading" 
          />
         <Image
            src="/Reading-notion-dark-mode-removebg.png"
            fill
            className="object-contain hidden dark:block"
            alt="Reading" 
          />
        </div>
      </div>  
    </div>
  )
}
 