import React from 'react';

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
    } = this.props;
    return (
      <form>
        <label htmlFor="name-input"> Nome</label>
        <input
          data-testid="name-input"
          id="name-input"
          type="text"
          value={cardName}
          name='cardName'
          onChange={ onInputChange }
        />
        <label htmlFor="description-input"> Descrição</label>
        <input
          data-testid="description-input"
          id="description-input"
          type="textarea"
          value={ cardDescription }
          name='cardDescription'
          onChange={ onInputChange }
        />
        <label htmlFor="attr1-input"> Atributo 1</label>
        <input
          data-testid="attr1-input"
          id="attr1-input"
          type="number"
          name='cardAttr1'
          value={ cardAttr1 }
          onChange={ onInputChange }
        />
        <label htmlFor="attr2-input">Atributo 2</label>
        <input
          data-testid="attr2-input"
          id="attr2-input"
          type="number"
          name='cardAttr2'
          value={ cardAttr2 }
          onChange={ onInputChange }
        />
        <label htmlFor="attr3-input">Atributo 3</label>
        <input
          data-testid="attr3-input"
          id="attr3-input"
          type="number"
          name='cardAttr3'
          value={ cardAttr3 }
          onChange={ onInputChange }
        />
        <label htmlFor="image-input"> Link da Imagem</label>
        <input
          data-testid="image-input"
          id="image-input"
          type="text"
          name='cardImage'
          value={ cardImage }
          onChange={ onInputChange }
        />
        <label htmlFor="rare-input">Selecione a raridade</label>
        <select
          data-testid="rare-input"
          id="rare-input"
          name='cardRare'
          value={ cardRare }
          onChange={ onInputChange }
        >
          <option value="normal"> Normal </option>
          <option value="raro"> Raro </option>
          <option value="muito raro"> Muito Raro </option>
        </select>
        <label htmlFor="trunfo-input">Selecione se for o trunfo</label>
        <input
          data-testid="trunfo-input"
          id="trunfo-input"
          type="checkbox"
          name='cardTrunfo'
          checked={ cardTrunfo }
          onChange={ onInputChange }
        />
        <button
          data-testid="save-button"
          name='isSaveButtonDisabled'
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

export default Form;
