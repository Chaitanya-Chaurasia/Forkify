import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// Render spinner

const controlRecipe = async function () {
  try {
    // 1. Extract id of recipe from url
    const id = window.location.hash.slice(1);
    // 2. Error handling if no URL
    if (!id) return;

    // 3. Render spinner till recipe is loaded
    recipeView.renderSpinner();

    // 4. Load recipe ansynchronously
    await model.loadRecipe(id);

    // 5. Destructure recipe from state
    const { recipe } = model.state;

    // 6. Send the recpe object to recipeView() class to render recipes
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // Get query from search-box

    const query = searchView.getQuery();

    // Return if nothing entered

    if (!query) return;

    // Render the spinner till results are loaded
    resultsView.renderSpinner();

    // Fetch results from user query
    await model.loadSearchResults(query);

    console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (error) {
    throw error;
  }
};

controlSearchResults();

const init = function () {
  // Event handler if either link changes or the page reloads (load, hashchange)
  recipeView.addHandlerRender(controlRecipe);

  // Event handler if search-box, as a form is submitted
  searchView.addHandlerSearch(controlSearchResults);
};

init();
