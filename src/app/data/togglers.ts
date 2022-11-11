export const passwordToggler = (elements: Array<HTMLInputElement>, value: boolean) => {
    value 
        ? elements.map(el => el.type = 'text') 
        : elements.map(el => el.type = 'password');
    return !value
}