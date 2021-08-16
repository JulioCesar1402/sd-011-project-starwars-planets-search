import React, { useContext } from 'react';
import PlanetsContext from '../Context/PlanetsContext';
import CategoriesFilter from './subcomponent/CategoriesFilter';

function SearchBar() {
  const { name, getName } = useContext(PlanetsContext);

  const handleKeyWord = (event) => {
    getName(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">
        Filtro:
        <input
          text="text"
          value={ name }
          onChange={ handleKeyWord }
          id="search"
          data-testid="name-filter"
        />
      </label>
      <CategoriesFilter />
    </div>
  );
}

export default SearchBar;
