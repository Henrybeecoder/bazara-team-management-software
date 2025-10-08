import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'react-feather';
import { useState } from 'react';
import modalCancel from '@/assets/icons/layoutIcons/modal-cancel.svg';
import Image from 'next/image';
import Button from '../button/button';
import { entityOptions, managerOptions } from '@/utils/data';

// Shared Input Component
const Input = ({ 
  value, 
  onChange, 
  icon, 
  height = '40px', 
  borderColor = '#EBEBEB', 
  backgroundColor = 'transparent', 
  width = '100%', 
  placeholder = '', 
  type = 'text', 
  disabled = false,
  showCheckbox = false,
  isValid = false
}) => {
  return (
    <div className="relative inline-flex items-center" style={{ width, height }}>
      {icon && (
        <div className="absolute left-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full h-full px-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500"
        style={{
          borderRadius: '8px',
          border: `1px solid ${borderColor}`,
          backgroundColor,
          paddingLeft: icon ? '2.5rem' : '0.75rem',
          paddingRight: showCheckbox ? '2.5rem' : '0.75rem',
        }}
      />
      {showCheckbox && (
        <div 
          className="absolute right-3 flex items-center justify-center w-5 h-5 rounded-full"
          style={{
            backgroundColor: isValid ? '#10B981' : '#C4C5C7',
          }}
        >
          <Check size={14} color="white" />
        </div>
      )}
    </div>
  );
};

// Shared Dropdown Component
const Dropdown = ({ 
  label,
  options, 
  value, 
  onChange, 
  placeholder = 'Select an option',
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-10 bg-white border border-[#EBEBEB] rounded-lg px-3 py-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`w-5 h-5 transition-transform text-gray-500 ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-[#EBEBEB] rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  option.value === value ? 'bg-blue-50' : ''
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// TextArea Component
const TextArea = ({ 
  value, 
  onChange, 
  placeholder = '', 
  label,
  required = false
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full px-3 py-2 text-sm border border-[#EBEBEB] rounded-lg outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 resize-none"
      />
    </div>
  );
};

// Main Component with Modal
// Export the modal as a separate component
export function CreateTeamModal({ isOpen, onClose }) {
  const [selectedEntity, setSelectedEntity] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [description, setDescription] = useState('');
  const [teamEmail, setTeamEmail] = useState('');
  const [teamManager, setTeamManager] = useState('');

 

  const isTeamNameValid = teamName.length >= 3;
  const isTeamCodeValid = teamCode.length >= 3 && teamCode.length <= 5;

  const handleCreate = () => {
    // Handle form submission
    console.log({
      selectedEntity,
      teamName,
      teamCode,
      description,
      teamEmail,
      teamManager,
    });
    onClose();
  };

  return (
    <>
      {/* Modal Overlay and Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 bg-opacity-50 z-40"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-screen bg-white shadow-2xl z-50 overflow-y-auto w-full md:w-[30%]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#EBEBEB] py-4 px-6">
                <h2 className="text-[#333333] font-medium text-[14px]">New Team</h2>
                <button
                  onClick={onClose}
                  className="cursor-pointer"
                >
                    <Image src={modalCancel} alt="Cancel Icon" width={20} height={20} />
               
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6 space-y-6">
                {/* Entity Dropdown */}
                <Dropdown
                  label="Entity"
                  options={entityOptions}
                  value={selectedEntity}
                  onChange={setSelectedEntity}
                  placeholder="Select Entity"
                  required
                />

                {/* Team Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                    height="40px"
                    showCheckbox
                    isValid={isTeamNameValid}
                  />
                </div>

                {/* Team Code Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code <span className="text-red-500">*</span>
                  </label>
                  <Input
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

                {/* Description TextArea */}
                <TextArea
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter the description of this Team"
                  required
                />

                {/* Team Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Email Address
                  </label>
                  <Input
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

                {/* Team Manager Dropdown */}
                <Dropdown
                  label="Team Manager"
                  options={managerOptions}
                  value={teamManager}
                  onChange={setTeamManager}
                  placeholder="Select Team Manager"
                  required
                />
              </div>

              {/* Footer Buttons */}
              <div className="border-t border-[#EBEBEB] p-6">
                <div className="flex flex-col md:flex-row gap-3 md:justify-between">
                    <Button variant="secondary" onClick={onClose} className='w-[50%]'> Close</Button>
                  <Button variant="primary" onClick={handleCreate} className='w-[50%]'> Create</Button>
               
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

