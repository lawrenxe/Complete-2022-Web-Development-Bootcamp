
exports.getDate = function() {
  const today = new Date();
  const day = "";

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  return today.toLocaleDateString("en-US", options);
}
