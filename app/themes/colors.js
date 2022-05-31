/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const primary = '#b59862';
const text = '#020826';
const inverseText = '#f8f8f8';
const secondary = '#f7f0e9';
const success = '#28a745';
const error = '#dc3545';
const gotoStories = '#1890ff';

const colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  text,
  inverseText,
  primary,
  secondary,
  success,
  error,
  gotoStories,
  theme: {
    lightMode: {
      primary,
      secondary
    },
    darkMode: {
      primary: secondary,
      secondary: primary
    }
  }
};
module.exports = colors;
