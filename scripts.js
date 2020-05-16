var name = ""; 
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
                            }

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
