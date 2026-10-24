export interface FiveMinPhrase {
  english: string;
  japanese: string;
}

export interface FiveMinLesson {
  label: string;
  phrases: FiveMinPhrase[];
}

export const DAILY_LESSONS: FiveMinLesson[] = [];
