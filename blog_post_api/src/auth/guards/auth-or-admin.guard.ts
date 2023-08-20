// does't work yet

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { atGuard } from './at.guard';
import { adminGuard } from './admin.guard';

@Injectable()
export class AuthOrAdminGuard implements CanActivate {
  constructor(
    private readonly authGuard: atGuard,
    private readonly adminGuard: adminGuard,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isAuth = this.authGuard.canActivate(context);
    const isAdmin = this.adminGuard.canActivate(context);

    return isAuth || isAdmin;
  }
}
