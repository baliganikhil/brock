//[ [{"name": "createTimer", "params": [ 'test', [2012,07,12,4,10], [3,6] ]}], [ { "name": "showNotification", "params": ["Hello Amod"] } ] ]

function cause_creator( data ) {
	// This has to be first

	source = effect_creator( data[ 1 ] );

	$.each( data[ 0 ], function( index, cause ) {

		source += eval( cause[ "name" ] )( cause[ "params" ] );

	});

	return source;
}

function effect_creator( data ) {
	var source = "";
	$.each( data, function( index, effect ) {
		source += eval( effect[ "name" ] )( effect[ "params" ] );
	});

	var functions = "function callback() {";
	$.each( data, function( index, effect ) {
		var func = [
			effect[ "name" ],"();"
		].join("") + "\n";

		functions += func;
	});
	functions += "}";
	return source + functions + "\n";
}

// EVENT

function handle_screen( params ) {
	var ret = [
		"device.screen.on('", params[0] ,"', callback() );"
	].join("") + "\n";

	return ret;
}

function handle_sms( params ) {

	var ret = [
	"var user = {number: ''};",
	"device.messaging.on('", params[0] ,"', function (sms)",
	"{",
		"if ( ",JSON.stringify( params[1] ), " && " , params[1].length, " > 0 ) {",
			"if ( ", JSON.stringify( params[1] ), ".indexOf( sms.from ) > -1 ) {",
				"if ( ",JSON.stringify( params[2] ), " && " , params[2].length, " > 0 ) {",
					"for ( var index in ", JSON.stringify( params[2] ), " ) {",
						"if ( sms.body.toLowerCase().search((", JSON.stringify( params[2] ), "[index]).toLowerCase() ) > -1 ) {",
							"user.number = sms.from;",
							"callback();",
						"}",
					"}",
				"} else {",
					"callback();",
				"}",
			"}",
		"}",
	"});"
	].join("") + "\n";

	return ret;
}

function handle_telephony( params ) {
	var ret = [
	"var user = {number: ''};",
	"device.telephony.on('", params[0] ,"', function (signal)",
	"{",
		"if ( ",JSON.stringify( params[1] ), " && " , params[1].length, " > 0 ) {",
			"if ( ", JSON.stringify( params[1] ), ".indexOf( signal.phoneNumber ) > -1 ) {",
				"user.number = signal.phoneNumber;",
				"callback();",
			"}",
		"}",
	"});"
	].join("") + "\n";

	return ret;
}

// name, startTime, days, callback
function createTimer( params ) {
	var ret = [
	"var name = '", params[0], "';",
	"var startTime = [", params[1] ,"];",
	"var days = [", params[2] ,"];",
	"if ( days && days.length > 0 ) {",
		"var d = new Date();",
		"var day = d.getDay();",
		"for ( var index in days ) {",
			"if ( day === days[ index ] && ( d.getHours() <  parseInt( startTime[ 3 ], 10 ) || ( d.getHours() ===  parseInt( startTime[ 3 ], 10 ) && d.getMinutes() <  parseInt( startTime[ 4 ], 10 ) ) ) ) {",
				"startTime = new Date( d.getFullYear(), d.getMonth(), d.getDate(), startTime[ 3 ], startTime[ 4 ], 0, 0 );",
	 		"} else {",
				"day = ( days[ index ] - day );",
				"if ( day < 0 ) {",
					"day += 7;",
				"}",
				"d = new Date( d.setDate( d.getDate() + day ) );",
				"startTime = new Date( d.getFullYear(), d.getMonth(), d.getDate(), startTime[ 3 ], startTime[ 4 ], 0, 0 );",
			"}",
			"device.scheduler.setTimer({",
			"'name': name,",
			"'time': startTime.getTime(),",
			"'interval': 7 * 86400000,",
			"'repeat': true,",
			"'exact': true },",
			"callback );",
	 	"}",
	"} else {",
			"startTime = new Date( startTime[ 0 ], startTime[ 1 ], startTime[ 2 ], startTime[ 3 ], startTime[ 4 ], 0, 0 );",
			"device.scheduler.setTimer({",
			"'name': name,",
			"'time': startTime.getTime(),",
			"'interval': 0,",
			"'repeat': false,",
			"'exact': true}, ",
			"callback );",
		"}"
	].join("") + "\n";

	return ret;
}

/// ACTIONS
function showNotification( params ) {
	var ret = [
	"function showNotification() {",
		"var notification = device.notifications.createNotification('", params[ 0 ], "');",
	    "notification.show();",
	"}"].join("") + "\n";

    return ret;
}

function setRinger( params ) {
	var ret = [
	"function setRinger() {",
		"device.audio.ringerVolume = ",parseInt(params[ 0 ], 10),";",
	"}"].join("") + "\n";

    return ret;
}

function sendSMS( params ) {
	var ret = "function sendSMS() {";
	var numbers = params[ 0 ];

	for (var index in numbers) {

		ret += ["device.messaging.sendSms({",
		     "'to': '", numbers[ index ] ,"', ",
		     "'body': '", params[ 1 ],"'",
		 "},",
		 "function (err) {",
		     "console.log(err || 'sms was sent successfully');",
		 "}",
		");"].join("");
	}

	ret +=	[
	"if ( user.number ) {",
		"device.messaging.sendSms({",
			     "'to': user.number, ",
			     "'body': '", params[ 1 ],"'",
			 "},",
			 "function (err) {",
			     "console.log(err || 'sms was sent successfully');",
			 "}",
			");",
	"}"].join("");

	ret += "} \n";

    return ret;
}

function launchApp( params ) {
	var ret = [
	"function launchApp() {",
		"device.applications.launch('",params[ 0 ],"');",
	"}"].join("") + "\n";

    return ret;
}

function getLocation( params ) {

signal.location.latitude);
 console.info('Lon: ' + signal.location.longitude

	var ret = [
	"function getLocation() {",
		"device.messaging.sendSms({",
		     "'to': '", numbers[ index ] ,"', ",
		     "'body': '", params[ 1 ],"'",
		"},",
		"function (err) {",
		     "console.log(err || 'sms was sent successfully');",
		"}",
		");"
	"}"].join("") + "\n";

	].join("");

    return ret;
}