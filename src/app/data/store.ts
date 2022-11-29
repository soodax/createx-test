import {
  IContactsArray,
  IRecommendArray,
  ISocialsArray,
  ITrendingArray,
} from './types';

export const socialsArray: ISocialsArray[] = [
  {
    name: 'facebook',
    src: 'assets/images/contacts/Facebook.svg',
    alt: 'Facebook icon',
  },
  {
    name: 'twitter',
    src: 'assets/images/contacts/Twitter.svg',
    alt: 'Twitter icon',
  },
  {
    name: 'youtube',
    src: 'assets/images/contacts/YouTube.svg',
    alt: 'YouTube icon',
  },
  {
    name: 'telegram',
    src: 'assets/images/contacts/telegram.svg',
    alt: 'telegram icon',
  },
  {
    name: 'instagram',
    src: 'assets/images/contacts/Instagram.svg',
    alt: 'Instagram icon',
  },
  {
    name: 'linked-in',
    src: 'assets/images/contacts/Linked-In.svg',
    alt: 'Linked-In icon',
  },
  {
    name: 'google',
    src: 'assets/images/sign-in/Google.svg',
    alt: 'Google icon',
  },
];

export const contactsArray: IContactsArray[] = [
  {
    name: 'email',
    info: 'Talk to us:',
    value: 'hello@createx.com',
    iconOrange: 'assets/images/contacts/Chat.svg',
    iconWhite: 'assets/images/footer/Mail.svg',
    alt: 'email icon',
  },
  {
    name: 'phone',
    info: 'Call us:',
    value: '4055550128',
    link: '(405) 555-0128',
    iconOrange: 'assets/images/contacts/iPhone.svg',
    iconWhite: 'assets/images/footer/iPhone.svg',
    alt: 'phone icon',
  },
  {
    name: 'adress',
    info: 'Address:',
    value: '2464 Royal Ln. Mesa, New Jersey 45463, USA',
    iconOrange: 'assets/images/contacts/outline.svg',
    alt: 'adress icon',
  },
];

export const trendingArray: ITrendingArray[] = [
  {
    image: 'assets/images/sidebar/trending/image1.png',
    date: 'September 4, 2020',
    title: 'What is traffic arbitrage and does it really make money?',
    alt: 'trending image info',
  },
  {
    image: 'assets/images/sidebar/trending/image2.png',
    date: 'July 15, 2020',
    title: 'Startup: how to build a team that will live longer than a year',
    alt: 'trending image info',
  },
  {
    image: 'assets/images/sidebar/trending/image3.png',
    date: 'August 2, 2020',
    title: 'What to do if you want to get feedback on the product',
    alt: 'trending image info',
  },
];

// export const tagsArray = [
//   '#marketing',
//   '#recruiting',
//   '#coding',
//   '#learning',
//   '#HR',
//   '#self-development'
// ]
