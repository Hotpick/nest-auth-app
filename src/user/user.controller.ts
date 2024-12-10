import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Serialize } from "./interceptors/serialize.interceptors";
import { UserDto, CreateUserDto } from "./dtos/user.dto";

@Controller("auth")
@Serialize(UserDto)
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body.email, body.password);
  }

  @Get("/:id")
  async findUser(@Param("id") id: string) {
    const user = await this.userService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException("user not found");
    }

    return user;
  }

  @Get()
  findAllUsers(@Query("email") email: string) {
    return this.userService.find(email);
  }

  @Delete("/:id")
  removeUser(@Param("id") id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() body: Partial<CreateUserDto>) {
    return this.userService.update(parseInt(id), body);
  }
}
