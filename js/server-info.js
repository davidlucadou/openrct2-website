/*
OpenRCT2 Server Website Template
Copyright (C) 2018 David Lucadou

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

// Wait until the page is loaded to start
window.onload = function() {
  removeTextModeFooter();
  // Get server info JSON
  var request = new XMLHttpRequest();
  request.open("GET", "/res/server.json", true);
  request.send();


  // Update the server version listed on the page
  request.onreadystatechange = function() {
    if ( request.readyState === 4 && request.status === 200 ) {
      var serverInfo = JSON.parse(request.responseText);
    document.getElementById('buttons') // Select <ul>
      .childNodes[1] // First <li> in <ul> is at index 1
      .children[1] // children[0] is the link to OpenRCT2 releases; [1] = server version div
      .children[0] // children[0] is the <span> inside thie <div>
      .textContent = serverInfo['version'] + ' (as of ' +
        timeSince(new Date(serverInfo['lastUpdated'])) + ' ago)'
    // It took me way to long to figure out how to set this...
    }
  }
}

function timeSince(date) {
  // Source: https://stackoverflow.com/a/3177838

  var seconds = Math.floor((new Date() - convertUTCDateToLocalDate(date)) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

function convertUTCDateToLocalDate(date) {
	// Source https://stackoverflow.com/a/18330682

  var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;   
}

function removeTextModeFooter() {
  // Source https://stackoverflow.com/a/19298575
  // I created this method so people using Links or other text-only browsers would get to see the contents of footer.html

  var textModeElement = document.getElementById("text-mode-footer-link");
  textModeElement.textContent = "";
  delete textModeElement;
}