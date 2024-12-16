import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";

describe("AuthService", () => {
  const testEmail = "test@test.com";
  const testPassword = "password";

  let service: AuthService;
  let fakeUserService: Partial<UserService>;

  beforeEach(async () => {
    const users: User[] = [];

    fakeUserService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);

        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it("can create an instance of the AuthService", async () => {
    expect(service).toBeDefined();
  });

  it("creates a new user with a salted and hashed password", async () => {
    const user = await service.signUp(testEmail, testPassword);

    const [salt, hash] = user.password.split(".");
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it("throws an error if user signs up with email that is in use", async () => {
    await service.signUp(testEmail, testPassword);
    await expect(service.signUp(testEmail, testPassword)).rejects.toThrow(
      BadRequestException,
    );
  });

  it("throws if an invalid password is provided", async () => {
    await service.signUp(testEmail, testPassword);
    await expect(service.signIn(testEmail, testPassword + "1")).rejects.toThrow(
      BadRequestException,
    );
  });

  it("throws if signUp is called with an unused email", async () => {
    await expect(service.signIn(testEmail, testPassword)).rejects.toThrow(
      NotFoundException,
    );
  });

  it("returns a user if correct password is provided", async () => {
    await service.signUp(testEmail, testPassword);

    const user = await service.signIn(testEmail, testPassword);
    expect(user).toBeDefined();
  });
});
