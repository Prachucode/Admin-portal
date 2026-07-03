import jwt from "jsonwebtoken";


export function createToken(adminId) {
  return jwt.sign(
    { adminId },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}