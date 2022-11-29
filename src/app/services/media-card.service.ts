import { Injectable } from '@angular/core';
import { IRecommendArray } from '../data/types';

@Injectable({
  providedIn: 'root',
})
export class MediaCardService {
  constructor() {
    this.cardsIdOrder.forEach((el) => {
      this.recommendArray.forEach((card) => {
        if (card.id === el) {
          this.mediaCardsArray.push(card);
        }
      });
    });
  }

  cardMicroIcon = 'assets/images/single-post/our-blog/mic.svg';
  cardArticleIcon = 'assets/images/single-post/Files.svg';
  cardVideoIcon = 'assets/images/single-post/Play.svg';

  recommendArray: IRecommendArray[] = [
    {
      id: 1,
      icon: this.cardMicroIcon,
      type: 'Podcast',
      image: 'assets/images/cards/image1.png',
      theme: 'Design',
      date: 'July 28, 2020',
      duration: '36 min',
      title: 'What are color profiles and how they work in graphic design',
      fragment:
        'Aliquam vulputate hendrerit quam sollicitudin urna enim viverra gravida. Consectetur urna arcu eleifend...',
      action: 'Listen',
      alt: 'some blog image',
    },
    {
      id: 2,
      icon: 'assets/images/single-post/Files.svg',
      type: 'Article',
      image: 'assets/images/cards/image2.png',
      theme: 'Development',
      date: 'September 1, 2020',
      title: 'How to choose the first programming language for a beginner',
      fragment:
        'Turpis sed at magna laoreet gravida consequat tortor placerat. Gravida vitae aliquet enim egestas dui...',
      action: 'Read',
      alt: 'some blog image',
    },
    {
      id: 3,
      icon: this.cardArticleIcon,
      type: 'Article',
      image: 'assets/images/cards/image3.png',
      theme: 'Design',
      date: 'August 8, 2020',
      title:
        'Should you choose a creative profession if you are attracted to creativity?',
      fragment:
        'Curabitur nisl tincidunt eros venenatis vestibulum ac placerat. Tortor, viverra sed vulputate ultrices...',
      action: 'Read',
      alt: 'some blog image',
    },
    {
      id: 4,
      icon: this.cardMicroIcon,
      type: 'Podcast',
      image: 'assets/images/cards/image6.png',
      theme: 'Marketing',
      date: 'September 4, 2020',
      duration: '36 min',
      title: 'What is traffic arbitrage and does it really make money?',
      fragment:
        'Pharetra, ullamcorper iaculis viverra parturient sed id sed. Convallis proin dignissim lacus, purus gravida...',
      action: 'Listen',
      alt: 'some blog image',
    },
    {
      id: 5,
      icon: this.cardArticleIcon,
      type: 'Article',
      image: 'assets/images/cards/image4.png',
      theme: 'HR & Recruting',
      date: 'August 3, 2020',
      title: 'HR statistics: job search,  interviews, hiring and recruiting',
      fragment:
        'Massa, lectus nibh consectetur aliquet nunc risus aenean. Leo hac netus bibendum diam adipiscing aenean nisl. Molestie nullam ante mattis ac sit vitae pellentesque mi etiam. Morbi commodo tempor, massa vivamus. A molestie id semper fermentum pretium...',
      action: 'Read',
      alt: 'some blog image',
    },
    {
      id: 6,
      icon: this.cardVideoIcon,
      type: 'Video',
      image: 'assets/images/cards/image5.png',
      theme: 'Management',
      date: 'August 2, 2020',
      duration: '45 min',
      title:
        'What to do and who to talk to if you want to get feedback on the product',
      fragment:
        'Neque a, senectus consectetur odio in aliquet nec eu. Ultricies ac nibh urna urna sagittis faucibus. Curabitur nisl tincidunt eros venenatis...',
      action: 'Watch',
      alt: 'some blog image',
    },
    {
      id: 7,
      icon: this.cardVideoIcon,
      type: 'Video',
      image: 'assets/images/cards/image7.png',
      theme: 'Management',
      date: 'July 15, 2020',
      duration: '45 min',
      title: 'Startup: how to build a team that will live longer than a year',
      fragment:
        'Nisi, massa ut sit faucibus et diam. Faucibus at malesuada at justo scelerisque in nisi, urna...',
      action: 'Watch',
      alt: 'some blog image',
    },
    {
      id: 8,
      icon: this.cardArticleIcon,
      type: 'Article',
      image: 'assets/images/cards/image8.png',
      theme: 'Marketing',
      date: 'July 9, 2020',
      title: 'How to get customers to love your business from the start',
      fragment:
        'Malesuada in augue mi feugiat morbi a aliquet enim. Elementum lacus, pellentesque etiam arcu tristique ac...',
      action: 'Read',
      alt: 'some blog image',
    },
  ];

  mediaCardsArray: IRecommendArray[] = [];

  cardsIdOrder = [4, 2, 3, 5, 6, 1, 7, 8];

  getMediaCardData(): IRecommendArray[] {
    return [...this.recommendArray];
  }

  getBlogData(): IRecommendArray[] {
    return [...this.mediaCardsArray];
  }

  getArticles(): IRecommendArray[] {
    return [...this.mediaCardsArray.filter((card) => card.type === 'Article')];
  }

  getVideos(): IRecommendArray[] {
    return [...this.mediaCardsArray.filter((card) => card.type === 'Video')];
  }

  getPodcasts(): IRecommendArray[] {
    return [...this.mediaCardsArray.filter((card) => card.type === 'Podcast')];
  }
}
