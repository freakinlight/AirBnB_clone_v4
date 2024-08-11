$(document).ready(function () {
    const selectedAmenities = {};
    const selectedLocations = {
        states: {},
        cities: {}
    };

    // Check API status
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });

    // Listen for changes on the amenity checkboxes
    $('input[type="checkbox"]').change(function () {
        const isState = $(this).closest('ul').parent().is('li');  // Check if it's a state or city checkbox
        const id = $(this).data('id');
        const name = $(this).data('name');

        if ($(this).is(':checked')) {
            if (isState) {
                selectedLocations.states[id] = name;
            } else {
                selectedLocations.cities[id] = name;
            }
        } else {
            if (isState) {
                delete selectedLocations.states[id];
            } else {
                delete selectedLocations.cities[id];
            }
        }

        const locationList = Object.values(selectedLocations.states).concat(Object.values(selectedLocations.cities)).join(', ');
        $('div.Locations h4').text(locationList);
    });

    // When the search button is clicked
    $('button').click(function () {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                amenities: Object.keys(selectedAmenities),
                states: Object.keys(selectedLocations.states),
                cities: Object.keys(selectedLocations.cities)
            }),
            success: function (data) {
                $('section.places').empty(); // Clear previous results
                data.forEach(place => {
                    const article = `
                        <article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guests</div>
                                <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                            </div>
                            <div class="description">
                                ${place.description}
                            </div>
                        </article>`;
                    $('section.places').append(article);
                });
            }
        });
    });
});
