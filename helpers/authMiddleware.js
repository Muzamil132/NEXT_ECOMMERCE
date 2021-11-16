import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: "You must log in!" });
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "880NEXT", (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: " token not matched" });
      }
      console.log(decoded);
      req.user = decoded;
      next();
    });
  } catch (err) {
    res.status(401).send({ error: "You must log " });
  }
};

export default auth;
