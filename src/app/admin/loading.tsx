export default function AdminLoading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', height: '100%' }}>
      <div 
        style={{ 
          border: '3px solid var(--border)', 
          borderTop: '3px solid var(--red)', 
          borderRadius: '50%', 
          width: '40px', 
          height: '40px', 
          animation: 'admin-spin 1s linear infinite' 
        }} 
      />
      <style>{`
        @keyframes admin-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
