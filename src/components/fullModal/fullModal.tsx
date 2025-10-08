import { FullModalProps } from "@/types/fullModalProps";
import modalCloseX from '@/assets/icons/layoutIcons/modal-close-x.svg';
import Image from "next/image";

const FullModal: React.FC<FullModalProps> = ({ 
  isOpen, 
  onClose, 
  children,
  width = '30%',
  height = '200px'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
      <div className="relative" style={{ width, height }}>
        <button
          onClick={onClose}
          className="absolute -top-8 -right-8 cursor-pointer"
        >
       
          <Image src={modalCloseX} alt="Close" width={35} height={35} />
        </button>
        <div
          className="bg-white rounded-[20px] w-full h-full overflow-hidden"
          style={{
            boxShadow: '0px 8px 8px -4px rgba(16, 24, 40, 0.04), 0px 20px 24px -4px rgba(16, 24, 40, 0.10)'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};


export default FullModal;