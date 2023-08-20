import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Body,
  Query,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { adminGuard, atGuard } from 'src/auth/guards';
import { PostDto } from './dto';
import { userData } from 'src/auth/decorator';
import { UpdatePostDto } from './dto/updatedPost.dto';

@Controller('post')
export class PostController {
  constructor(private post: PostService) {}

  @UseGuards(atGuard)
  @Post('add')
  addPost(@Body() dto: PostDto, @userData('userId') id: number) {
    return this.post.addPost(dto, id);
  }

  @Get('')
  getPosts(@Query('page', ParseIntPipe) page: number) {
    return this.post.getPosts(page);
  }

  @Get('by-category/:categoryId')
  getPostsByCatgory(
    @Param('categoryId', ParseIntPipe) category: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return this.post.getPostsByCategory(category, page);
  }

  @UseGuards(atGuard)
  @Get('profile')
  getUserPosts(@userData('userId', ParseIntPipe) id: number) {
    return this.post.getUserPosts(id);
  }

  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.post.getPost(id);
  }

  @UseGuards(atGuard)
  @Put(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
  ) {
    console.log(dto);
    return this.post.editPost(dto, id);
  }

  @UseGuards(atGuard)
  @Delete(':id')
  deletePost(
    @Param('id', ParseIntPipe) id: number,
    @userData('userId') userId: number,
  ) {
    return this.post.deletePost(id, userId);
  }

  @UseGuards(adminGuard)
  @Delete('admin/:id')
  deletePostAdmin(
    @Param('id', ParseIntPipe) id: number,
    @userData('userId') userId: number,
  ) {
    return this.post.deletePost(id, userId);
  }
}
