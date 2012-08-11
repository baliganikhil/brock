// Causes Toolbar

$('#btn_cause_calendar').live('click', add_cause_calendar);
$('#btn_cause_location').live('click', add_cause_location);
$('#btn_cause_moving').live('click', add_cause_moving);
$('#btn_cause_call_receive').live('click', add_cause_call_receive);
$('#btn_cause_sms_receive').live('click', add_cause_sms_receive);
$('#btn_cause_battery_level').live('click', add_cause_battery_level);
$('#btn_cause_unlock').live('click', add_cause_unlock);

// Effects Toolbar
$('#btn_effect_send_sms').live('click', add_effect_send_msg);
$('#btn_effect_add_notification').live('click', add_effect_add_notification);
$('#btn_effect_launch_app').live('click', add_effect_launch_app);
$('#btn_effect_set_ringer').live('click', add_effect_set_ringer);
$('#btn_effect_launch_browser').live('click', add_effect_launch_browser);
$('#btn_effect_kill_app').live('click', add_effect_kill_app);

// Some common code for points

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
	if ($('#lst_causes li').length + $('#lst_effects li').length - 1 === 0) {
		$('#main_screen').fadeIn();
	}

	$(this).closest('li').fadeOut(200, function() {$(this).remove();});
});

// Causes

function common_adder(target, icon, title, properies_html) {
	$('#main_screen').hide();
	$('#div_causes').show();
	$('#div_effects').show();

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


	$("#" + target).append(point);
	$("#" + target).find('li:last').show('slide', {direction: "left"});
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

	common_adder('lst_causes', 'calendar.png', "Schedule", properties);
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
	common_adder('lst_causes', 'call.png', "Call Receive", properties);

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
	common_adder('lst_causes', 'sms.png', "SMS Receive", properties);

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
	properties += "<div>Message: <textarea class='effect_sms_body span12'></textarea></div>";
	common_adder('lst_effects', 'send_sms.png', "Send SMS", properties);

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

function add_effect_add_notification() {

}

function add_effect_launch_app() {

}

function add_effect_set_ringer() {
	properties = "<div class='effect_ringer_vol_properties'><div class='effect_ringer_value'>5</div><div class='ringer_volume'></div></div>";
	common_adder('lst_effects', 'ringer.png', "Ringer Volume", properties);

	$('.ringer_volume').slider({
			value:5,
			min: 0,
			max: 9,
			step: 1,
			slide: function( event, ui ) {
		//		$( "#amount" ).val( "$" + ui.value );
				switch(ui.value) {
					case 0: 
						$(this).closest('.effect_ringer_vol_properties').find('.effect_ringer_value').html('Silent');
						break;

					case 1:
						$(this).closest('.effect_ringer_vol_properties').find('.effect_ringer_value').html('Vibrate');
						break;

					default:
						$(this).closest('.effect_ringer_vol_properties').find('.effect_ringer_value').html(ui.value - 1);
						break;
				}

			}
		});

}

function add_effect_launch_browser() {

}

function add_effect_kill_app() {

}
