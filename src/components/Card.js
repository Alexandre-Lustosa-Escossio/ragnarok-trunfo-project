import React from "react";

class Card extends React.Component{
    render(){
        const {cardName, cardImage, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardRare, cardTrunfo} = this.props
        return(
            <div>
                <span data-testid='name-card'>{cardName}</span>
                <img data-testid='image-card'src={cardImage} alt={cardName}></img>
                <p data-testid='description-card'>{cardDescription}</p>
                <span data-testid='attr1-card'>{cardAttr1}</span>
                <span data-testid='attr2-card'>{cardAttr2}</span>
                <span data-testid='attr3-card'>{cardAttr3}</span>
                <span data-testid='rare-card'>{cardRare}</span>
                { cardTrunfo? <span data-testid='trunfo-card'>Super Trunfo</span> : ''}
            </div>
        )
    }
}

export default Card