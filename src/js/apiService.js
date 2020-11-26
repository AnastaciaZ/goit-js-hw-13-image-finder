export default class ImgApiService { 
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
    }
    fetchImg() { 

        return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=19205756-78e39cd266210d4983cef747c`)
            .then(response => response.json())
            .then(({ hits}) => { 
                this.incrementPage();
                return hits;
            });
    }
    incrementPage() { 
        this.page += 1;
    }
    resetPage() { 
        this.page = 1;
    }
    
     get query() { 
        return this.searchQuery;
    }
    set query(newQuery) { 
        this.searchQuery = newQuery;
    }
}

  
       
