import {checkEmpty, emailRegexValidate} from './helpers';
import lang from './lang';

export function validateEmail(email) {
  let valid = {statusValid: false, messageValid: ''};
  if (checkEmpty(email)) {
    valid.statusValid = true;
    valid.messageValid = lang.validEmpty;
    return valid;
  }
  if (!emailRegexValidate(email)) {
    valid.statusValid = true;
    valid.messageValid = lang.validEmail;
  }
  return valid;
}

export function validatePassword(password) {
  let valid = {statusValid: false, messageValid: ''};
  if (checkEmpty(password)) {
    valid.statusValid = true;
    valid.messageValid = lang.validEmpty;
    return valid;
  }
  if (password.length < 8) {
    valid.statusValid = true;
    valid.messageValid = lang.passwordMin;
  }
  return valid;
}

export function validateName(name) {
  let valid = {statusValid: false, messageValid: ''};
  if (checkEmpty(name)) {
    valid.statusValid = true;
    valid.messageValid = lang.validEmpty;
    return valid;
  }
  return valid;
}
