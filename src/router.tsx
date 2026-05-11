import { createHashRouter } from 'react-router-dom';
import { Home } from './modes/Home';
import { Study } from './modes/Study';
import { Quiz } from './modes/Quiz';
import { Flashcards } from './modes/Flashcards';
import { VocabSprint } from './modes/VocabSprint';
import { MockTest } from './modes/MockTest';
import { Mistakes } from './modes/Mistakes';
import { AppShell } from './AppShell';

export const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'study/:sectionId', element: <Study /> },
      { path: 'quiz/:sectionId', element: <Quiz /> },
      { path: 'flashcards', element: <Flashcards /> },
      { path: 'flashcards/:sectionId', element: <Flashcards /> },
      { path: 'vocab-sprint', element: <VocabSprint /> },
      { path: 'vocab-sprint/:sectionId', element: <VocabSprint /> },
      { path: 'mock-test', element: <MockTest /> },
      { path: 'mistakes', element: <Mistakes /> },
    ],
  },
]);
