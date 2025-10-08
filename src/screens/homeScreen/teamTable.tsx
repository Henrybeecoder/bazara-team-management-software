import React, { useState, useEffect } from 'react';
import { MoreVertical, X, Trash2, CheckCircle } from 'react-feather';
import Button from '@/components/button/button';
import FullModal from '@/components/fullModal/fullModal';
import SharedTable from '@/components/table/table';
import { Team, ActionPopupState, Column } from '@/types/teamTable';
import deleteModalIcon from '@/assets/icons/layoutIcons/delete-modal-icon.svg';
import successGif from '@/assets/icons/layoutIcons/success.gif';
import Image from 'next/image';







const TeamsTable: React.FC = () => {
  const teams: Team[] = [
    { name: 'IT Support', code: 'ADM', desc: 'Manages system settings, user roles, and platform c...', email: 'admin@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Henry Omofonmwan', created: '24/01/2024', status: 'Active' },
    { name: 'Change Management Team', code: 'ADD', desc: 'Handles all change requests and implementations...', email: 'change@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Sarah Williams', created: '15/02/2024', status: 'Active' },
    { name: 'Incident Manager', code: 'GGA', desc: 'Responds to and resolves system incidents...', email: 'incident@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'John Davidson', created: '10/03/2024', status: 'Deactivated' },
    { name: 'Service Request Manager', code: 'SRM', desc: 'Manages service requests and fulfillment...', email: 'service@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Mary Johnson', created: '05/04/2024', status: 'Active' },
    { name: 'Problem Manager', code: 'PRM', desc: 'Identifies and resolves root causes of problems...', email: 'problem@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'David Brown', created: '20/04/2024', status: 'Active' },
  ];

  const [actionPopup, setActionPopup] = useState<ActionPopupState>({
    show: false,
    x: 0,
    y: 0,
    teamId: null
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (actionPopup.show) {
        setActionPopup({ show: false, x: 0, y: 0, teamId: null });
      }
    };

    if (actionPopup.show) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [actionPopup.show]);

  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>, teamId: number): void => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setActionPopup({
      show: true,
      x: rect.left - 120,
      y: rect.bottom + 5,
      teamId
    });
  };

  const handleEditTeam = (teamId: number) => {
    console.log('Edit team:', teams[teamId].name);
    alert(`Edit Team: ${teams[teamId].name}`);
    setActionPopup({ show: false, x: 0, y: 0, teamId: null });
  };

  const handleDeleteClick = (teamId: number) => {
    setSelectedTeamId(teamId);
    setDeleteModalOpen(true);
    setActionPopup({ show: false, x: 0, y: 0, teamId: null });
  };

  const handleConfirmDelete = () => {
    setDeleteModalOpen(false);
    setSuccessModalOpen(true);
  };

  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
    setSelectedTeamId(null);
  };

  const columns: Column<Team>[] = [
    { header: 'Team Name', key: 'name' },
    { header: 'Code', key: 'code' },
    { header: 'Description', key: 'desc' },
    { header: 'Team Email', key: 'email' },
    { header: 'Entity', key: 'entity' },
    {
      header: 'Manager',
      render: (row: Team) => (
        <div className="flex items-center gap-2">
          <span className="bg-[#1659E6] text-white px-3 py-1 rounded-full text-xs font-medium">
            {row.manager.split(' ').map(n => n[0]).join('')}
          </span>
          <span>{row.manager}</span>
        </div>
      )
    },
    { header: 'Created On', key: 'created' },
    {
      header: 'Status',
      render: (row: Team) => (
        <span
          className={`px-3 py-1 text-xs font-medium ${
            row.status === 'Active'
              ? 'bg-[#D3FAD2] text-[#1C9C1B]'
              : 'bg-[#FDDEDE] text-[#D40C0C]'
          }`}
          style={{ borderRadius: '4px' }}
        >
          {row.status}
        </span>
      )
    },
    {
      header: '',
      render: (row: Team, index: number) => (
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleActionClick(e, index)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <MoreVertical className="w-5 h-5 text-[#333333]" />
        </button>
      )
    }
  ];

  return (
    <div className="min-h-screen">
      <SharedTable<Team> columns={columns} data={teams} />

      {/* Action Popup */}
      {actionPopup.show && actionPopup.teamId !== null && (
        <div
          className="fixed bg-white rounded-xl z-50"
          style={{
            left: `${actionPopup.x}px`,
            top: `${actionPopup.y}px`,
            width: '160px',
            height: '90px',
            boxShadow: '0px 8px 8px -4px rgba(16, 24, 40, 0.04), 0px 20px 24px -4px rgba(16, 24, 40, 0.10)',
            borderRadius: '12px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col">
            <button
              onClick={() => handleEditTeam(actionPopup.teamId!)}
              className="px-4 py-4 text-left text-[#333333] text-sm font-normal hover:bg-gray-50 cursor-pointer"
            >
              Edit Team
            </button>
            <button
              onClick={() => handleDeleteClick(actionPopup.teamId!)}
              className="px-4 py-2 text-left text-[#E43A39] text-sm font-normal hover:bg-gray-50 cursor-pointer"
            >
              Delete Team
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <FullModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        width="28%"
        height="270px"
      >
        <div className="flex flex-col items-center justify-center h-full px-6 py-4">
         <Image src={deleteModalIcon} alt="Delete Icon" width={64} height={64} className="mb-4" />
          <h2 className="text-[#333333] text-base font-bold mb-4">Delete Team</h2>
          <p className="text-[#333333] text-sm font-normal text-center mb-8">
            Are you sure you want to deactivate this team?
          </p>
          <div className="flex gap-3 w-full justify-center">
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)} className='w-50'>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete} className='w-50'>
              Delete
            </Button>
          </div>
        </div>
      </FullModal>

      {/* Success Modal */}
      <FullModal
        isOpen={successModalOpen}
        onClose={handleSuccessClose}
        width="28%"
        height="300px"
      >
        <div className="flex flex-col items-center justify-center h-full px-6">
         
          <Image src={successGif} alt="Success" width={100} height={100} className="mb-4" />
          <h2 className="text-[#333333] text-lg font-bold mb-2">Team Deleted</h2>
          <p className="text-[#333333] text-sm font-normal text-center mb-6">
            You have deleted this team successfully.
          </p>
          <Button variant="primary" onClick={handleSuccessClose} className='w-full'>
            Done
          </Button>
        </div>
      </FullModal>
    </div>
  );
};

export default TeamsTable;