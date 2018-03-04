// @flow
const jsonToRecharts = (jsonObject: {key: string}) => {
  if (jsonObject) {
    const keys = Object.keys(jsonObject);
    return keys.map(key => (
      {
        date: key,
        price: jsonObject[key],
      }
    ));
  }
  return [];
};

export default jsonToRecharts;
