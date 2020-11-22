import './styles.css';
import ImgApiService from './js/apiService';
import imgCardTpl from './templates/img-card.hbs';
const debounce = require('lodash.debounce'); 

const imgApiService = new ImgApiService();

const refs = {
    searchInput: document.querySelector('.search-input'),
    imgCard: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.btn-load-more'),
    //sentinel: document.querySelector('#sentinel'),
}


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

function onLoadMore(e) { 
    imgApiService.fetchImg().then(appendImgMarkup);
    scrollTo();
}

function appendImgMarkup(hits) { 
    refs.imgCard.insertAdjacentHTML('beforeend', imgCardTpl(hits));
}
function clearImgMarkup() { 
    refs.imgCard.innerHTML='';
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

// document.body.offsetHeight - высота body
// pageYOffset- на сколько проскролена страница
// innerHeight - высота области просмотра
// document.documentElement.clientHeight - высота экрана

/*function scrollTo(element) {
   window.scrollTo({
  top: element.offsetTop,
  left: 0,
  behavior: 'smooth'
});
}*/

 /*const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && imgApiService.query !== '') {
            console.log('загрузи еще странички');
        }
    });
};
const options = {}
const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinel);*/

/*arrowTop.onclick = function() {
      window.scrollTo(pageXOffset, 0);
      // после scrollTo возникнет событие "scroll", так что стрелка автоматически скроется
    };
 window.addEventListener('scroll', function() {
      arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight);
    });*/
