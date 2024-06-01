export const DEFAULT_MAX_COL_WIDTH = 500
export const DEFAULT_COLS = "auto"
export const DEFAULT_DEBOUNCE_MS = 300
export const DEFAULT_GAP_PX = 24

export const COL_COUNT_CSS_VAR_NAME = `--wj-masonry-layout-col-count`
export const GAP_CSS_VAR_NAME = `--wj-masonry-layout-gap`

// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
export const ELEMENT_NODE_TYPE = 1

const DEBOUNCE_MAP = new Map()

/**
 * Returns a number attribute from an element.
 * @param $elem
 * @param name
 * @param defaultValue
 */
export function getNumberAttribute($elem, name, defaultValue) {
  const value = parseFloat($elem.getAttribute(name) || "")
  return isNaN(value) ? defaultValue : value
}

/**
 * Returns the amount of cols that the masonry grid should have.
 * @param totalWidth
 * @param cols
 * @param maxColWidth
 */
export function getColCount(totalWidth, cols, maxColWidth) {
  return isNaN(cols) ? Math.max(1, Math.ceil(totalWidth / maxColWidth)) : cols
}

/**
 * Debounces a function.
 * @param cb
 * @param ms
 * @param id
 */
export function debounce(cb, ms, id) {
  const existingTimeout = DEBOUNCE_MAP.get(id)
  if (existingTimeout != null) window.clearTimeout(existingTimeout)
  DEBOUNCE_MAP.set(id, window.setTimeout(cb, ms))
}

/**
 * Returns the index of the column with the smallest height.
 * @param colHeights
 */
export function findSmallestColIndex(colHeights) {
  let smallestIndex = 0;
  let smallestHeight = Infinity;

  colHeights.forEach((height, i) => {
    if (height < smallestHeight) {
      smallestHeight = height
      smallestIndex = i
    }
  })

  return smallestIndex
}
