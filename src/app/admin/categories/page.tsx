import TaxonomyManager from '@/components/admin/TaxonomyManager';

export default function AdminCategoriesPage() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Categories</h1>
      </div>
      <TaxonomyManager type="categories" />
    </div>
  );
}
