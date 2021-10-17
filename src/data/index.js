import {GetSTRDineIn, GetSTRThree, GetSTRTwo} from '../assets/illustration';
import React from 'react';

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
