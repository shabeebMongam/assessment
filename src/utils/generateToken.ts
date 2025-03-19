import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '24h';

interface TokenPayload {
  id: string;
  role: string;
}

const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRE as jwt.SignOptions['expiresIn']
    }
  );
};

export default generateToken;