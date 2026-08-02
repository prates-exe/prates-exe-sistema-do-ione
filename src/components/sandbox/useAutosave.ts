"use client";

import { useCallback, useRef, useState } from "react";

export type SaveStatus = "idle" | "salvando" | "salvo" | "erro";

export function useAutosave<T>(onSave: (value: T) => Promise<void>) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveNow = useCallback(
    async (value: T) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setStatus("salvando");
      try {
        await onSave(value);
        setStatus("salvo");
      } catch {
        setStatus("erro");
      }
    },
    [onSave]
  );

  const scheduleSave = useCallback(
    (value: T, delayMs: number) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => saveNow(value), delayMs);
    },
    [saveNow]
  );

  return { status, saveNow, scheduleSave };
}
