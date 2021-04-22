
import {Modal} from './UI/Modal';
import {myMap} from './UI/Map';
import {addressToCoords, coordsToAddress} from './Utilities/Location'

class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserBtn = document.querySelector('#locate-btn');
        this.shareBtn = document.getElementById('share-btn');

        locateUserBtn.addEventListener('click',this.locateUserHandler.bind(this));
        addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
        this.shareBtn.addEventListener('click', this.sharePlaceHandler);
    }

    sharePlaceHandler() {
        const shareLinkEl = document.getElementById('share-link');
        if (!navigator.clipboard) {
            shareLinkEl.select();
            return;
        }

        navigator.clipboard.writeText(shareLinkEl.value)
        .then(() => {
            alert('Copied to clipboard.')
        })
        .catch((err) => {
            console.log(err);
            shareLinkEl.select();
        })
    }

    selectPlace(coordinates, address) {
        if (this.map) {
            this.map.render(coordinates);
        } else {
            this.map = new myMap(coordinates);
        }
        this.shareBtn.disabled = false;
        const shareLinkEl = document.getElementById('share-link');
        shareLinkEl.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
    }

    locateUserHandler() {
        if(!navigator.geolocation) {
            alert('Location feature is not available in your browser. Please use a more modern browser or enter address manually.');
            return;
        }

        const modal = new Modal('loading-modal-content', 'Loading current position.');
        modal.show();

        navigator.geolocation.getCurrentPosition(
            async successResult => {
                const coordinates = {
                    lat: successResult.coords.latitude,
                    lng: successResult.coords.longitude
                };
                const address = await coordsToAddress(coordinates);
                modal.hide();
                this.selectPlace(coordinates, address);
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
            alert('Invalid address. Enter again.');
            return
        }
        const modal = new Modal('loading-modal-content', 'Loading current position.');
        modal.show();

        try {
            const coordinates = await addressToCoords(address);
            this.selectPlace(coordinates, address);
        } catch (err) {
            alert(err.message);
        }
        modal.hide();
    }
}

new PlaceFinder();