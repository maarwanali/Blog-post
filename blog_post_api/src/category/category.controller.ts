import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { adminGuard, atGuard } from 'src/auth/guards';
import { CategroyDto } from './dto';
import { CategoryService } from './category.service';
import { userData } from 'src/auth/decorator';

@Controller('category')
export class CategoryController {
  constructor(private category: CategoryService) {}

  @UseGuards(atGuard)
  @Post('add')
  addCategory(@Body() dto: CategroyDto, @userData('role') role: string) {
    console.log(role);
    if (role != 'admin') {
      throw new ForbiddenException('Not authorized');
    }
    return this.category.addCategory(dto);
  }

  @Get('')
  getCategories() {
    return this.category.getCategories();
  }

  @UseGuards(adminGuard)
  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) categoryId: number) {
    return this.category.deleteCategory(categoryId);
  }
}
