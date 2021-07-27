import React from 'react';
import { GlobalContext } from './GlobalContext';
import columnFilter from './Helper';

const Table = () => {
  const apiResults = React.useContext(GlobalContext);
  const [filters, setFilters] = React.useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
      order: {
        column: 'name',
        sort: 'ASC',
      } },
  });
  const [filter, setFilter] = React.useState({
    column: '',
    comparison: '',
    value: '',
  });
  const [order, setOrder] = React.useState({
    sortOrder: '',
    columnOrder: '',
  });
  const [filterData, setFilterData] = React.useState([]);
  React.useEffect(() => {
    if (apiResults.data) {
      setFilterData(apiResults.data.results
        .filter((value) => value.name.includes(filters.filters.filterByName.name)));
    }
  }, [apiResults.data, filters]);

  const filterColumn = columnFilter(filters.filters.filterByNumericValues, filterData);

  if (!apiResults.data) {
    return (
      <p>Carregando...</p>
    );
  }
  const filterHeader = Object.keys(apiResults.data.results[0])
    .filter((value) => value !== 'residents');
  function handleClickOnState() {
    const { column, comparison, value } = filter;
    setFilters({ filters: { ...filters.filters,
      filterByNumericValues:
      [...filters.filters.filterByNumericValues, { column, comparison, value }] } });
  }
  function handleClickRemoveList(param) {
    setFilters({ filters: {
      ...filters.filters,
      filterByNumericValues: [...filters.filters.filterByNumericValues
        .filter((_value, index) => index !== param)],
    } });
  }
  const columnFilterOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ].filter((value) => {
    const { filterByNumericValues } = filters.filters;
    return !filterByNumericValues.some(({ column }) => column === value);
  });
  function handleStateOrder({ target }) {
    const { name, value } = target;
    setOrder({
      sortOrder: name === 'ORDER' ? value : order.sortOrder,
      columnOrder: name === 'COLUMN' ? value : order.columnOrder,
    });
  }
  filterColumn.sort((planetA, planetB) => {
    const { column, sort } = filters.filters.order;
    if (sort === 'ASC' && /^[0-9]/.test(planetA[column])) {
      return +planetA[column] - +planetB[column];
    }
    if (sort === 'ASC') {
      return planetA[column].charCodeAt(0) - planetB[column].charCodeAt(0);
    }
    if (sort === 'DESC' && /^[0-9]/.test(planetA[column])) {
      return +planetB[column] - +planetA[column];
    }
    return planetB[column].charCodeAt(0) - planetA[column].charCodeAt(0);
  });
  return (
    <div>
      <label htmlFor="column-sort">
        <select data-testid="column-sort" name="COLUMN" onChange={ handleStateOrder }>
          { filterHeader.map((value, index) => <option key={ index }>{value}</option>)}
        </select>
      </label>
      <label htmlFor="input-sort">
        <input
          data-testid="column-sort-input-asc"
          value="ASC"
          type="radio"
          name="ORDER"
          onChange={ handleStateOrder }
        />
        <input
          data-testid="column-sort-input-desc"
          value="DESC"
          type="radio"
          name="ORDER"
          onChange={ handleStateOrder }
        />
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ () => {
          const { sortOrder, columnOrder } = order;
          setFilters({
            filters: {
              ...filters.filters,
              ...filters.filterByNumericValues,
              order: {
                column: columnOrder,
                sort: sortOrder,
              } } });
        } }
      >
        Ordernar
      </button>
      <label htmlFor="name-filter">
        <input
          data-testid="name-filter"
          name="name-filter"
          value={ filters.filters.filterByName.name }
          type="text"
          onChange={ ({ target }) => {
            setFilters({
              filters: {
                ...filters.filters,
                filterByName: {
                  name: target.value,
                } },
            });
          } }
        />
      </label>
      <label htmlFor="column-filter">
        <select
          data-testid="column-filter"
          onChange={ ({ target }) => {
            setFilter({
              ...filter,
              column: target.value,
            });
          } }
        >
          { columnFilterOptions
            .map((value, index) => <option key={ index }>{value}</option>) }
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => {
            setFilter({
              ...filter,
              comparison: target.value,
            });
          } }
        >
          <option>Selecione</option>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        <input
          data-testid="value-filter"
          type="number"
          name="value"
          value={ filter.value }
          onChange={ ({ target }) => {
            setFilter({
              ...filter,
              value: target.value,
            });
          } }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClickOnState }
      >
        Filter
      </button>
      <ol>
        { filters.filters.filterByNumericValues
          .map((value, index) => (
            <li data-testid="filter" key={ index }>
              {`${value.column} | ${value.comparison} | ${value.value}`}
              <button
                type="button"
                onClick={ () => handleClickRemoveList(index) }
              >
                x
              </button>
            </li>)) }
      </ol>
      <table>
        <thead>
          <tr>
            { filterHeader.map((value, index) => <th key={ index }>{value}</th>)}
          </tr>
        </thead>
        <tbody>
          { filterColumn.map((value, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{value.name}</td>
              <td>{value.rotation_period}</td>
              <td>{value.orbital_period}</td>
              <td>{value.diameter}</td>
              <td>{value.climate}</td>
              <td>{value.gravity}</td>
              <td>{value.terrain}</td>
              <td>{value.surface_water}</td>
              <td>{value.population}</td>
              <td>{value.films}</td>
              <td>{value.created}</td>
              <td>{value.edited}</td>
              <td>{value.url}</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;