export default (value) =>
  value
    .replace(/\./g, '')
    .replace(/([()])/g, '')
    .replace(/-/g, '')
    .replace(' ', '');
