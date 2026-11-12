import type { BuilderBlock, BuilderContextInterface } from "@builder.io/sdk-react";
import type { AccordionEntry, AccordionProps } from "./accordion.types";

function evaluateCollection(
  expression: string,
  context: BuilderContextInterface,
): unknown {
  try {
    const state = { ...context.rootState, ...context.localState };
    return new Function("state", `return (${expression});`)(state);
  } catch (err) {
    console.error("Builder:Accordion failed to evaluate repeat", expression, err);
    return undefined;
  }
}

// Mirrors the Gen 1 widget's children mode: a child with `repeat` expands to one
// item per entry in the collection (exposing $index, $item and `<name>Item`);
// if the collection isn't an array the child renders once as a plain item.
function expandChild(
  block: BuilderBlock,
  context: BuilderContextInterface,
): AccordionEntry[] {
  const title = block.children ? [block.children[0]] : [];
  const detail = block.children ? [block.children[1]] : [];
  const collection = block.repeat?.collection;

  if (collection) {
    const collectionName = collection
      .split(/\.\w+\(/)[0]
      .trim()
      .split(".")
      .pop();
    const itemName =
      block.repeat?.itemName || (collectionName ? collectionName + "Item" : "item");

    const data = evaluateCollection(collection, context);
    if (Array.isArray(data)) {
      return data.map((item, index) => ({
        title,
        detail,
        context: {
          ...context,
          localState: {
            ...context.localState,
            $index: index,
            $item: item,
            [itemName]: item,
          },
        },
      }));
    }
  }
  return [{ title, detail, context }];
}

/**
 * - items mode: title/detail come from the `items` input
 * - children mode: each child block is an item (title = children[0],
 *   detail = children[1]) and may `repeat` over a state collection
 */
export function getAccordionEntries(props: AccordionProps): AccordionEntry[] {
  if (props.useChildrenForItems) {
    return (props.builderBlock.children ?? []).flatMap((block) =>
      expandChild(block, props.builderContext),
    );
  }
  return (props.items ?? []).map((item, index) => ({
    title: item.title,
    detail: item.detail,
    context: props.builderContext,
    path: { title: `items.${index}.title`, detail: `items.${index}.detail` },
  }));
}
