function createMarkup(html) {
    return {__html: html};
}

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // Ð¿Ñ€Ð¸ Ð½ÐµÐ¾Ð±Ñ…Ð¾Ð´Ð¸Ð¼Ð¾ÑÑ‚Ð¸ Ð´Ð¾Ð±Ð°Ð²ÑŒÑ‚Ðµ Ð´Ñ€ÑƒÐ³Ð¸Ðµ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ñ Ð¿Ð¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ
    ...options
  };
  try{
    if (options.expires.toUTCString) {
      options.expires = options.expires.toUTCString();
    }
  }
  catch{}
  

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
));
return matches ? decodeURIComponent(matches[1]) : undefined;
}  


function ajaxReq() {
let xhr = new XMLHttpRequest();
let reqData = '';
for (let prop in this.state){
  reqData += '&'+prop+'='+this.state[prop]
}
console.log('запрос: '+reqData)
console.log('на: '+this.php)
// 2. Конфигурируем его: POST-запрос this.ajax.php 'phones.json'
xhr.open('POST', 'phones.json', true);

// 3. Отсылаем запрос this.ajax.data
xhr.send();

xhr.onreadystatechange = function() {
  if (this.readyState != 4) return this.response;

  if (this.status != 200) {
    // обработать ошибку
    alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
    return;
  }
}

}
// function getXmlHttp(){
//     var xmlhttp;
//     try {
//       xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
//     } catch (e) {
//       try {
//         xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//       } catch (E) {
//         xmlhttp = false;
//       }
//     }
//     if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
//       xmlhttp = new XMLHttpRequest();
//     }
//     return xmlhttp;
//   }
  

export {ajaxReq, createMarkup, setCookie, getCookie}; // список экспортируемых переменных