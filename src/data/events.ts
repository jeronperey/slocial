import type { SlocialEvent } from "./types";

// TODO: add the rest of the events and fields.
export const EVENTS: SlocialEvent[] = [
  { id: 'corgi-meetup', title: 'Corgi Meetup', category: 'casual', lat: 35.2803, lng: -120.6631, date: "Thursday November 19th", address: "1023 Chorro St", description: "Come join us to meet fellow corgi parents!"},
  { id: 'the-plums', title: 'The Plums – Live', category: 'music', lat: 35.2789, lng: -120.6587, date: "Friday November 20th", address: "1400 Osos",  restrictions: "21+", time: "6:00PM", price: 50},
  { id: 'football-game', title: 'Football Game', category: 'sports', lat: 35.3005, lng: -120.6625, date: "Saturday November 21st", address: "Cal Poly Football Field", time : "1:00PM", price: 20},
  { id: 'rooftop-party', title: 'Rooftop Party', category: 'party', lat: 35.2836, lng: -120.6612, date: "Sunday November 22nd", address: "1066 Palm Street", description: "A big celebration for surviving finals! Drinks, dinner, and cake will be included.", restrictions: "21+, Cal Poly Students Only", time : "8:00PM"},
  { id: 'movie-night', title: 'Movie in the Park', category: 'movie', lat: 35.2771, lng: -120.6665, date: "Monday November 23rd", address: "Historical place museum", description: "Come join us for food and movies!", time : "5:00PM"},
]
