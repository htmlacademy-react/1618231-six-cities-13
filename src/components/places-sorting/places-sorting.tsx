import cn from 'classnames';
import { FilterTypes } from '../const';
import { useState } from 'react';

const PlacesSorting = (): JSX.Element => {
  const [selectedFilter, setselectedFilter] = useState({ type: FilterTypes.popular, isOpen: false });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={() => setselectedFilter({ ...selectedFilter, isOpen: true })}
      >
        {selectedFilter.type}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn('places__options places__options--custom',
        { 'places__options--opened': selectedFilter.isOpen === true })}
      >
        {Object.values(FilterTypes).map((filter) => (
          <li className="places__option"
            tabIndex={0}
            key={filter}
            onClick={(evt) => setselectedFilter({...selectedFilter, isOpen: false, type: evt.target.textContent as FilterTypes}) }
          >
            {filter}
          </li>
        ))}
      </ul>
    </form >
  );
};

export default PlacesSorting;
