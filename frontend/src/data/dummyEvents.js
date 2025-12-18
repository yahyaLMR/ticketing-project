export const DUMMY_EVENTS = [
  {
    _id: 'dummy-1',
    title: 'Grand Rock Concert',
    description: 'Experience the electrifying atmosphere of the Grand Rock Concert. Featuring top bands from around the globe, this event promises a night of unforgettable music and energy. Join thousands of fans for a spectacular show with amazing light effects and sound.',
    category: 'concert',
    date: new Date(Date.now() + 86400000 * 10).toISOString(), // 10 days from now
    location: 'Madison Square Garden, NY',
    price: 120,
    availableSeats: 45,
    totalSeats: 500,
    imageURL: 'https://images.unsplash.com/photo-1470229722913-7c0d2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    _id: 'dummy-2',
    title: 'Champions League Final',
    description: 'Witness history in the making as the two best teams in Europe clash for the ultimate prize. A match filled with passion, skill, and drama. Secure your seat for the most anticipated football match of the year.',
    category: 'football',
    date: new Date(Date.now() + 86400000 * 20).toISOString(),
    location: 'Wembley Stadium, London',
    price: 350,
    availableSeats: 12,
    totalSeats: 1000,
    imageURL: 'https://images.unsplash.com/photo-1504454138361-c7d4338a288a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    _id: 'dummy-3',
    title: 'Sci-Fi Movie Premiere',
    description: 'Be the first to see the most anticipated sci-fi movie of the year. Red carpet event with stars and exclusive behind-the-scenes footage. Immerse yourself in a cinematic masterpiece.',
    category: 'cinema',
    date: new Date(Date.now() + 86400000 * 5).toISOString(),
    location: 'IMAX Theater, LA',
    price: 25,
    availableSeats: 100,
    totalSeats: 200,
    imageURL: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    _id: 'dummy-4',
    title: 'Jazz Night at Blue Note',
    description: 'A relaxing evening of smooth jazz and soulful melodies. Enjoy performances by renowned jazz artists in an intimate setting.',
    category: 'concert',
    date: new Date(Date.now() + 86400000 * 2).toISOString(),
    location: 'Blue Note Jazz Club, NY',
    price: 60,
    availableSeats: 20,
    totalSeats: 150,
    imageURL: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    _id: 'dummy-5',
    title: 'World Cup Qualifier',
    description: 'Cheer for your national team in this crucial World Cup Qualifier match. The stakes are high and the atmosphere will be electric.',
    category: 'football',
    date: new Date(Date.now() + 86400000 * 15).toISOString(),
    location: 'Maracanã Stadium, Rio',
    price: 90,
    availableSeats: 500,
    totalSeats: 2000,
    imageURL: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    _id: 'dummy-6',
    title: 'Classic Film Festival',
    description: 'Revisit the golden age of cinema with a curated selection of classic films. A treat for movie buffs and nostalgia lovers.',
    category: 'cinema',
    date: new Date(Date.now() + 86400000 * 8).toISOString(),
    location: 'The Castro Theatre, SF',
    price: 15,
    availableSeats: 80,
    totalSeats: 400,
    imageURL: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
];
