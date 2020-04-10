export type UserDto = {
  id: number;
  userName: string;
  realName: string | null;
  lastFmUrl: string | null;
  profilePicture: string | null;
  ianaTimezone: string | null;
  registeredAt: string;
};
