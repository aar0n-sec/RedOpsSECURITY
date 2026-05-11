import PostForm from '@/components/admin/PostForm';

export default function NewPostPage() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Create New Post</h1>
      </div>
      <PostForm />
    </div>
  );
}
