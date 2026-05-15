import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  login(password: string): { access_token: string } {
    const adminPassword = this.config.get<string>('ADMIN_PASSWORD');
    if (!adminPassword || password !== adminPassword) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { sub: 'admin', role: 'admin' };
    return { access_token: this.jwtService.sign(payload) };
  }
}
