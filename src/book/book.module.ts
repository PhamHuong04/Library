import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { ImageModule } from 'src/image/image.module';
import { LocalFile } from './entities/local-file.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Comment } from 'src/comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, LocalFile, Comment]),
    ImageModule,
    forwardRef(() => ImageModule),
    CloudinaryModule,
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
