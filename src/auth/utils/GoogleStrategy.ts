import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    @Inject('AUTH_SERVICE') private readonly authService:AuthService
    constructor(private readonly configService: ConfigService,) {
    super({
      clientID: configService.get<string>('CLIENT_ID'),
      clientSecret: configService.get<string>('CLIENT_SECRET'),
      callbackURL:
        'https://ominous-robot-r5wqx4w7q55fwppv-3000.app.github.dev/api/auth/google/redirect',
      scope: ['email', 'profile'],
    });

  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    const user = await this.authService.validateUser({
      email:profile.emails[0].value,
      displayName:profile.displayName
    })

    console.log(user)
    return user || null
  }
}
