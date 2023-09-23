export const O = (i) => {
  return typeof i == "object" ? i : document.getElementById(i);
};

export const S = (i) => {
  return O(i).style;
};

export const C = (i) => {
  return document.getElementsByClassName(i);
};
