export const sayHello = (destLat, destLng, originLat, originLng) => {
    console.log("vv");

    fetch('https://maps.googleapis.com/maps/api/distancematrix/json'
        + `?destinations=${destLat},${destLng}`
        + `&origins=${originLat},${originLng}`
        + '&units=metric'
        + '&mode=driving'
        + '&key=AIzaSyBpR0baoqOI31NjyVlRUck1zq8imN_7z9A')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Full Response:', JSON.stringify(data, null, 2));
            console.log('Distance:', data.rows[0].elements[0].distance.text);
            console.log('Duration:', data.rows[0].elements[0].duration.text);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        
};
export const GetDistance = async (originId, destId, mode, units = 'metric') => {
    console.log("Fetching distance...");

    try {
        const response = await fetch('https://maps.googleapis.com/maps/api/distancematrix/json'
            + `?destinations=place_id:${destId}`
            + `&origins=place_id:${originId}`
            + `&units=${units}`
            + `&mode=${mode}`
            + '&key=AIzaSyBpR0baoqOI31NjyVlRUck1zq8imN_7z9A');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;  // Return data from the function
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;  // Rethrow the error
    }
};
