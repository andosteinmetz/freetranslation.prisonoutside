'use strict';

var state = {
    index: 0,
    showAbout: false,
    lang: 'en',
}

const keycodes = {
    right: 39,
    left: 37,
    esc: 27,
}

var keyListener;

function init(){
    const artworkLinks = document.getElementsByClassName('js-artwork-link');
    const artworkLinksArray = Array.prototype.slice.call(artworkLinks);
    const details = document.getElementsByClassName('js-artwork-detail');
    const detailsCloseBtn = document.getElementById('details-close-btn');
    const detailsNextBtn = document.getElementById('details-next-btn');
    const detailsPrevBtn = document.getElementById('details-prev-btn');
    const aboutBtn = document.getElementById('about-link');
    const languageLinks = document.getElementsByClassName('lang-link');

    detailsCloseBtn.addEventListener('click', function(e){
        e.preventDefault();
        hideDetailsSection();   
    });

    detailsNextBtn.addEventListener('click', function(e){
        e.preventDefault();
        nextArtwork();
    });

    detailsPrevBtn.addEventListener('click', function(e){
        e.preventDefault();
        previousArtwork();
    });

    aboutBtn.addEventListener('click', function(e){
        toggleAbout(e);
    });

    for(let i = 0; i < artworkLinks.length; i++){
        const link = artworkLinks.item(i);
        link.addEventListener('click', function(e){
            e.preventDefault();
            showDetailByIndex(i);
        });
    }

    for(let i = 0; i < languageLinks.length; i++){
        const link = languageLinks[i];
        const lang = link.id.split('-')[1];
        link.addEventListener('click', function(e){
            e.preventDefault();
            toggleLang(lang);
        })
    }
}

function respondToKey(e){
    switch(e.which){
        case keycodes.esc:
            hideDetailsSection();
            break;
        case keycodes.right:
            nextArtwork();
            break;
        case keycodes.left:
            previousArtwork();
            break;
        default:
            return;
    }
}

function showAbout(){
    console.log('hi');
    const aboutSection = document.getElementById('about');
    aboutSection.classList.add('about--visible');
    aboutSection.classList.remove('about--hidden');
}

function hideAbout(){
    const aboutSection = document.getElementById('about');
    aboutSection.classList.remove('about--visible');
    aboutSection.classList.add('about--hidden');
}

function toggleAbout(e){
    if(state.showAbout){
        hideAbout();
        e.target.classList.remove('hide');
        e.target.classList.add('show')
    }
    else{
        showAbout();
         e.target.classList.remove('show');
         e.target.classList.add('hide');
    }
    state.showAbout = !state.showAbout;
}

function toggleLang(lang){
    state.lang = lang;
    const $translations = document.getElementsByClassName('about-lang');
    for(let i = 0; i < $translations.length; i++){
        const el = $translations[i];
        const elLang = el.id.split('-')[1];
        if(elLang === state.lang){
            el.classList.remove('hidden');
        }
        else{
            el.classList.add('hidden');
        }
    }
}

function hideEl(el){
    el.classList.add('hidden');
}

function showEl(el){
    el.classList.remove('hidden');
}

function showDetailByIndex(index){
    const details = document.getElementById('details-artworks');
    const children = details.children;
    index = index < 0 || index >= children.length ? mod(index, children.length) : index;
    state.index = index;
    const showMe = children.item(state.index);
    lazyLoadImages(showMe);
    hideArtworkDetails();
    showDetailsSection();
    showMe.classList.add('details__artwork--visible');
}

function showDetailsSection(){
    const details = document.getElementById('details');
    if(!details.classList.contains('details--visible')){
        details.classList.add('details--visible');
    }
    keyListener = document.addEventListener('keydown', respondToKey);
}

function hideDetailsSection(){
    const details = document.getElementById('details');
    if(details.classList.contains('details--visible')){
        details.classList.remove('details--visible');
    }
    document.removeEventListener('keydown', respondToKey);
}

function hideArtworkDetails(){
    const shown = document.getElementsByClassName('details__artwork--visible');
    for(let i = 0; i < shown.length; i++){
        shown.item(i).classList.remove('details__artwork--visible');
    }
}

function nodeListMap(nl, fn){
    // apply a function to every item in a nodeList
    for(let i = 0; i < nl.length; i++){
        let item = nodeList.item(i);
        fn(item);
    }
}

function nextArtwork(){
    showDetailByIndex(state.index + 1);
}

function previousArtwork(){
    showDetailByIndex(state.index - 1);
}

function lazyLoadImages(el){
    const images = el.getElementsByTagName('img');
    for(let i = 0; i < images.length; i++){
        const image = images[i];
        lazyLoad(image);
    }
}

function lazyLoad(img){
    if(img.dataset.hasOwnProperty('src')){
        img.src = img.dataset.src;
    }
    if(img.dataset.hasOwnProperty('srcset')){
        img.srcset = img.dataset.srcset;
    }
}

// a modulo that works for both addition and subtraction
function mod(x, m){
    return ((x % m) + m) % m;
}

document.addEventListener('DOMContentLoaded', function(){
    init();
})