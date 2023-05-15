// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  let arrTemp = localStorage.getItem("recipes");
  let arr = JSON.parse(arrTemp);

  return arr;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. TODO - Get a reference to the <main> element
  const mainElem = document.querySelector("main");

  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>

  for(let i=0; i<recipes.length;i++){
    let newCard = document.createElement("recipe-card");
    newCard.setdata(recipes[i]);
    //newCard.data({ imgAlt: "Spooky Ghost Cookies", imgSrc: "./assets/images/1_spooky-ghost-cookies.jpeg", ingredients: "Light corn syrup, almond, black food coloring, powdered sugar,", lengthTime: "2 hr", numRatings: 1, organization: "Delish.com", rating: 5, titleLnk: "https://www.delish.com/holiday-recipes/halloween/a28637917/ghost-cookies-recipe/", titleTxt: "Spooky Ghost Cookies" });

    mainElem.append(newCard);
  }

}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  let temp = JSON.stringify(recipes);
  localStorage.setItem("recipes", temp);
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  let mainE = document.querySelector("main");

  // B2. TODO - Get a reference to the <form> element
  const formElem = document.querySelector("form");
  
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  const formB = formElem.querySelectorAll("button");
  const submitB = formB[0];
  submitB.addEventListener("click", (event) =>{
  // Steps B4-B9 will occur inside the event listener from step B3
  // B4. TODO - Create a new FormData object from the <form> element reference above
  let formData = new FormData(formElem);
  // B5. TODO - Create an empty object (I'll refer to this object as recipeObject to
  //            make this easier to read), and then extract the keys and corresponding
  //            values from the FormData object and insert them into recipeObject
  event.preventDefault();
  let recipeObject ={};

    recipeObject.imgSrc = formData.get("imgSrc");
    recipeObject.imgAlt = formData.get("imgAlt");
    recipeObject.titleLnk = formData.get("titleLnk");
    recipeObject.titleTxt = formData.get("titleTxt");
    recipeObject.organization = formData.get("organization");
    recipeObject.rating = Number(formData.get("rating"));
    recipeObject.numRatings = Number(formData.get("numRatings"));
    recipeObject.lengthTime = formData.get("lengthTime");
    recipeObject.ingredients = formData.get("ingredients");

  
  // B6. TODO - Create a new <recipe-card> element
  const newRecipe = document.createElement("recipe-card");
  // B7. TODO - Add the recipeObject data to <recipe-card> using element.data
  newRecipe.setdata(recipeObject);
  // B8. TODO - Append this new <recipe-card> to <main>
  mainE.append(newRecipe);
  // B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
  //            then save the recipes array back to localStorage
  let recipes = getRecipesFromStorage();
  recipes.push(recipeObject);
  //console.log(recipes);
  saveRecipesToStorage(recipes);

  formElem.reset();

  });

  // B10. TODO - Get a reference to the "Clear Local Storage" button
  const clearB = formB[1];
  // B11. TODO - Add a click event listener to clear local storage button
  clearB.addEventListener("click", (event) =>{
    // Steps B12 & B13 will occur inside the event listener from step B11
    // B12. TODO - Clear the local storage
    localStorage.clear();
    // B13. TODO - Delete the contents of <main>
    mainE.innerHTML = "";

  });

  

}
