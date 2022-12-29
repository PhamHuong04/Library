import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(user: User, createCommentDto: CreateCommentDto) {
    const comment = await this.commentRepository.create({
      ...createCommentDto,
      user,
      book: {
        bookcode: createCommentDto.bookcode,
      },
    });
    return await this.commentRepository.save(comment);
  }

  async getAll() {
    return await this.commentRepository.find({
      relations: {
        book: true,
      },
    });
  }

  async findOneById(id: number) {
    return await this.commentRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.preload({
      id,
      ...updateCommentDto,
    });
    return await this.commentRepository.save(comment);
  }

  async remove(id: number) {
    return await this.commentRepository.delete(id);
  }
}
