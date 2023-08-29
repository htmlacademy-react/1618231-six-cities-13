import { Comment } from '../../types/offer-type';
import ReviewItem from '../reviews-item/review-item';

type ReviewsListType = {
  reviewsOffer: Comment[];
}

const ReviewList = ({ reviewsOffer }: ReviewsListType): JSX.Element => {

  const rewiewListSort = [...reviewsOffer].sort((a:Comment, b:Comment) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <ul className="reviews__list">
      {rewiewListSort.map((item) => <ReviewItem review={item} key={item.id} />)}
    </ul >
  );


};

export default ReviewList;
