"use client";

import { useState, Suspense, PropsWithChildren, useEffect } from "react";

export default function Hydrated(props: PropsWithChildren) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated && props.children;
}
