// Causes Toolbar

$('#btn_cause_calendar').live('click', add_cause_calendar);
$('#btn_cause_location').live('click', add_cause_location);
$('#btn_cause_moving').live('click', add_cause_moving);
$('#btn_cause_call_receive').live('click', add_cause_call_receive);
$('#btn_cause_sms_receive').live('click', add_cause_sms_receive);
$('#btn_cause_battery_level').live('click', add_cause_battery_level);
$('#btn_cause_unlock').live('click', add_cause_unlock);

$('.edit_button').live('click', function() {
	if($(this).closest('li').css("height") == "45px") {
		$(this).closest('li').animate({height: "400px"});
		$(this).closest('.cause_point').find('.cause_properties').show();
		$(this).find('i').removeClass('icon-pencil').addClass('icon-minus');
	} else {
		$(this).closest('li').animate({height: "45px"});
		$(this).closest('.cause_point').find('.cause_properties').hide();
		$(this).find('i').removeClass('icon-minus').addClass('icon-pencil');
	}
	
});

$('.close_button').live('click', function() {
	$(this).closest('li').fadeOut(200, function() {$(this).remove();});
});

// Causes

function common_adder(icon, title, properies_html) {
	var point = "<div class='cause_point'>";
	point += "<div class='cause_point_header row-fluid'>";

	// Icon
	point += "<div class='cause_icon' style='background: url(\"images/" + icon + "\") no-repeat'></div>";

	point += "<div class='cause_title'>";

	// Name
	point += title;

	point += "</div>";
	point += "<button class='btn btn-danger close_button'><i class='icon-remove icon-white'></i>&nbsp;</button>";
	point += "<button class='btn btn-primary edit_button'><i class='icon-pencil icon-white'></i>&nbsp;</button>";
	point += "</div>";

	// Properties
	point += "<div class='cause_properties row-fluid' style='display: none;'>";

	// Actual properties come here
	point += properies_html;

	point += "</div>";
	point += "</div>";

	point = "<li class='each_cause' style='display: none'>" + point + "</li>";


	$("#lst_causes").append(point);
	$("#lst_causes").find('li:last').show('slide', {direction: "left"});
}

$('.schedule_periodic').live('click', function() {
	toggle_scheduler($(this));
});

$('..schedule_once').live('click', function() {
	toggle_scheduler($(this));
});

function toggle_scheduler(hello) {
	$(hello).closest('.cause_properties').find('.schedule_weekdays').toggle();
	$(hello).closest('.cause_properties').find('.schedule_date').toggle();
}

function add_cause_calendar() {
	var properties = "<div class='btn-group' data-toggle='buttons-radio'><button class='btn btn-success active schedule_once'>Once</button><button class='btn btn-danger schedule_periodic'>Periodic</button></div> ";
	properties += "<table class='table table-bordered'>";
//	properties += "<tr>";
//	properties += "<th> <input type='radio' checked name='" + ts + "'> Once </th><th><input type='radio' name='" + ts + "'> Periodic </th>";
//	properties += "</tr>";

	properties += "<tr class='schedule_date'>";
	properties += "<th>Date</th><td><input type='text' class='schedule_datepicker'></td>";
	properties += "</tr>";

	properties += "<tr class='schedule_time'>";
	properties += "<th>Time</th><td><input type='text' class='span2' style='float: left'> <input type='text' class='span2'></td>";
	properties += "</tr>";

	properties += "<tr class='schedule_weekdays'>";
	properties += "<th>Weekdays</th><td><label class='checkbox'><input type='checkbox' value='Monday'>Monday</label><label class='checkbox'><input type='checkbox' value='Tuesday'>Tuesday</label><label class='checkbox'><input type='checkbox' value='Wednesday'>Wednesday</label><label class='checkbox'><input type='checkbox' value='Thursday'>Thursday</label><label class='checkbox'><input type='checkbox' value='Friday'>Friday</label><label class='checkbox'><input type='checkbox' value='Saturday'>Saturday</label><label class='checkbox'><input type='checkbox' value='Sunday'>Sunday</label></select></td>";
	properties += "</tr>";

	

	properties += "</table>";

	common_adder('calendar.png', "Schedule", properties);
	$('.schedule_datepicker').datepicker();
}

function add_cause_location(in_out, latlong, range) {

}

function add_cause_moving() {

}

function add_cause_call_receive() {
	var curDate = new Date();
	var ts = curDate.getTime();
	var grid_id = "phone_nos_" + ts;

	var label = {"phone": "Phone"};

	var data = null;

    // We have added element types - instead of Read Only
	var element_type = {
		"phone": {"type":"text"}
		};

	qbeEnabled = false;

	properties = "<div id=" + grid_id + "></div>";
	common_adder('call.png', "Call Receive", properties);

    renderGrid({
		"id": grid_id,
		"label": label,
		"data": data,
		"element_type": element_type,
		"qbeEnabled": qbeEnabled,
		"container": "table",
		"addVisible": true,
		"deleteVisible": true,
		"actionButtonPosition":"line"
	});


}

function add_cause_sms_receive() {
	var curDate = new Date();
	var ts = curDate.getTime();
	var grid_id = "sms_from_" + ts;

	var label = {"phone": "Phone"};

	var data = null;

    // We have added element types - instead of Read Only
	var element_type = {
		"phone": {"type":"text"}
		};

	qbeEnabled = false;

	properties = "<div id=" + grid_id + "></div>";
	properties += "<div>Contains: <input type='text'></div>";
	common_adder('sms.png', "SMS Receive", properties);

    renderGrid({
		"id": grid_id,
		"label": label,
		"data": data,
		"element_type": element_type,
		"qbeEnabled": qbeEnabled,
		"container": "table",
		"addVisible": true,
		"deleteVisible": true,
		"actionButtonPosition":"line"
	});

}

function add_cause_battery_level() {

}

function add_cause_unlock() {

}


// Effects

function add_effect_send_msg() {

}

function add_effect_add_notification() {

}

function add_effect_launch_app() {

}

function add_effect_set_ringer() {

}

function add_effect_launch_browser() {

}

function add_effect_kill_app() {

}
