//[ [{"name": "createTimer", "params": [ 'test', [2012,07,12,4,10], [3,6] ]}], [ { "name": "showNotification", "params": ["Hello Amod"] } ] ]

function cause_creator( data ) {
	// This has to be first

	source = effect_creator( data[ 1 ] );

	$.each( data[ 0 ], function( index, cause ) {

		source += eval( cause[ "name" ] )( cause[ "params" ] );

	});

	console.log( source );
}

function effect_creator( data ) {
	var source = "";
	$.each( data, function( index, effect ) {
		source += eval( effect[ "name" ] )( effect[ "params" ] );
	});

	var functions = "function callback() {";
	$.each( data, function( index, effect ) {
		var func = [
			effect[ "name" ],"();",
		].join("") + "\n";

		functions += func;
	});
	functions += "}";
	return source + functions + "\n";
}

function showNotification( params ) {
	var ret = [
	"function showNotification() {",
		"var notification = device.notifications.createNotification('", params[ 0 ], "');",
	    "notification.show();",
	"}"].join("") + "\n";

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