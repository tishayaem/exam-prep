import { createHashRouter } from 'react-router-dom';
import { Home } from './modes/Home';
import { Subject } from './modes/Subject';
import { Study } from './modes/Study';
import { Quiz } from './modes/Quiz';
import { Flashcards } from './modes/Flashcards';
import { VocabSprint } from './modes/VocabSprint';
import { NumberSprint } from './modes/NumberSprint';
import { WritingPractice } from './modes/WritingPractice';
import { MockTest } from './modes/MockTest';
import { Mistakes } from './modes/Mistakes';
import { SkillsMap } from './modes/SkillsMap';
import { SmartPractice } from './modes/SmartPractice';
import { PuzzleMix } from './modes/PuzzleMix';
import { Interview } from './modes/Interview';
import { InterviewPractice } from './modes/InterviewPractice';
import { AppShell } from './AppShell';

export const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'subject/:subjectId', element: <Subject /> },
      { path: 'study/:sectionId', element: <Study /> },
      { path: 'quiz/:sectionId', element: <Quiz /> },
      { path: 'flashcards', element: <Flashcards /> },
      { path: 'flashcards/:sectionId', element: <Flashcards /> },
      { path: 'vocab-sprint', element: <VocabSprint /> },
      { path: 'vocab-sprint/:sectionId', element: <VocabSprint /> },
      { path: 'number-sprint', element: <NumberSprint /> },
      { path: 'writing-practice', element: <WritingPractice /> },
      { path: 'mock-test', element: <MockTest /> },
      { path: 'mistakes', element: <Mistakes /> },
      { path: 'smart-practice', element: <SmartPractice /> },
      { path: 'puzzle-mix', element: <PuzzleMix /> },
      { path: 'skills', element: <SkillsMap /> },
      { path: 'interview', element: <Interview /> },
      { path: 'interview/practice', element: <InterviewPractice /> },
    ],
  },
]);
