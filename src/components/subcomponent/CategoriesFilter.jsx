import React, { useContext } from 'react';
import PlanetsContext from '../../Context/PlanetsContext';

function CategoriesFilter() {
  const { getColumn, getComparison,
    getValue, value, getButton, getOnChangeInputs } = useContext(PlanetsContext);

  function handleChangeColumn(event) {
    getColumn(event.target.value);
  }

  function handleChangeComparison(event) {
    getComparison(event.target.value);
  }

  function handleChangeValue(event) {
    getValue(event.target.value);
  }

  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ (e) => {
          handleChangeColumn(e);
          getOnChangeInputs(false);
        } }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (e) => {
          handleChangeComparison(e);
          getOnChangeInputs(false);
        } }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ value }
        onChange={ (e) => {
          handleChangeValue(e);
          getOnChangeInputs(false);
        } }
        id="numberInput"
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => {
          getButton(true);
          getOnChangeInputs(true);
        } }
        // onMouseUp={ () => getButton(false) }
      >
        Enviar
      </button>
    </div>
  );
}

export default CategoriesFilter;
