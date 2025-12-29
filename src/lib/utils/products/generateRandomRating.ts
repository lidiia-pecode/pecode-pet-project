export function generateRandomRating() {
  const rate = Number((Math.random() * 5).toFixed(1));
  const count = Math.floor(Math.random() * 1000);
  return { rate, count };
}
