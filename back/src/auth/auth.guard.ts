import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const token = request.headers['authorization'].split(' ')[1] ?? '';

      if (!token) throw new ForbiddenException('No token provided');
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });
      request.iat = new Date(user.iat * 1000);
      request.exp = new Date(user.exp * 1000);

      // user.roles = user.isAdmin ? [Role.Admin] : [Role.User];

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'Access denied, check either your token or your credentials',
      );
    }
  }
}