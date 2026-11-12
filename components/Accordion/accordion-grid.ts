/**
 * Grid mode: an open detail panel should appear right after the row containing
 * the opened item. Like the Gen 1 widget, find that row's last item by walking
 * the title elements and comparing their left offsets. Returns the CSS `order`
 * value for the detail panel.
 */
export function getOpenGridItemOrder(
  root: HTMLElement,
  openItemIndex: number,
): number {
  let subjectItem: Element | null = root.querySelector(
    `.builder-accordion-title[data-index="${openItemIndex}"]`,
  );
  let order = openItemIndex;

  if (subjectItem) {
    let prevItemRect = subjectItem.getBoundingClientRect();

    while ((subjectItem = subjectItem && subjectItem.nextElementSibling)) {
      if (subjectItem.classList.contains("builder-accordion-detail")) continue;

      const subjectItemRect = subjectItem.getBoundingClientRect();
      if (subjectItemRect.left <= prevItemRect.left) break;

      const index = parseInt(subjectItem.getAttribute("data-index") || "", 10);
      if (!isNaN(index)) {
        prevItemRect = subjectItemRect;
        order = index;
      }
    }
  }
  return order + 1;
}
