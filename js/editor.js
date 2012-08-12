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
	if($(this).closest('li').css("height") == "90px") {
		$(this).closest('li').animate({height: "400px"});
		$(this).closest('.cause_point').find('.cause_properties').show();
		$(this).find('i').removeClass('icon-pencil').addClass('icon-minus');
	} else {
		$(this).closest('li').animate({height: "90px"});
		$(this).closest('.cause_point').find('.cause_properties').hide();
		$(this).find('i').removeClass('icon-minus').addClass('icon-pencil');
	}

});

$('.close_button').live('click', function() {
	if ($('#lst_causes li').length + $('#lst_effects li').length - 1 === 0) {
		$('#main_screen').fadeIn();
		$('#causal_area').hide();
	}

	$(this).closest('li').fadeOut(200, function() {$(this).remove();});
});

// Causes

function common_adder(target, icon, title, properies_html) {
	$('#main_screen').hide();
	$('#causal_area').show();

	var point = "<div class='cause_point'>";
	point += "<div class='cause_point_header row-fluid'>";

	// Icon
	point += "<div style='float: left;'><img src='images/" + icon + "' style='height: 75px; width: 75px;'></div>";

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

	var class_name = target == 'lst_causes' ? 'each_cause' : 'each_effect';
	point = "<li class='" + class_name + "' data-cause_effect_type='" + title + "' style='display: none'>" + point + "</li>";


	$("#" + target).append(point);
	$("#" + target).find('li:last').fadeIn("1500");

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
	var properties = "<div class='btn-group' data-toggle='buttons-radio'><button data-value='once' class='btn btn-success active schedule_once'>Once</button><button data-value='periodic' class='btn btn-inverse schedule_periodic'>Periodic</button></div> ";
	properties += "<table class='table table-bordered'>";
//	properties += "<tr>";
//	properties += "<th> <input type='radio' checked name='" + ts + "'> Once </th><th><input type='radio' name='" + ts + "'> Periodic </th>";
//	properties += "</tr>";

	properties += "<tr class='schedule_date'>";
	properties += "<th>Date</th><td><input type='text' class='schedule_datepicker' readonly='readonly'></td>";
	properties += "</tr>";

	properties += "<tr class='schedule_time'>";
	properties += "<th>Time</th><td><input type='text' class='span2 hour' style='float: left'> <input type='text' class='span2 minute'> (HH - MM) 24 hour format</td>";
	properties += "</tr>";

	properties += "<tr class='schedule_weekdays'>";
	properties += "<th>Weekdays</th><td><label class='checkbox'><input type='checkbox' value='1'>Monday</label><label class='checkbox'><input type='checkbox' value='2'>Tuesday</label><label class='checkbox'><input type='checkbox' value='3'>Wednesday</label><label class='checkbox'><input type='checkbox' value='4'>Thursday</label><label class='checkbox'><input type='checkbox' value='5'>Friday</label><label class='checkbox'><input type='checkbox' value='6'>Saturday</label><label class='checkbox'><input type='checkbox' value='0'>Sunday</label></select></td>";
	properties += "</tr>";



	properties += "</table>";

	common_adder('lst_causes', 'calendar.png', "Schedule", properties);
	$('.schedule_datepicker').datepicker({"dateFormat": "dd/mm/yy"});
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

	properties = "<div id=" + grid_id + " style='height: 180px;'></div>";
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
	properties = "<div class='cause_battery_level_properties'><div class='cause_battery_level'>50</div><div class='battery_level'></div></div>";
	common_adder('lst_causes', 'battery.png', "Battery Level", properties);

	$('.battery_level').slider({
		value:50,
		min: 0,
		max: 100,
		step: 1,
		slide: function( event, ui ) {
	//		$( "#amount" ).val( "$" + ui.value );

			$(this).closest('.cause_battery_level_properties').find('.cause_battery_level').html(ui.value);

		}
	});
}

function add_cause_unlock() {
	var properties = "";
	common_adder('lst_causes', 'unlock.png', "Unlock", properties);
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
	properties += "<div class='div_effect_sms_body'>Message: <textarea class='effect_sms_body span12'></textarea></div>";
	common_adder('lst_effects', 'sms.png', "Send SMS", properties);

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
	var properties = "<div class='div_effect_notification_body'>Message: <textarea class='effect_notification_body span12'></textarea></div>";

	common_adder('lst_effects', 'notification.png', "Notification", properties);
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
	var properties = "";
	common_adder('lst_effects', 'kill.png', "Kill running apps", properties);
}

//**************//
// Actual Generation code begins
$('#btn_generate_onx').live('click', function() {
	var cause_command = [];
	var effect_command = [];
	var isValid = true;
	$('#error_message').slideUp();

	// First ensure that neither list is empty
	if ($('li.each_cause').length === 0) {
		show_error_message("Please select at least one 'Cause' from the toolbar on the left");
		return false;
	}

	if ($('li.each_effect').length === 0) {
		show_error_message("Please select at least one 'Effect' from the toolbar on the right");
		return false;
	}

	// Go through causes
	$('li.each_cause').each(function(key, value) {
		var cur_type = $(this).data('cause_effect_type');


		switch(cur_type) {
			case 'Schedule': isValid = validate_schedule($(this));
							if (isValid === false) {
								return false;
							} else {
								cause_command.push(isValid);
							}
				break;

			case 'Call Receive': isValid = validate_phone($(this));
							if (!isValid) {
								return false;
							}
					break;

			case 'SMS Receive': isValid = validate_sms($(this));
							if (!isValid) {
								return false;
							}
					break;

			default:
		}
	});

	if (!isValid) {
		return false;
	}

	// Go through effects
	$('li.each_effect').each(function(key, value) {
		var cur_type = $(this).data('cause_effect_type');

		switch(cur_type) {
			case 'Send SMS': isValid = validate_sms($(this));
							if (isValid === false) {
								return false;
							} else {
								effect_command.push(isValid);
							}

							if (nullOrEmpty($(this).find('.effect_sms_body').val())) {
								show_error_message("Please enter the SMS to be sent", $(this));
								return false;
							}
					break;

			case 'Ringer Volume': break;

			case 'Notification':
							var notification_msg = $(this).find('.effect_notification_body').val();

							if (nullOrEmpty(notification_msg)) {
								show_error_message("Please enter notification to be set", $(this));
								return false;
							} else {
								effect_command.push({ "name": "showNotification", "params": [notification_msg] });
							}
					break;

			default:
		}
	});



	if (!isValid) {
		return false;
	}

	display_generated_code(cause_creator([cause_command, effect_command]));
});


function validate_schedule(target) {
	var once_periodic = $(target).find('.btn-group').find('button.active');
	var curHour = parseInt($(target).find('.hour').val(), 10);
	var curMin = parseInt($(target).find('.minute').val(), 10);

	var curDate = "";
	var curMonth = "";
	var curYear = "";

	var curWeek = [];

	if (nullOrEmpty(curHour) || nullOrEmpty(curMin)) {
		show_error_message ("You haven't mentioned the time.", target);
		return false;
	}

	if ($(once_periodic).data('value') == 'once') {
		curDate = $(target).find('.schedule_datepicker').val();
		if (nullOrEmpty(curDate)) {
			show_error_message ("You haven't mentioned the date", target);
			return false;
		} else {
			curDate = curDate.split("/");
			curYear = parseInt(curDate[2], 10);
			curMonth = parseInt(curDate[1], 10) - 1;
			curDate = parseInt(curDate[0], 10);
		}

	} else {
		if ($(target).find('input:checkbox:checked').length === 0) {
			show_error_message ("You haven't selected any weekday", target);
			return false;
		}

		$(target).find('input:checkbox:checked').each(function(key, value) {
			curWeek.push(parseInt($(this).val(), 10));
		});
	}

	var return_value = {"name": "createTimer", "params": [ 'test', [curYear, curMonth, curDate, curHour, curMin], curWeek ]};
	return return_value;

}

function validate_phone(target) {
	var non_empty_count = 0;
	var phone_exp = /^[0-9]{10}$/;
	var isValid = true;

	$(target).find('.eachRow').each(function() {
		var cur_phone = $(this).find('.phone').val();
		if (!nullOrEmpty(cur_phone)) {
			if (!phone_exp.test(cur_phone)) {
				show_error_message ("Invalid phone number found", target);
				isValid = false;
				return false;
			}
			non_empty_count += 1;
		}

	});

	if (!isValid) {
		return false;
	}

	if (non_empty_count === 0) {
		show_error_message ("You haven't entered any phone numbers", target);
		return false;
	} else {
		return true;
	}
}

function validate_sms(target) {
	var isValid = true;
	isValid = validate_phone(target);

	if (isValid === false) {
		return false;
	}

	var phone_numbers = [];
	var sms_body = "";

	$(target).find('.grid_table .eachRow .phone').each(function() {
		phone_numbers.push($(this).val());
	});

	sms_body = $(target).find('.effect_sms_body').val();

	return { "name": "sendSMS", "params": [phone_numbers, sms_body] };
}

function nullOrEmpty(target) {
	if (target === null || target === "" || target === undefined) {
		return true;
	} else {
		return false;
	}
}

function expand_causal_point(target) {
	$(target).animate({height: "400px"});
	$(target).find('.cause_properties').show();
	$(target).find('i.icon-pencil').removeClass('icon-pencil').addClass('icon-minus');
}

function show_error_message(message, target) {
	$("#actual_error_message").html(message);
	$('#error_message').slideDown();

	if (!nullOrEmpty(target)) {
		expand_causal_point($(target));
	}

}

$('#close_error_message').live('click', function() {
	$('#error_message').slideUp();
});


$(document).ready(function() {
	$('.toolbar_icon').each(function() {
		$(this).popover();
	});
});

function prepare_command() {
	//[ {"name": "createTimer", "params": [ 'test', [2012,07,12,4,10], [3,6] ], "callbacks": [ { "name": "showNotification", "params": ["Hello Amod"] } ] } ]
}

function display_generated_code(code) {
	$("#modal_generated_code #generated_code").val(code);
	$("#modal_generated_code").modal();
}