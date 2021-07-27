import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { columnOptions,
  comparisonOptions,
  INITIAL_NUM_FILTER,
  filterComparisonNumber } from '../assists';

const Table = () => {
  const { data, request } = useContext(PlanetsContext);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const [filterComparison, setFilterComparison] = useState(INITIAL_NUM_FILTER);

  useEffect(() => { request(); }, [request]);
  useEffect(() => { if (data) setFilteredData(data); }, [data]);
  useEffect(() => {
    if (data) {
      const newArray = data.filter((planet) => {
        const { name, ...rest } = planet;
        const nameContains = name.toLowerCase()
          .includes(filter.filterByName.name.toLowerCase());
        const comparisonValue = filterComparisonNumber(filter, rest);
        return comparisonValue && nameContains;
      });
      setFilteredData(newArray);
    }
  }, [filter, data]);

  if (!data) {
    return null;
  }

  let headerTable = [];
  if (filteredData.length > 0) {
    headerTable = Object.keys(filteredData[0]);
  }

  function numericFilter({ target: { value, name } }) {
    setFilterComparison({ ...filterComparison, [name]: value });
  }

  const filteredColumnOptions = columnOptions
    .filter((item) => !filter.filterByNumericValues
      .map(({ column }) => column).includes(item));
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ ({ target }) => setFilter({
          ...filter, filterByName: { name: target.value } }) }
      />
      <select
        name="column"
        data-testid="column-filter"
        onChange={ (e) => numericFilter(e) }
      >
        {filteredColumnOptions
          .map((option) => (<option key={ option }>{option}</option>))}
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ (e) => numericFilter(e) }
      >
        {comparisonOptions.map((option) => (<option key={ option }>{option}</option>))}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        value={ filterComparison.value }
        onChange={ (e) => numericFilter(e) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          setFilter({
            ...filter,
            filterByNumericValues: [...filter.filterByNumericValues, filterComparison],
          });
          setFilterComparison(INITIAL_NUM_FILTER);
        } }
      >
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            {headerTable.map((item) => <th key={ item }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => {
            const {
              name,
              rotation_period: rotationPeriod,
              orbital_period: orbitPeriod,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: surfaceWater,
              population,
              films,
              created,
              edited,
              url,
            } = item;
            return (
              <tr key={ name }>
                <td>{name}</td>
                <td>{rotationPeriod}</td>
                <td>{orbitPeriod}</td>
                <td>{diameter}</td>
                <td>{climate}</td>
                <td>{gravity}</td>
                <td>{terrain}</td>
                <td>{surfaceWater}</td>
                <td>{population}</td>
                <td>{films}</td>
                <td>{created}</td>
                <td>{edited}</td>
                <td>{url}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
