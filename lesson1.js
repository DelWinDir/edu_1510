// ==UserScript==
// @name bot for yandex
// @namespace http://tampermonkey.net/
// @version 0.1
// @description try to take over the world!
// @author You
// @match https://yandex.ru/*
// @match https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match https://crushdrummers.ru/*
// @grant none
// ==/UserScript==

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getRandom(min,max){ //ОТ min до max не включая max
    return Math.floor(Math.random()*(max-min)+min);
}

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой","Флейта","Как звучит флейта","Балалайка","Фагот","Скрипка","Саксофон"],
    "crushdrummers.ru":["Барабанное шоу","Заказать барабанное шоу в Москве","Барабанщики на свадьбу","Барабанщики на корпоратив", "Танец барабанов"]
}

let yandexInput = document.getElementsByName("text")[0];
let btnY = document.getElementsByClassName("button mini-suggest__button button_theme_websearch button_size_ws-head i-bem button_js_inited")[0];

let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let words = sites[site];
let word = words[getRandom(0,words.length)];

if (btnY!=undefined){ // Проверка существования кнопки поиска yandex
    let i = 0;
    document.cookie = "site="+site;
    let timerId = setInterval(function(){
        yandexInput.value = yandexInput.value + word[i];
        i++;
        if(i == word.length){
            clearInterval(timerId);
            btnY.click();
        }
    },250);
}else if (location.hostname == "yandex.ru"){
    site = getCookie("site");
    let pageNext = document.evaluate("//a[@aria-label='Следующая страница']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let pageNum = document.evaluate ("//span[@class='pager__item pager__item_current_yes pager__item_kind_page']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let linkIsFound = false;
    let links = document.links;
    for(let i=0; i<links.length; i++){
        let link = links[i]
        if(link.href.includes(site)){
            setTimeout(()=>{link.click();},1000);
            linkIsFound = true;
            break;
        }
    }
    if(!linkIsFound){
        setTimeout(()=>{
            if(pageNum.singleNodeValue.innerText == "10") {
               location.href = "https://yandex.ru/"
            }else {
               pageNext.singleNodeValue.click();
            }
        },1000)
    }else if (!linkIsFound){
        location.href = "https://www.yandex.ru/";
    }
}else{
    if(getRandom(0, 10) > 7 ) setTimeout(()=>{location.href = "https://yandex.ru/";},3000);
    let links = document.links; 
    setInterval(()=>{
        let index = getRandom(0,links.length); 
        let link = links[index];
        if (link.href.includes(location.hostname)){ 
            setTimeout(()=>{link.click();},3000);
        }
    },400);
}
