import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  UseGuards,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { atGuard } from 'src/auth/guards';
import { CommentDto, UpdateCommentDto } from './dto';
import { userData } from 'src/auth/decorator';

@Controller('comment')
export class CommentController {
  constructor(private comment: CommentService) {}

  @UseGuards(atGuard)
  @Post('add')
  addComment(
    @Body() dto: CommentDto,
    @userData('userId', ParseIntPipe) id: number,
  ) {
    return this.comment.addComment(dto, id);
  }

  @UseGuards(atGuard)
  @Put(':id')
  editComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.comment.editComment(id, dto);
  }
  @UseGuards(atGuard)
  @Delete(':id')
  deleteComment(
    @Param('id', ParseIntPipe) id: number,
    @userData('userId', ParseIntPipe) userId: number,
  ) {
    return this.comment.deleteComment(id, userId);
  }
}
