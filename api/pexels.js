const axios = require("axios").default;

const { pexelsKey: API_KEY } = require('../config');

const getDateByWeek = (month, count, dayOfWeek) => {
  let c = 1;
  let date = new Date();
  date.setDate(1);
  date.setMonth(month-1);
  while (date.getDay()+1 !== dayOfWeek || c !== count) {
  	date.setDate(date.getDate()+1);
    if (date.getDay()%7 === dayOfWeek%7) { c++; }
  }
  return [ date.getDate(), date.getMonth()+1 ]
}

const default_list = [
  'nature',
  'ocean',
  'animal',
  'road',
  'plane',
  'city',
  'town',
  'mountain',
  'space'
]

const holidays = {
  world: [
    {
      value: "New year",
      time: {
        start: [ 29, 12 ],
        end: [ 31, 12 ]
      }
    }, {
      value: "New year",
      time: {
        start: [ 1, 1 ],
        end: [ 3, 1 ]
      }
    }, {
      value: "8 march",
      time: {
        start: [ 8, 3 ],
        end: [ 8, 3 ]
      }
    }, {
      value: "Valentine's Day",
      time: {
        start: [ 14, 2 ],
        end: [ 14, 2 ]
      }
    }, {
      value: "Halloween",
      time: {
        start: [ 31, 10 ],
        end: [ 31, 10 ]
      }
    }
  ],
  us: [
    {
      value: "New year",
      time: {
        start: [ 29, 12 ],
        end: [ 31, 12 ]
      }
    }, {
      value: "New year",
      time: {
        start: [ 1, 1 ],
        end: [ 3, 1 ]
      }
    }, {
      value: "Super Bowl",
      time: {
        start: getDateByWeek(2, 1, 1),
        end: getDateByWeek(2, 1, 1)
      }
    }, {
      value: "Valentine's Day",
      time: {
        start: [ 14, 2 ],
        end: [ 14, 2 ]
      }
    }, {
      value: "St. Patrick's Day",
      time: {
        start: [ 17, 3 ],
        end: [ 17, 3 ]
      }
    }, {
      value: "Mother's Day",
      time: {
        start: getDateByWeek(5, 2, 1),
        end: getDateByWeek(5, 2, 1)
      }
    }, {
      value: "Fathers's Day",
      time: {
        start: getDateByWeek(6, 3, 1),
        end: getDateByWeek(6, 3, 1)
      }
    } , {
      value: "Independence Day",
      time: {
        start: [ 4, 7 ],
        end: [ 4, 7 ]
      }
    }, {
      value: "Halloween",
      time: {
        start: [ 31, 10 ],
        end: [ 31, 10 ]
      }
    }, {
      value: "Thanksgiving",
      time: {
        start: getDateByWeek(11, 4, 5),
        end: getDateByWeek(11, 4, 5)
      }
    }, {
      value: "Christmas",
      time: {
        start: [ 24, 12 ],
        end: [ 26, 12 ]
      }
    }
  ],
  ru: [
    {
      value: "New year",
      time: {
        start: [ 29, 12 ],
        end: [ 31, 12 ]
      }
    }, {
      value: "New year",
      time: {
        start: [ 1, 1 ],
        end: [ 5, 1 ]
      }
    }, {
      value: "Christmas",
      time: {
        start: [ 7, 1 ],
        end: [ 7, 1 ]
      }
    }, {
      value: "Education",
      time: {
        start: [ 25, 1 ],
        end: [ 25, 1 ]
      }
    }, {
      value: "8 march",
      time: {
        start: [ 8, 3 ],
        end: [ 8, 3 ]
      }
    }, {
      value: "Labor",
      time: {
        start: [ 1, 5 ],
        end: [ 1, 5 ]
      }
    }, {
      value: "Kremlin",
      time: {
        start: [ 12, 6 ],
        end: [ 12, 6 ]
      }
    }, {
      value: "School",
      time: {
        start: [ 1, 9 ],
        end: [ 1, 9 ]
      }
    }, {
      value: "Kremlin",
      time: {
        start: [ 4, 11 ],
        end: [ 4, 11 ]
      }
    }
  ]
}

const getHoliday = (country) => {
  let date = new Date();
  date = [ date.getDate(), date.getMonth()+1 ];
  // date = [ 8, 3 ];

  for (const h of holidays[country]) {
    if (date[1] >= h.time.start[1] && date[1] <= h.time.end[1]) {
      if (date[0] >= h.time.start[0] && date[0] <= h.time.end[0]) {
        return h.value;
      }
    }
  }
  return null;
}

module.exports = async (holiday) => {

  let n = Math.floor(Math.random()*80);

  let word = ''
  if (holiday === 'default') {
    word = default_list[Math.floor(Math.random()*default_list.length)]
  } else {
    word = getHoliday(holiday);
    if (word === null) return new Promise(resolve => resolve(null));
  }

  const options = {
    method: 'GET',
    url: `https://api.pexels.com/v1/search?query=${word}&size=small&orientation=landscape&per_page=${n+1}`,
    params: {},
    headers: {
      'Authorization': API_KEY
    }
  };

  try {
    const response = await axios.request(options);
    while (n > 0 && !response.data.photos[n]) { n--; }
    return new Promise(resolve => resolve(response.data.photos[n].src.original+'?auto=compress&fit=crop&w=1920&h=1080'));
  } catch (error) {
    return new Promise(resolve => resolve(null));
  }
}
