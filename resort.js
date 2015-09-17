
var seats = require('./seats.js').root;
var list = new Array(seats.length);
var dict = [];

function shuffle(node, index) {
  var index = (index + 1) % seats.length;
  if (list[index] === null)
    list[index] = node;
  else
    shuffle(node, index);
}

function resort() {
  for (var i = 0; i < list.length; i++) {
    list[i] = null;
  }
  for (var i = 0; i < seats.length; i++) {
    shuffle(seats[i], seats[i].original_position + 1 + i);
  }
}

function check(node, index) {
  var leftOk = rightOk = false;
  if (index > 0) {
    leftOk = list[index - 1] === null ? true : (wasStranger(list[index - 1], node.original_position) ? true : false);
  } else {
    leftOk = true;
  }
  if (index < list.length - 1) {
    rightOk = list[index + 1] === null ? true : (wasStranger(list[index + 1], node.original_position) ? true : false);
  } else {
    rightOk = true;
  }
  if (!leftOk || !rightOk)
    dict.push(node);
}

function wasStranger(student, oldIndex) {
  var leftOk = oldIndex === 0 ? true : seats[oldIndex - 1].name !== student.name;
  var rightOk = oldIndex === seats.length - 1 ? true : seats[oldIndex + 1].name !== student.name;
  return leftOk && rightOk;
}

for (var i = 0; i < seats.length; i++) {
  console.log(seats[i].name);
}
resort();
console.log('\n Resorted List: ');
for (var i = 0; i < list.length; i++) {
  console.log(list[i].name);
  check(list[i], i);
}
console.log('\n Was Neighbors: ' + (dict.length === 0 ? 'None' : ''));
for (var i = 0; i < dict.length; i++) {
  console.log(dict[i].name);
}