import { 
  IContactsArray, 
  IRecommendArray, 
  ISocialsArray, 
  ITrendingArray 
} from "./types";


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
    name: 'Talk to us:',
    link: 'mailto:hello@createx.com',
    value: 'hello@createx.com',
    iconOrange: 'assets/images/contacts/Chat.svg',
    iconWhite: 'assets/images/footer/Mail.svg',
    alt: 'email icon',
  },
  {
    name: 'Call us:',
    link: 'tel:+14055550128',
    value: '(405) 555-0128',
    iconOrange: 'assets/images/contacts/iPhone.svg',
    iconWhite: 'assets/images/footer/iPhone.svg',
    alt: 'phone icon',
  },
  {
    name: 'Address:',
    link: '',
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
    alt: 'trending image info'
  },
  {
    image: 'assets/images/sidebar/trending/image2.png',
    date: 'July 15, 2020',
    title: 'Startup: how to build a team that will live longer than a year',
    alt: 'trending image info'
  },
  {
    image: 'assets/images/sidebar/trending/image3.png',
    date: 'August 2, 2020',
    title: 'What to do if you want to get feedback on the product',
    alt: 'trending image info'
  },
]

// export const tagsArray = [
//   '#marketing',
//   '#recruiting',
//   '#coding',
//   '#learning',
//   '#HR',
//   '#self-development'
// ]

export const recommendArray: IRecommendArray[] = [
  {
    icon: 'assets/images/single-post/our-blog/mic.svg',
    type: 'Podcast',
    image: 'assets/images/single-post/our-blog/image1.png',
    theme: 'Design',
    date: 'July 28, 2020',
    duration: '36 min',
    title: 'What are color profiles and how they work in graphic design',
    fragment: 'Aliquam vulputate hendrerit quam sollicitudin urna enim viverra gravida. Consectetur urna arcu eleifend...',
    action: 'Listen',
    alt: 'some blog image'
  },
  {
    icon: 'assets/images/single-post/Files.svg',
    type: 'Article',
    image: 'assets/images/single-post/our-blog/image2.png',
    theme: 'Development',
    date: 'September 1, 2020',
    title: 'How to choose the first programming language for a beginner',
    fragment: 'Turpis sed at magna laoreet gravida consequat tortor placerat. Gravida vitae aliquet enim egestas dui...',
    action: 'Read',
    alt: 'some blog image'
  },
  {
    icon: 'assets/images/single-post/Files.svg',
    type: 'Article',
    image: 'assets/images/single-post/our-blog/image3.png',
    theme: 'Design',
    date: 'August 8, 2020',
    title: 'Should you choose a creative profession if you are attracted to creativity?',
    fragment: 'Curabitur nisl tincidunt eros venenatis vestibulum ac placerat. Tortor, viverra sed vulputate ultrices...',
    action: 'Read',
    alt: 'some blog image'
  },
]
