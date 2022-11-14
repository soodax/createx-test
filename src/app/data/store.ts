interface ISocialsArray {
  name: string;
  src: string;
  alt: string;
}

interface IContactsArray {
  name: string;
  link: string;
  value: string;
  iconOrange?: string;
  iconWhite?: string;
  alt?: string;
}

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
