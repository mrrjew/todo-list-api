import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;

    const request = context.switchToHttp().getRequest();

    // Ensure that the request object has the logIn method
    if (request.logIn) {
      await new Promise<void>((resolve, reject) => {
        request.logIn(request.user, (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }

    return activate;
  }
}
