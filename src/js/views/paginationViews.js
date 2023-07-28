import View from './View';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    let markup = '';

    // Page 1, and there are other pages

    if (this._data.page === 1 && numOfPages > 1) {
      markup = `
            <button data-goto = ${
              this._data.page + 1
            } class="btn--inline pagination__btn--next">
                <span>Page ${this._data.page + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
    }

    // Page 1, and there are NO other pages

    if (this._data.page === 1 && numOfPages === 1) {
    }

    // Last Page

    if (this._data.page === numOfPages && numOfPages > 1) {
      markup = `
            <button data-goto = "${
              numOfPages - 1
            }"class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${numOfPages - 1}</span>
            </button>
        `;
    }

    // Middle Pages

    if (1 < this._data.page && this._data.page < numOfPages) {
      markup = `
            <button data-goto = "${
              this._data.page - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${this._data.page - 1}</span>
            </button>
            <button data-goto = "${
              this._data.page + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${this._data.page + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
    }

    return markup;
  }
}

export default new paginationView();
