import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  NotFoundException,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UsersDTO } from './dto/users.dto';
import { CreateUsersDTO } from './dto/create-user.dto';
import { UpdateUsersDTO } from './dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: [UsersDTO] })
  @Get()
  async showAllUsers(): Promise<UsersDTO[]> {
    return this.usersService.showAll();
  }

  @ApiOkResponse({ type: [UsersDTO] })
  @Get('testglobal')
  async testglobalGet(): Promise<any> {
    return {result:global.sharedData};
  }

  @ApiOkResponse({ type: [UsersDTO] })
  @Post('testglobal')
  async testglobalSet(@Request() req): Promise<any> {
    console.log(req);
    global.sharedData = req.body.data;
    return {result:global.sharedData};
  }

  @ApiOkResponse({ type: [UsersDTO] })
  @Get('wait')
  async waitTimeout(): Promise<any> {
    let start = Date.now();
    let i=0;
    while (Date.now() - start < 15000) {
      await new Promise(resolve => setTimeout(resolve, 5));
      i++;
    }
    return {result:i};
  }

  @ApiCreatedResponse({ type: UsersDTO })
  @ApiBadRequestResponse()
  @Post()
  async createUsers(@Body() data: CreateUsersDTO): Promise<UsersDTO> {
    return this.usersService.create(data);
  }

  @ApiOkResponse({ type: UsersDTO })
  @ApiNotFoundResponse()
  @Get(':id')
  async readUser(@Param('id', ParseIntPipe) id: number): Promise<UsersDTO> {
    const user = await this.usersService.getById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @ApiOkResponse({ type: UsersDTO })
  @Put(':id')
  async uppdateUser(
    @Param('id') id: number,
    @Body() data: UpdateUsersDTO,
  ): Promise<UsersDTO> {
    return await this.usersService.update(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<unknown> {
    await this.usersService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
