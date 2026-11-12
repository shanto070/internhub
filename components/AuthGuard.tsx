
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkAuthentication() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        });

        if (!active) return;

        if (response.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);

          if (pathname !== "/login" && pathname !== "/register") {
            router.replace("/login");
          }
        }
      } catch {
        if (!active) return;

        setAuthenticated(false);

        if (pathname !== "/login" && pathname !== "/register") {
          router.replace("/login");
        }
      } finally {
        if (active) setChecking(false);
      }
    }

    checkAuthentication();

    return () => {
      active = false;
    };
  }, [pathname, router]);

  const isAuthPage =
    pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (checking || !authenticated) {
    return (
      <div className="auth-loading">
        <div className="auth-spinner" />
        <p>Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
