export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';
  if(password.length<=7) return  "Password need 8 characters "
  return '';
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const empetyValidator = (value)=>{
  if (!value || value.length <= 0) return 'This field cannot be empty.';
}