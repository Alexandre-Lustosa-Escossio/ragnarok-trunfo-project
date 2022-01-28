import React from "react";
import Form from "./components/Form";
import Card from "./components/Card";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: "",
      cardDescription: "",
      cardAttr1: "",
      cardAttr2: "",
      cardAttr3: "",
      cardImage: "",
      cardRare: "Normal",
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  validateSaveBtnAvailability() {
    {
      const {
        cardName,
        cardDescription,
        cardImage,
        cardRare,
        cardAttr1,
        cardAttr2,
        cardAttr3,
      } = this.state;
      const convertedCardAttr1 = Number(cardAttr1)
      const convertedCardAttr2 = Number(cardAttr2)
      const convertedCardAttr3 = Number(cardAttr3)
      const areInputsFilled = (cardName&&cardDescription &&cardImage && cardRare && cardAttr1 && cardAttr2 && cardAttr3) ? true: false
      const attrValidator = (convertedCardAttr1>=0 && convertedCardAttr1 <= 90) && (convertedCardAttr2>=0 && convertedCardAttr2 <= 90) && (convertedCardAttr3>=0 && convertedCardAttr3 <= 90)
      const attrSumValidator =  convertedCardAttr1 + convertedCardAttr2 + convertedCardAttr3 <= 210;
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
  }

  onInputChange({ target: { name, value, type, checked } }) {
    value = type === "checkbox" ? checked : value;
    this.setState(
      {
        [name]: value,
      },
      () => this.validateSaveBtnAvailability()
    );
  }

  onSaveButtonClick() {}

  render() {
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={this.state.cardName}
          cardDescription={this.state.cardDescription}
          cardAttr1={this.state.cardAttr1}
          cardAttr2={this.state.cardAttr2}
          cardAttr3={this.state.cardAttr3}
          cardImage={this.state.cardImage}
          cardRare={this.state.cardRare}
          cardTrunfo={this.state.cardTrunfo}
          hasTrunfo={false}
          isSaveButtonDisabled={this.state.isSaveButtonDisabled}
          onInputChange={this.onInputChange}
          onSaveButtonClick={() => {}}
        />
        <Card
          cardName={this.state.cardName}
          cardDescription={this.state.cardDescription}
          cardAttr1={this.state.cardAttr1}
          cardAttr2={this.state.cardAttr2}
          cardAttr3={this.state.cardAttr3}
          cardImage={this.state.cardImage}
          cardRare={this.state.cardRare}
          cardTrunfo={this.state.cardTrunfo}
        ></Card>
      </div>
    );
  }
}

export default App;
