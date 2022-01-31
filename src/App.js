import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';

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
      filteredCards: [],
      filterState: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.isThereTrunfo = this.isThereTrunfo.bind(this);
    this.changeTrunfoState = this.changeTrunfoState.bind(this);
    this.validateSaveBtnAvailability = this.validateSaveBtnAvailability.bind(this);
    this.onExcludeClick = this.onExcludeClick.bind(this);
    this.filterCards = this.filterCards.bind(this);
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
      cardTrunfo,
      hasTrunfo } = this.state;
    this.setState(() => ({
      // Source: https://stackoverflow.com/questions/37435334/correct-way-to-push-into-state-array
      cardsList: [...cardsList, {
        cardName,
        cardDescription,
        cardAttr1: parseInt(cardAttr1, 10),
        cardAttr2: parseInt(cardAttr2, 10),
        cardAttr3: parseInt(cardAttr3, 10),
        cardImage,
        cardRare,
        cardTrunfo,
        hasTrunfo,
        excludeBtn: true,
      }],
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
    }), () => {
      this.isThereTrunfo();
      this.filterCards();
    });
  }

  onExcludeClick(cardName, cardTrunfo) {
    const { cardsList } = this.state;
    let hasTrunfo = false;
    const updatedCardsList = cardsList.filter((card) => {
      hasTrunfo = card.cardTrunfo ? true : hasTrunfo;
      return (card.cardName !== cardName);
    });
    hasTrunfo = cardTrunfo ? false : hasTrunfo;
    this.setState({
      cardsList: [...updatedCardsList],
      hasTrunfo,
    }, () => this.filterCards());
  }

  filterCards(e) {
    const { cardsList, filterState } = this.state;
    if (e) {
      const filteredCards = cardsList.filter((card) => (
        card.cardName.includes(e.target.value)
      ));
      this.setState(() => ({
        filteredCards,
        filterState: e.target.value,
      }));
    } else {
      const filteredCards = cardsList.filter((card) => (
        card.cardName.includes(filterState)
      ));
      this.setState(() => ({
        filteredCards,
      }));
    }
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

  changeTrunfoState() {
    this.setState({
      hasTrunfo: true,
    });
  }

  isThereTrunfo() {
    const { cardsList } = this.state;
    cardsList.forEach((card) => {
      const { cardTrunfo } = card;
      if (cardTrunfo) {
        this.changeTrunfoState();
      }
    });
  }

  render() {
    const { cardAttr1,
      cardAttr2,
      cardAttr3,
      filteredCards } = this.state;
    const url = ('https://cdn10.idcgames.com/storage/image/14/Game-Logo/default.png');
    return (
      <main>
        <img
          className="logo-img"
          src={ url }
          alt="Ragnarok Online Logo"
        />
        <section className="add-card-section">
          <div className="form-div">
            <Form
              { ...this.state }
              cardAttr1={ parseInt(cardAttr1, 10) }
              cardAttr2={ parseInt(cardAttr2, 10) }
              cardAttr3={ parseInt(cardAttr3, 10) }
              onInputChange={ this.onInputChange }
              onSaveButtonClick={ this.onSaveButtonClick }
            />
          </div>
          <div className="card-div">
            <Card
              { ...this.state }
              cardAttr1={ parseInt(cardAttr1, 10) }
              cardAttr2={ parseInt(cardAttr2, 10) }
              cardAttr3={ parseInt(cardAttr3, 10) }
            />
          </div>
        </section>
        <div>
          <label htmlFor="name-filter">
            <span>Filtrar Cartas</span>
            <input
              id="name-filter"
              data-testid="name-filter"
              placeholder="Nome da Carta"
              name="filterCards"
              onChange={ this.filterCards }
            />
          </label>
        </div>
        <div className="collection-container">
          {filteredCards.map((card, index) => (
            <Card
              key={ index }
              { ...card }
              onExcludeClick={ this.onExcludeClick }
            />))}
        </div>
      </main>
    );
  }
}
export default App;
