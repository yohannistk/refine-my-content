// var test = "The teacher's decide is final.";
// let offsetStart = 4;
// let offsetEnd = offsetStart + 3;

// function insertString(str, position, toInsert) {
//   return str.slice(0, position) + toInsert + str.slice(position);
// }
// // function removeString(str, offset, lenght) {
// //   return str.replace(str.substring(offset, offset + lenght), "");
// // }
// // var test = "He were good";

// // function removeString(str, offset, lenght) {
// //   return (
// //     str.substring(0, offset) + "" + str.substring(offset + lenght, str.length)
// //   );
// // }
// function getOriginal(str, offset, lenght) {
//   return str.substring(offset, offset + lenght + 1).trim();
// }
// console.log(getOriginal(test, 4, 9));

// const replaceWord = (str, offset, lenght, toInsert) => {
//   return insertString(removeString(str, offset, lenght), offset, toInsert);
// };

const person = {
  name: "alex",
  age: 10,
};
const list = [];
for (let key in person) {
  console.log(key);
  list.push([key, person[key]]);
}
console.log(list);
