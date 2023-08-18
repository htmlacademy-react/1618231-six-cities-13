import { Comment } from '../../types/offer-type';
import ReviewItem from '../reviews-item/review-item';

type ReviewsListType = {
  reviewsOffer: Comment[];
}

const ReviewList = ({ reviewsOffer }: ReviewsListType): JSX.Element => (
  <ul className="reviews__list">
    {reviewsOffer.map((item) => <ReviewItem review={item} key={item.id} />)}
  </ul >
);

export default ReviewList;
