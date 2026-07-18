interface FlowingGradientProps {
  blobCount?: number;
  animated?: boolean;
}

export default function FlowingGradient({ blobCount = 4, animated = true }: FlowingGradientProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Blob 1 */}
      <div
        className={`flowing-gradient-blob absolute h-[420px] w-[420px] rounded-full opacity-20 blur-[60px] md:h-[800px] md:w-[800px] md:opacity-30 md:blur-[100px] ${animated ? 'will-change-transform' : ''}`}
        style={{
          background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
          animation: animated ? 'blob1 20s ease-in-out infinite' : 'none',
          transform: animated ? undefined : 'translate(-400px, -200px) scale(1)',
        }}
      />

      {/* Blob 2 */}
      <div
        className={`flowing-gradient-blob absolute right-0 h-[460px] w-[460px] rounded-full opacity-15 blur-[70px] md:h-[900px] md:w-[900px] md:opacity-25 md:blur-[120px] ${animated ? 'will-change-transform' : ''}`}
        style={{
          background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)',
          animation: animated ? 'blob2 25s ease-in-out 2s infinite' : 'none',
          transform: animated ? undefined : 'translate(200px, 100px) scale(1)',
        }}
      />

      {/* Blob 3 */}
      {blobCount >= 3 && (
        <div
          className={`flowing-gradient-blob absolute bottom-0 left-1/4 hidden h-[700px] w-[700px] rounded-full opacity-20 blur-[90px] md:block ${animated ? 'will-change-transform' : ''}`}
          style={{
            background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)',
            animation: animated ? 'blob3 22s ease-in-out 5s infinite' : 'none',
            transform: animated ? undefined : 'translate(-100px, 50px) scale(1)',
          }}
        />
      )}

      {/* Blob 4 */}
      {blobCount >= 4 && (
        <div
          className={`flowing-gradient-blob absolute right-1/3 top-1/3 hidden h-[500px] w-[500px] rounded-full opacity-15 blur-[80px] md:block ${animated ? 'will-change-transform' : ''}`}
          style={{
            background: 'radial-gradient(circle, #A5B4FC 0%, transparent 70%)',
            animation: animated ? 'blob4 18s ease-in-out 3s infinite' : 'none',
            transform: animated ? undefined : 'translate(0px, 0px) scale(1)',
          }}
        />
      )}
    </div>
  );
}
