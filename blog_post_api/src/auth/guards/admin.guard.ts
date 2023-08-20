import { AuthGuard } from '@nestjs/passport';

export class adminGuard extends AuthGuard('admin') {
  constructor() {
    super();
  }
}
