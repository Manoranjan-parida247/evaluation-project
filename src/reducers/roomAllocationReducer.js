// ✅ redux/reducers/roomAllocationReducer.js

const initialState = {
    loading: false,
    error: null,
    floors: [],
  };
  
  const roomAllocationReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FLOOR_ROOM_LOADING":
        return { ...state, loading: true };
      case "FLOOR_ROOM_SUCCESS":
        return { ...state, loading: false, floors: action.payload };
      case "FLOOR_ROOM_FAILURE":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default roomAllocationReducer;