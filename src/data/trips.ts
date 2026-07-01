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
  photos: TripPhoto[]; // exactly 6 slots: [hero, street, detail, walk, candid, closing]
  gallery?: { photos: TripPhoto[]; label: string }; // optional 3-up bonus row
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
        want: 'You in the frame — from behind or side, looking at the city (matches the rest of the site)',
        file: 'nyc-05-candid.jpg',
        caption: 'Proof I was actually there',
      },
      {
        src: '/photos/travel/nyc-06-closing-ferry.jpg',
        want: 'Closing shot — the view you didn’t want to leave',
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
        body: 'Mock copy — how it wrapped up. The last meal, the airport scramble, the one thing you’d go back for. End on the line you’d want someone to remember.',
      },
    ],
  },
];
