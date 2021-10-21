const emailValidator = email => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export default emailValidator;