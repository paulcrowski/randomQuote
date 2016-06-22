/**
 * Created by Pol on 2015-12-31.
 */
console.log('test');

$(document).ready(function() {
    geo();
});


function weather (lat,lon) {


    $.getJSON(link, showWeather);
}

function showWeather(weatherReport) {

}
