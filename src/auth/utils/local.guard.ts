import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class LocalGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const activate = (await super.canActivate(context)) as boolean
        console.log(activate)

        const request = context.switchToHttp().getRequest()

        await super.logIn(request)

        return activate
    }
}