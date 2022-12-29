import { Request } from 'express';
import { User as UserEnity } from '../../user/entities/user.entity';
export interface UserInfoRequest extends Request {
  user: UserEnity;
}
