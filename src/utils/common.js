function getRandomArrayElement (array) {
  return array[Math.floor(Math.random() * (array.length))];
}

function capitalizeFirstLetter(word) {
  return word[0].toUpperCase() + word.slice(1);
}


export { getRandomArrayElement, capitalizeFirstLetter};
