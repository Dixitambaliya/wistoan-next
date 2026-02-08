"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UniversalLoader } from "./UniversalLoader";

export function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // smooth luxury delay

    return () => clearTimeout(timer);
  }, [pathname]);

  return <UniversalLoader show={loading} />;
}
