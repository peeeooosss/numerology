"use client";

import { useEffect } from "react";

export function useModal(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const focusableSelector = "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])";
    const focusDialog = () => {
      const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
      const firstFocusable = dialog?.querySelector<HTMLElement>("[autofocus], " + focusableSelector);
      firstFocusable?.focus();
    };
    window.setTimeout(focusDialog, 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);
}
