import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class bookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Fid a nice recipe and bookmark it ;)';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return ` 
      <li class="preview">
        <a class="preview__link" href="#${result.id}" }>
          <figure class="preview__fig">
            <img src=${result.image_url} alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href=${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }
}

export default new bookmarkView();
