export type UserWeekDto = {
  id: number;
  ownerId: number;
  weekNumber: number;
  from: string;
  to: string;
};

export type UserWeeksDto = {
  weeks: UserWeekDto[];
};
