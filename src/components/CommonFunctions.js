export const SeparateByComma = num => {
  let temp = `${num}`;
  let length = temp.length;
  let newStr = [];
  let count = 1;
  for (let index = length - 1; index >= 0; index--) {
    if (count > 0 && count % 3 == 0) {
      newStr.push(temp[index]);
      if (index != 0) {
        newStr.push(",");
      }
      count = 1;
    } else {
      ++count;
      newStr.push(temp[index]);
    }
  }
  return newStr.reverse().join("");
};
