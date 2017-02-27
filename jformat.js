module.exports = line => {
  const DCODE = line.substring(0, 8).trim();
  const SHORT_DESC = line.substring(8, 70).trim();
  const LONG_DESC = line.substring(70, 218).trim();
  return `{ "DCODE" : "${DCODE}", "SHORT_DESC" : "${SHORT_DESC}", "LONG_DESC" : "${LONG_DESC}" },\n`;
}