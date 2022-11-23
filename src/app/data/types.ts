export interface ISocialsArray {
    name: string;
    src: string;
    alt: string;
}
  
export interface IContactsArray {
    name: string;
    link?: string;
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

export interface IChart {
    src_office_id: number
    office_name: string
    dt_date: string
    qty_orders: number
    qty_new: number
    qty_delivered: number
    qty_return: number
}