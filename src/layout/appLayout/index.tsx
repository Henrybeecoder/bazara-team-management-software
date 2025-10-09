import Header from "@/components/header/header";
import { ReactNode } from "react";
import homeIcon from '@/assets/icons/layoutIcons/home-2.svg'
import closeXIcon from '@/assets/icons/layoutIcons/close-circle.svg'
import Image from "next/image";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <Header />
      <div className="bg-[#1659E6] h-[5vh] flex items-center gap-3  px-6"> 
 <Image src={homeIcon} alt="Home Icon" width={24} height={24} />
 <div className="bg-[#F9FAFB] rounded-t-[8px] h-[95%] flex items-center gap-8 justify-center px-5">
  <p className="text-[12px]">Admin Settings</p>
   <Image src={closeXIcon} alt="Home Icon" width={15} height={15} className="cursor-pointer" />
 </div>

      </div>
      <div className="bg-[#F9FAFB] min-h-[70vh] lg:px-6 px-4 py-6">
 {children}
      </div>
     
    </div>
  );
}