import { createHashRouter } from 'react-router-dom';
import { Home } from './modes/Home';
import { Study } from './modes/Study';
import { Quiz } from './modes/Quiz';
import { Flashcards } from './modes/Flashcards';
import { VocabSprint } from './modes/VocabSprint';
import { NumberSprint } from './modes/NumberSprint';
import { MockTest } from './modes/MockTest';
import { Mistakes } from './modes/Mistakes';
import { SkillsMap } from './modes/SkillsMap';
import { SmartPractice } from './modes/SmartPractice';
import { Interview } from './modes/Interview';
import { InterviewPractice } from './modes/InterviewPractice';
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
      { path: 'number-sprint', element: <NumberSprint /> },
      { path: 'mock-test', element: <MockTest /> },
      { path: 'mistakes', element: <Mistakes /> },
      { path: 'smart-practice', element: <SmartPractice /> },
      { path: 'skills', element: <SkillsMap /> },
      { path: 'interview', element: <Interview /> },
      { path: 'interview/practice', element: <InterviewPractice /> },
    ],
  },
]);
