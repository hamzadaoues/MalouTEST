import {MakerModel} from './maker.model';

export class ProductModel {
  constructor(public id: number, public name: string, public tagline: string, public categoryId: string, public createdAt: string, public makers: MakerModel[], public imageUrl: string, public username: string, public commentsCount: number, public votesCount: number, public topics: []) {
  }
}
