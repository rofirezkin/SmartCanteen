import {GetSTRDineIn, GetSTRThree, GetSTRTwo} from '../assets/illustration';
import React from 'react';
import {
  DummyCanteen,
  DummyFood1,
  DummyFood2,
  DummyFoodCourt,
  DummyFoodCourt2,
} from '../assets';

export const dummyData = [
  {
    title: 'Dine in by pick a canteen',
    url: <GetSTRDineIn />,
    description: 'You can eat at your favorit canteen',
    id: 1,
  },
  {
    title: 'Delivery  by pick a canteen',
    url: <GetSTRTwo />,
    description: 'Just stay  while we are preparing your best foods',
    id: 2,
  },
  {
    title: 'Take away by pick a canteen',
    url: <GetSTRThree />,
    description: 'buy your favorite food by take away',
    id: 3,
  },
];

export const lokasiKantin = [
  {
    title: 'Fakultas Ilmu Terapan',
    img: DummyCanteen,
    description:
      'Menyediakan makanan yang higenis dan sehat pada Fakultas Ilmu Terapan',
    id: 1,
  },
  {
    title: 'Fakultas Teknik',
    img: DummyFood2,
    description:
      'Menyediakan makanan yang higenis dan sehat pada Fakultas Teknik',
    id: 2,
  },
  {
    title: 'Fakultas Ekonomi dan Bisnis',
    img: DummyCanteen,
    description:
      'Menyediakan makanan yang higenis dan sehat pada Fakultas Ekonomi dan Bisnis ',
    id: 3,
  },
  {
    title: 'Asrama Putri',
    img: DummyCanteen,
    description:
      'Menyediakan makanan yang higenis dan sehat pada Asrama Putri ',
    id: 4,
  },
  {
    title: 'Asrama Putra',
    img: DummyCanteen,
    description:
      'Menyediakan makanan yang higenis dan sehat pada Asrama Putra ',
    id: 5,
  },
  {
    title: 'Gedung Kuliah Umum',
    img: DummyFood2,
    description:
      'Menyediakan makanan yang higenis dan sehat pada Gedung Kuliah Umum',
    id: 6,
  },
  {
    title: 'Gedung Kuliah TULT',
    img: DummyFood1,
    description:
      'Menyediakan makanan yang higenis dan sehat pada Gedung Kuliah TULT',
    id: 6,
  },
];

export const device = {
  device_token:
    'ey4wzrabQ4OFbU1wzD16jS:APA91bHf9lNae7Dj6F5QaLwR_2oUu3VecFuZCTh4weH8Hgc-0uyaSp3qENbU9DiamaeoMUKKkbRcf-3u6GONnSTL07qJz1ljk2WzERS1CNSYSmh_SuQHKb_NkUlaTwBedlt_FmPCdAvY',
};

