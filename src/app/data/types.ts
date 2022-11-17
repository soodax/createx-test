export interface ISocialsArray {
    name: string;
    src: string;
    alt: string;
}
  
export interface IContactsArray {
    name: string;
    link: string;
    value: string;
    iconOrange?: string;
    iconWhite?: string;
    alt?: string;
}
  
export interface ITrendingArray {
    image: string
    date: string
    title: string
    alt: string
}
  
export interface IRecommendArray {
    icon: string
    type: string
    image: string
    theme: string
    date: string
    duration?: string
    title: string
    fragment: string
    action: string
    alt: string
}