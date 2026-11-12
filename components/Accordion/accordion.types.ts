import type {
  BuilderBlock,
  BuilderContextInterface,
  RegisteredComponents,
} from "@builder.io/sdk-react";

export interface AccordionProps {
  items: { title: BuilderBlock[]; detail: BuilderBlock[] }[];
  oneAtATime?: boolean;
  grid?: boolean;
  gridRowWidth?: string;
  useChildrenForItems?: boolean;
  // Injected by the SDK via `shouldReceiveBuilderProps`
  builderBlock: BuilderBlock;
  builderContext: BuilderContextInterface;
  builderComponents: RegisteredComponents;
  builderLinkComponent?: unknown;
}

/** One renderable accordion row, regardless of where its blocks came from. */
export interface AccordionEntry {
  title: BuilderBlock[];
  detail: BuilderBlock[];
  context: BuilderContextInterface;
  /** Set in `items` mode so the blocks stay editable in the Visual Editor. */
  path?: { title: string; detail: string };
}
