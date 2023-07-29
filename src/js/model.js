import { API_KEY, API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './views/helpers.js';

export const state = {
  recipe: {},
  bookmarks: [],
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const url = `${API_URL}/${id}?key=${API_KEY}}`;

    const response = await getJSON(url);

    const { recipe } = response.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      source_url: recipe.source_url,
      image_url: recipe.image_url,
      servings: recipe.servings,
      cooking_time: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const response = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = response.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image_url: recipe.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

// If only 10 recipes are available, then we need to show only 1 page. So we pass state.search.page as a default argument.

export const getSearchResultsPage = function (page = state.search.page) {
  // Re-assigning value of page
  state.search.page = page;
  const start = (page - 1) * this.state.search.resultsPerPage;
  const end = page * this.state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  // Update quantity of each ingredient
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  // Update servings in state
  state.recipe.servings = newServings;
};

export const addBookmark = function (bookMarkRecipe) {
  state.bookmarks.push(bookMarkRecipe);

  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  console.log(bookMarkRecipe);
};
