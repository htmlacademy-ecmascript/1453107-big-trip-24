function getRandomArrayElement (array) {
  return array[Math.floor(Math.random() * (array.length))];
}

function capitalizeFirstLetter(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}


export { getRandomArrayElement, capitalizeFirstLetter, updateItem};
