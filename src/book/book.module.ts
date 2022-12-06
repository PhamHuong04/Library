import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { ImageModule } from 'src/image/image.module';
import { LocalFile } from './entities/local-file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, LocalFile]),
    ImageModule,
    forwardRef(() => ImageModule),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
