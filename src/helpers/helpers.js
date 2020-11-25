export function emailRegexValidate(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

//function export
export function checkEmpty(str) {
  return str.replace(' ', '') === '' ? true : false;
}

export function moneyFomat(money) {
  let afterFomat = money.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  let silceMoney = afterFomat.slice(0, afterFomat.length - 2);
  return silceMoney + ' ₫';
}
