import { css } from 'styled-components';
import { styles, colors } from './';
/**
 * A function for primary button.
 * @param hOffset
 * @param vOffset
 * @param blurRadius
 * @param color
 * @returns {[]|null|string|*}
 */
const primary = () => css`
  ${styles.padding.applyPadding('0.5rem', '1rem')};
  border: none;
  display: block;
  margin: auto;
  font-weight: bold;
  border-radius: 1rem;
  background-color: ${colors.primary};
  color: ${colors.inverseText};

  &:hover {
    color: ${colors.inverseText};
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default {
  primary
};
