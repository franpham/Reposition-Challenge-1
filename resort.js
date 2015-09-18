
// var seats = require('./seats.js').root;    // uncomment this if running in node terminal;
var list = new Array(seats.length);       // holds students in the new list;
var dict = [];                            // holds violators of the reshuffle rules;

function shuffle(node, index) {
  // increment by 1 to check next position; use modulus to keep index within array.length;
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

// ---------------------------            FUNCTIONS NEEDED FOR TESTING BELOW          ------------------------------

function check(node, index) {
  var leftOk = rightOk = false;   // must check neighbors to both left && right in new list;
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
  if (!leftOk || !rightOk)    // node is a violater if either leftOk || rightOk are not true;
    dict.push(node);
}

// must check neighbors to both left && right in old list;
function wasStranger(student, oldIndex) {
  var leftOk = oldIndex === 0 ? true : seats[oldIndex - 1].name !== student.name;
  var rightOk = oldIndex === seats.length - 1 ? true : seats[oldIndex + 1].name !== student.name;
  return leftOk && rightOk;
}

function getOldNeighbors(index) {
  return 'OLD left neighbor: ' + (index > 0 ? seats[index - 1].name : 'None')
    + ', right neighbor: ' + (index < seats.length - 1 ? seats[index + 1].name : 'None');
}

function getNewNeighbors(index) {
  return 'NEW left neighbor: ' + (index > 0 ? list[index - 1].name : 'None')
    + ', right neighbor: ' + (index < list.length - 1 ? list[index + 1].name : 'None');
}

/* // uncomment these code to test in node terminal;
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
} */