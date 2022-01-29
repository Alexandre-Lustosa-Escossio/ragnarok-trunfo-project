import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'Normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      cardsList: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
  }

  onInputChange({ target: { name, value, type, checked } }) {
    value = type === 'checkbox' ? checked : value;
    // Source: https://pt-br.reactjs.org/docs/react-component.html
    this.setState(
      {
        [name]: value,
      },
      () => this.validateSaveBtnAvailability(),
    );
  }

  onSaveButtonClick() {
    const { cardsList,
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      hasTrunfo } = this.state;
    this.setState(() => ({
      // Source: https://stackoverflow.com/questions/37435334/correct-way-to-push-into-state-array
      cardsList: [...cardsList, {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        hasTrunfo,
      }],
    }), () => {
      this.setState({
        cardName: '',
        cardDescription: '',
        cardAttr1: 0,
        cardAttr2: 0,
        cardAttr3: 0,
        cardImage: '',
        cardRare: 'Normal',
        cardTrunfo: false,
        hasTrunfo: false,
        isSaveButtonDisabled: true,
      });
    });
  }

  validateSaveBtnAvailability() {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;
    const convertedAttr1 = Number(cardAttr1);
    const convertedAttr2 = Number(cardAttr2);
    const convertedAttr3 = Number(cardAttr3);
    const areInputsFilled = (cardName
        && cardDescription
        && cardImage
        && cardRare
        && cardAttr1
        && cardAttr2
        && cardAttr3);
    const maxAttrNum = 90;
    const minAttrNum = 0;
    const attrValidator = (convertedAttr1 >= minAttrNum && convertedAttr1 <= maxAttrNum)
      && (convertedAttr2 >= minAttrNum && convertedAttr2 <= maxAttrNum)
      && (convertedAttr3 >= minAttrNum && convertedAttr3 <= maxAttrNum);
    const maxAttrSum = 210;
    const attrSumValidator = convertedAttr1
      + convertedAttr2
      + convertedAttr3
      <= maxAttrSum;
    if (areInputsFilled && attrValidator && attrSumValidator) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      cardsList } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ Number(cardAttr1) }
          cardAttr2={ Number(cardAttr2) }
          cardAttr3={ Number(cardAttr3) }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ false }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <div>
          {cardsList.map((card) => {
            const { name,
              description,
              attr1,
              attr2,
              attr3,
              image,
              rare,
              trunfo } = card;
            return (
              <Card
                key={ name }
                cardName={ name }
                cardDescription={ description }
                cardAttr1={ attr1 }
                cardAttr2={ attr2 }
                cardAttr3={ attr3 }
                cardImage={ image }
                cardRare={ rare }
                cardTrunfo={ trunfo }
              />);
          })}
        </div>
      </div>
    );
  }
}

export default App;
