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
      cardRare: "",
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
    };
    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange({target:{name,value,type, checked}}) {
    value = type === 'checkbox'? checked: value
    this.setState({
      [name]: value
    }) 
  }

  onSaveButtonClick() {
    return "Olá";
  }

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
