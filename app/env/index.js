module.exports = (key) => {
  if (key in process.env) {
    return process.env[key];
  }
  console.log("ENV Not found", key);

  return null;
};
