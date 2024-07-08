import { lazy } from 'react';
import Root from './Root';
import { createBrowserRouter } from 'react-router-dom';
import ThreeModel from './pages/ThreeModel';

export const routes: Parameters<typeof createBrowserRouter>[0] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'three-model',
        lazy: async () => {
          const { default: Component } = await import('./pages/ThreeModel');
          return { Component };
        },
      },
      {
        path: 'tooltip',
        lazy: async () => {
          const { default: Component } = await import('./pages/Tooltip');
          return { Component };
        },
      },
    ],
  },
];
