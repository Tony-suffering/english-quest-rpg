export type LifeMember = {
  slug: string | null;
  defaultName: string;
  isAuthor: boolean;
  firstEdition: boolean;
};

export const LIFE_ROSTER: LifeMember[] = [
  { slug: null,      defaultName: 'とにお',  isAuthor: true,  firstEdition: true },
  { slug: 'member1', defaultName: 'Seat 1', isAuthor: false, firstEdition: true },
  { slug: 'member2', defaultName: 'Seat 2', isAuthor: false, firstEdition: true },
  { slug: 'member3', defaultName: 'Seat 3', isAuthor: false, firstEdition: true },
  { slug: 'member4', defaultName: 'Seat 4', isAuthor: false, firstEdition: true },
  { slug: 'member5', defaultName: 'Seat 5', isAuthor: false, firstEdition: true },
];

export const MAX_COHORT_SIZE = 6;
