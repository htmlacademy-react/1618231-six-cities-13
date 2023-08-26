import { useState } from 'react';
import { Rating, magicNumbers } from '../const';
import MyInput from '../ui/my-input/my-input';
import { commentAction, fetchCommentsOfferAction} from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/hooks';

type CommentFormProps = {
  idOffer: string | undefined;
}

const CommentForm = ({ idOffer }: CommentFormProps): JSX.Element => {

  const [review, setReview] = useState({ comment: '', rating: 0 });
  const dispatch = useAppDispatch();
  const isDisabled = !((review.comment.length > magicNumbers.min && review.comment.length < magicNumbers.max));
  const id = idOffer as string;

  const hendleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const reviewData = { idOffer: idOffer, review: review };
    dispatch(commentAction(reviewData));
    setReview({ comment: '', rating: 0 });
    dispatch(fetchCommentsOfferAction(id));

  };
  return (
    <form className="reviews__form form"
      onSubmit={(evt) => hendleFormSubmit(evt)}
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.values(Rating).reverse().map((item) => (
          <div key={item} className='reviews__rating-label'>
            <MyInput
              className='form__rating-input visually-hidden'
              name='rating'
              value={item}
              id={`${item}-stars`}
              type='radio'
              placeholder=''
              onChange={(evt: { target: { value: string } }) => setReview({ ...review, rating: (parseInt(evt.target.value, 10)) })}
            />
            <label htmlFor={`${item}-stars`} className="reviews__rating-label form__rating-label">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </div>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea"
        value={review.comment}
        onChange={(evt) => setReview({ ...review, comment: evt.target.value })}
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled}>Submit</button>
      </div>
    </form>
  );
};


export default CommentForm;
