export const findFirstExistingKey = (obj: { [key: string]: number }) => {
  const first = Object.entries(obj).find((i) => i[1] != 0);
  if (first) {
    return first[0];
  } else {
    return null;
  }
};