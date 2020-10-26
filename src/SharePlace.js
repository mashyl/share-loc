import {Modal} from './UI/Modal';
import {myMap} from './UI/Map';
import {addressToCoords} from './Utilities/Location'

class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserBtn = document.querySelector('#locate-btn');

        locateUserBtn.addEventListener('click',this.locateUserHandler.bind(this));
        addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
    }

    selectPlace(coordinates) {
        if (this.map) {
            this.map.render(coordinates);
        }
        this.map = new myMap(coordinates);
    }

    locateUserHandler() {
        if(!navigator.geolocation) {
            alert('Location feature is not available in your browser. Please use a more modern browser or enter address manually.');
            return;
        }

        const modal = new Modal('loading-modal-content', 'Loading current position.');
        modal.show();

        navigator.geolocation.getCurrentPosition(
            successResult => {
                modal.hide();

                const coordinates = {
                    lat: successResult.coords.latitude,
                    lng: successResult.coords.longitude
                };
                this.selectPlace(coordinates);
            }, 
            error => {
                modal.hide();
                alert(`Couldn't get your location.`)
            }
        );
    }

    async findAddressHandler(event) {
        event.preventDefault();
        const address = event.target.querySelector('input').value;
        if (!address || address.trim().length === 0) {
            alert('Invaled address. Enter again.');
            return
        }
        const modal = new Modal('loading-modal-content', 'Loading current position.');
        modal.show();

        try {
            const coordinates = await addressToCoords(address);
            this.selectPlace(coordinates);
        } catch (err) {
            alert(err.message);
        }
        modal.hide();
    }
}

new PlaceFinder();