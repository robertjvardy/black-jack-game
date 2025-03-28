import { PLAYER_STATUSES, SEAT_INDICES } from "../constants";

export type PlayerIdType = string;

export type PlayerStatusType =
  (typeof PLAYER_STATUSES)[keyof typeof PLAYER_STATUSES];

export type SeatIndexType = 0 | 1 | 2 | 3 | 4 | 5 | "D";

export interface Player {
  id: PlayerIdType;
  status: PlayerStatusType;
  holdings: number;
  seatIndex: SeatIndexType;
  // hands:
}
