import icons from 'url:../../img/icons.svg';

export default class View {
  // Variable to store recipe details
  _data;

  // Parent method that each view calls to render and update DOM
  render(data) {
    if (data.length === 0 || !data) {
      return this.renderError();
    }

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  // For each clicking of button, we do not want other elements to re-load (such as the page or the image), because this is not React. So we will generate a new markup, and compare with previous, and only call update() where there is a difference.

  update(data) {
    this._data = data;

    // Get the new DOM that will render once the recipeView class is called i.e once the page either reloads or changes hash
    const newMarkup = this._generateMarkup();

    // Convert the new DOM (yet to be rendered) to DOM object

    // createRange() creates a range object, which is a fragment of a document that can contain nodes and parts of text nodes. createContextualFragment() parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position. In layman terms, a string will get parsed into a DOM object array.
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // Get all the elements of the new DOM yet to be rendered.
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    // Get all the elements of the current DOM that is already rendered.
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError() {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>No recipes found for your query. Please try again!</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
