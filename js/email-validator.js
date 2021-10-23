/*
Recieves an email and validates if it is in the format x@x.x
*/

const emailValidator = email => {
  var reg = /\S+@\S+\.\S+/;
  return reg.test(email);
}

export default emailValidator;