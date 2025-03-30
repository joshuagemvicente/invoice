import { jwtVerify, SignJWT } from "jose";
import bcrypt from "bcryptjs";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY ||
    "a661ed911a8c6500f50889e9fd8ca033bc8386d545e79f7516070067e94ce9d4",
);

// this will hash the user password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

// this will compare the inputted password and user's existing password
export const comparePassword = async (plain: string, hashed: string) => {
  return await bcrypt.compare(plain, hashed);
};

// this will generate a jsonwebtoken for the user
export async function generateToken(userId: string) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("3d")
    .sign(SECRET_KEY);
}

//this will validate the user's generatedToken to let him pass the middleware
export async function verifyToken(
  token: string,
): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { userId: string };
  } catch (error) {
    console.error(error);
    return null;
  }
}
