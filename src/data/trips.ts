/**
 * Travel journal data. Trips render in array order (oldest → newest journey
 * down the page), each as one fluid scroll chapter on /travel.
 *
 * PHOTOS — two states per slot:
 *  - src set          → shown on the page (files live in public/photos/travel/)
 *  - src undefined    → renders as a "wanted" frame describing the shot +
 *                       the filename to drop into photo-inbox/
 *
 * ✏️ `intro` and `moments` below are still MOCK COPY — swap in the real
 * stories; keep lengths roughly similar so the layout breathes.
 */

export type TripPhoto = {
  src?: string;
  temp?: boolean; // stand-in image, awaiting the real shot
  want: string;
  file: string;
  caption: string;
};

export type TripMoment = {
  day: string;
  heading: string;
  body: string;
};

export type Trip = {
  id: string;
  title: string;
  accent: string; // the word in the title rendered italic + gold
  location: string;
  dates: string;
  coords: string;
  duration: string;
  intro: string;
  photos: TripPhoto[]; // photo slots interspersed with narrative
  gallery?: { photos: TripPhoto[]; label: string }; // optional interlude row
  moments: TripMoment[];
};

export const trips: Trip[] = [
  {
    id: 'nyc-2026',
    title: 'New York City',
    accent: 'City',
    location: 'New York, USA',
    dates: 'May 15 — 18, 2026',
    coords: '40.71° N, 74.00° W',
    duration: '4 days',
    intro:
      'Mock intro — two or three sentences on how the trip started: who you went with, the first thing you saw coming out of the station, the feeling of arriving somewhere that moves faster than you do.',
    photos: [
      {
        src: '/photos/travel/nyc-01-hero-dusk.jpg',
        want: 'Wide establishing shot — skyline at dusk',
        file: 'nyc-01-hero-dusk.jpg',
        caption: 'Hudson Yards, first dusk',
      },
      {
        src: '/photos/travel/nyc-02-street-timessquare.jpg',
        want: 'Street-level night shot',
        file: 'nyc-02-street-timessquare.jpg',
        caption: 'Times Square after dark',
      },
      {
        src: '/photos/travel/nyc-03-detail-pizza.jpg',
        want: 'Close-up detail — food',
        file: 'nyc-03-detail-pizza.jpg',
        caption: 'The obligatory slice, upgraded',
      },
      {
        src: '/photos/travel/nyc-04-walk-dumbo.jpg',
        want: 'A "we walked here" shot at golden hour',
        file: 'nyc-04-walk-dumbo.jpg',
        caption: 'Golden hour over the East River',
      },
      {
        src: '/photos/travel/nyc-06-closing-ferry.jpg',
        want: 'Closing shot — the view you didn\'t want to leave',
        file: 'nyc-06-closing-ferry.jpg',
        caption: 'From the ferry — one seagull photobombed',
      },
    ],
    gallery: {
      label: 'Interlude — The Met',
      photos: [
        {
          src: '/photos/travel/nyc-07-met-facade.jpg',
          want: 'Museum facade',
          file: 'nyc-07-met-facade.jpg',
          caption: 'Fifth Avenue steps',
        },
        {
          src: '/photos/travel/nyc-08-met-court.jpg',
          want: 'Museum interior',
          file: 'nyc-08-met-court.jpg',
          caption: 'The sculpture court',
        },
        {
          src: '/photos/travel/nyc-09-met-papyrus.jpg',
          want: 'Museum detail',
          file: 'nyc-09-met-papyrus.jpg',
          caption: 'Three thousand years, still legible',
        },
      ],
    },
    moments: [
      {
        day: 'Day 01 — 02',
        heading: 'Getting our bearings',
        body: 'Mock copy — where you stayed, the first neighbourhoods you covered, the thing that surprised you most in the first 48 hours. Two to four sentences reads best here.',
      },
      {
        day: 'Day 03',
        heading: 'The long walk',
        body: 'Mock copy — the big day: the walk, the museum, the game, the show, whatever anchored the trip. This block sits between photos, so a short story beats a list.',
      },
      {
        day: 'Day 04',
        heading: 'Last light',
        body: 'Mock copy — how it wrapped up. The last meal, the airport scramble, the one thing you\'d go back for. End on the line you\'d want someone to remember.',
      },
    ],
  },
  {
    id: 'italy-2026',
    title: 'Across the Italian Canvas',
    accent: 'Italian',
    location: 'Venice → Rome',
    dates: 'April 24 — May 1, 2026',
    coords: '41.90° N, 12.50° E',
    duration: '8 days',
    intro:
      'From the impossible city of water to the eternal capital. Eight days threading through Venice\'s impossibly narrow passages, descending into Pompeii\'s frozen moment, tracing the cliffside roads of the Amalfi Coast, and finally standing in the heart of Rome where every corner tells a story older than you.',
    photos: [
      {
        src: '/photos/travel/italy-01-venice-opening.jpg',
        want: 'Venice establishing shot — canal with gondolas or bridge at golden hour',
        file: 'italy-01-venice-opening.jpg',
        caption: 'Where the sea refuses to stay out',
      },
      {
        src: '/photos/travel/italy-02-naples-street.jpg',
        want: 'A moment in the streets of Naples — street food, vibrant chaos, or a narrow alley',
        file: 'italy-02-naples-street.jpg',
        caption: 'The heartbeat of the south',
      },
      {
        src: '/photos/travel/italy-03-pompeii-detail.jpg',
        want: 'Pompeii detail — ancient mosaic, a doorway, or eroded stone',
        file: 'italy-03-pompeii-detail.jpg',
        caption: 'Frozen in ash, speaking across centuries',
      },
      {
        src: '/photos/travel/italy-04-amalfi-vista.jpg',
        want: 'Amalfi Coast vista — clifftop view, terraced buildings, or sea-level perspective',
        file: 'italy-04-amalfi-vista.jpg',
        caption: 'Where the land refuses to end gracefully',
      },
      {
        src: '/photos/travel/italy-05-rome-eternal.jpg',
        want: 'Rome monument — Colosseum, Vatican, or a quiet piazza at dusk',
        file: 'italy-05-rome-eternal.jpg',
        caption: 'The empire still stands, if you know where to look',
      },
    ],
    gallery: {
      label: 'Interlude — Moments in Light',
      photos: [
        {
          src: '/photos/travel/italy-06-venice-detail.jpg',
          want: 'Venice detail shot',
          file: 'italy-06-venice-detail.jpg',
          caption: 'Venice whispers in doorways',
        },
        {
          src: '/photos/travel/italy-07-coast-detail.jpg',
          want: 'Amalfi Coast detail',
          file: 'italy-07-coast-detail.jpg',
          caption: 'Where terraces meet sky',
        },
        {
          src: '/photos/travel/italy-08-rome-detail.jpg',
          want: 'Rome detail shot',
          file: 'italy-08-rome-detail.jpg',
          caption: 'Rome\'s quiet corners tell stories',
        },
      ],
    },
    moments: [
      {
        day: 'Day 01 — 02',
        heading: 'Sinking into Venice',
        body: 'You step off the vaporetto and realize the water is not a feature—it\'s the foundation. Venice doesn\'t sit on the water; it breathes with it. Every canal is a street, every bridge a conversation. By the second day, you stop checking maps. Getting lost is the point.',
      },
      {
        day: 'Day 03 — 05',
        heading: 'The Ancient South',
        body: 'Naples hits you first—loud, vivid, alive. Then you descend into Pompeii and everything stops. The preserved loaves of bread. The hollow spaces left by bodies. 79 AD and 2026 collapse into a single moment. The Amalfi Coast rewards the winding drive: impossible views, fresh seafood, the kind of beauty that makes you understand why people write poetry.',
      },
      {
        day: 'Day 06 — 08',
        heading: 'Rome Doesn\'t Ask Permission',
        body: 'The city announces itself before you arrive. Rome doesn\'t whisper—it proclaims. The Colosseum, the Vatican, the quiet piazzas where locals sit as if they\'re not surrounded by the greatest empire ever built. You leave knowing you\'ll spend a lifetime understanding what you saw in a week.',
      },
    ],
  },
];
