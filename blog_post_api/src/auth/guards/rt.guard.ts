import { AuthGuard } from '@nestjs/passport';

export class rtGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
