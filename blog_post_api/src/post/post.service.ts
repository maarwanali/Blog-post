import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto, UpdatePostDto, PostResponseDto } from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async addPost(dto: PostDto, id: number): Promise<PostResponseDto> {
    const post = await this.prisma.post.create({
      data: {
        title: dto.title,
        body: dto.body,
        userId: id,
      },
    });

    if (!post) {
      return;
    }

    const categoryList = dto.categoryId.split(',').map((id) => parseInt(id));

    await Promise.all(
      categoryList.map(async (categoryId) => {
        await this.prisma.categoriesOnPosts.create({
          data: { categoryId, postId: post.id },
        });
      }),
    );

    return new PostResponseDto(post);
  }

  async getPosts(page: number) {
    const limit = 10;
    const skip = (page - 1) * limit;

    const posts = await this.prisma.post.findMany({
      skip: skip,
      take: limit,

      include: {
        user: true,
        comments: { include: { user: true } },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return posts.map((post) => plainToInstance(PostResponseDto, post));
  }

  async getPostsByCategory(id: number, page: number) {
    const limit = 10;
    const skip = (page - 1) * limit;

    const postsByCategory = await this.prisma.post.findMany({
      skip,
      take: limit,
      where: { categories: { some: { categoryId: id } } },
      include: {
        user: true,
        comments: { include: { user: true } },
        categories: { include: { category: true } },
      },
    });

    // return postsByCategory;
    return postsByCategory.map((post) => new PostResponseDto(post));
  }

  async getPost(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: id },
      include: {
        user: true,
        comments: { include: { user: true } },
        categories: { include: { category: true } },
      },
    });

    return new PostResponseDto(post);
  }

  async getUserPosts(userId: number): Promise<PostResponseDto[]> {
    const postsOfUser = await this.prisma.post.findMany({
      where: { userId: userId },
      include: {
        user: true,
        comments: { include: { user: true } },
        categories: { include: { category: true } },
      },
    });

    return postsOfUser.map((post) => new PostResponseDto(post));
  }

  async editPost(dto: UpdatePostDto, id: number) {
    const post = await this.prisma.post.update({
      where: { id: id },
      data: {
        title: dto.title,
        body: dto.body,
      },
    });

    return new PostResponseDto(post);
  }

  async deletePost(id: number, userId: number): Promise<{ message: string }> {
    const post = await this.prisma.post.findUnique({ where: { id: id } });

    if (!post) {
      return { message: 'Post Does not Exist' };
    }

    // if (post.userId != userId) throw new ForbiddenException('Unauthorized');
    await this.prisma.post.delete({ where: { id: id } });
    return { message: 'Post deleted successfully' };
  }
}
