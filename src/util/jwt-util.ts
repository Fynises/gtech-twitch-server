import { Request } from 'express';
import { JwtPayload } from 'src/service/auth/dto/jwt-payload';

export function getPayload(req: Request): JwtPayload {
  return req['auth_payload'];
}
