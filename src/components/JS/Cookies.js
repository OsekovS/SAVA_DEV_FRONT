
export const setCookie = function setCookie(name, value, options = {}) {

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

export const getCookie = function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}  