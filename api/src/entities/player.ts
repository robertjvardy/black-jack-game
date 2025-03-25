import { PlayerIdType, PlayerStatusType, SeatIndexType } from "common/dtos";

export interface PlayerEntity {
  id: PlayerIdType;
  status: PlayerStatusType;
  holdings: number;
  seatIndex: SeatIndexType;
  // hands:
}
