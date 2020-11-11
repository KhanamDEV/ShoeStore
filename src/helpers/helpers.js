export function emailRegexValidate(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

//function export
export function checkEmpty(str) {
  return str.replace(' ', '') === '' ? true : false;
}
