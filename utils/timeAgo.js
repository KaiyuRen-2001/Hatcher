/**
 * Given an ISO string timestamp, returns a string representing how long ago it was.
 *
 * @param {string} timestamp Timestamp in ISO string format.
 * @returns String representing how long ago the timestamp was, in the format
 * X {yrs/mos/days/hrs/mins} ago.
 */
export default function timeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: "yr", seconds: 60 * 60 * 24 * 365 },
    { label: "mo", seconds: 60 * 60 * 24 * 30 },
    { label: "day", seconds: 60 * 60 * 24 },
    { label: "hr", seconds: 60 * 60 },
    { label: "min", seconds: 60 },
  ];

  for (let interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}
