export const getNewId = (list) => {
  return Math.max(...list.map((item) => item.id)) + 1;
};
