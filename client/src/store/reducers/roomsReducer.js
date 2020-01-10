import { fetchRooms, addRoom, deleteRoom, editRoom } from "../api/rooms";

const roomsReducer = (rooms = [], action) => {
  if (action.type === "FETCH_ROOMS") {
    fetchRooms(action.payload);
  }

  if (action.type === "UPDATE_ROOMS") {
    rooms = action.payload;
  }

  if (action.type === "ADD_ROOM") {
    addRoom(action.payload, action.email);
  }

  if (action.type === "DELETE_ROOM") {
    deleteRoom(action.payload, action.email);
  }
  if (action.type === "EDIT_ROOM") {
    editRoom(action.payload, action.email, action.id);
  }
  return rooms;
};

export default roomsReducer;
