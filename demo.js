$(document).ready(function() {
  var following = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "brunofin"];
  
  function displayContent(logo, name, status, id) {
    $('#' + id).prepend("<div class='row'><div class='col-sm-4'>" + "<img src=" + logo + " class='img-circle center-block' alt =\"don't exist\"></div><div class='col-sm-4'><a href='" + "https://www.twitch.tv/" + name + "' target='_blank'>" + name + "</a></div><div class='col-sm-4'>" + status + "</div></div>");
  }
  for(var i = 0; i < following.length; i++) {  
    var urlFollow = "https://wind-bow.gomix.me/twitch-api/streams/" + following[i] + "?callback=?";
    
    $.getJSON(urlFollow, function(dataFollow) {
      var logo;
      var name;
      var status;

      if(dataFollow.error) {
        logo = "http://res.cloudinary.com/jamaurz/image/upload/v1479561738/errorimg_lsyxgg.png";
        name = dataFollow.message;
        status = dataFollow.status + ' ' + dataFollow.error; 

        displayContent(logo, name, status, "idErr");
      }
      
      if(dataFollow.stream != null) {
        logo = dataFollow.stream.channel.logo;
        name = dataFollow.stream.channel.display_name;
        status = dataFollow.stream.channel.status;
        displayContent(logo, name, status, "Foll");
      }
      
      if((dataFollow.stream == null) && !(dataFollow.error)) {
        var index = dataFollow._links.channel.indexOf("channels");
        var urlChannel = "https://wind-bow.gomix.me/twitch-api/" + dataFollow._links.channel.substr(index) + "?callback=?";
       //console.log(urlChannel);
        $.getJSON(urlChannel, function(dataChannel) {
          if(dataChannel.logo == null)  {
            logo = "http://res.cloudinary.com/jamaurz/image/upload/v1479561738/errorimg_lsyxgg.png";
          } else {
            logo = dataChannel.logo; 
          }
                   
          name = dataChannel.display_name;
          status = "offline";
          
          displayContent(logo, name, status, "Channel");
        })
      }
    });
  }
  
  $('#dispON').on('click', function() {
    $('#Channel').css("display", "none");
    $('#idErr').css("display", "none");
    $('#Foll').css("display", "block");
  });
  
  $('#dispOFF').on('click', function() {
    $('#Foll').css("display", "none");
    $('#idErr').css("display", "none");
    $('#Channel').css("display", "block");
  });
  
  $('#dipsAll').on('click', function() {
    $('#Foll').css("display", "block");
    $('#idErr').css("display", "block");
    $('#Channel').css("display", "block");
  });
});