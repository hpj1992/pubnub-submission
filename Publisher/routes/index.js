
/*
 * GET home page.
 */
var os  = require('os-utils');
exports.index = function(req, res){
  res.render('index', { title: 'Hello PubNub' });
  
};

var updateInterval = 1000;
var time = new Date;
var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP
    publish_key   : "pub-c-7d846157-da7e-40aa-b241-a671ba45986b",
    subscribe_key : "sub-c-7396d71c-f629-11e5-8679-02ee2ddab7fe"
});

setInterval(function(){
	var val;
	os.cpuUsage(function(v){
		val = v;
		 pubnub.publish({
			    channel: 'rickshaw-channel-1',
			    message: {
			      y: val,
			      x: getCurrentTime()
			    },
			    callback: function(m){ console.log("published"+m) }
			  })
	});
	
	}, 1000);

function getCurrentTime()
{
time.setTime(time.getTime()+ updateInterval);
var toReturn = time.getTime();
console.log("time"+toReturn);
return toReturn;
}

var stdin = process.openStdin();
stdin.on( 'data', function(chunk) {
    pubnub.publish({
        channel : "my_channel",
        message : ''+chunk
    });
});