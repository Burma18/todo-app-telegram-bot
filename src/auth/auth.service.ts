import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  async signup(dto: AuthDto) {
    return { dto };
  }

  signin() {
    return 'i am signin';
  }
}
