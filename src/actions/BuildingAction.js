import apiService from "../services/Service";

export const buildingAction = {
    getAllRentData
}


async function getAllRentData() {
    try{
        const url = "http://localhost:4000/rent";
        const response = await apiService.get(url);
        console.log(response.data)
        return response.data || [];
    }catch(error){
        console.error(error);
        return [];
    }
}
//api call for get a prticular building floors and room details
// async function getAllRentData() {
//     try {
//         const buildingId = localStorage.getItem('buildingId');
//         if (!buildingId) {
//             throw new Error("Building ID not found in localStorage");
//         }
//         const url = `${config.baseUrl}${config.apiEndpoint.getFloorRoomData}?buildingId=${buildingId}`;
//         // const url = config.baseUrl + config.apiEndpoint.getFloorRoomData;
//         //const params = { buildingId }; // required query param
//         const response = await apiService.get(url);
//         return response?.data?.data ?? [];
//     } catch (error) {
//         console.error("Failed to fetch floor-room data:", error);
//         return [];
//     }
// }