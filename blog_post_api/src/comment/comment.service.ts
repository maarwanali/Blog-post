import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto, UpdateCommentDto, commentResponse } from './dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async addComment(dto: CommentDto, id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: dto.postId },
    });

    if (!post) {
      throw new NotFoundException('Post Not Found');
    }

    const newComment = await this.prisma.comment.create({
      data: { body: dto.body, userId: id, postId: dto.postId },
    });

    return new commentResponse(newComment);
  }

  async editComment(id: number, dto: UpdateCommentDto) {
    const comment = await this.prisma.comment.update({
      where: { id: id },
      data: { body: dto.body },
    });

    return comment;
  }

  async deleteComment(id: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id: id } });

    if (!comment) {
      throw new NotFoundException('Post Not Found');
    }

    if (comment.userId != userId) {
      throw new ForbiddenException('unauthirazed');
    }

    const deletedComment = await this.prisma.comment.delete({
      where: { id: id },
    });

    return deletedComment;
  }
}
