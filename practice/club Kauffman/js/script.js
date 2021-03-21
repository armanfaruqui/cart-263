"use strict";

let options = {
	url: "assets/data/countries.json",

	getValue: "name",

	list: {
		match: {
			enabled: true
		}
	}
};

$("#basics").easyAutocomplete(options);
