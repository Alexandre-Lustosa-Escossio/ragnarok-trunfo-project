import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';
import Filter from './components/Filter';

class App extends React.Component {
  constructor() {
    super();
    this.initialState = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      filterTrunfo: false,
    };
    this.state = {
      ...this.initialState,
      cardsList: [],
      filteredCards: [],
      filterNameState: '',
      filterRareState: 'todas',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.isThereTrunfo = this.isThereTrunfo.bind(this);
    this.changeTrunfoState = this.changeTrunfoState.bind(this);
    this.validateSaveBtnAvailability = this.validateSaveBtnAvailability.bind(this);
    this.onExcludeClick = this.onExcludeClick.bind(this);
    this.filterCards = this.filterCards.bind(this);
    this.isTrunfoFilterActive = this.isTrunfoFilterActive.bind(this);
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

onSaveButtonClick = () => {
  const stateValues = Object.values(this.state);
  this.setState(() => ({
    // Source: https://stackoverflow.com/questions/37435334/correct-way-to-push-into-state-array
    cardsList: [...stateValues[11], {
      cardName: stateValues[0],
      cardDescription: stateValues[1],
      cardAttr1: parseInt(stateValues[2], 10),
      cardAttr2: parseInt(stateValues[3], 10),
      cardAttr3: parseInt(stateValues[4], 10),
      cardImage: stateValues[5],
      cardRare: stateValues[6],
      cardTrunfo: stateValues[7],
      hasTrunfo: stateValues[8],
      excludeBtn: true,
    }],
    ...this.initialState,
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

onCheckTrunfoFilter = () => {
  const { filterTrunfo } = this.state;
  this.setState(() => ({
    filterTrunfo: !filterTrunfo,
  }), () => this.filterCards());
}

filterValidation(rareFilterSource, nameFilter) {
  const { cardsList } = this.state;
  const filteredCards = cardsList.filter((card) => {
    const validateRareFilter = rareFilterSource === 'todas'
      ? true : card.cardRare === rareFilterSource;
    return (card.cardName.includes(nameFilter) && validateRareFilter);
  });
  return filteredCards;
}

filterCards(e) {
  const { filterNameState, filterRareState } = this.state;
  if (e) {
    const { target: { type, value } } = e;
    if (type === 'text') {
      const filteredCards = this.filterValidation(filterRareState, value);
      this.setState(() => ({
        filteredCards,
        filterNameState: value,
      }));
    } else {
      const filteredCards = this.filterValidation(value, filterNameState);
      this.setState(() => ({
        filteredCards,
        filterRareState: value,
      }));
    }
  } else {
    const filteredCards = this.filterValidation(filterRareState, filterNameState);
    this.setState(() => ({
      filteredCards,
    }));
  }
  this.isTrunfoFilterActive();
}

validateSaveBtnAvailability() {
  // Consultei o pr do Alessandro para melhorar essa função
  const {
    cardName,
    cardDescription,
    cardImage,
    cardRare,
    cardAttr1,
    cardAttr2,
    cardAttr3,
  } = this.state;
  const currState = [
    cardName,
    cardDescription,
    cardImage,
    cardRare,
    cardAttr1,
    cardAttr2,
    cardAttr3,
  ];
  const attr = [
    Number(cardAttr1),
    Number(cardAttr2),
    Number(cardAttr3),
  ];
  const attrValidator = attr.every((item) => item <= +'90' && item >= 0);
  const attrSumValidator = attr.reduce((acc, curr) => acc + curr) <= +'210';
  const inputsValidator = currState.some((input) => input === '');
  if (!inputsValidator && attrValidator && attrSumValidator) {
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

isTrunfoFilterActive() {
  const { cardsList, filterTrunfo } = this.state;
  if (filterTrunfo) {
    const trunfo = cardsList.find((card) => card.cardTrunfo);
    if (trunfo) {
      this.setState(() => ({
        filteredCards: [trunfo],
      }));
    } else {
      this.setState(() => ({
        filteredCards: [],
      }));
    }
  }
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
      <Filter
        filterCards={ this.filterCards }
        onCheckTrunfoFilter={ this.onCheckTrunfoFilter }
      />
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
