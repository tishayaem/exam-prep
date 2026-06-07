import type { Question, Section, Subject } from './types';
import { scienceSections } from './science';
import { mathsSections } from './maths';

/**
 * Subject-agnostic view of all content. Modes import from here, not from a
 * single subject's file, so adding a subject (maths now, English later) is a
 * one-line change in this file plus the pack registry.
 */
export const allSections: Section[] = [...scienceSections, ...mathsSections];

export const allQuestions: Question[] = allSections.flatMap((s) => s.questions);

export function findSection(id: string): Section | undefined {
  return allSections.find((s) => s.id === id);
}

export function sectionsBySubject(subject: Subject): Section[] {
  return allSections.filter((s) => s.subject === subject);
}

export function questionsBySubject(subject: Subject): Question[] {
  return sectionsBySubject(subject).flatMap((s) => s.questions);
}
