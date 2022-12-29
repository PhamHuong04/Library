import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User as UserEntity } from '../user/entities/user.entity';
import { User } from 'src/common/decorator/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/auth.decorator';
import { Roles } from 'src/common/decorator/roles.decorator';
import { UserRole } from 'src/common/enum/type.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // TODO
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @User() user: UserEntity) {
    return this.commentService.create(user, createCommentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOneById(+id);
  }

  @Get()
  getAll() {
    return this.commentService.getAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
