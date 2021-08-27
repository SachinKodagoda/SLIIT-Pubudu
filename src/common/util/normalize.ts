export const normalizedCurrency = (value: number, type = 'euro'): string => {
  if (type === 'euro') {
    return `${value},00 €`;
  }
  return `${value},00 $`;
};

export const addCurrency = (value: number, type = 'euro'): string => {
  if (type === 'euro') {
    return `${value} €`;
  }
  return `${value} $`;
};

export const intoString = (value: string | number): string => `${value}`;

export const userNameValidator = (userName: string): string => {
  if (userName.trim().length === 0) {
    return '';
  }
  if (/\W+/g.test(userName)) {
    return 'Has invalid characters';
  }
  if (userName.length < 6) {
    return 'Length should be above 6';
  }
  if (userName.length > 15) {
    return `Maximum only 15 character, now(${userName.length})`;
  }
  return '';
};

export const passwordValidator = (password: string): string => {
  if (password.trim().length === 0) {
    return '';
  }
  if (password.length > 0 && password.length < 8) {
    return 'Need at least 8 characters';
  }
  if (!/(?=.*?[A-Z])/g.test(password)) {
    return 'Need at least one uppercase letter';
  }
  if (!/(?=.*?[a-z])/g.test(password)) {
    return 'Need at least one lowercase letter';
  }
  if (!/(?=.*?[0-9])/g.test(password)) {
    return 'Need at least one number';
  }
  if (!/(?=.*?[#?!@$%^&*-])/g.test(password)) {
    return 'Need at least one special character';
  }

  if (password.length > 15) {
    return `Maximum only 15 character, now(${password.length})`;
  }
  return '';
};

export const isEmpty = (val: string): boolean => val.trim().length === 0;

export const userNameValidatorBoolean = (userName: string): boolean => {
  if (userName.trim().length === 0) {
    return false;
  }
  if (/\W+/g.test(userName)) {
    return false;
  }
  if (userName.length < 6) {
    return false;
  }
  if (userName.length > 15) {
    return false;
  }
  return true;
};

export const fistCapitalLetter = (val: string): string => (val.length > 0 ? val.charAt(0).toUpperCase() : 'A');
