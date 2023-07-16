import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async getUserByEmail(email: string) {
    // check auth exists
    return this.userModel
      .findOne({ email })
      .then((data) => {
        if (data) return data;
        else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      })
      .catch((error) => {
        console.log('👌  error:', error);
        throw new HttpException(error, HttpStatus.NOT_FOUND);
      });
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email });

    if (user) return user.toObject();
    return undefined;
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save().then(
      (res) => {
        return res;
      },
      (error) => {
        console.log('👌  error:', error);
        throw new HttpException('Create user fail', HttpStatus.NOT_IMPLEMENTED);
      },
    );
  }

  async update(id: Types.ObjectId, user: User): Promise<User> {
    const updatedUser = (await this.userModel.updateOne(
      {
        _id: id,
      },
      user,
    )) as any;

    return updatedUser;
  }
}
