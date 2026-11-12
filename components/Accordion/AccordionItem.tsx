"use client";

import { Fragment } from "react";
import { Blocks, type RegisteredComponents } from "@builder.io/sdk-react";
import type { AccordionEntry } from "./accordion.types";

interface AccordionItemProps {
  entry: AccordionEntry;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
  grid?: boolean;
  gridRowWidth?: string;
  openGridItemOrder: number | null;
  parentId: string | undefined;
  registeredComponents: RegisteredComponents;
  linkComponent?: unknown;
}

export default function AccordionItem({
  entry,
  index,
  isOpen,
  onToggle,
  grid,
  gridRowWidth,
  openGridItemOrder,
  parentId,
  registeredComponents,
  linkComponent,
}: AccordionItemProps) {
  const blocksProps = {
    parent: parentId,
    context: entry.context,
    registeredComponents,
    linkComponent,
  };

  return (
    <Fragment>
      <div
        className={`builder-accordion-title builder-accordion-title-${isOpen ? "open" : "closed"}`}
        data-index={index}
        onClick={() => onToggle(index)}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          ...(grid && {
            width: gridRowWidth,
            ...(openGridItemOrder !== null && {
              order: index < openGridItemOrder ? index : index + 1,
            }),
          }),
        }}
      >
        <Blocks {...blocksProps} path={entry.path?.title} blocks={entry.title} />
      </div>
      {isOpen && (
        <div
          className="builder-accordion-detail builder-accordion-detail-open"
          style={{
            order: openGridItemOrder ?? undefined,
            ...(grid && { width: "100%" }),
          }}
        >
          <Blocks {...blocksProps} path={entry.path?.detail} blocks={entry.detail} />
        </div>
      )}
    </Fragment>
  );
}
