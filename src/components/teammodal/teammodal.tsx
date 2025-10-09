
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import Button from '../button/button';

import TeamModalInput from './input';
import TeamModalDropdown from './dropdown';
import TextArea from './textarea';
import { Team } from '@/types/teamTable';

import { entityOptions, managerOptions } from '@/utils/data';
import modalCancel from '@/assets/icons/layoutIcons/modal-cancel.svg';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team?: Team | null;
  onSave: (team: Omit<Team, 'created'>) => void;
  isEditing: boolean;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  isOpen,
  onClose,
  team,
  onSave,
  isEditing
}) => {
  const [selectedEntity, setSelectedEntity] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [description, setDescription] = useState('');
  const [teamEmail, setTeamEmail] = useState('');
  const [teamManager, setTeamManager] = useState('');
  const [status, setStatus] = useState<string>('Active');

  useEffect(() => {
    if (team && isEditing) {
      setSelectedEntity(team.entity);
      setTeamName(team.name);
      setTeamCode(team.code);
      setDescription(team.desc);
      setTeamEmail(team.email);
      setTeamManager(team.manager);
      setStatus(team.status);
    } else {
      setSelectedEntity('');
      setTeamName('');
      setTeamCode('');
      setDescription('');
      setTeamEmail('');
      setTeamManager('');
      setStatus('Active');
    }
  }, [team, isEditing, isOpen]);

  const isTeamNameValid = teamName.length >= 3;
  const isTeamCodeValid = teamCode.length >= 3 && teamCode.length <= 5;

  const handleCreate = () => {
    const teamData: Omit<Team, 'created'> = {
      name: teamName,
      code: teamCode,
      desc: description,
      email: teamEmail,
      entity: selectedEntity,
      manager: teamManager,
      status: status
    };
    onSave(teamData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-screen bg-white shadow-2xl z-50 overflow-y-auto w-full md:w-[30%]"
          >
            <div className="flex items-center justify-between border-b border-[#EBEBEB] py-4 px-6">
              <h2 className="text-[#333333] font-medium text-[14px]">
                {isEditing ? 'Edit Team' : 'New Team'}
              </h2>
              <button onClick={onClose} className="cursor-pointer">
                <Image src={modalCancel} alt="Cancel Icon" width={20} height={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <TeamModalDropdown
                label="Entity"
                options={entityOptions}
                value={selectedEntity}
                onChange={setSelectedEntity}
                placeholder="Select Entity"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Name <span className="text-red-500">*</span>
                </label>
                <TeamModalInput
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                  height="40px"
                  showCheckbox
                  isValid={isTeamNameValid}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code <span className="text-red-500">*</span>
                </label>
                <TeamModalInput
                  value={teamCode}
                  onChange={(e) => setTeamCode(e.target.value)}
                  placeholder="Enter team code here"
                  height="40px"
                  showCheckbox
                  isValid={isTeamCodeValid}
                />
                <p className="mt-1 text-[#A3A3A3] font-normal text-[14px]">
                  Min.: 3 and Max.: 5 characters
                </p>
              </div>

              <TextArea
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter the description of this Team"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Email Address
                </label>
                <TeamModalInput
                  value={teamEmail}
                  onChange={(e) => setTeamEmail(e.target.value)}
                  placeholder="Enter team email address here"
                  height="40px"
                  type="email"
                />
                <p className="mt-1 text-[#A3A3A3] font-normal text-[14px]">
                  Everyone in this Team receives an email whenever a message is sent to this email address.
                </p>
              </div>

              <TeamModalDropdown
                label="Team Manager"
                options={managerOptions}
                value={teamManager}
                onChange={setTeamManager}
                placeholder="Select Team Manager"
                required
              />

              {isEditing && (
                <TeamModalDropdown
                  label="Status"
                  options={[
                    { value: 'Active', label: 'Active' },
                    { value: 'Deactivated', label: 'Deactivated' }
                  ]}
                  value={status}
                  onChange={(value) => setStatus(value as 'Active' | 'Deactivated')}
                  placeholder="Select Status"
                  required
                />
              )}
            </div>

            <div className="border-t border-[#EBEBEB] p-6">
              <div className="flex flex-row gap-3 md:justify-between">
                <Button variant="secondary" onClick={onClose} className='w-[50%]'>
                  Close
                </Button>
                <Button variant="primary" onClick={handleCreate} className='w-[50%]'>
                  {isEditing ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateTeamModal;