document.addEventListener("DOMContentLoaded", function(event) {
	var sentenceStart = document.getElementById("sentence-start");
	var sentenceEnd = document.getElementById("sentence-end");

	var firstSelection = new Awesomplete(sentenceStart, {
		list: ['I need to', 'I need'],
		maxItems: 5
	});

	var secondSelection = new Awesomplete(sentenceEnd, {
		maxItems: 5
	});
	var nouns = ['a massage', 'a break', 'something not on this list', 'some ice cream', 'a dentist',
			'a doctor', 'sleep', 'a beer', 'alcohol', 'acupuncture', 'coffee', 'food', 'a treadmill desk',
			'an arcade', 'a drink', 'wine'];
	var verbs = ['do something not on this list', 'see a chiropractor',
			'see a dentist', 'sleep', 'play a game', 'relax', 'rest', 'do laundry',
			'see a doctor', 'cut my hair', 'work out', 'exercise',
			'do drycleaning', 'fix my bike/car', 'eat', 'drink', 
			'send a package', 'change my life', 'get my hair done', 'enjoy nature',
			'pet a dog', 'listen to music'];
	
	function populateSecondList(statement) {
		switch (statement) {
			case 'I need to':
				secondSelection.list = verbs;
				break;
			case 'I need':
				secondSelection.list = nouns;
				break;
		}
	}

	function expand(obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i],
            subkeys = key.split(/,\s?/),
            target = obj[key];
        delete obj[key];
        subkeys.forEach(function(key) { obj[key] = target; })
	    }
	    return obj;
	}

	var perks  = expand({
		'sleep': {
			companies: ['Google'],
			what: ['a nap pod', 'artisanal coffee bar', 'on-site massages']
	 	},
	  'rest, relax, a break': {
			companies: ['Google', 'Fab', 'Airbnb', 'LinkedIn', 'Twitter'],
			what: ['a nap pod', 'indoor treehouse', 'indoor slide', 'legos', 'Dance Dance Revolution',
			'sports pub', 'wellness center', 'on-site acupuncture', 'on-site massages', 'on-site yoga classes',
			'rooftop dog park', 'on-site icecream']
	  },
	  'a dentist, see a dentist':{
	  	companies: ['LinkedIn', 'Facebook'],
	  	what: ['on-site dental']
	  },
	  'chiropractor, see a chiropractor': {
			companies: [],
			what: ['on-site chiropractor', 'wellness center']
	  },
	  'a doctor, see a doctor': {
	  	companies: ['Apple'],
	  	what: ['wellness center']
	  },
	  'a massage': {
			companies: ['Zynga', 'LinkedIn', 'Google', 'Twilio', ''],
	  },
	  'a beer, a drink, alcohol, wine': {
	  	companies: ['Yammer', 'Twitter', 'Apple', 'Zillow', 'Dropbox', 'Facebook'],
	  	what: ['sports pub', 'free beer']
	  },
	  'play a game, an arcade': {
	  	companies: ['Zynga', 'Dropbox', 'Facebook', 'Spotify', 'Zappos'],
	  	what: ['arcade and gaming systems like Xbox 360, PS3 & Nintendo', 'ping pong', 'Dance dance Revolution',
	  	'gaming tournaments']
	  },
	  'coffee': {
	  	companies: ['LinkedIn', 'Twitter'],
	  	what: ['coffee bar']
	  },
	  'food, eat': {
	  	companies: ['Fab', 'Zynga', 'StumbleUpon', 'Twitter', 'Facebook', 'Eventbrite', 'Dropbox', 'Airbnb'],
	  	what: ['a candy shop', 'breakfast', 'never-ending snack supply', 
	  	'lunch', 'dinner', 'ice-cream bar']
	  },
	  'exercise, work out': {
	  	companies: ['Yammer', 'Adobe', 'Asana', 'Twitter', 'Airbnb', 'Zillow', 'Ebay', 'Facebook', 'LinkedIn'],
	  	what: ['a treadmill desk', 'a basketball court', 'volleyball court', 'a gym',
	  	'fitness classes']
	  },
	  'do laundry, do drycleaning': {
	  	companies: ['Facebook'],
	  	what: ['laundry services', 'dry cleaning']
	  },
	  'cut my hair, get my hair done': {
	  	companies: ['Zynga'],
	  	what: ['on-site barbershop', 'a hair stylist']
	  },
	  'something not on this list, do something not on this list': {
	  	companies: ['Google'],
	  	what: ['concierge']
	  },
	  'listen to music': {
	  	companies: ['Spotify', 'Pandora'],
	  	what: ['on-site concerts']
	  },
	  'send a package': {
	  	companies: [],
	  	what: ['delivery services with usps']
	  },
	  'pet a dog': {
	  	companies: ['Yammer', 'Eventbrite', 'Bark Box', 'Amazon'],
	  	what: ['bring your dog to work day', 'dog park']
	  },
	  'fix my bike/car': {
	  	companies: ['Google', 'Facebook'],
	  	what: ['on-site oil change and car wash services', 'bike repair services']
	  },
	  'enjoy nature': {
	  	companies: ['Amazon', 'Airbnb'],
	  	what: ['Indoor treehouse']
	  }
	});

	function getPerks(need) {
		var statements = ['Well lucky for you!', 'You don\'t have to leave! You never have to leave', 'No need to move'];
		var perk = perks[need];
		var company;

		return `${opening}`;
	}

	sentenceStart.addEventListener("awesomplete-selectcomplete", function(event) {
		let text = event.text;
		populateSecondList(text.value);
		
  }, false);

	sentenceEnd.addEventListener("awesomplete-selectcomplete", function(event) {
		let text = event.text;
		getPerks(text);
  }, false);
});