'use client'
import Image from "next/image"
import { useState } from "react"
import arrowleft from '@/assets/icons/layoutIcons/arrow-left.svg'
import Dropdown from "@/components/dropdown/dropdown"
import { Search } from "react-feather"
import Input from "@/components/input/input"
import Button from "@/components/button/button"
import { Plus } from "react-feather"
import TeamsTable from "./teamTable"
import { CreateTeamModal } from "@/components/teammodal/teammodal"

interface DropdownOption {
  value: string
  label: string
}

export default function HomeScreen() {
    const [selectedEntity, setSelectedEntity] = useState<string>("")
    const [selectedTeam, setSelectedTeam] = useState<string>("")
    const [search, setSearch] = useState<string>("")
    const [isModalOpen, setIsModalOpen] = useState(false);

    const entityOptions: DropdownOption[] = [
        { value: "access-bank-ng", label: "Access Bank Nigeria" },
        { value: "access-bank-gh", label: "Access Bank Ghana" },
        { value: "access-bank-rw", label: "Access Bank Rwanda" },
        { value: "access-bank-za", label: "Access Bank South Africa" },
    ]

    const teamOptions: DropdownOption[] = [
        { value: "engineering", label: "Engineering" },
        { value: "product", label: "Product" },
        { value: "design", label: "Design" },
        { value: "marketing", label: "Marketing" },
        { value: "sales", label: "Sales" },
        { value: "operations", label: "Operations" },
    ]

    return (
        <div>
            <CreateTeamModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                  />
            <div className="flex flex-row items-center gap-2">
                <Image src={arrowleft} alt="Arrow Left" width={11} height={11} />
                <p className="text-[#808080] font-regular text-[10px]">Admin Settings</p>
                <p className="text-[#000000] font-regular text-[10px]">/</p>
                <p className="text-[#000000] font-bold text-[10px]">Teams</p>
            </div>
            
            <div className="bg-[#FFFFFF] rounded-[8px] mt-4 p-3">
                <div className="border-[#EBEBEB] border-b py-5">
                    <p className="text-[#333333] font-bold text-[16px]">Teams</p>
                </div>

                <div className="flex lg:flex-row flex-col lg:justify-between mt-4 items-center">
                    <div className="flex lg:flex-row flex-col gap-3 items-center w-[60%]">
                      
            <Input
              value={search}
              onChange={() => setSearch(search)}
              placeholder="Search by team name or code"
              icon={<Search size={18} color='#808080' />}
              height="40px"
             width="w-[70%]"
            />
        
                        <Dropdown
                            
                            options={entityOptions}
                            value={selectedEntity}
                            onChange={setSelectedEntity}
                            placeholder="Select Entity"
                            bgColor="transparent"
                            borderColor="#299CCA"
                            borderRadius="8px"
                            chevronColor="#299CCA"
                            height="30px"
                          
                        />
                        <Dropdown
                         
                            options={teamOptions}
                            value={selectedTeam}
                            onChange={setSelectedTeam}
                            placeholder="Select Team"
                            bgColor="transparent"
                            borderColor="#299CCA"
                            borderRadius="8px"
                            chevronColor="#299CCA"
                            height="30px"
                        
                        />
                    </div>
                    <div>
                       
                              <Button variant="primary" icon={<Plus/>}    onClick={() => setIsModalOpen(true)} >
        Create New Team
      </Button>

     
                    </div>
                </div>
                <TeamsTable />
            </div>
        </div>
    )
}