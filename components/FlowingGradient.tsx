'use client';

interface FlowingGradientProps {
  blobCount?: number;
  animated?: boolean;
}

export default function FlowingGradient({ blobCount = 4, animated = true }: FlowingGradientProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style jsx>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(-400px, -200px) scale(1); }
          50% { transform: translate(400px, 200px) scale(1.2); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(200px, 100px) scale(1); }
          50% { transform: translate(-300px, -100px) scale(1.3); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(-100px, 50px) scale(1); }
          50% { transform: translate(100px, -150px) scale(1.4); }
        }
        @keyframes blob4 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-200px, 150px) scale(1.5); }
          66% { transform: translate(200px, -100px) scale(0.8); }
        }
      `}</style>

      {/* Blob 1 */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30 will-change-transform"
        style={{
          background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: animated ? 'blob1 20s ease-in-out infinite' : 'none',
          transform: animated ? undefined : 'translate(-400px, -200px) scale(1)',
        }}
      />

      {/* Blob 2 */}
      <div
        className="absolute right-0 w-[900px] h-[900px] rounded-full opacity-25 will-change-transform"
        style={{
          background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)',
          filter: 'blur(120px)',
          animation: animated ? 'blob2 25s ease-in-out 2s infinite' : 'none',
          transform: animated ? undefined : 'translate(200px, 100px) scale(1)',
        }}
      />

      {/* Blob 3 */}
      {blobCount >= 3 && (
        <div
          className="absolute bottom-0 left-1/4 w-[700px] h-[700px] rounded-full opacity-20 will-change-transform"
          style={{
            background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)',
            filter: 'blur(90px)',
            animation: animated ? 'blob3 22s ease-in-out 5s infinite' : 'none',
            transform: animated ? undefined : 'translate(-100px, 50px) scale(1)',
          }}
        />
      )}

      {/* Blob 4 */}
      {blobCount >= 4 && (
        <div
          className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full opacity-15 will-change-transform"
          style={{
            background: 'radial-gradient(circle, #A5B4FC 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: animated ? 'blob4 18s ease-in-out 3s infinite' : 'none',
            transform: animated ? undefined : 'translate(0px, 0px) scale(1)',
          }}
        />
      )}
    </div>
  );
}
