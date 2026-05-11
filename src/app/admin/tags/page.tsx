import TaxonomyManager from '@/components/admin/TaxonomyManager';

export default function AdminTagsPage() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Tags</h1>
      </div>
      <TaxonomyManager type="tags" />
    </div>
  );
}
