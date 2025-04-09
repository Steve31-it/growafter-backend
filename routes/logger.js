// logger function middleware.
function logger(req, res, next) {
  console.log(
    `Request Method: ${req.method}, Request URL: ${
      req.url
    } - Date: ${new Date().toLocaleString("en-GB", {
      timeZone: "Asia/Dubai",
    })}  `
  );

  next();
}

module.exports = { logger };
