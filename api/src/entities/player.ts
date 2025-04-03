import { DEALER_ID, PLAYER_STATUSES } from "common";
import { PlayerIdType, PlayerStatusType, SeatIndexType } from "common/dtos";

export interface PlayerEntity {
  id: PlayerIdType;
  status: PlayerStatusType;
  holdings: number;
  seatIndex: SeatIndexType;
}

export const createNewPlayer = (
  playerId: PlayerIdType,
  seatIndex: SeatIndexType
): PlayerEntity => {
  return {
    id: playerId,
    holdings: 500, // TODO make this configurable
    seatIndex,
    status: PLAYER_STATUSES.waiting,
  };
};

export const createDealerPlayer = (): PlayerEntity => {
  return {
    id: DEALER_ID,
    holdings: 0,
    seatIndex: "D",
    status: PLAYER_STATUSES.waiting,
  };
};
