import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationViews from './views/paginationViews.js';

// Render spinner

const controlRecipe = async function () {
  try {
    // 1. Extract id of recipe from url
    const id = window.location.hash.slice(1);
    // 2. Error handling if no URL
    if (!id) return;

    recipeView.renderSpinner();

    // Update results view to mark selected search result
    resultsView.render(model.getSearchResultsPage());

    bookmarksView.update(model.state.bookmarks);
    // 3. Render spinner till recipe is loaded

    // 4. Load recipe ansynchronously
    await model.loadRecipe(id);

    // 5. Destructure recipe from state

    // 6. Send the recpe object to recipeView() class to render recipes
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // Get query from search-box

    const query = searchView.getQuery();

    // Return if nothing entered

    if (!query) return;

    // Render the spinner till results are loaded

    // Fetch results from user query
    await model.loadSearchResults(query);

    // Render results

    resultsView.render(model.getSearchResultsPage(1));

    // Render pagination
    paginationViews.render(model.state.search);
  } catch (error) {
    throw error;
  }
};

const controlPagination = function (goToPage) {
  // 1. Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. Render new pagination buttons
  paginationViews.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings in state
  model.updateServings(newServings);

  // Update DOM
  //recipeView.render(model.state.recipe);

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add or remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }

  // Update DOM for recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks on the bookmarks tab
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  // Event handler if either link changes or the page reloads (load, hashchange)
  recipeView.addHandlerRender(controlRecipe);

  // Event handler if servings button is clicked
  recipeView.addHandlerUpdateServings(controlServings);

  // Event handler if bookmark button is clicked
  recipeView.addHandlerBookmark(controlAddBookmark);

  // Event handler if search-box, as a form is submitted
  searchView.addHandlerSearch(controlSearchResults);

  // Event handler if pagination button is clicked
  paginationViews.addHandlerClick(controlPagination);
};

init();
