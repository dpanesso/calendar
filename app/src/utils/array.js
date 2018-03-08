const sanitizeArray = (array: Array<Object>) => array.map((obj, index) => {
  const local = obj;
  local.id = index;
  return obj;
});

export default sanitizeArray;
