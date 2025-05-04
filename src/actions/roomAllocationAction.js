

export const setRoomData = (rooms) => ({
    type: "FLOOR_ROOM_SUCCESS",
    payload: rooms,
  });
  
  export const setRoomLoading = () => ({
    type: "FLOOR_ROOM_LOADING",
  });
  
  export const setRoomError = (error) => ({
    type: "FLOOR_ROOM_FAILURE",
    payload: error,
  });