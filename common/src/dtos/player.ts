import { PLAYER_STATUSES, SEAT_INDICES } from "../constants";

export type PlayerIdType = string;

export type PlayerStatusType =
  (typeof PLAYER_STATUSES)[keyof typeof PLAYER_STATUSES];

export type SeatIndexType = typeof SEAT_INDICES;

export interface Player {
  id: PlayerIdType;
  status: PlayerStatusType;
  holdings: number;
  seatIndex: SeatIndexType;
  // hands:
}
