export const passwordToggler = (
  elements: Array<HTMLInputElement>,
  value: boolean
) => {
  if (!value) {
    
    elements.map((el) => (el.type = 'password'))
    return {
      value: !value,
      src: 'assets/images/Eye.svg',
      alt: 'show password',
    };
  } else {
    elements.map((el) => (el.type = 'text'))
    return {
      value: !value,
      src: 'assets/images/Closed-Eye.svg',
      alt: 'hide password',
    };
  }
};

export const checkboxToggler = (value: boolean) => {
  if (!value) {
    return {
      value: !value,
      src: 'assets/images/questions/checked.svg',
      alt: 'checkbox check',
    };
  } else {
    return {
      value: !value,
      src: 'assets/images/questions/unchecked.svg',
      alt: 'checkbox uncheck',
    };
  }
};
