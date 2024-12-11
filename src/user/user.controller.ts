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
  Session,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Serialize } from "../interceptors/serialize.interceptors";
import { CurrentUser } from "./decorators/current-user.decorator";
import { UserDto, CreateUserDto } from "./dtos/user.dto";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { AuthGuard } from "../guards/auth.guard";

@Controller("auth")
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get("/user")
  @UseGuards(AuthGuard)
  getUser(@CurrentUser() user: User) {
    return user;
  }

  @Post("/signout")
  @UseGuards(AuthGuard)
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post("/signup")
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);

    session.userId = user.id;

    return user;
  }

  @Post("/signin")
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);

    session.userId = user.id;

    return user;
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
