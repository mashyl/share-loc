
const GOOGLE_API_KEY = "AIzaSyAm0nnDFbVwnhj65IOPqw2D__m70gcEP-g";

export async function addressToCoords(address) {
    const urlAddress = encodeURI(address);

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`);
    if (!response.ok) {
        throw new Error('Request failed. Try again.')
    }

    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }

    const coordinates = data.results[0].geometry.location;
    return coordinates;
}

export async function coordsToAddress(coords) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`)
    if (!response.ok) {
        throw new Error('Request failed. Try again.')
    }

    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }

    const address = data.results[0].formatted_address;
    return address;
}