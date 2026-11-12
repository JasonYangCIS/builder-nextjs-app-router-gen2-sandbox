import type { RegisteredComponent } from "@builder.io/sdk-react";
import Accordion from "./Accordion";
import { defaultDetail, defaultTitle } from "./accordion.defaults";

// Registering under the Gen 1 widget's name ("Builder:Accordion") overrides it,
// so content authored with the widget renders with this component.
export const accordionConfig = {
  component: Accordion,
  name: "Builder:Accordion",
  canHaveChildren: true,
  // Gen 2: ask the SDK to pass the block/context so we can render child blocks
  shouldReceiveBuilderProps: {
    builderBlock: true,
    builderContext: true,
    builderComponents: true,
    builderLinkComponent: true,
  },
  image:
    "https://cdn.builder.io/api/v1/image/assets%2FagZ9n5CUKRfbL9t6CaJOyVSK4Es2%2Ffab6c1fd3fe542408cbdec078bca7f35",
  defaultStyles: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  inputs: [
    {
      name: "items",
      type: "list",
      broadcast: true,
      subFields: [
        { name: "title", type: "uiBlocks", hideFromUI: true, defaultValue: [defaultTitle] },
        { name: "detail", type: "uiBlocks", hideFromUI: true, defaultValue: [defaultDetail] },
      ],
      defaultValue: [
        { title: [defaultTitle], detail: [defaultDetail] },
        { title: [defaultTitle], detail: [defaultDetail] },
      ],
      // Gen 2 serializes these to the editor, so they are strings, not functions
      showIf: "!options.get('useChildrenForItems')",
    },
    {
      name: "oneAtATime",
      helperText: "Only allow opening one at a time (collapse all others when a new item opens)",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "grid",
      helperText: "Display as a grid",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "gridRowWidth",
      helperText: "Width of each item when displayed as a grid",
      type: "string",
      showIf: "options.get('grid')",
      defaultValue: "25%",
    },
    {
      name: "useChildrenForItems",
      type: "boolean",
      helperText:
        "Use child elements for each item, instead of the array. Useful for dynamically repeating items",
      advanced: true,
      defaultValue: false,
      onChange:
        "if (options.get('useChildrenForItems') === true) { options.set('items', []) }",
    },
  ],
} as RegisteredComponent;
