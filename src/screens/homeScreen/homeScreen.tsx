import Image from "next/image"
import arrowleft from '@/assets/icons/layoutIcons/arrow-left.svg'
export default function HomeScreen() {
    return (
        <div>
            <div className="flex flex-row items-center gap-4">
<Image src={arrowleft} alt="Arrow Left" width={24} height={24} />
<p className="text-[#808080] font-regular text-[10px]">Admin Settings</p>
<p className="text-[#000000] font-regular text-[10px]">/</p>
<p className="text-[#000000] font-bold text-[10px]">Teams</p>
            </div>
        </div>
    )
}