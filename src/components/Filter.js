import React from 'react';
import PropTypes from 'prop-types';

class Filter extends React.Component {
  render() {
    const { filterCards, onCheckTrunfoFilter } = this.props;
    return (
      <div className="card-filter">
        <div className="filter-header">
          <span className="bol" />
          <h5 className="filter-cards-span">Filtrar Cartas</h5>
        </div>
        <label htmlFor="name-filter">
          <span className="input-span">Filtrar por Nome</span>
          <input
            id="name-filter"
            data-testid="name-filter"
            placeholder="Nome da Carta"
            name="filterCards"
            onChange={ filterCards }
          />
        </label>
        <label htmlFor="rare-filter">
          <span className="input-span">Filtrar por Raridade</span>
          <select
            id="rare-filter"
            data-testid="rare-filter"
            onChange={ filterCards }
            defaultValue="todas"
          >
            <option value="todas">Todas</option>
            <option value="normal">Normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfo-filter">
          <span>Trunfo</span>
          <input
            data-testid="trunfo-filter"
            type="checkbox"
            onChange={ onCheckTrunfoFilter }
          />
        </label>
      </div>
    );
  }
}

Filter.propTypes = {
  filterCards: PropTypes.func.isRequired,
  onCheckTrunfoFilter: PropTypes.func.isRequired,
};

export default Filter;
