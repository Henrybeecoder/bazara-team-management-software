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
import CreateTeamModal from "@/components/teammodal/teammodal"

import { Team } from "@/types/teamTable"

interface DropdownOption {
  value: string
  label: string
}

export default function HomeScreen() {
    const [selectedEntity, setSelectedEntity] = useState<string>("")
    const [selectedTeam, setSelectedTeam] = useState<string>("")
    const [search, setSearch] = useState<string>("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

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

    const handleSaveTeam = (teamData: Omit<Team, 'created'>) => {
        console.log('Team saved:', teamData)
        setIsModalOpen(false)
        setIsEditing(false)
    }

    const handleCreateTeam = () => {
        setIsEditing(false)
        setIsModalOpen(true)
    }

    return (
        <div>
            <CreateTeamModal 
                isOpen={isModalOpen} 
                onClose={() => {
                    setIsModalOpen(false)
                    setIsEditing(false)
                }} 
                onSave={handleSaveTeam}
                isEditing={isEditing}
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

                <div className="flex lg:flex-row flex-col lg:justify-between my-4 items-center ">
                    <div className="flex lg:flex-row flex-col gap-3 items-center lg:w-[60%] w-full">
                        <div className="lg:w-[600px] w-full">
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by team name or code"
                                icon={<Search size={18} color='#808080' />}
                                height="40px"
                            />
                        </div>
                        <div className="lg:w-[50%] w-full">
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
                        </div>
                        <div className="lg:w-[30%] w-full">
                            <Dropdown
                                options={teamOptions}
                                value={selectedTeam}
                                onChange={setSelectedTeam}
                                placeholder="More Filters"
                                bgColor="transparent"
                                borderColor="#299CCA"
                                borderRadius="8px"
                                chevronColor="#299CCA"
                                height="30px"
                            />
                        </div>
                    </div>
                    <div>
                        <Button 
                            variant="primary" 
                            icon={<Plus/>} 
                            className="lg:mt-0 mt-4"   
                            onClick={handleCreateTeam}
                        >
                            Create New Team
                        </Button>
                    </div>
                </div>
                <TeamsTable />
            </div>
        </div>
    )
}