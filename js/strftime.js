/**
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.

 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA

 **/

"use strict";

function strftime (fmt, time)
{
	var d = new Date(time*1000);

	var days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
	var fdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
	var fmonths = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	function pad2 (number)
	{
		return (number < 10 ? '0' : '') + number;
	}

	function pad3(number)
	{
		return (number < 10 ? '00' : number < 100 ? '0' : '') + number;
	}

	function format(match, opt)
	{
		if (match === '%%') return '%';

		switch (opt) {
			case 'a':
				return days[d.getUTCDay()];
			case 'A':
				return fdays[d.getUTCDay()];
			case 'b':
				return months[d.getUTCMonth()];
			case 'B':
				return fmonths[d.getUTCMonth()];
			case 'c':
				return d.toLocaleString();
			case 'd':
				return pad2(d.getUTCDate());
			case 'H':
				return pad2(d.getUTCHours());
			case 'I':
				var hours = d.getUTCHours()%12;
				return pad2(hours === 0 ? 12 : hours);
			case 'j':
				var d01 = new Date (d.getUTCFullYear(), 0, 1);
				return pad3(Math.ceil((d.getUTCTime()-d01.getUTCTime())/86400000)+1);
			case 'm':
				return pad2(d.getUTCMonth());
			case 'M':
				return pad2(d.getUTCMinutes());
			case 'p':
				return d.getUTCHours() >= 12 ? 'PM' : 'AM';
			case 's':
				return pad2(d.getUTCSeconds());
			case 'S':
				return d.getUTCTime()/1000;
			case 'u':
				return d.getUTCDay() === 0 ? 7 : d.getUTCDay();
			case 'U':
				var d01 = new Date(d.getUTCFullYear(),0,1);
				return pad2(Math.round((Math.ceil((d.getUTCTime()-d01.getUTCTime())/86400000)+1 + 6 - d.getUTCDay())/7));
			case 'V':
				var d01 = new Date(d.getUTCFullYear(), 0, 1);
				var w = Math.round((Math.ceil((d.getUTCTime()-d01.getUTCTime())/86400000)+1 + 7 - (d.getUTCDay() === 0 ? 7 : d.getUTCDay()))/7);
				var d31 = new Date(d.getUTCFullYear(), 11, 31);
				if (d01.getUTCDay() < 4 && d01.getUTCDay() > 1) w++;
				if (w === 53 && d31.getUTCDay() < 4) {
					w = 1;
				} else if (w === 0) {
					d31 = new Date(d.getUTCFullYear()-1, 11, 31);
					d01 = new Date(d31.getUTCFullYear(), 0, 1);
					w = Math.round((Math.ceil((d31.getUTCTime()-d01.getUTCTime())/86400000)+1 + 7 - (d31.getUTCDay() === 0 ? 7 : d31.getUTCDay()))/7);
					if (d01.getUTCDay() < 4 && d01.getUTCDay() > 1) w++;
					if (w === 53 && d31.getUTCDay() < 4) w = 1;
				}
				return pad2(w);
			case 'w':
				return d.getUTCDay();
			case 'W':
				var d01 = new Date(d.getUTCFullYear(),0,1);
				return pad2(Math.round((Math.ceil((d.getUTCTime()-d01.getUTCTime())/86400000)+1 + 7 - (d.getUTCDay() === 0 ? 7 : d.getUTCDay()))/7));
			case 'x':
				return pad2(d.getUTCDate())+'/'+pad2(d.getUTCMonth())+'/'+d.getUTCFullYear();
			case 'X':
				return pad2(d.getUTCHours())+':'+pad2(d.getUTCMinutes())+':'+pad2(d.getUTCSeconds());
			case 'y':
				return pad2(d.getUTCFullYear()%100);
			case 'Y':
				return d.getUTCFullYear();
			case 'Z':
				return d.toString().replace(/^.*\(([^)]+)\)$/, '$1');
			default:
				return match;
		}
	}
	return fmt.replace(/%([aAbBcdHIjmMpsSUVwWxXyYZ%])/g, format);
}
