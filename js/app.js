/**
 * Created by Pol on 2015-12-31.
 */
console.log('test');

$(document).ready(function() {
    $.ajaxSetup({ cache: false });
    getQuote();
    buttonRandom();
});


function getQuote () {
//  var link = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=mycallback";
    var link = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=";
    console.log(link);
    $.getJSON(link, showQuote);
}

function showQuote(quoteData) {
    console.log("---------------- data")
    var title = quoteData[0].title;
    var content = quoteData[0].content;
    var quote = $('#quote');
    var name = $('#name');
    // add content and title to web page
    quote.html(content);
    name.html(title);
    // show box with content with animation
    colorBackground();
    //$('.box').fadeIn('slow');
    console.log(content);
    console.log(title);
    tweeterData (content, name);
}

function colorBackground () {
    // generate random background color for quote
    var colors = ["#9B59B6","#77B1A9","#73A857", "#2C3E50", "#FB6964", "black", "white"];
    var randomColor = randomIntFromInterval(0,colors.length-1);
    var body =$('body');
    console.log(colors[randomColor]);
    body.css("background-color",colors[randomColor]).fadeIn("slow");
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function buttonRandom () {
    // button for choose random quote
    $('.buttonRandom').click(function(){
        console.log('click');
        $('body').css("display","none");
        getQuote();
    })
}

function tweeterData (content, name) {
    var tweetContent = $(content).text();
    var tweetName = $(name).text();
    $(".twitter-share-button").attr("href", "https://twitter.com/intent/tweet?text="+"nice quote: "+tweetContent+"Autor: "+tweetName);
}