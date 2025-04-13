import { useEffect } from "react";
import socketClient from "../../module/socketClient";

const Table = () => {
  useEffect(() => {
    socketClient.emit("join-table-room");
    return () => {
      socketClient.emit("leave-table-room");
    };
  }, []);
  return <div>Table</div>;
};
export default Table;
