import LeadManager from '@/components/admin/LeadManager';

export const dynamic = 'force-dynamic';

export default function AdminLeadsPage() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>New Leads Management</h1>
      </div>

      <LeadManager />
    </div>
  );
}
