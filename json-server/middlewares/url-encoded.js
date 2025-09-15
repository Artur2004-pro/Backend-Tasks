import queryString from "querystring";

export default function urlEncoded(req, res, next) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    req.body = { ...req.body, ...queryString.parse(body) };
    next();
  });
}
