/*
Recieves a cpf and validates the length, the first and the last digit.
CPF can contains only numbers, can contains symbols or even white spaces.
*/

const cpfValidator = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf == "") {
    return false;
  }
  // Eliminate inválids cpfs
  if (
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
    ) {
      return false;
    }
    // Validates first digit
    var add = 0;
    for (var i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
      rev = 0;
    }
    if (rev != parseInt(cpf.charAt(9))) {
      return false;
    } 
    // Validates second digit
    add = 0;
    for (var i = 0; i < 10; i++) { 
      add += parseInt(cpf.charAt(i)) * (11 - i) 
    };
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
      rev = 0
    };
    if (rev != parseInt(cpf.charAt(10))) {
      return false
    };
    return true;
  };
  
  export default cpfValidator;
  