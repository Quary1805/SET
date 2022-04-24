var meta = {};

function init() {
  switchScreen('menu');
}

function generate(properties, cardcount) {
  meta.cardsLeft = [];
  meta.deck = [];
  meta.solutionRaw = [];
  for (let i = 0; i < Math.pow(3, properties); i++) {
    var NewCard = [];
    for (let j = 0; j < properties; j++) {
      NewCard[j] = Math.floor(i/Math.pow(3, j))%3;
    }
    meta.cardsLeft.push(NewCard);
  }
  meta.deck.push(pop());
  meta.deck.push(pop());
  meta.deck.push(pop(findIndex(meta.cardsLeft, getThird_fuckItVersion(meta.deck[0], meta.deck[1]))));
  meta.solutionRaw = arrCopy([meta.deck[0], meta.deck[1], meta.deck[2]])
  for (let i = 0; i < (cardcount-3); i++) {
    meta.deck.push(pop());
    for (let j = 0; j < (i+3); j++) {
      pop(findIndex(meta.cardsLeft, getThird_fuckItVersion(meta.deck[j], meta.deck[i+3])))
    }
  }
  console.log('OK: ' + (meta.deck[cardcount-1].toString() != 0));
  meta.scrambled = [];
  while (meta.deck.length > 0) {
    meta.scrambled.push(meta.deck.splice(Math.floor(Math.random()*meta.deck.length), 1));
  }
  meta.solution = [];
  for (let i = 0; i < meta.solutionRaw.length; i++) {
    meta.solution[i] = findIndex(meta.scrambled, meta.solutionRaw[i]);
  }
  console.log('LEFT: ' + meta.cardsLeft.length)
  return [meta.scrambled, meta.solution];
}

function pop(index = -2) {
  if (index == -2) {
    return meta.cardsLeft.splice(Math.floor(Math.random()*meta.cardsLeft.length),1)[0];
  }
  if (index == -1) {
    return 0;
  } 
  return meta.cardsLeft.splice(index, 1)[0];
}

function getThird(first, second) {
  if (typeof(first) == 'object' && typeof(second) == 'object') {
    if (first.length != undefined && second.length != undefined) {
      if (first.length == second.length && second.length > 0) {
        var output = [];
        for (let i = 0; i < first.length; i++) {
          output[i] = (6 - first[i] - second[i])%3;
        }
        return output;
      } else {
        console.warn('Input isn\'t valid lengthwise [3]');
      }
    } else {
      console.warn('Input isn\'t an array [2]');
    }
  } else {
    console.warn('Input isn\'t an array [1]');
  }
}

function getThird_fuckItVersion(first, second) {
  var output = [];
  for (let i = 0; i < first.length; i++) {
    output[i] = (6 - first[i] - second[i])%3;
  }
  return output;
}

function findIndex(array, filter) {
  return array.findIndex(element => element.toString() == filter.toString());
}

function objCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function arrCopy(arr) {
  return objCopy({arr:arr}).arr;
}

function returnCanvas(setArray) {
  var CANVAS = document.createElement('canvas');
  CANVAS.setAttribute('width', 240);
  CANVAS.setAttribute('height', 100);
  var ctx = CANVAS.getContext('2d');
}

function switchScreen(id) {
  for (let i = 0; i < document.getElementsByClassName('screen').length; i++) {
    document.getElementsByClassName('screen')[i].setAttribute('hidden', true);
  }
  document.getElementById(id).removeAttribute('hidden');
}

var progress = {};
function loadProgress() {

}

function resetProgress() {

}

function saveProgress() {

}

function readyCustom() {
  
}