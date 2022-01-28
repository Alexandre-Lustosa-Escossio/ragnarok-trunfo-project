import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
  }

  onInputChange() {
    return 'Olá';
  }

  onSaveButtonClick() {
    return 'Olá';
  }

  render() {
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName=""
          cardDescription=""
          cardAttr1=""
          cardAttr2=""
          cardAttr3=""
          cardImage=""
          cardRare=""
          cardTrunfo
          hasTrunfo={ false }
          isSaveButtonDisabled
          onInputChange={ () => {} }
          onSaveButtonClick={ () => {} }
        />
        <Card cardName='' cardImage='' cardDescription='' cardAttr1='' cardAttr2='' cardAttr3='' cardRare={false} cardTrunfo={false}></Card>
      </div>
    );
  }
}

export default App;
