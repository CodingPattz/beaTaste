
//Search by artist name
//You need to init var name with the name of the artist you want to search the music
//Return: this function is going to return a json object, this object contain the result information
$.ajax({
  method: "GET",
    url:"https://itunes.apple.com/search?term="+ name +"&limit=15",
    async:true,
    dataType: "json",
  }).then(function queryItunes(videoDiv){
          var url = getUrl('iTunes');
          callApi(url).done(function(response){
              var results = response.items;
              var videoId = results[0].id.videoId;
              var videoUrl  = "https://itunes.apple.com/search?term="+ name +"&limit=15";
              var videoPanel = $("<div>").attr("class", "title");
              var iframeDiv = $("<div>").attr("id", "artistName");;
              var videoEmbed = $("<div>").attr({src: videoUrl}).appendTo(iframeDiv);
              videoPanel.html(iframeDiv);
              videoDiv.html(videoPanel);
          });



//Search by name
//You need to init var name with the name of the show you want to search
//Return: this function is going to return a json object, this object contain the result information
function queryTicketMaster();
var tmUrl= "https://app.ticketmaster.com/discovery/v2/events.json?keyword="+ name +"&apikey=ehRgdA75qJWmIRqm3f2mgKUam4YvcbTT";
$.ajax({
    url: tmUrl,
    method:"GET",
    async:true,
    dataType: "json",
}).then(function (tmResponse){
    var results = response.events
    console.log(results)
    for(i = 0; i < results.length; i++){
        var eventId = results[i].id;
        var eventUrl = results[i].url;
        var eventScore = results[i].score;
        var urlEncodedVenueName = encodeURI(results[i].venue.name);
        var venueName = '<a target="_blank" href= "https://app.ticketmaster.com/discovery/v2/events.json?keyword='+ urlEncodedVenueName + '>' + '<h4>' + results[i].venue.name + '</h4>' + '</a>';
        var venueStreet = results[i].venue.address;
        var venueCity = results[i].venue.city;
        var venueState = results[i].venue.state;
        var venueCityandState = venueCity + ", " + venueState;
        var venueZip = results[i].venue.postal_code;
        var venueLocation = results[i].venue.location;
        var title = results[i].title;
        var date = moment(results[i].datetime_local).format("MM/DD/YYYY");
        var dateTime = moment(results[i].datetime_local);
        var formattedDateTime = moment(results[i].datetime_local).format("dddd, MMMM Do YYYY, [at] h:mm a");
        var formattedAddress = venueStreet + "<br>" + venueCityandState + "<br>" + venueZip;
        var resultPanel = $("<div>").attr("class","content").attr("id", "eventInfo")
        var panelHeading = $("<div>").attr("class","content").appendTo(resultPanel)
      });


//Search by region
//You need to init var dma with the code of the region you want to search the events
// In this URL you can find the dmaId that you need to search by region
//https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#supported-locales
//Return: this function is going to return a json object, this object contain the result information
var country = "US";
var dma = "334";
$.ajax({
 type:"GET",
 url:"https://app.ticketmaster.com/discovery/v2/events.json?countryCode="+ country +"&dmaId="+ dma +"&apikey=ehRgdA75qJWmIRqm3f2mgKUam4YvcbTT",
 async:true,
 dataType: "json",
 success: function(json) {
       console.log(json);
      },
 error: function(xhr, status, err) {
       console.log(err);
      }
}).then(function(response) {
       console.log(response);
});

// Search by location  
//You need to init var city with the name of the location you want to search for restaurants
//Return: this function is going to return a json object, this object contain the result information
var city = "";
$.ajax({
    url: "https://developers.zomato.com/api/v2.1/search?entity_type=city&q="+ city +"&count=15",
    dataType: 'json',
    async: true,
    method: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader(
      'user-key', '510eec961d5fbd9619ba6454a2372118');},
    success: function(response) {
      console.log(response.restaurants)
    }
  });


    // click event for the search button
    $('#btnSearch').on('click', function () {
        //  preventDefault();    
        // go to home screen, reset previous variables    
        displayFavorites = false;        
        sgQ = "";

        //toggleDisplay();
        resetVariables();

        var searchInput = $('#search');
         userinput = searchInput.val();
        if(validatedZipCode(userinput)){
            geoip = userinput;
            city = "";
            state = "";
            lat  = 0;
            lon = 0;
            $("#locationMsg").html("Searching for events near " + userinput + ". <a style='color: white; cursor: pointer' onclick='clearLocation()'>Clear location</a>");
        }
        else if(validatedCity(userinput)){
            geoip = false;
            city = userinput.substring(5).trim();
            state = "";
            lat  = 0;
            lon = 0;
            $("#locationMsg").html("Searching for events near " + city + ". <a style='color: white; cursor: pointer' onclick='clearLocation()'>Clear location</a>");
        }
        else if(validatedState(userinput)){
            geoip = false;
            city = "";
            lat  = 0;
            lon = 0;
            state = userinput.substring(6).trim();
            $("#locationMsg").html("Searching for events in " + state + ". <a style='color: white; cursor: pointer' onclick='clearLocation()'>Clear location</a>");
        }
    });

    // resets search textbox
    $('#search').on('focus', function(){
        $(this).val('');
    })
    // enter key for search
    $('#search').keypress(function(e){
        var key = e.which;
        if(key === 13 && $('#search').val().length > 0){
            $('#btnSearch').click()
        }
    }
