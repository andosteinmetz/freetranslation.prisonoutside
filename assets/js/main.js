'use strict';

var state = {
    index: 0,
    showAbout: false,
    showContact: false,
    lang: 'en',
}

var keycodes = {
    right: 39,
    left: 37,
    esc: 27,
}

var keyListener;

var aboutBtn;
var contactBtn;

function init(){
    var artworkLinks = document.getElementsByClassName('js-artwork-link');
    var artworkLinksArray = Array.prototype.slice.call(artworkLinks);
    var details = document.getElementsByClassName('js-artwork-detail');
    var detailsCloseBtn = document.getElementById('details-close-btn');
    var detailsNextBtn = document.getElementById('details-next-btn');
    var detailsPrevBtn = document.getElementById('details-prev-btn');
    aboutBtn = document.getElementById('about-link');
    contactBtn = document.getElementById('contact-link');
    var languageLinks = document.getElementsByClassName('lang-link');

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

    for(var i = 0; i < artworkLinks.length; i++){
        (function(){
            var idx = i;
            var link = artworkLinks.item(i);
            link.addEventListener('click', function(e){
                e.preventDefault();
                showDetailByIndex(idx);
            });
        })()
    }

    for(var j = 0; j < languageLinks.length; j++){
        var link = languageLinks[j];
        link.addEventListener('click', function(e){
            e.preventDefault();
            toggleLang(e.target.dataset.lang);
        })
    }
    showDetailFromLocation();
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
    var aboutSection = document.getElementById('about');
    aboutSection.classList.add('about--visible');
    aboutSection.classList.remove('about--hidden');
    state.showAbout = true;
}

function hideAbout(){
    var aboutSection = document.getElementById('about');
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
    var contactSection = document.getElementById('contact');
    contactSection.classList.add('about--visible');
    contactSection.classList.remove('about--hidden');
    state.showContact = true;
}

function hideContact(){
    var contactSection = document.getElementById('contact');
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
    var $translations = document.getElementsByClassName('about-lang');
    var $links = document.getElementsByClassName('lang-link');
    for(var i = 0; i < $translations.length; i++){
        var el = $translations[i];
        toggleByLang(el);
    }
    
    for(var j = 0; j < $links.length; j++){
        var el = $links[j];
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

function showDetailFromLocation(){
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    if(id){
        showDetailById(id);
    }
}

function showDetailById(id){
    var details = document.getElementById('details-artworks');
    var children = details.children;
    for(var i = 0; i < children.length; i++){
        if (children[i].id === id) {
            showDetailByIndex(i);
            break;
        }
    }
}

function showDetailByIndex(index){
    var details = document.getElementById('details-artworks');
    var children = details.children;
    index = index < 0 || index >= children.length ? mod(index, children.length) : index;
    state.index = index;
    var showMe = children.item(state.index);
    //window.history.pushState({}, '', updateQueryStringParameter(window.location.href, 'id', showMe.id));
    setLocationById(showMe.id);
    lazyLoadImages(showMe);
    hideArtworkDetails();
    showDetailsSection();
    showMe.classList.add('details__artwork--visible');
}

function showDetailsSection(){
    var details = document.getElementById('details');
    if(!details.classList.contains('details--visible')){
        details.classList.add('details--visible');
    }
    keyListener = document.addEventListener('keydown', respondToKey);
}

function hideDetailsSection(){
    var details = document.getElementById('details');
    if(details.classList.contains('details--visible')){
        details.classList.remove('details--visible');
    }
    setLocationById('');
    document.removeEventListener('keydown', respondToKey);
}

function hideArtworkDetails(){
    var shown = document.getElementsByClassName('details__artwork--visible');
    for(var i = 0; i < shown.length; i++){
        shown.item(i).classList.remove('details__artwork--visible');
    }
}

function nodeListMap(nl, fn){
    // apply a function to every item in a nodeList
    for(var i = 0; i < nl.length; i++){
        var item = nodeList.item(i);
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
    var images = el.getElementsByTagName('img');
    for(var i = 0; i < images.length; i++){
        var image = images[i];
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

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function setLocationById(id){
    var url = updateQueryStringParameter(window.location.href, 'id', id);
    window.history.pushState({}, '', url);
}

document.addEventListener('DOMContentLoaded', function(){
    init();
})