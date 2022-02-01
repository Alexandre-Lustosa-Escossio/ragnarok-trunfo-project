import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      onInputChange,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      onSaveButtonClick,
      hasTrunfo,
    } = this.props;
    return (
      <div className="form-container">
        <div className="title">
          <span className="bol" />
          <h5>Informações</h5>
        </div>
        <form className="form">
          <label htmlFor="name-input">
            <span className="input-span">Nome</span>
            <input
              data-testid="name-input"
              id="name-input"
              type="text"
              value={ cardName }
              name="cardName"
              placeholder="Nome do Personagem"
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="description-input">
            <span className="input-span">Descrição</span>
            <textarea
              data-testid="description-input"
              id="description-input"
              type="textarea"
              rows={ 3 }
              value={ cardDescription }
              placeholder="Descrição"
              name="cardDescription"
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr1-input">
            <span className="input-span">Atributo 1</span>
            <input
              data-testid="attr1-input"
              id="attr1-input"
              type="number"
              name="cardAttr1"
              value={ cardAttr1 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr2-input">
            <span className="input-span">Atributo 2</span>
            <input
              data-testid="attr2-input"
              id="attr2-input"
              type="number"
              name="cardAttr2"
              value={ cardAttr2 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr3-input">
            <span className="input-span">Atributo 3</span>
            <input
              data-testid="attr3-input"
              id="attr3-input"
              type="number"
              name="cardAttr3"
              value={ cardAttr3 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="image-input">
            <span className="input-span">Link da Imagem</span>
            <input
              data-testid="image-input"
              id="image-input"
              type="text"
              name="cardImage"
              value={ cardImage }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="rare-input">
            <span className="input-span">Selecione a raridade</span>
            <select
              data-testid="rare-input"
              id="rare-input"
              name="cardRare"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option value="normal"> Normal </option>
              <option value="raro"> Raro </option>
              <option value="muito raro"> Muito Raro </option>
            </select>
          </label>
          <label htmlFor="trunfo-input">
            <span className="input-span">Selecione se for o trunfo</span>
            {hasTrunfo && 'Você já tem um Super Trunfo em seu baralho'}
            {!hasTrunfo && <input
              data-testid="trunfo-input"
              id="trunfo-input"
              type="checkbox"
              name="cardTrunfo"
              checked={ cardTrunfo }
              onChange={ onInputChange }
            />}
          </label>
          <button
            data-testid="save-button"
            className="save-button"
            name="isSaveButtonDisabled"
            type="button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
