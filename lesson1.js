// ==UserScript==
// @name         bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

let yandexInput = document.getElementsByName("text")[0];
let btnY = document.getElementsByClassName("button mini-suggest__button button_theme_websearch button_size_ws-head i-bem button_js_inited")[0];
let words = ["Гобой","Флейта","Как звучит флейта","Балалайка","Фагот","Скрипка","Саксофон"];
let word = words[getRandom(0,words.length)];
if (btnY!=undefined){ // Проверка существования кнопки поиска yandex
    let i = 0;
    let timerId = setInterval(function(){
        yandexInput.value = yandexInput.value + word[i];
        i++;
        if(i == word.length){
            clearInterval(timerId);
            btnY.click();
        }
    },250);
}else{
    let pageNext = document.evaluate("//a[@aria-label='Следующая страница']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let pageNum = document.evaluate ("//span[@class='pager__item pager__item_current_yes pager__item_kind_page']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let linkIsFound = false;
    let links = document.links;
    for(let i=0; i<links.length; i++){
        let link = links[i]
        if(link.href.includes("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")){
            setTimeout(()=>{link.click();},1000);
            linkIsFound = true;
            break;
        }
    }
    if(!linkIsFound && pageNum.singleNodeValue.innerText <= "10"){
        setTimeout(()=>{pageNext.singleNodeValue.click();},1000)
    }else if (!linkIsFound){
        location.href = "https://www.yandex.ru/";
    }
}
