function max_page_size() {
	// ensures all items are shown

	// get the div with class ant-select-selection-selected-value
	var divs = document.getElementsByClassName("ant-select-selection-selected-value");

	// in the drop-down menu, select the last item
	divs[0].click();
	var items = document.getElementsByClassName("ant-select-dropdown-menu-item");
	items[items.length-1].click();
}

function ensure_correct_page() {
	// ensures the page is https://exam.timeedit.com/ or https://exam.timeedit.com/home
	if (window.location.href != "https://exam.timeedit.com/" || window.location.href != "https://exam.timeedit.com/home") {
		window.location.href = "https://exam.timeedit.com/";
	}
}

function download(filename, text) {
	// from https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

  	document.body.removeChild(element);
}

function get_cal() {
	ensure_correct_page();
	max_page_size();
	var cal = document.getElementsByClassName("ant-table-tbody")[0];
	var cal_rows = cal.getElementsByTagName("tr");
    var tz = "Europe/Amsterdam"

	var cal_text = "BEGIN:VCALENDAR\n";

	// for each row
	for (var i = 0; i < cal_rows.length; i++) {
		// add new line to cal_text
		cal_text += "BEGIN:VEVENT\nSUMMARY:E-Surveillant\n";
		var cal_cols = cal_rows[i].getElementsByTagName("td");

		var date = cal_cols[0].innerText;
		var work_hours = cal_cols[1].innerText;
		var campus = cal_cols[2].innerText;
		var room = cal_cols[3].innerText;
		console.log(date + " " + work_hours + " " + campus + " " + room);
		var work_start = work_hours.split(" - ")[0];
		var work_end = work_hours.split(" - ")[1];
		
		var date_start = date + " " + work_start;
		// format date_start from YYYY-MM-DD HH:MM to YYYYMMDDTHHMM00
		date_start = date_start.replace(/-/g, "").replace(/ /g, "T").replace(/:/g, "").replace(/\s/g, "");

		cal_text += "DTSTART;TZID="+tz+":" + date_start + "00\n";

		var date_end = date + " " + work_end;
		date_end = date_end.replace(/-/g, "").replace(/ /g, "T").replace(/:/g, "").replace(/\s/g, "");
		cal_text += "DTEND;TZID="+tz+":" + date_end + "00\n";

    cal_text += "TZID:"+tz+"\n";

		uid = date_start + campus + room;
    // remove whitespace and special chars
    uid = uid.replace(/\s/g, "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

		cal_text += "UID:" + uid + "\n";

		cal_text += "LOCATION:" + campus + " " + room + "\n";
		cal_text += "END:VEVENT\n";
	}

	cal_text += "END:VCALENDAR\n";

	download("timeedit.ics", cal_text);
}

// if domain equals https://exam.timeedit.com or https://exam.timeedit.com/home
if (window.location.href == "https://exam.timeedit.com/" || window.location.href == "https://exam.timeedit.com/home") {

	// create button and add it to the page
	var button = document.createElement("button");
	button.innerHTML = "Export calendar";
	button.onclick = function() {
		get_cal();
	}

	document.body.appendChild(button);
	button.style.position = "absolute";
	button.style.top = "90%";
	button.style.left = "90%";
	button.style.transform = "translate(-50%, -50%)";
}




