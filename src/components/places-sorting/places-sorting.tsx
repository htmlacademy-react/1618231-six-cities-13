import cn from 'classnames';
import { SortTypes } from '../const';
import { useState, MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { sortBySelection } from '../../store/actions';

const PlacesSorting = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [selectedSort, setSelectedSort] = useState({ type: SortTypes.Popular, isOpen: false });
  const handlerSortItem = (event: MouseEvent<HTMLLIElement>) => {
    const { target } = event;
    const newSortOrder = (target as HTMLLIElement).textContent as SortTypes;
    dispatch(sortBySelection(newSortOrder));
    setSelectedSort({ ...selectedSort, type: newSortOrder, isOpen: false });
  };


  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={() => setSelectedSort({ ...selectedSort, isOpen: true })}
      >
        {selectedSort.type}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn('places__options places__options--custom',
        { 'places__options--opened': selectedSort.isOpen === true })}
      >
        {Object.values(SortTypes).map((value) => (
          <li className="places__option"
            tabIndex={0}
            key={value}
            onClick={handlerSortItem}
          >
            {value}
          </li>
        ))}
      </ul>
    </form >
  );
};

export default PlacesSorting;
