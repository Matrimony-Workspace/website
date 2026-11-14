"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Current year without `new Date()` in a prerendered server component. */
export function Year({ fallback }: { fallback: number }) {
  return <>{useSyncExternalStore(noop, () => new Date().getFullYear(), () => fallback)}</>;
}
