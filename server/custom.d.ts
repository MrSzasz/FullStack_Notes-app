import type { userType } from './types/dict'

declare global {
  declare namespace Express {
    interface Request {
      loggedUserInfoFromToken?: string | jwt.JwtPayload | userType
    }
  }
}
