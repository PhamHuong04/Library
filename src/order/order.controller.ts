import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/common/decorator/user.decorator';
import type { User as UserEntity } from '../user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @User() user: UserEntity,
  ) {
    const order = await this.orderService.createOrder(user, createOrderDto);
    return order;
  }

  @Get(':id')
  findOneOrderById(@Param('id') id: string) {
    return this.orderService.findOneById(id);
  }

  @Post('my-order')
  findMyOrders(@User() user: UserEntity) {
    return this.orderService.findMyOrders(user.id);
  }

  @Patch(':id')
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  deleteOrderById(@Param('id') id: string) {
    return this.orderService.deleteOrderById(id);
  }
}
