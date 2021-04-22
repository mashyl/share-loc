import {myMap} from './UI/Map';

class LoadedPlace {
    constructor(coords, address) {
        new myMap(coords);
        const headerTitle = document.querySelector('header h1');
        headerTitle.textContent = address;
    }
}


const url = new URL(location.href);
const queryParams = url.searchParams;
const coords = {
    lat: +queryParams.get('lat'),
    lng: +queryParams.get('lng')
};
const address = queryParams.get('address');

new LoadedPlace(coords, address);