"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f0f0f",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          padding: "24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "400px" }}>
          <div style={{ marginBottom: "32px" }}>
            <svg
              width="128"
              height="128"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ margin: "0 auto", opacity: 0.5 }}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#919191"
                strokeWidth="2"
              />
              <path
                d="M50 25V55"
                stroke="#919191"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="50" cy="70" r="4" fill="#919191" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginBottom: "12px",
            }}
          >
            Oops!
          </h1>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: "12px",
            }}
          >
            Something went wrong
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#919191",
              marginBottom: "32px",
              lineHeight: 1.6,
            }}
          >
            We encountered an unexpected error. Please try again or contact
            support if the problem persists.
          </p>

          <button
            onClick={() => reset()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#0f0f0f",
              backgroundColor: "#ffffff",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              minHeight: "48px",
              transition: "opacity 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
