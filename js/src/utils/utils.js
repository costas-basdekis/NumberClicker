function elById(id) {
	return document.getElementById(id);
}

function compactNumber(number, maxAfterComma) {
	if (maxAfterComma == undefined) {
		maxAfterComma = 2;
	}
	var suffix = '';
	var suffixes = 'KMGTPEHOND';
	var sign = (number < 0) ? -1 : 1;
	number = Math.abs(number);
	for (var i = 0, suf ; suf = suffixes[i] ; i++) {
		if (number < 1000) {
			break;
		}
		number = number / 1000;
		suffix = suf;
	}
	var integral = parseInt(number), integralLength = integral.toString().length;
	var afterComma = integralLength > maxAfterComma + 1 ? 0 : maxAfterComma + 1 - integralLength;
	var pow = Math.pow(10, afterComma);
	number = parseInt(number * pow) / pow;
	return sign * number + suffix;
}

function compactRate(number, maxAfterComma) {
	var compact = compactNumber(number, maxAfterComma);

	if (number > 0) {
		return '+' + compact;
	} else {
		return compact;
	}
}

function dictFromList(list, keyName) {
	keyName = keyName || 'id';

	var dict = {};
	for (var i = 0, item ; item = list[i] ; i++) {
		var key = item[keyName];
		dict[key] = item;
	}

	return dict;
}

function utf8_to_b64(str) {
    return window.btoa(encodeURIComponent(escape(str)));
}
function b64_to_utf8(str) {
    return unescape(decodeURIComponent(window.atob(str)));
}
