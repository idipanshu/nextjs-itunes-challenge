import { css } from 'styled-components';

/**
 * A function for configuring css margin.
 * @param top
 * @param right
 * @param bottom
 * @param left
 * @returns {[]|null|string|*}
 */
const applyMargin = (top = '2px', right = '2px', bottom = '2px', left = '2px') => css`
  margin: ${top} ${right} ${bottom} ${left};
`;

/**
 * A function for configuring css padding.
 * @param vertical
 * @param horizontal
 * @returns {[]|null|string|*}
 */
const applyPadding = (vertical = '1rem', horizontal = '1rem') => css`
  padding: ${vertical} ${horizontal};
`;

/**
 * A function for configuring css box-shadow.
 * @param hOffset
 * @param vOffset
 * @param blurRadius
 * @param color
 * @returns {[]|null|string|*}
 */
const boxShadow = (hOffset = '2px', vOffset = '2px', blurRadius = '2px', color) => css`
  box-shadow: ${hOffset} ${vOffset} ${blurRadius} ${color};
`;

/**
 * A function for configuring css text-shadow.
 *
 * @param hOffset
 * @param vOffset
 * @param blurRadius
 * @param color
 * @returns {[]|null|string|*}
 */
const textShadow = (hOffset = '2px', vOffset = '2px', blurRadius = '2px', color) => css`
  text-shadow: ${hOffset} ${vOffset} ${blurRadius} ${color};
`;

/**
 * A function that takes colors and assumes the top-bottom scenario.
 *
 * @param color1
 * @param color2
 * @returns {[]|null|string|*}
 */
const defaultLinearGradient = (color1, color2) => `linear-gradient(${color1}, ${color2})`;

export default {
  boxShadow,
  defaultLinearGradient,
  textShadow,
  margin: {
    applyMargin
  },
  padding: {
    applyPadding
  }
};
