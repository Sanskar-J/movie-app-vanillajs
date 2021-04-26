const API_URL='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9dcce675f7108bc353939e93896debce&page=1';
const IMG_PATH='https://image.tmdb.org/t/p/w1280';
const SEARCH_URL='https://api.themoviedb.org/3/search/movie?api_key=9dcce675f7108bc353939e93896debce&query="';

const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');

const ser=document.querySelector('.search')
const btn=document.querySelector('.btn')
const input=document.querySelector('.input')
//scroll part
const boxes=document.querySelectorAll('.box');

const title=document.querySelector('.title');
const reload=document.querySelector('.reload');

reload.addEventListener('click',()=>{
    window.location.reload();
})

//search bar

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const searchTerm=search.value;

    if(searchTerm && searchTerm !==''){
        ser.classList.toggle('active');
        getMovies(SEARCH_URL+searchTerm);
        search.value='';
        title.innerText='';
    }
    else{
        ser.classList.toggle('active');
        input.focus();
        // window.location.reload();
    }


})





//get inital movies
getMovies(API_URL);
async function getMovies(url){
    const res=await fetch(url);
    const data=await res.json();
   showMovies(data.results);
    
    //scroll part



}


function showMovies(movies){
    main.innerHTML='';
    movies.forEach((movie)=>{
        const{title,poster_path,vote_average,overview}=movie;

        const movieEl=document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.classList.add('box');
        movieEl.innerHTML=`
            <img src="${IMG_PATH+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
                
            </div>

        `;
        main.appendChild(movieEl);
        const triggerBottom=window.innerHeight/4*20;
            const boxTop=movieEl.getBoundingClientRect().top;
            if(boxTop<triggerBottom)
            movieEl.classList.add('show');
            else
            movieEl.classList.remove('show');
        
    })
    
}

function getClassByRate(vote){
    if(vote>=8)
    return 'green';
    else if(vote >=5)
    return 'orange';
    else
    return 'red';
}

//toggle mode part
const toggle=document.querySelector('.toggle');
const ball=document.querySelector('.ball');

toggle.addEventListener('click',()=>{
    const html=document.querySelector('html');
    if(html.classList.contains('dark')){
        html.classList.remove('dark');
        ball.style.animation='slideOff 0.3s linear forwards'
    }
    else{
        html.classList.add('dark');
        ball.style.animation='slideOn 0.3s linear forwards'
    }
})


