
export const isValidCPF = (cpf: string) => {
    const cleanedCpf = cpf.replace(/[^\d]+/g, '');
  
    if (cleanedCpf.length !== 11) return false;
  
    let sum = 0;
    let remainder;
  
    if (cleanedCpf === "00000000000" || cleanedCpf === "11111111111" || cleanedCpf === "22222222222" ||
        cleanedCpf === "33333333333" || cleanedCpf === "44444444444" || cleanedCpf === "55555555555" ||
        cleanedCpf === "66666666666" || cleanedCpf === "77777777777" || cleanedCpf === "88888888888" || cleanedCpf === "99999999999") {
      return false;
    }
  
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanedCpf.substring(i - 1, i)) * (11 - i);
    }
  
    remainder = (sum * 10) % 11;
  
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cleanedCpf.substring(9, 10))) return false;
  
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanedCpf.substring(i - 1, i)) * (12 - i);
    }
  
    remainder = (sum * 10) % 11;
  
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cleanedCpf.substring(10, 11))) return false;
  
    return true;
  };
  