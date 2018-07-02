const XRegExp = require('xregexp');

function check_Name(name) {
  const REGEX = /^[^\d]{2,50}$/
  return REGEX.exec(name)?1:0
}

function check_Password(password){
  const REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  return REGEX.exec(password)?1:0
}

function check_Email(email){
  const sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
  const sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
  const sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
  const sQuotedPair = '\\x5c[\\x00-\\x7f]';
  const sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
  const sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
  const sDomain_ref = sAtom;
  const sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
  const sWord = '(' + sAtom + '|' + sQuotedString + ')';
  const sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
  const sLocalPart = sWord + '(\\x2e' + sWord + ')*';
  const sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
  const sValidEmail = '^' + sAddrSpec + '$'; // as whole string
  const REGEX = XRegExp(sValidEmail);
  return XRegExp.exec(email,REGEX)?1:0
}

function check_Phone_UK(phone) {
  const REGEX = /^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{5}\)?[\s-]?\d{4,5}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|\#)\d+)?)$/g;
  return REGEX.exec(phone)?1:0
}

function check_Void() {return 1}

function check_Text_Message(message) {
  const REGEX = /^.{2,400}$/;
  return REGEX.exec(message)?1:0;
}

function check_Base64(string) {
  try {return string.toString('ascii').toString('base64') == string?1:0;}
  catch (err) {return 0}
}

function check_Id(str) {
  REGEX = /[\dabcdef]{1,}$/;
  return REGEX.exec(str)?1:0;
}



function check_Username(username) {
  const REGEX =/^[a-zA-Z0-9_-]{4,30}$/g;
  return REGEX.exec(username)?1:0
}

function check_Boolean(variable) {
  return (variable.toString().toLowerCase() === 'true') || (variable.toString().toLowerCase() === 'false');
}

function check_Number(num1){
  return (typeof num1 == 'number');
}

const FUNCTION_DICT={
  "username":check_Username,"business":check_Boolean,
  "name":check_Name,"surname":check_Name,"password":check_Password,
  "email":check_Email,"phone_number":check_Phone_UK,
  "phone_sender":check_Phone_UK, "phone_receiver":check_Phone_UK,
  "confirmation_code_phone":check_Void, "confirmation_code_email":check_Void,
  "custom_string":check_Void,
  "session_token":check_Void,"image":check_Base64, "video": check_Base64,
  "audio": check_Base64, "title":check_Text_Message, "text":check_Text_Message,
  "email_sender": check_Email , "email_receiver": check_Email,
  "trainer_id":check_Id, "group_id":check_Id,
  "time_seconds":check_Number,
};

function check_Input(parameters) {
  let d = {"error":false, "types":{"invalid field":[]}};
  for(let k in parameters){
    if (FUNCTION_DICT[k](parameters[k])===0) {
      d["error"] = true;
      d["types"]["invalid field"].push(k);
    }
  }
  return d;
}

if (!module.parent) {
  console.log(check_Name("Luca"));
  console.log(check_Password("Ciotto1aaa"));
  console.log(check_Email("paterlini.luca@email.com"));
  console.log(check_Phone_UK("07523615166"));
  console.log(check_Text_Message("Hi, how are you?"));
  console.log(check_Void("Hi, how are you?"));
  console.log(check_Base64("aGVsbG8="));
  console.log(check_Id("1"));
}

module.exports = {
  "check_Input":check_Input
};