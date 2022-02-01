import React from 'react';
import PropTypes from 'prop-types';
import img from './mvp.png';

class Card extends React.Component {
  render() {
    const { cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
      excludeBtn,
      onExcludeClick } = this.props;
    return (
      <div className="card-container">
        <div className="card-background">
          {cardTrunfo && <img className="mvp-img" src={ img } alt="teste" />}
          <div className="card-frame">
            <div className="frame-header">
              <span className="black-span" data-testid="name-card">{cardName}</span>
            </div>
            <img
              className="char-image"
              data-testid="image-card"
              src={ cardImage }
              alt={ cardName }
            />
            <div className="frame-type-line">
              <span className="black-span">Descrição</span>
            </div>
            <div className="frame-text-box">
              <p
                className="black-span"
                data-testid="description-card"
              >
                {cardDescription}
              </p>
              <span className="attribute-label">STR:</span>
              <span className="black-span" data-testid="attr1-card">{cardAttr1}</span>
              <span className="attribute-label">AGI:</span>
              <span className="black-span" data-testid="attr2-card">{cardAttr2}</span>
              <span className="attribute-label">DEX:</span>
              <span className="black-span" data-testid="attr3-card">{cardAttr3}</span>
              <span className="attribute-label">Raridade:</span>
              <span className="black-span" data-testid="rare-card">{cardRare}</span>
              { cardTrunfo && (
                <div>
                  <span
                    className="black-span"
                    data-testid="trunfo-card"
                  >
                    Super Trunfo
                  </span>
                </div>)}
            </div>
            {excludeBtn
              ? (
                <button
                  className="delete-button"
                  data-testid="delete-button"
                  type="button"
                  onClick={ () => onExcludeClick(cardName, cardTrunfo) }
                >
                  Excluir
                </button>) : '' }
          </div>
        </div>
      </div>
    );
  }
}

// Source: https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html
Card.defaultProps = {
  excludeBtn: false,
  onExcludeClick: () => {},
};

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  excludeBtn: PropTypes.bool,
  onExcludeClick: PropTypes.func,
};

export default Card;
