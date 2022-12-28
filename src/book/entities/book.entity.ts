import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Catagory } from 'src/common/enum/type.enum';
import { Image } from 'src/image/entities/image.entity';
import { LocalFile } from './local-file.entity';
import { Comment } from 'src/comment/entities/comment.entity';
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  bookcode: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  catagory: Catagory;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  numberPage: number;

  @Column({ default: 25000 })
  price: number;

  image_url: Express.Multer.File;

  @OneToOne(() => LocalFile, (localFile) => localFile.id, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  image: LocalFile;

  @OneToMany(() => Comment, (comment) => comment.book, {
    eager: true,
  })
  comments: Comment[];
}
