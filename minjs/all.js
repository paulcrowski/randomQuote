/**
 * Created by Pol on 2015-12-31.
 */
console.log('test');

$(document).ready(function() {
    geo();
});

function geo () {
    var spanTarget = $("span#data");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            //$("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);

            //show your geolocation
            var lat = (position.coords.latitude).toFixed(1);
            var lon = (position.coords.longitude).toFixed(1);
            spanTarget.text(lat + " " + lon).animate({ opacity: 1 }, { duration: 4000 });

            // main program upload your cordinates to weather check
            console.log(lat+ " " + lon);
            weather(lat, lon);
        });
    } else {
        spanTarget.text("no geolocalization added, we can't check tempreture").animate({ opacity: 1 }, { duration: 1000 });
    }
}

function weather (lat,lon) {
    // by geographic coordinates
    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
    // http://api.openweathermap.org/data/2.5/weather?lat=52.2355&lon=21.01&units=metric&APPID=6d3c2493e4b76eb46bf2016a941e2f27
    // cross orgin https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=52.3&lon=20.8&units=metric&APPID=6d3c2493e4b76eb46bf2016a941e2f27
    // by city
    // var link = weatherAPI+"?q=Warsaw&units=metric&APPID=6d3c2493e4b76eb46bf2016a941e2f27";
    var crossorgin = 'https://crossorigin.me/';
    var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather';
    var unitsW = '&units=metric';
    var appid = '&APPID=6d3c2493e4b76eb46bf2016a941e2f27';
    var link = crossorgin + weatherAPI+"?"+"lat=" + lat +"&" + "lon=" + lon + unitsW + appid ;
    console.log(link);

    $.getJSON(link, showWeather);
}

function showWeather(weatherReport) {
    var icon = weatherReport.weather[0].icon;
    var temp = weatherReport.main.temp;
    var city = weatherReport.name;
    var country = weatherReport.sys.country;
    console.log(icon);
    backgroundPhoto(icon);
    $("span#temp").html(temp+ "&deg;C " + city + " " + country).animate({ opacity: 1 }, { duration: 4000 });
    $("span#icon").html('<img src="http://openweathermap.org/img/w/'+icon+'.png" alt="">').animate({ opacity: 1 }, { duration: 4000 });

}

function backgroundPhoto (icon) {
    var backgroundPhoto = $('#background');
    // switch d place f.e. 01d to d01, to adapt to object nameing
    var switchIcon = icon[2] + icon[0] + icon[1];
    console.log("helpIcon "+switchIcon);

    var photosWeather = {
        d01: 'http://cdn.paper4pc.com/images/clear-sky-wallpaper-3.jpg',
        d02: 'https://static.pexels.com/photos/3590/nature-sky-sunny-clouds.jpg',
        d03: 'http://upload.wikmedia.org/wikipedia/commons/a/ae/Currambine_skyscape_scattered_clouds_blue_sky.jpg',
        d04: 'http://www.carlwozniak.com/clouds/Graphics/New%20Pix/clouds09.jpg',
        d09: 'http://max.nwstatic.co.uk/newsimages2016/rain/rain-umbrella-crop.jpg',
        d10: 'http://max.nwstatic.co.uk/newsimages2016/rain/rain-umbrella-crop.jpg',
        d11: 'http://cdn.pcwallart.com/images/thunderstorm-wallpaper-2.jpg',
        d13: 'http://mysalesbriefcase.com/wp-content/uploads/2015/01/snow-day-5.jpg',
        d50: 'http://vignette1.wikia.nocookie.net/demigodshaven/images/f/f5/Mist.jpg/revision/latest?cb=20110102163040',
        // night photos
        n01: 'http://randomwallpapers.net/clear-sky-silhouette-star-nature-1920x1080-wallpaper29968.jpg',
        n02: 'http://www.drahtphotography.com/wp-content/uploads/2015/05/sampleIMG_3642.jpg',
        n03: 'http://www.drahtphotography.com/wp-content/uploads/2015/05/sampleIMG_3642.jpg',
        n04: 'http://wnnewdesign.jaybirdgroup.net/static/img/backgrounds/cloudy-mc-night.jpg',
        n09: 'http://newtopwallpapers.com/wp-content/uploads/2013/04/A-Rainy-Night-BackgroundFor-Desktop.jpg',
        n10: 'http://newtopwallpapers.com/wp-content/uploads/2013/04/A-Rainy-Night-Background-For-Desktop.jpg',
        n11: 'http://www.meteoradar.ch/forum/forum_uploads/incoming/20110708_225112_knight.jpg',
        n13: 'http://ronepraisephilly.files.wordpress.com/2013/01/snowy-day-the-light-nc.jpg',
        n50: 'http://wallpaperstock.net/chateay-at-night-wallpapers_9533_1600x1200.jpg'
    };

    //change background
    console.log("photosWeather-helpIcon "+ photosWeather[switchIcon]);
    backgroundPhoto.css('background-image', 'url('+photosWeather[switchIcon]+')');

    //switch (icon) OLD CODE
    //{   //day photos
    //    case '01d': backgroundPhoto.css('background-image', 'url(http://cdn.paper4pc.com/images/clear-sky-wallpaper-3.jpg)');
    //    break;
    //
    //    case '02d': backgroundPhoto.css('background-image', 'url(https://static.pexels.com/photos/3590/nature-sky-sunny-clouds.jpg)');
    //    break;
    //
    //    case '03d': backgroundPhoto.css('background-image', 'url(http://upload.wikimedia.org/wikipedia/commons/a/ae/Currambine_skyscape_scattered_clouds_blue_sky.jpg)');
    //    break;
    //
    //    case '04d': backgroundPhoto.css('background-image', 'http://www.carlwozniak.com/clouds/Graphics/New%20Pix/clouds09.jpg)');
    //    break;
    //
    //    case '09d': backgroundPhoto.css('background-image', 'url(http://max.nwstatic.co.uk/newsimages2016/rain/rain-umbrella-crop.jpg)');
    //    break;
    //
    //    case '10d': backgroundPhoto.css('background-image', 'url(http://max.nwstatic.co.uk/newsimages2016/rain/rain-umbrella-crop.jpg)');
    //    break;
    //
    //    case '11d': backgroundPhoto.css('background-image', 'url(http://cdn.pcwallart.com/images/thunderstorm-wallpaper-2.jpg)');
    //    break;
    //
    //    case '13d': backgroundPhoto.css('background-image', 'url(http://mysalesbriefcase.com/wp-content/uploads/2015/01/snow-day-5.jpg)');
    //    break;
    //
    //    case '50d': backgroundPhoto.css('background-image', 'url(http://vignette1.wikia.nocookie.net/demigodshaven/images/f/f5/Mist.jpg/revision/latest?cb=20110102163040)');
    //    break;
    //    // night photos
    //    case '01n': backgroundPhoto.css('background-image', 'url(http://randomwallpapers.net/clear-sky-silhouette-star-nature-1920x1080-wallpaper29968.jpg)');
    //    break;
    //
    //    case '02n': backgroundPhoto.css('background-image', 'url(http://www.drahtphotography.com/wp-content/uploads/2015/05/sampleIMG_3642.jpg)');
    //    break;
    //
    //    case '03n': backgroundPhoto.css('background-image', 'url(http://www.drahtphotography.com/wp-content/uploads/2015/05/sampleIMG_3642.jpg)');
    //    break;
    //
    //    case '04n': backgroundPhoto.css('background-image', 'url(http://wnnewdesign.jaybirdgroup.net/static/img/backgrounds/cloudy-mc-night.jpg)');
    //    break;
    //
    //    case '09n': backgroundPhoto.css('background-image', 'url(http://newtopwallpapers.com/wp-content/uploads/2013/04/A-Rainy-Night-Background-For-Desktop.jpg)');
    //    break;
    //
    //    case '10n': backgroundPhoto.css('background-image', 'url(http://newtopwallpapers.com/wp-content/uploads/2013/04/A-Rainy-Night-Background-For-Desktop.jpg)');
    //    break;
    //
    //    case '11n': backgroundPhoto.css('background-image', 'url(http://www.meteoradar.ch/forum/forum_uploads/incoming/20110708_225112_knight.jpg)');
    //    break;
    //
    //    case '13n': backgroundPhoto.css('background-image', 'url(http://ronepraisephilly.files.wordpress.com/2013/01/snowy-day-the-light-nc.jpg)');
    //    break;
    //
    //    case '50n': backgroundPhoto.css('background-image', 'url(http://wallpaperstock.net/chateay-at-night-wallpapers_9533_1600x1200.jpg)');
    //    break;
    //
    //    default:  backgroundPhoto.css('background-image', 'url(http://en.es-static.us/upl/2015/11/UFO-close-encounter-shutterstock-e1446423385313.jpg)');
    //
    //}
}
