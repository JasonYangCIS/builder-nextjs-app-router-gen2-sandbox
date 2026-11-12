"use client";

import { useRef } from "react";
import AccordionItem from "./AccordionItem";
import { getAccordionEntries } from "./accordion-entries";
import { useAccordionLoadEvent, useAccordionState } from "./accordion-hooks";
import type { AccordionProps } from "./accordion.types";

export type { AccordionProps } from "./accordion.types";

export default function Accordion(props: AccordionProps) {
  const { grid, gridRowWidth } = props;
  const rootRef = useRef<HTMLDivElement | null>(null);

  const { open, openGridItemOrder, toggle } = useAccordionState(rootRef, {
    grid,
    onlyOneAtATime: Boolean(grid || props.oneAtATime),
  });
  useAccordionLoadEvent(rootRef);

  return (
    <div
      ref={rootRef}
      className="builder-accordion"
      style={{
        display: "flex",
        alignItems: grid ? "flex-start" : "stretch",
        flexDirection: grid ? "row" : "column",
        flexWrap: grid ? "wrap" : undefined,
      }}
    >
      {getAccordionEntries(props).map((entry, index) => (
        <AccordionItem
          key={index}
          entry={entry}
          index={index}
          isOpen={open.includes(index)}
          onToggle={toggle}
          grid={grid}
          gridRowWidth={gridRowWidth}
          openGridItemOrder={openGridItemOrder}
          parentId={props.builderBlock.id}
          registeredComponents={props.builderComponents}
          linkComponent={props.builderLinkComponent}
        />
      ))}
    </div>
  );
}
