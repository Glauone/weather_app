$(function () {
    var apiKey = '065a427e0125d5b69418d68827210fe2';
    var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=' + apiKey + '&units=metric&lang=fr';

    $('#weather button').click(function (e) {
        e.preventDefault();

        var city = $('#city');
        var cityValue = city.val();

        var params = {
            url: baseUrl + '&q=' + cityValue,
            method: 'GET'
        };

        $.ajax(params).done(function (response) {

            // Show Card
            $('.card').removeClass('d-none');

            //Error
            city.removeClass('is-invalid');
            $('.invalid-feedback').slideUp();
            $('.card').show();

            //Title
            $('.card-title').text(response.name);

            //Description
            $('.description-weather').text(response.weather[0].description);


            //Temperatures
            var temp = Math.round(response.main.temp) + '°C';
            var tempMax = Math.round(response.main.temp_max) + '°C';
            var tempMin = Math.round(response.main.temp_min) + '°C';

            $('.temp-weather').text(temp);
            $('.temp-max-weather').text(tempMax);
            $('.temp-min-weather').text(tempMin);
            
            //images

            var image = response.weather[0].icon;

            $('.image-weather').attr('src', 'http://openweathermap.org/img/w/' + image + '.png');
            $('.image-weather').attr('alt', response.name);
        })
            .fail(function () {
                $('invalid-feedback').slideDown();
                city.addClass('is-invalid');
                $('.card').hide();
            });
    });
});