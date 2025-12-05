import { Injectable } from '@nestjs/common';

export type User = { id: string; email: string; firstName?: string; lastName?: string };

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((u) => u.id === id);
  }
}
