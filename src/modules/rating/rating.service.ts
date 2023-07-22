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

  async updateRatingById(req, res) {
    const id = req.params.id;
    const { rating, comment } = req.body;
    if (!id) return res.status(400).json({ error: 'id is required' });
    if (!comment) return res.status(400).json({ error: 'comment is required' });
    if (!rating) return res.status(400).json({ error: 'rating is required' });
    this.ratingModel
      .findByIdAndUpdate(id, { rating, comment }, { new: true })
      .then((rating) => {
        res.json(rating);
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }
}
