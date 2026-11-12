# Accordion (demo)

A demo Gen 2 (`@builder.io/sdk-react`) port of the Gen 1 `Builder:Accordion` widget from `@builder.io/widgets`.

## Why it exists

The Gen 2 SDK has no accordion, so content authored with the Gen 1 widget (`Builder:Accordion`) is skipped when rendered. This component registers under the same name, which overrides the missing component so that content renders again. See [Overriding components](https://www.builder.io/c/docs/custom-components-overriding).

It is registered in `builder-registry.ts`.

## Modes

- **Items** (default): each item's title and detail are `uiBlocks` inputs, editable in the Visual Editor.
- **Children** (`useChildrenForItems`): each child block is one item. `children[0]` is the title and `children[1]` is the detail. A child with `repeat` expands to one item per entry in its collection, exposing `$index`, `$item` and `<name>Item` to bindings. If the collection isn't an array, the child renders once.

Other inputs: `oneAtATime` allows one open item at a time. `grid` lays items out in rows of `gridRowWidth` and forces one open item. The detail panel drops in after the opened item's row.

## Files

| File | Purpose |
|---|---|
| `Accordion.tsx` | Root layout; wires the hooks to the items |
| `AccordionItem.tsx` | One title + detail panel |
| `accordion-entries.ts` | Builds rows for items and children modes |
| `accordion-grid.ts` | Measures the DOM to place the open panel in grid mode |
| `accordion-hooks.ts` | Open/close state and the `builder:accordion:load` event |
| `accordion.types.ts` | Prop and entry types |
| `accordion.defaults.ts` | Default title/detail blocks |
| `accordion.config.ts` | Registration and inputs |

## Differences from the Gen 1 widget

- It is a function component. Blocks render through `Blocks`, which adds its own wrapper div.
- `showIf` and `onChange` are strings, because Gen 2 serializes them to the editor.
- Repeat state goes in `localState`.
- Open state is one global index per item.
- Repeat collections are evaluated with `new Function`, which a strict CSP will block.

## Limitations

- Like the Gen 1 widget, it assumes the title is the first child and the detail is the second.
- Repeat mode only shows real rows if the collection (for example `state.faqItems`) is populated.
- Not tested against the Visual Editor.
