$(document).ready(function () {
    const selectedAmenities = {};

    $('input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            selectedAmenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete selectedAmenities[$(this).data('id')];
        }

        const amenitiesList = Object.values(selectedAmenities).join(', ');
        $('div.Amenities h4').text(amenitiesList);
    });
});
