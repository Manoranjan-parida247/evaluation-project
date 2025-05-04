// import apiService from "../service/Service";
import apiService from "./Service";
import config from "../config/config";
// import config from "../config/config";

export const roomAllocationAction = {
  getAllFloorRoomData,
};

async function getAllFloorRoomData() {
  try {
    // const url = config.baseUrl + config.apiEndpoint.getFloorRoomData;
    const url =  "http://localhost:4000/floorRoomData";

    // const response = await apiService.get(url);
    const response = await apiService.get(url);

    // return response?.data?.data ?? [];
    return response?.data ?? [];
  } catch (error) {
    console.error("Failed to fetch floor-room data:", error);
    return [];
  }
}
