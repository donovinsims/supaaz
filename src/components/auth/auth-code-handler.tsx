"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthCodeHandlerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (code) {
      // Redirect to the actual callback route
      const next = searchParams.get("next") || "/";
      router.replace(`/auth/callback?code=${code}&next=${encodeURIComponent(next)}`);
    } else if (error) {
      console.error("Auth error:", error, errorDescription);
    }
  }, [searchParams, router]);

  return null;
}

export function AuthCodeHandler() {
  return (
    <Suspense fallback={null}>
      <AuthCodeHandlerContent />
    </Suspense>
  );
}
