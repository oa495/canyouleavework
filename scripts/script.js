document.addEventListener("DOMContentLoaded", function(event) {
	var sentenceStart = document.getElementById("sentence-start");
	var sentenceEnd = document.getElementById("sentence-end");

	var firstSelection = new Awesomplete(sentenceStart, {
		list: ['need to', 'need', 'want', 'want to'],
		minChars: 1,
		maxItems: 5
	});

	var secondSelection = new Awesomplete(sentenceEnd, {
		maxItems: 5,
		minChars: 1
	});
	var nouns = ['a massage', 'a break', 'something not on this list', 'a dentist',
			'a doctor', 'sleep', 'a beer', 'alcohol', 'acupuncture', 'coffee', 'food',
			'an arcade', 'a drink', 'wine'];
	var verbs = ['do something not on this list', 'see a chiropractor',
			'see a dentist', 'sleep', 'play a game', 'relax', 'rest', 'do laundry',
			'see a doctor', 'cut my hair', 'work out', 'exercise',
			'do drycleaning', 'fix my bike/car', 'eat', 'drink', 
			'send a package', 'get my hair done', 'enjoy nature',
			'pet a dog', 'listen to music'];
	
	function populateSecondList(statement) {
		switch (statement) {
			case 'need to':
				secondSelection.list = verbs;
				break;
			case 'need':
				secondSelection.list = nouns;
				break;
			case 'want to':
				secondSelection.list = verbs;
				break;
			case 'want':
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
			examples: ['a nap pod', 'an artisanal coffee bar', 'on-site massages']
	 	},
	  'rest, relax, a break': {
			companies: ['Google', 'Fab', 'Airbnb', 'LinkedIn', 'Twitter'],
			examples: ['a nap pod', 'an indoor treehouse', 'an indoor slide', 'legos', 'Dance Dance Revolution',
			'a wellness center', 'on-site acupuncture', 'on-site massages', 'on-site yoga classes',
			'a rooftop dog park', 'on-site icecream']
	  },
	  'a dentist, see a dentist':{
	  	companies: ['LinkedIn', 'Facebook'],
	  	examples: ['on-site dental']
	  },
	  'chiropractor, see a chiropractor': {
			companies: ['Apple'],
			examples: ['an on-site chiropractor', 'a wellness center']
	  },
	  'a doctor, see a doctor': {
	  	companies: ['Apple'],
	  	examples: ['a wellness center']
	  },
	  'a massage': {
			companies: ['Zynga', 'LinkedIn', 'Google', 'Twilio'],
			examples: ['massage therapy']
	  },
	  'a beer, a drink, alcohol, wine': {
	  	companies: ['Yammer', 'Twitter', 'Apple', 'Zillow', 'Dropbox', 'Facebook'],
	  	examples: ['a sports pub', 'free beer', 'free wine']
	  },
	  'play a game, an arcade': {
	  	companies: ['Zynga', 'Dropbox', 'Facebook', 'Spotify', 'Zappos'],
	  	examples: ['arcade and gaming systems like Xbox 360, PS3 & Nintendo', 'ping pong', 'Dance dance Revolution',
	  	'gaming tournaments']
	  },
	  'coffee': {
	  	companies: ['LinkedIn', 'Twitter'],
	  	examples: ['a coffee bar']
	  },
	  'food, eat': {
	  	companies: ['Fab', 'Zynga', 'StumbleUpon', 'Twitter', 'Facebook', 'Eventbrite', 'Dropbox', 'Airbnb'],
	  	examples: ['a candy shop', 'breakfast', 'a never-ending snack supply', 
	  	'lunch', 'dinner', 'an ice-cream bar']
	  },
	  'exercise, work out': {
	  	companies: ['Yammer', 'Adobe', 'Asana', 'Twitter', 'Airbnb', 'Zillow', 'Ebay', 'Facebook', 'LinkedIn'],
	  	examples: ['a treadmill desk', 'a basketball court', 'volleyball court', 'a gym',
	  	'fitness classes']
	  },
	  'do laundry, do drycleaning': {
	  	companies: ['Facebook'],
	  	examples: ['laundry services', 'dry cleaning services']
	  },
	  'cut my hair, get my hair done': {
	  	companies: ['Zynga'],
	  	examples: ['on-site barbershop', 'a hair stylist']
	  },
	  'something not on this list, do something not on this list': {
	  	companies: ['Google'],
	  	examples: ['a concierge']
	  },
	  'listen to music': {
	  	companies: ['Spotify', 'Pandora'],
	  	examples: ['on-site concerts']
	  },
	  'send a package': {
	  	companies: ['Facebook'],
	  	examples: ['delivery services']
	  },
	  'pet a dog': {
	  	companies: ['Yammer', 'Eventbrite', 'Bark Box', 'Amazon'],
	  	examples: ['bring your dog to work day', 'dog park']
	  },
	  'fix my bike/car': {
	  	companies: ['Google', 'Facebook'],
	  	examples: ['on-site oil change and car wash services', 'bike repair services']
	  },
	  'enjoy nature': {
	  	companies: ['Amazon', 'Airbnb'],
	  	examples: ['a indoor treehouse']
	  }
	});

	function getPerks(need) {
		var statements = ['Lucky for you.', 'You don\'t have to leave! You never have to leave.',
		'Stay right there!', 'Don\'t move a muscle!', 'No need to move.'];
		var perk = perks[need];
		var companies = perk.companies;
		var company = companies[Math.floor(Math.random()*companies.length)];
		var examples = perk.examples;
		var example = examples[Math.floor(Math.random()*examples.length)];
		var statement = statements[Math.floor(Math.random()*statements.length)];
		var message = statement + ' Companies like ' + company + ' have ' + example + ' to meet your needs!';
		var alert = document.getElementsByClassName('alert-message')[0];
		alert.textContent = message;
		(document.getElementsByClassName('alert')[0]).classList.remove('hidden');
	}

	sentenceStart.addEventListener('awesomplete-selectcomplete', function(event) {
		var text = event.text;
		populateSecondList(text.value);
  }, false);

	sentenceEnd.addEventListener('awesomplete-selectcomplete', function(event) {
		var text = event.text;
		getPerks(text.value);
  }, false);

  var cancelAlert = document.getElementsByClassName('exit-alert')[0];
  cancelAlert.addEventListener('click', function(event) {
  	(document.getElementsByClassName('alert')[0]).classList.add('hidden');
  })
});
