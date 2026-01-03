import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <svg
            className="w-32 h-32 mx-auto text-text-secondary opacity-50"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4" />
            <path
              d="M35 40 L45 50 M45 40 L35 50"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M55 40 L65 50 M65 40 L55 50"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M35 70 Q50 60 65 70"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        <h1 className="text-[64px] md:text-[80px] font-bold text-text-primary tracking-tight leading-none mb-4">
          404
        </h1>
        <h2 className="text-[20px] md:text-[24px] font-semibold text-text-primary mb-3">
          Page not found
        </h2>
        <p className="text-[14px] md:text-[15px] text-text-secondary mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-semibold text-white bg-text-primary rounded-[12px] hover:opacity-90 transition-all min-h-[48px]"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
