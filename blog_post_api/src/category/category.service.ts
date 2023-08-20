import { Injectable } from '@nestjs/common';
import { CategroyDto, CategoryResponse } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async addCategory(dto: CategroyDto) {
    const category = await this.prisma.category.create({
      data: { name: dto.name, color: dto.color },
    });

    return new CategoryResponse(category);
  }

  async getCategories() {
    const categories = await this.prisma.category.findMany({ take: 10 });
    return categories.map((category) => new CategoryResponse(category));
  }

  async deleteCategory(categoryId: number): Promise<string> {
    const category = await this.prisma.category.delete({
      where: { id: categoryId },
    });

    return `${category.name} deleted Sucessfully`;
  }
}
