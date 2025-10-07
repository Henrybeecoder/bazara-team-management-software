interface Team {
  name: string;
  code: string;
  desc: string;
  email: string;
  entity: string;
  manager: string;
  created: string;
  status: 'Active' | 'Deactivated';
}

const TeamsTable: React.FC = () => {
  const teams: Team[] = [
    { name: 'IT Support', code: 'ADM', desc: 'Manages system settings, user roles, and platform c...', email: 'admin@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Henry Omofonmwan', created: '24/01/2024', status: 'Active' },
    { name: 'Change Management Team', code: 'ADD', desc: 'Handles all change requests and implementations...', email: 'change@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Sarah Williams', created: '15/02/2024', status: 'Active' },
    { name: 'Incident Manager', code: 'GGA', desc: 'Responds to and resolves system incidents...', email: 'incident@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'John Davidson', created: '10/03/2024', status: 'Deactivated' },
    { name: 'Service Request Manager', code: 'SRM', desc: 'Manages service requests and fulfillment...', email: 'service@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Mary Johnson', created: '05/04/2024', status: 'Active' },
    { name: 'Problem Manager', code: 'PRM', desc: 'Identifies and resolves root causes of problems...', email: 'problem@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'David Brown', created: '20/04/2024', status: 'Active' },
    { name: 'Security Operations', code: 'SEC', desc: 'Monitors and manages security operations...', email: 'security@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Ahmed Hassan', created: '12/05/2024', status: 'Active' },
    { name: 'Network Operations', code: 'NET', desc: 'Maintains network infrastructure and connectivity...', email: 'network@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Lisa Anderson', created: '18/05/2024', status: 'Active' },
    { name: 'Database Administration', code: 'DBA', desc: 'Manages database systems and data integrity...', email: 'dba@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Robert Taylor', created: '25/05/2024', status: 'Deactivated' },
    { name: 'Application Support', code: 'APP', desc: 'Provides support for business applications...', email: 'appsupport@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Grace Okonkwo', created: '02/06/2024', status: 'Active' },
    { name: 'Infrastructure Team', code: 'INF', desc: 'Manages server and infrastructure resources...', email: 'infra@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Michael Chen', created: '08/06/2024', status: 'Active' },
    { name: 'Backup & Recovery', code: 'BCK', desc: 'Ensures data backup and disaster recovery...', email: 'backup@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Patricia White', created: '15/06/2024', status: 'Active' },
    { name: 'Cloud Operations', code: 'CLD', desc: 'Manages cloud infrastructure and services...', email: 'cloud@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'James Wilson', created: '22/06/2024', status: 'Active' },
    { name: 'DevOps Team', code: 'DEV', desc: 'Facilitates development and operations integration...', email: 'devops@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Daniel Martinez', created: '29/06/2024', status: 'Deactivated' },
    { name: 'Quality Assurance', code: 'QAS', desc: 'Tests and validates system functionality...', email: 'qa@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Emily Thompson', created: '05/07/2024', status: 'Active' },
    { name: 'Service Desk', code: 'SDE', desc: 'Provides first-line support to end users...', email: 'servicedesk@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Kevin Davis', created: '12/07/2024', status: 'Active' },
    { name: 'Compliance Team', code: 'CMP', desc: 'Ensures regulatory and policy compliance...', email: 'compliance@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Fatima Abdul', created: '19/07/2024', status: 'Active' },
    { name: 'Business Continuity', code: 'BCP', desc: 'Plans and manages business continuity...', email: 'bcp@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Thomas Moore', created: '26/07/2024', status: 'Active' },
    { name: 'Vendor Management', code: 'VND', desc: 'Manages third-party vendor relationships...', email: 'vendor@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Jennifer Garcia', created: '02/08/2024', status: 'Deactivated' },
    { name: 'Asset Management', code: 'AST', desc: 'Tracks and manages IT assets and inventory...', email: 'assets@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Charles Robinson', created: '09/08/2024', status: 'Active' },
    { name: 'Performance Monitoring', code: 'PMT', desc: 'Monitors system performance and availability...', email: 'performance@accessbankplc.com', entity: 'Access Bank Nigeria', manager: 'Michelle Lee', created: '16/08/2024', status: 'Active' }
  ];

  const [actionPopup, setActionPopup] = useState<ActionPopupState>({ 
    show: false, 
    x: 0, 
    y: 0, 
    teamId: null 
  });

  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>, teamId: number): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    setActionPopup({
      show: true,
      x: rect.left - 120,
      y: rect.bottom + 5,
      teamId
    });
  };

  const handleAction = (action: string, teamId: number): void => {
    console.log(`${action} team at index ${teamId}`);
    alert(`${action === 'edit' ? 'Edit' : 'Delete'} Team: ${teams[teamId].name}`);
  };

  const columns: Column<Team>[] = [
    { header: 'Team Name', key: 'name' },
    { header: 'Code', key: 'code' },
    { header: 'Description', key: 'desc' },
    { header: 'Team Email', key: 'email' },
    { header: 'Entity', key: 'entity' },
    {
      header: 'Manager',
      render: (row: Team): JSX.Element => (
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
      render: (row: Team): JSX.Element => (
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
      header: 'Action',
      render: (row: Team, index: number): JSX.Element => (
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-[#333333] mb-6">Teams Management</h1>
      <SharedTable<Team> columns={columns} data={teams} onAction={handleAction} />
    </div>
  );
};

export default TeamsTable;
