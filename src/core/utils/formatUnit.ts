/**
 * Converts a number to a specified CSS unit.
 * 
 * @param {number} value - The numerical value to be converted.
 * @param {string} unit - The CSS unit to convert the value to. Defaults to 'px'.
 * @param {number} [base=16] - The base value for rem and em units. Defaults to 16.
 * @returns {string} The formatted value with the specified unit.
 */
export const formatUnit = (value, unit = 'px', base = 16) => {
    if (typeof value !== 'number' || typeof unit !== 'string') {
      throw new Error('Invalid arguments. Expected a number and a string.');
    }
  
    switch (unit) {
      case 'px':
        return `${value}px`;
      case 'rem':
        return `${value / base}rem`;
      case 'em':
        return `${value / base}em`;
      case '%':
        return `${value}%`;
      case 'vw':
        return `${value}vw`;
      case 'vh':
        return `${value}vh`;
      default:
        throw new Error('Unsupported unit type. Supported units are: px, rem, em, %, vw, vh.');
    }
  };