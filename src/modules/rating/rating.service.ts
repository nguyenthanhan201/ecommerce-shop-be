import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating, RatingDocument } from './rating.model';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name)
    private readonly ratingModel: Model<RatingDocument>,
  ) {}

  getRatingByIdAuth(idAuth: string): Promise<any> {
    return this.ratingModel.find({ idAuth }).populate('idProduct').exec();
  }

  async getRatingByIdProduct(idProduct: string): Promise<any> {
    const ratings = await this.ratingModel
      .find({ idProduct })
      .populate('idAuth')
      .exec();
    return ratings;
  }
}
