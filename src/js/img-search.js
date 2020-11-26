import ImgApiService from './apiService';
import imgCardTpl from '../templates/img-card.hbs';
import getRefs from './get-refs';

const debounce = require('lodash.debounce'); 
const imgApiService = new ImgApiService();
const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onSearch, 800));
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) { 
    e.preventDefault();
    
    clearImgMarkup();
    imgApiService.query = e.target.value.trim();

    if (imgApiService.query === '') { 
        return alert('Введите свой запрос');
    }

    imgApiService.resetPage();
    imgApiService.fetchImg()
        .then(appendImgMarkup)
        .catch(error => console.log(error));
}

function appendImgMarkup(hits) { 
    refs.imgCard.insertAdjacentHTML('beforeend', imgCardTpl(hits));
}
function clearImgMarkup() { 
    refs.imgCard.innerHTML='';
}

function onLoadMore(e) { 
    imgApiService.fetchImg().then(appendImgMarkup);
    scrollTo();
}

function scrollTo() {
   const { y } = refs.imgCard.lastElementChild.getBoundingClientRect();
    const bodyHeight = document.body.offsetHeight;
    
    setTimeout(() => {
        window.scrollTo({
            top: y+pageYOffset+bodyHeight,
            left: 0,
            behavior: 'smooth'
        })
    }, 500);  
}