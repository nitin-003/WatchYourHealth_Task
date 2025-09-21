/* Utility functions for extracting values from JSON objects using path notation Supports nested objects and arrays */

/**
 * Extract a single value from an object using dot notation path
 * @param {Object} obj - The object to extract from
 * @param {string} path - Dot notation path (e.g., 'vitalsMap.vitals.heart_rate' or 'exercises[0].name')
 * @returns {*} - The extracted value or undefined if not found
*/

function getValueByPath(obj, path) {
  if (!obj || !path) return undefined;
  
  return path.split('.').reduce((current, segment) => {
    if (current === undefined || current === null) return undefined;
    
    // Handle array notation like 'exercises[0]'
    const arrayMatch = segment.match(/^([^[]+)\[(\d+)\]$/);
    if (arrayMatch) {
      const [, arrayName, index] = arrayMatch;
      const array = current[arrayName];
      return array && Array.isArray(array) ? array[parseInt(index)] : undefined;
    }
    
    return current[segment];
  }, obj);
}

/**
 * Extract multiple items from an array using path notation
 * @param {Object} obj - The object to extract from
 * @param {string} path - Dot notation path to an array
 * @returns {Array} - Array of items or empty array if not found
 */

function getItemsByPath(obj, path) {
  const result = getValueByPath(obj, path);
  return Array.isArray(result) ? result : [];
}

/**
 * Extract nested array items with field mapping
 * @param {Object} obj - The object to extract from
 * @param {string} arrayPath - Path to the array
 * @param {string} fieldPath - Path to the field within each array item
 * @returns {Array} - Array of field values
 */

function getArrayFieldValues(obj, arrayPath, fieldPath) {
  const items = getItemsByPath(obj, arrayPath);
  return items.map(item => getValueByPath(item, fieldPath)).filter(val => val !== undefined);
}

/**
 * Check if a path exists in the object
 * @param {Object} obj - The object to check
 * @param {string} path - Dot notation path
 * @returns {boolean} - True if path exists
 */

function pathExists(obj, path) {
  return getValueByPath(obj, path) !== undefined;
}

module.exports = {
  getValueByPath,
  getItemsByPath,
  getArrayFieldValues,
  pathExists
};



