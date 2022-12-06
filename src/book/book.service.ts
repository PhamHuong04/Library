import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageController } from 'src/image/image.controller';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateLocalFileDto } from './dto/create-local-file';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { LocalFile } from './entities/local-file.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(LocalFile)
    private readonly localFileRepository: Repository<LocalFile>,

    private configService: ConfigService,

    @Inject(forwardRef(() => ImageController))
    private imageController: ImageController,
  ) {}
  async create(createBookDto: CreateBookDto) {
    return await this.bookRepository.save(createBookDto);
  }

  findAll() {
    return this.bookRepository.find();
  }

  async findOne(bookcode: number) {
    const book = await this.bookRepository.findOne({ where: { bookcode } });
    if (!book) {
      throw new NotFoundException(`book with ID: ${bookcode} not found`);
    }
    return book;
  }

  async update(bookcode: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({ where: { bookcode } });
    if (!book) {
      throw new HttpException('Not found book', HttpStatus.NOT_FOUND);
    }
    await this.bookRepository.update({ bookcode }, updateBookDto);
    return {
      message: 'Update successfully',
    };
  }

  async remove(bookcode: number) {
    const book = await this.bookRepository.findOne({ where: { bookcode } });
    if (!book) {
      throw new HttpException('Not found book', HttpStatus.NOT_FOUND);
    }
    await this.bookRepository.delete({ bookcode });
    return {
      message: 'Delete successfully',
    };
  }

  async createLocalFile(creareFileDataDto: CreateLocalFileDto) {
    const urlServer = this.configService.get<string>('URL_SERVER');
    creareFileDataDto.path = urlServer + creareFileDataDto.path;
    const localFile = await this.localFileRepository.create(creareFileDataDto);
    return await this.localFileRepository.save(localFile);
  }
  async addImg(bookId: number, creareFileDataDto: CreateLocalFileDto) {
    const image = await this.createLocalFile(creareFileDataDto);
    const book = await this.bookRepository.preload({
      bookcode: bookId,
      image: {
        id: image.id,
      },
    });
    return await this.bookRepository.save(book);
  }

  async removeImgInBook(bookId: number) {
    const book = await this.bookRepository.preload({
      bookcode: bookId,
      image: null,
    });
    return await this.bookRepository.save(book);
  }

  async deleteLocalFile(id: string) {
    const deleteResult = await this.localFileRepository.delete(id);
    return deleteResult;
  }
}
