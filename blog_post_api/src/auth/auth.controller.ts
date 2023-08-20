import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Res,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, UpdateUserDto } from './dto';
import { Request, Response } from 'express';
import { atGuard, rtGuard } from './guards';
import { userData } from './decorator';
import { getRToken } from './decorator/get-refreshToken.decorator';
import { adminStrategy } from './strategy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const { accessToken, refreshToken } = await this.authService.register(dto);

    res.cookie('refresh_token', refreshToken, { httpOnly: true });

    return { accessToken };
  }

  @Post('signin')
  async signin(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const { accessToken, refreshToken } = await this.authService.signin(dto);
    res.cookie('refresh_token', refreshToken, { httpOnly: true });

    return { accessToken };
  }

  @UseGuards(atGuard)
  @Get('logout')
  logout(
    @userData('userId') id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('refresh_token');

    return this.authService.logout(id);
  }

  @UseGuards(rtGuard)
  @Get('refresh')
  async refreshToken(
    @userData() userdata,
    @getRToken() refreshToken,
  ): Promise<{ accessToken: string }> {
    const id = userdata.userId;

    return this.authService.refreshToken(id, refreshToken);
  }

  @UseGuards(adminStrategy)
  @Get('users')
  getUsers() {
    return this.authService.getUsers();
  }

  @UseGuards(adminStrategy)
  @Put('edit-user/:id')
  editUserRole(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.authService.editUserRole(dto, userId);
  }

  @UseGuards(adminStrategy)
  @Delete('delete-user/:id')
  deleteUser(@Param('id', ParseIntPipe) userId: number) {
    return this.authService.deleteUser(userId);
  }
}
