import type { Movie, Filters } from "../types";

const UNS = "https://images.unsplash.com/";

function poster(id: string) {
  return `${UNS}${id}?w=400&h=600&fit=crop&auto=format&q=80`;
}
function backdrop(id: string) {
  return `${UNS}${id}?w=1400&h=700&fit=crop&auto=format&q=80`;
}

export const MOVIES: Movie[] = [
  {
    id: 1,
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    duration: "2h 49m",
    durationMins: 169,
    genres: ["Sci-Fi", "Drama"],
    poster: poster("photo-1677926405168-fa86268b7295"),
    backdrop: backdrop("photo-1502134249126-9f3755a50d78"),
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. A stunning meditation on love, time, and the cosmos.",
    director: "Christopher Nolan",
    moods: ["emotional", "mind-blown", "relaxed"],
    situations: ["alone", "partner"],
    energyLevel: 2,
    moodTags: ["Emotional", "Thought-provoking", "Epic", "Hopeful"],
    matchReasons: [
      "Matches your thoughtful, emotional mood",
      "Slow-burn storytelling",
      "Perfect for watching alone",
      "Highly rated masterpiece",
    ],
    streamingOn: ["netflix", "prime"],
    cast: [
      { name: "Matthew McConaughey", character: "Cooper", photo: poster("photo-1637059880830-59a90102de77") },
      { name: "Anne Hathaway", character: "Brand", photo: poster("photo-1759354192456-71975b190c51") },
      { name: "Jessica Chastain", character: "Murph", photo: poster("photo-1778710878550-04ef905c163a") },
    ],
    ageRating: "PG-13",
    era: "2010s",
  },
  {
    id: 2,
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
    rating: 8.3,
    duration: "1h 48m",
    durationMins: 108,
    genres: ["Drama", "Romance", "Sci-Fi"],
    poster: poster("photo-1464457312035-3d7d0e0c058e"),
    backdrop: backdrop("photo-1483982258113-b72862e6cff6"),
    description:
      "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories. But love is not so easily forgotten.",
    director: "Michel Gondry",
    moods: ["emotional", "lonely", "romantic"],
    situations: ["alone", "partner"],
    energyLevel: 1,
    moodTags: ["Melancholy", "Romantic", "Surreal", "Bittersweet"],
    matchReasons: [
      "Perfectly captures loneliness and longing",
      "Emotionally resonant storytelling",
      "Great for quiet, reflective nights",
      "Critically acclaimed",
    ],
    streamingOn: ["hulu", "prime"],
    cast: [
      { name: "Jim Carrey", character: "Joel Barish", photo: poster("photo-1592700819903-308f4820372d") },
      { name: "Kate Winslet", character: "Clementine", photo: poster("photo-1759354192456-71975b190c51") },
    ],
    ageRating: "R",
    era: "2000s",
  },
  {
    id: 3,
    title: "Her",
    year: 2013,
    rating: 8.0,
    duration: "2h 6m",
    durationMins: 126,
    genres: ["Drama", "Romance", "Sci-Fi"],
    poster: poster("photo-1599060052009-24d6d0b0161c"),
    backdrop: backdrop("photo-1517328894681-0f5dfabd463c"),
    description:
      "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    director: "Spike Jonze",
    moods: ["lonely", "romantic", "emotional"],
    situations: ["alone"],
    energyLevel: 1,
    moodTags: ["Lonely", "Tender", "Futuristic", "Thought-provoking"],
    matchReasons: [
      "Captures loneliness beautifully",
      "Perfect solo watch",
      "Emotionally intelligent",
      "Slow-burn love story",
    ],
    streamingOn: ["netflix", "apple"],
    cast: [
      { name: "Joaquin Phoenix", character: "Theodore", photo: poster("photo-1637059880830-59a90102de77") },
      { name: "Scarlett Johansson", character: "Samantha (voice)", photo: poster("photo-1506813293631-ce71f060a35b") },
    ],
    ageRating: "R",
    era: "2010s",
  },
  {
    id: 4,
    title: "Parasite",
    year: 2019,
    rating: 8.6,
    duration: "2h 12m",
    durationMins: 132,
    genres: ["Drama", "Thriller", "Comedy"],
    poster: poster("photo-1670702146868-bc7797ef47a5"),
    backdrop: backdrop("photo-1670702146868-bc7797ef47a5"),
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    director: "Bong Joon-ho",
    moods: ["mind-blown", "scared"],
    situations: ["alone", "friends", "partner"],
    energyLevel: 3,
    moodTags: ["Tense", "Dark", "Satirical", "Shocking"],
    matchReasons: [
      "Mind-bending social commentary",
      "Unpredictable plot twists",
      "Perfect for discussion after",
      "Oscar Best Picture winner",
    ],
    streamingOn: ["hulu", "prime"],
    cast: [
      { name: "Song Kang-ho", character: "Ki-taek", photo: poster("photo-1637059880830-59a90102de77") },
      { name: "Cho Yeo-jeong", character: "Yeon-kyo", photo: poster("photo-1759354192456-71975b190c51") },
    ],
    ageRating: "R",
    era: "2010s",
  },
  {
    id: 5,
    title: "Arrival",
    year: 2016,
    rating: 7.9,
    duration: "1h 56m",
    durationMins: 116,
    genres: ["Sci-Fi", "Drama", "Mystery"],
    poster: poster("photo-1502134249126-9f3755a50d78"),
    backdrop: backdrop("photo-1677926405168-fa86268b7295"),
    description:
      "When mysterious spacecraft touch down across the globe, a linguist is recruited by the military to communicate with the alien visitors.",
    director: "Denis Villeneuve",
    moods: ["mind-blown", "emotional", "relaxed"],
    situations: ["alone", "partner"],
    energyLevel: 2,
    moodTags: ["Cerebral", "Emotional", "Mysterious", "Hopeful"],
    matchReasons: [
      "Deeply moving sci-fi",
      "Slow-paced and thoughtful",
      "Perfect for quiet evenings",
      "One of the best of the decade",
    ],
    streamingOn: ["netflix", "prime"],
    cast: [
      { name: "Amy Adams", character: "Louise Banks", photo: poster("photo-1776275459073-25a6b864c483") },
      { name: "Jeremy Renner", character: "Ian Donnelly", photo: poster("photo-1592700819903-308f4820372d") },
    ],
    ageRating: "PG-13",
    era: "2010s",
  },
  {
    id: 6,
    title: "Moonlight",
    year: 2016,
    rating: 7.4,
    duration: "1h 51m",
    durationMins: 111,
    genres: ["Drama"],
    poster: poster("photo-1542460533-50ac46fb13d7"),
    backdrop: backdrop("photo-1615966650071-855b15f29ad1"),
    description:
      "A young man's journey of self-discovery told across three defining chapters of his life — childhood, adolescence, and adulthood.",
    director: "Barry Jenkins",
    moods: ["emotional", "lonely", "relaxed"],
    situations: ["alone"],
    energyLevel: 1,
    moodTags: ["Tender", "Identity", "Lonely", "Beautiful"],
    matchReasons: [
      "Quietly devastating and beautiful",
      "Best Picture Oscar winner",
      "Perfect for solitary reflection",
      "Slow, meaningful storytelling",
    ],
    streamingOn: ["netflix", "prime"],
    cast: [
      { name: "Trevante Rhodes", character: "Chiron", photo: poster("photo-1637059880830-59a90102de77") },
      { name: "André Holland", character: "Kevin", photo: poster("photo-1592700819903-308f4820372d") },
    ],
    ageRating: "R",
    era: "2010s",
  },
  {
    id: 7,
    title: "Mad Max: Fury Road",
    year: 2015,
    rating: 8.1,
    duration: "2h 0m",
    durationMins: 120,
    genres: ["Action", "Adventure", "Sci-Fi"],
    poster: poster("photo-1759230766134-e3ff1c27d20e"),
    backdrop: backdrop("photo-1759230766134-e3ff1c27d20e"),
    description:
      "In a post-apocalyptic wasteland, Max teams with Furiosa in a daring attempt to reach her childhood homeland in an unending high-octane chase.",
    director: "George Miller",
    moods: ["angry", "high-energy"],
    situations: ["friends", "partner"],
    energyLevel: 4,
    moodTags: ["Intense", "High-octane", "Feminist", "Epic"],
    matchReasons: [
      "Pure adrenaline from start to finish",
      "Perfect for high-energy nights",
      "Stunning practical effects",
      "Greatest action film of the decade",
    ],
    streamingOn: ["hbo", "prime"],
    cast: [
      { name: "Tom Hardy", character: "Max Rockatansky", photo: poster("photo-1637059880830-59a90102de77") },
      { name: "Charlize Theron", character: "Imperator Furiosa", photo: poster("photo-1778710878550-04ef905c163a") },
    ],
    ageRating: "R",
    era: "2010s",
  },
  {
    id: 8,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    duration: "2h 22m",
    durationMins: 142,
    genres: ["Drama"],
    poster: poster("photo-1762541693135-fb989de961e1"),
    backdrop: backdrop("photo-1766844649143-af98d71e346b"),
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    director: "Frank Darabont",
    moods: ["emotional", "relaxed"],
    situations: ["alone", "partner", "friends"],
    energyLevel: 2,
    moodTags: ["Hopeful", "Emotional", "Classic", "Inspiring"],
    matchReasons: [
      "The greatest drama ever made",
      "Profoundly moving and hopeful",
      "Works for any viewing situation",
      "IMDb #1 rated film",
    ],
    streamingOn: ["netflix", "hbo"],
    cast: [
      { name: "Tim Robbins", character: "Andy Dufresne", photo: poster("photo-1592700819903-308f4820372d") },
      { name: "Morgan Freeman", character: "Ellis Boyd 'Red' Redding", photo: poster("photo-1637059880830-59a90102de77") },
    ],
    ageRating: "R",
    era: "1990s",
  },
  {
    id: 9,
    title: "Everything Everywhere All at Once",
    year: 2022,
    rating: 7.8,
    duration: "2h 19m",
    durationMins: 139,
    genres: ["Action", "Comedy", "Sci-Fi"],
    poster: poster("photo-1776275459073-25a6b864c483"),
    backdrop: backdrop("photo-1776275459073-25a6b864c483"),
    description:
      "A middle-aged Chinese immigrant is swept up in an insane adventure where she alone can save the multiverse by connecting with the lives she could have led.",
    director: "Daniel Kwan, Daniel Scheinert",
    moods: ["mind-blown", "funny", "emotional"],
    situations: ["alone", "friends", "partner"],
    energyLevel: 4,
    moodTags: ["Chaotic", "Heartfelt", "Surreal", "Funny"],
    matchReasons: [
      "One of the most original films ever made",
      "Hilarious and deeply moving",
      "Best Picture Oscar winner",
      "Perfect for an adventurous night",
    ],
    streamingOn: ["netflix", "prime"],
    cast: [
      { name: "Michelle Yeoh", character: "Evelyn Wang", photo: poster("photo-1759354192456-71975b190c51") },
      { name: "Ke Huy Quan", character: "Waymond Wang", photo: poster("photo-1592700819903-308f4820372d") },
    ],
    ageRating: "R",
    era: "2020s",
  },
  {
    id: 10,
    title: "Past Lives",
    year: 2023,
    rating: 7.9,
    duration: "1h 46m",
    durationMins: 106,
    genres: ["Drama", "Romance"],
    poster: poster("photo-1591969851586-adbbd4accf81"),
    backdrop: backdrop("photo-1542460533-50ac46fb13d7"),
    description:
      "Two childhood sweethearts reunite in New York City after two decades apart, forcing them to confront their choices and the lives they could have had.",
    director: "Celine Song",
    moods: ["emotional", "lonely", "romantic"],
    situations: ["alone", "partner"],
    energyLevel: 1,
    moodTags: ["Bittersweet", "Romantic", "Quiet", "Profound"],
    matchReasons: [
      "Achingly beautiful love story",
      "Perfect for a quiet, emotional night",
      "One of the best films of 2023",
      "Will stay with you for days",
    ],
    streamingOn: ["prime", "apple"],
    cast: [
      { name: "Greta Lee", character: "Nora", photo: poster("photo-1759354192456-71975b190c51") },
      { name: "Teo Yoo", character: "Hae Sung", photo: poster("photo-1637059880830-59a90102de77") },
    ],
    ageRating: "PG-13",
    era: "2020s",
  },
  {
    id: 11,
    title: "Oppenheimer",
    year: 2023,
    rating: 8.3,
    duration: "3h 0m",
    durationMins: 180,
    genres: ["Drama", "History", "Thriller"],
    poster: poster("photo-1637059880830-59a90102de77"),
    backdrop: backdrop("photo-1721062621903-d9ceeb5c3ba6"),
    description:
      "The story of J. Robert Oppenheimer, the theoretical physicist who helped develop the first nuclear weapons and grappled with the consequences.",
    director: "Christopher Nolan",
    moods: ["mind-blown", "angry", "emotional"],
    situations: ["alone", "partner", "friends"],
    energyLevel: 3,
    moodTags: ["Intense", "Historical", "Moral", "Epic"],
    matchReasons: [
      "Stunning biographical epic",
      "Morally complex and gripping",
      "Cillian Murphy's career-best performance",
      "Christopher Nolan at his finest",
    ],
    streamingOn: ["netflix", "prime"],
    cast: [
      { name: "Cillian Murphy", character: "J. Robert Oppenheimer", photo: poster("photo-1637059880830-59a90102de77") },
      { name: "Emily Blunt", character: "Katherine Oppenheimer", photo: poster("photo-1778710878550-04ef905c163a") },
      { name: "Robert Downey Jr.", character: "Lewis Strauss", photo: poster("photo-1592700819903-308f4820372d") },
    ],
    ageRating: "R",
    era: "2020s",
  },
  {
    id: 12,
    title: "The Lighthouse",
    year: 2019,
    rating: 7.5,
    duration: "1h 49m",
    durationMins: 109,
    genres: ["Horror", "Drama", "Mystery"],
    poster: poster("photo-1486707471592-8e7eb7e36f78"),
    backdrop: backdrop("photo-1464457312035-3d7d0e0c058e"),
    description:
      "Two lighthouse keepers try to maintain their sanity while living on a remote New England island in the 1890s as a mysterious storm strands them.",
    director: "Robert Eggers",
    moods: ["scared", "mind-blown"],
    situations: ["alone"],
    energyLevel: 2,
    moodTags: ["Dark", "Surreal", "Claustrophobic", "Mythic"],
    matchReasons: [
      "Unsettling and deeply atmospheric",
      "Perfect for a dark, adventurous night",
      "Unforgettable performances",
      "Visually unlike anything else",
    ],
    streamingOn: ["prime", "hulu"],
    cast: [
      { name: "Willem Dafoe", character: "Thomas Wake", photo: poster("photo-1592700819903-308f4820372d") },
      { name: "Robert Pattinson", character: "Ephraim Winslow", photo: poster("photo-1637059880830-59a90102de77") },
    ],
    ageRating: "R",
    era: "2010s",
  },
  {
    id: 13,
    title: "Portrait of a Lady on Fire",
    year: 2019,
    rating: 8.1,
    duration: "2h 2m",
    durationMins: 122,
    genres: ["Drama", "Romance"],
    poster: poster("photo-1778710878550-04ef905c163a"),
    backdrop: backdrop("photo-1506813293631-ce71f060a35b"),
    description:
      "On an isolated island in Brittany at the end of the 18th century, a female painter is hired to do a wedding portrait of a young woman.",
    director: "Céline Sciamma",
    moods: ["romantic", "emotional"],
    situations: ["alone", "partner"],
    energyLevel: 1,
    moodTags: ["Romantic", "Slow burn", "Artistic", "Intimate"],
    matchReasons: [
      "A slow-burn love story of rare beauty",
      "Perfect for a quiet, emotional evening",
      "Cannes Best Screenplay winner",
      "Stunningly crafted",
    ],
    streamingOn: ["hulu", "criterion"],
    cast: [
      { name: "Noémie Merlant", character: "Marianne", photo: poster("photo-1759354192456-71975b190c51") },
      { name: "Adèle Haenel", character: "Héloïse", photo: poster("photo-1506813293631-ce71f060a35b") },
    ],
    ageRating: "NR",
    era: "2010s",
  },
  {
    id: 14,
    title: "La La Land",
    year: 2016,
    rating: 8.0,
    duration: "2h 8m",
    durationMins: 128,
    genres: ["Drama", "Romance", "Music"],
    poster: poster("photo-1615966650071-855b15f29ad1"),
    backdrop: backdrop("photo-1591969851586-adbbd4accf81"),
    description:
      "While navigating their careers in Los Angeles, a pianist and an actress fall in love — and must confront the tension between art and love.",
    director: "Damien Chazelle",
    moods: ["romantic", "emotional", "happy"],
    situations: ["partner", "alone"],
    energyLevel: 2,
    moodTags: ["Romantic", "Dreamy", "Bittersweet", "Musical"],
    matchReasons: [
      "A love letter to dreamers everywhere",
      "Beautiful music and cinematography",
      "Perfect for date night or solo",
      "Emotionally unforgettable ending",
    ],
    streamingOn: ["netflix", "hulu"],
    cast: [
      { name: "Ryan Gosling", character: "Sebastian", photo: poster("photo-1592700819903-308f4820372d") },
      { name: "Emma Stone", character: "Mia", photo: poster("photo-1759354192456-71975b190c51") },
    ],
    ageRating: "PG-13",
    era: "2010s",
  },
  {
    id: 15,
    title: "Blade Runner 2049",
    year: 2017,
    rating: 8.0,
    duration: "2h 44m",
    durationMins: 164,
    genres: ["Sci-Fi", "Drama", "Mystery"],
    poster: poster("photo-1516900557549-41557d405adf"),
    backdrop: backdrop("photo-1599060052009-24d6d0b0161c"),
    description:
      "A young blade runner discovers a long-buried secret that leads him to track down former blade runner Rick Deckard in this breathtaking sequel.",
    director: "Denis Villeneuve",
    moods: ["mind-blown", "relaxed", "lonely"],
    situations: ["alone"],
    energyLevel: 2,
    moodTags: ["Atmospheric", "Slow burn", "Visual", "Philosophical"],
    matchReasons: [
      "The most visually stunning film of the decade",
      "Perfect for atmospheric late nights",
      "Deeply meditative sci-fi",
      "Roger Deakins at peak cinematography",
    ],
    streamingOn: ["netflix", "hbo"],
    cast: [
      { name: "Ryan Gosling", character: "K", photo: poster("photo-1592700819903-308f4820372d") },
      { name: "Harrison Ford", character: "Rick Deckard", photo: poster("photo-1637059880830-59a90102de77") },
      { name: "Ana de Armas", character: "Joi", photo: poster("photo-1759354192456-71975b190c51") },
    ],
    ageRating: "R",
    era: "2010s",
  },
  {
    id: 16,
    title: "Whiplash",
    year: 2014,
    rating: 8.5,
    duration: "1h 47m",
    durationMins: 107,
    genres: ["Drama", "Music"],
    poster: poster("photo-1592700819903-308f4820372d"),
    backdrop: backdrop("photo-1762541693135-fb989de961e1"),
    description:
      "A promising young drummer enrolls at a cutthroat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing.",
    director: "Damien Chazelle",
    moods: ["angry", "high-energy", "emotional"],
    situations: ["alone"],
    energyLevel: 4,
    moodTags: ["Intense", "Ambitious", "Tense", "Visceral"],
    matchReasons: [
      "One of the most intense films ever made",
      "Perfect for high-energy, driven moods",
      "Jaw-dropping finale",
      "J.K. Simmons is terrifying",
    ],
    streamingOn: ["netflix", "prime"],
    cast: [
      { name: "Miles Teller", character: "Andrew Neiman", photo: poster("photo-1637059880830-59a90102de77") },
      { name: "J.K. Simmons", character: "Terence Fletcher", photo: poster("photo-1592700819903-308f4820372d") },
    ],
    ageRating: "R",
    era: "2010s",
  },
  {
    id: 17,
    title: "Get Out",
    year: 2017,
    rating: 7.7,
    duration: "1h 44m",
    durationMins: 104,
    genres: ["Horror", "Thriller", "Mystery"],
    poster: poster("photo-1759354192456-71975b190c51"),
    backdrop: backdrop("photo-1630695230041-8909e3204778"),
    description:
      "A young African-American visits his white girlfriend's parents for the weekend, where his increasing unease eventually leads to a terrifying revelation.",
    director: "Jordan Peele",
    moods: ["scared", "mind-blown"],
    situations: ["friends", "partner", "alone"],
    energyLevel: 3,
    moodTags: ["Terrifying", "Social commentary", "Tense", "Shocking"],
    matchReasons: [
      "The scariest social horror of the decade",
      "Endlessly rewatchable and discussable",
      "Academy Award-winning screenplay",
      "Perfect for adventurous group viewing",
    ],
    streamingOn: ["hbo", "prime"],
    cast: [
      { name: "Daniel Kaluuya", character: "Chris Washington", photo: poster("photo-1637059880830-59a90102de77") },
      { name: "Allison Williams", character: "Rose Armitage", photo: poster("photo-1759354192456-71975b190c51") },
    ],
    ageRating: "R",
    era: "2010s",
  },
  {
    id: 18,
    title: "Spirited Away",
    year: 2001,
    rating: 8.6,
    duration: "2h 4m",
    durationMins: 124,
    genres: ["Animation", "Fantasy", "Adventure"],
    poster: poster("photo-1630695230041-8909e3204778"),
    backdrop: backdrop("photo-1548853879-e3135725174c"),
    description:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
    director: "Hayao Miyazaki",
    moods: ["mind-blown", "happy", "relaxed"],
    situations: ["family", "alone", "friends"],
    energyLevel: 2,
    moodTags: ["Magical", "Wondrous", "Nostalgic", "Heartwarming"],
    matchReasons: [
      "The greatest animated film ever made",
      "Perfect for all moods and company",
      "A world unlike any other",
      "Academy Award-winning masterpiece",
    ],
    streamingOn: ["netflix", "hbo"],
    cast: [
      { name: "Daveigh Chase", character: "Chihiro (voice)", photo: poster("photo-1759354192456-71975b190c51") },
    ],
    ageRating: "PG",
    era: "2000s",
  },
];

export function getRecommendations(filters: Filters): (Movie & { match: number })[] {
  const hasFilters =
    filters.moods.length > 0 ||
    filters.situations.length > 0 ||
    filters.genres.length > 0 ||
    filters.energyLevel > 0 ||
    filters.watchTime !== "" ||
    filters.era !== "";

  return MOVIES.map((movie) => {
    if (!hasFilters) return { ...movie, match: 75 + Math.floor(Math.random() * 20) };

    let score = 0;
    let weight = 0;

    if (filters.moods.length > 0) {
      weight += 3;
      const overlap = filters.moods.filter((m) => movie.moods.includes(m)).length;
      score += (overlap / filters.moods.length) * 3;
    }

    if (filters.situations.length > 0) {
      weight += 2;
      const overlap = filters.situations.filter((s) => movie.situations.includes(s)).length;
      score += (overlap / filters.situations.length) * 2;
    }

    if (filters.genres.length > 0) {
      weight += 2;
      const overlap = filters.genres.filter((g) => movie.genres.includes(g)).length;
      score += (overlap / filters.genres.length) * 2;
    }

    if (filters.energyLevel > 0) {
      weight += 2;
      const diff = Math.abs(movie.energyLevel - filters.energyLevel);
      score += diff === 0 ? 2 : diff === 1 ? 1.2 : diff === 2 ? 0.5 : 0;
    }

    if (filters.watchTime) {
      weight += 1;
      const passes =
        (filters.watchTime === "under90" && movie.durationMins < 90) ||
        (filters.watchTime === "under120" && movie.durationMins < 120) ||
        (filters.watchTime === "over120" && movie.durationMins >= 120) ||
        filters.watchTime === "any";
      if (passes) score += 1;
    }

    if (filters.era && filters.era !== "any") {
      weight += 1;
      if (movie.era === filters.era) score += 1;
    }

    const base = weight > 0 ? score / weight : 0.6;
    const match = Math.round(50 + base * 48);
    return { ...movie, match: Math.min(99, match) };
  }).sort((a, b) => (b.match ?? 0) - (a.match ?? 0));
}

export const STREAMING_LOGOS: Record<string, { label: string; color: string }> = {
  netflix: { label: "Netflix", color: "bg-red-600" },
  prime: { label: "Prime Video", color: "bg-sky-600" },
  hulu: { label: "Hulu", color: "bg-green-500" },
  hbo: { label: "Max", color: "bg-purple-700" },
  apple: { label: "Apple TV+", color: "bg-zinc-700" },
  disney: { label: "Disney+", color: "bg-blue-700" },
  criterion: { label: "Criterion", color: "bg-zinc-600" },
};

export const DISCOVER_SECTIONS = [
  { id: "trending", label: "Trending Now", icon: "🔥", ids: [11, 9, 7, 15, 4] },
  { id: "gems", label: "Hidden Gems", icon: "💎", ids: [13, 6, 12, 3, 5] },
  { id: "cry", label: "Movies That Will Make You Cry", icon: "😭", ids: [10, 6, 2, 14, 8] },
  { id: "alone", label: "Perfect for Watching Alone", icon: "🌙", ids: [3, 15, 2, 6, 12] },
  { id: "mindbend", label: "Mind-Bending Movies", icon: "🧠", ids: [1, 5, 9, 15, 4] },
  { id: "feelgood", label: "Feel-Good Movies", icon: "✨", ids: [18, 14, 9, 8, 7] },
  { id: "date", label: "Movies for Date Night", icon: "❤️", ids: [14, 10, 13, 2, 3] },
  { id: "under2h", label: "Best Movies Under 2 Hours", icon: "⏱", ids: [17, 16, 10, 13, 6] },
  { id: "thinkdays", label: "Movies You'll Think About for Days", icon: "🌀", ids: [1, 5, 4, 15, 12] },
];
