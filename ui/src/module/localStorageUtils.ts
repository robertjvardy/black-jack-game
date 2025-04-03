import { SeatIndexType } from "common/dtos";

const localStorageSeatKey = "seat-key";
const localStorageSeatIndex = "seat-index";

// TODO call this when the user leave the game
export const resetLocalStorage = () => {
  localStorage.removeItem(localStorageSeatKey);
  localStorage.removeItem(localStorageSeatIndex);
};

export const storeSeatKey = (key: string) => {
  localStorage.setItem(localStorageSeatKey, key);
};
export const fetchSeatKey = () => localStorage.getItem(localStorageSeatKey);

export const storeSeatIndex = (index: SeatIndexType) => {
  localStorage.setItem(localStorageSeatIndex, index.toString());
};
export const fetchSeatIndex = () => localStorage.getItem(localStorageSeatIndex);
