import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  content: string;

  @Column()
  rate: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  user: User;

  @ManyToOne(() => Book, (book) => book.comments)
  book: Book;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @BeforeInsert()
  createdateDates() {
    this.createdAt = new Date();
  }
}
