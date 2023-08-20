import { AuthGuard } from '@nestjs/passport';

export class atGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
