import PostForm from '@/components/admin/PostForm';

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Edit Post</h1>
      </div>
      <PostForm postId={id} />
    </div>
  );
}
