import { useEffect, useState, type RefObject } from "react";
import { getOpenGridItemOrder } from "./accordion-grid";

/** Fires `builder:accordion:load` on mount, as the Gen 1 widget did. */
export function useAccordionLoadEvent(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      ref.current?.dispatchEvent(
        new CustomEvent("builder:accordion:load", {
          bubbles: true,
          cancelable: false,
          detail: { ref: ref.current },
        }),
      );
    });
    return () => clearTimeout(timeout);
  }, [ref]);
}

/**
 * Tracks which items are open and, in grid mode, where the open detail panel
 * goes. The grid position is measured at click time, before the state change
 * commits, which sees the same DOM the Gen 1 widget's render did.
 */
export function useAccordionState(
  rootRef: RefObject<HTMLElement | null>,
  { grid, onlyOneAtATime }: { grid?: boolean; onlyOneAtATime: boolean },
) {
  const [open, setOpen] = useState<number[]>([]);
  const [openGridItemOrder, setOpenGridItemOrder] = useState<number | null>(null);

  const toggle = (index: number) => {
    const nextOpen = open.includes(index)
      ? onlyOneAtATime
        ? []
        : open.filter((item) => item !== index)
      : onlyOneAtATime
        ? [index]
        : [...open, index];

    const root = rootRef.current;
    setOpenGridItemOrder(
      grid && nextOpen.length && root
        ? getOpenGridItemOrder(root, nextOpen[0])
        : null,
    );
    setOpen(nextOpen);
  };

  return { open, openGridItemOrder, toggle };
}
