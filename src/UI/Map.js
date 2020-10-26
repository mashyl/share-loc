export class myMap {
    constructor(coords) {
        // this.coordinates = coords;
        this.render(coords)
    }

    render(coords) {
        if (!google) {
            alert('Could not load maps. Please try again.');
            return;
        } 

        const map = new google.maps.Map(document.getElementById('map'), {
            center: coords,
            zoom: 16
        });

        new google.maps.Marker({
            position: coords,
            map: map
        })
    }
}