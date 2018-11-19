'use strict';

var state = {
    index: 0,
    showAbout: false,
    showContact: false,
    lang: 'en',
}

const keycodes = {
    right: 39,
    left: 37,
    esc: 27,
}

var keyListener;

var aboutBtn;
var contactBtn;

function init(){
    const artworkLinks = document.getElementsByClassName('js-artwork-link');
    const artworkLinksArray = Array.prototype.slice.call(artworkLinks);
    const details = document.getElementsByClassName('js-artwork-detail');
    const detailsCloseBtn = document.getElementById('details-close-btn');
    const detailsNextBtn = document.getElementById('details-next-btn');
    const detailsPrevBtn = document.getElementById('details-prev-btn');
    aboutBtn = document.getElementById('about-link');
    contactBtn = document.getElementById('contact-link');
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

    contactBtn.addEventListener('click', function(e){
        toggleContact(e);
    })

    for(let i = 0; i < artworkLinks.length; i++){
        const link = artworkLinks.item(i);
        link.addEventListener('click', function(e){
            e.preventDefault();
            showDetailByIndex(i);
        });
    }

    for(let i = 0; i < languageLinks.length; i++){
        const link = languageLinks[i];
        const lang = link.dataset.lang;
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
    hideContact();
    aboutBtn.classList.remove('show');
    aboutBtn.classList.add('hide');
    const aboutSection = document.getElementById('about');
    aboutSection.classList.add('about--visible');
    aboutSection.classList.remove('about--hidden');
    state.showAbout = true;
}

function hideAbout(){
    const aboutSection = document.getElementById('about');
    aboutBtn.classList.remove('hide');
    aboutBtn.classList.add('show')
    aboutSection.classList.remove('about--visible');
    aboutSection.classList.add('about--hidden');
    state.showAbout = false;
}

function showContact(){
    hideAbout();
    contactBtn.classList.remove('show');
    contactBtn.classList.add('hide');
    const contactSection = document.getElementById('contact');
    contactSection.classList.add('about--visible');
    contactSection.classList.remove('about--hidden');
    state.showContact = true;
}

function hideContact(){
    const contactSection = document.getElementById('contact');
    contactBtn.classList.remove('hide');
    contactBtn.classList.add('show');

    contactSection.classList.add('about--hidden');
    contactSection.classList.remove('about--visible');
    state.showContact = false;
}

function toggleAbout(e){
    if(state.showAbout){
        hideAbout();
        // e.target.classList.remove('hide');
        // e.target.classList.add('show')
    }
    else{
        showAbout();
         // e.target.classList.remove('show');
         // e.target.classList.add('hide');
    }
}

function toggleContact(e){
    if(state.showContact){
        hideContact();
        // e.target.classList.remove('hide');
        // e.target.classList.add('show')
    }
    else{
        showContact();
         e.target.classList.remove('show');
         e.target.classList.add('hide');
    }
}

function toggleLang(lang){
    state.lang = lang;
    const $translations = document.getElementsByClassName('about-lang');
    const $links = document.getElementsByClassName('lang-link');
    for(let i = 0; i < $translations.length; i++){
        const el = $translations[i];
        toggleByLang(el);
    }
    
    for(let i = 0; i < $links.length; i++){
        const el = $links[i];
        if(el.dataset.lang === state.lang){
            el.classList.add('current');
        }
        else{
            el.classList.remove('current');
        }
    }
}

function toggleByLang(el){
    if(el.dataset.lang === state.lang){
        showEl(el);
    }
    else{
        hideEl(el);
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