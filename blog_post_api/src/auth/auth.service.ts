import {
  Injectable,
  ForbiddenException,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto, UpdateUserDto, UserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(
    dto: AuthDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const passwordHash = await argon.hash(dto.password);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          username: dto.username,
          passwordHash: passwordHash,
          role: 'user',
        },
      });

      const { accessToken, refreshToken } = await this.getTokens(
        newUser.id,
        newUser.username,
        newUser.role,
      );

      return { accessToken, refreshToken };
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target.includes('username')) {
        throw new ConflictException('Username already exists');
      }

      throw new InternalServerErrorException();
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (!user) {
      throw new ForbiddenException('User Do not exsit');
    }

    const matchPassword = await argon.verify(user.passwordHash, dto.password);
    if (!matchPassword) {
      throw new ForbiddenException('Wrong Password');
    }

    return this.getTokens(user.id, user.username, user.role);
  }
  async logout(id: number): Promise<boolean> {
    await this.prisma.user.update({
      data: { rtHash: null, rtExpireDate: null },
      where: { id: id },
    });

    return true;
  }
  async refreshToken(id: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new ForbiddenException('User Not Fond');
    }

    if (user.rtHash != refreshToken) {
      throw new ForbiddenException('Unautherized');
    }

    const currentDate = new Date();

    if (currentDate >= new Date(user.rtExpireDate)) {
      throw new ForbiddenException('Unautherized');
    }

    const payload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };
    const accessToken = await this.jwt.sign(payload, {
      expiresIn: '50m',
      secret: this.config.get('ACCESSTOKEN_SECRETKEY'),
    });

    return { accessToken };
  }

  async getTokens(
    userId: number,
    username: string,
    role: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { userId, username, role };

    const accessToken = await this.jwt.sign(payload, {
      expiresIn: '50m',
      secret: this.config.get('ACCESSTOKEN_SECRETKEY'),
    });

    const refreshToken = await this.jwt.sign(payload, {
      secret: this.config.get('REFRESHTOKEN_SECRETKEY'),
    });

    if (!refreshToken) {
      return;
    }

    const currentDate = new Date();
    const futureDate = new Date(
      currentDate.getTime() + 5 * 24 * 60 * 60 * 1000,
    );

    await this.prisma.user.update({
      where: { id: userId },
      data: { rtHash: refreshToken, rtExpireDate: futureDate },
    });

    return { accessToken, refreshToken };
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany();

    if (!users) {
      throw new BadRequestException('Something bad happened');
    }

    return users.map((user) => new UserDto(user));
  }

  async editUserRole(dto: UpdateUserDto, userId: number): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User Not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { role: dto.role },
    });

    return new UserDto(updatedUser);
  }

  async deleteUser(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (user.role == 'admin') {
      throw new UnauthorizedException('Unauthorized');
    }

    const deletedUser = await this.prisma.user.delete({
      where: { id: userId },
    });

    return { message: ` ${deletedUser.username} is Deleted` };
  }
}
