import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDisplayValue: '0',
      lastOperator: null,
      lastOperand: null,
      exception: false
    };

    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.handleEqualClick = this.handleEqualClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleDecimalClick = this.handleDecimalClick.bind(this);
  }

  handleNumberClick(number) {
    this.setState(prevState => ({
      currentDisplayValue: ['+', '-', '*', '/'].includes(prevState.currentDisplayValue) || prevState.currentDisplayValue === '0'
        ? number
        : prevState.currentDisplayValue + number,
    }));
    console.log("last operand:",this.state.lastOperand);
    console.log("last operator:",this.state.lastOperator);
    console.log("current display value:",this.state.currentDisplayValue);

  }

  handleOperatorClick(operator) {
    let { currentDisplayValue, lastOperator, lastOperand } = this.state;
  
    if (['+', '-', '*', '/'].includes(currentDisplayValue)) {
      if (['*', '/'].includes(lastOperator) && operator === '-') {
        this.setState(prevState => {
          return {
            currentDisplayValue: operator,
            lastOperator: lastOperator,
            lastOperand: lastOperand,
            exception: true
          };
        });
      } else {
        this.setState({
          currentDisplayValue: operator,
          lastOperator: operator,
          exception:false
        });
      }
    } else {
      const result = this.calculateResult(lastOperand, currentDisplayValue, lastOperator);
      this.setState({
        lastOperator: operator,
        lastOperand: result,
        currentDisplayValue: operator
      });
    }
    console.log("last operand:",this.state.lastOperand);
    console.log("last operator:",this.state.lastOperator);
    console.log("current display value:",this.state.currentDisplayValue);

  }
  

  handleEqualClick() {
    const { currentDisplayValue, lastOperator, lastOperand } = this.state;
    let result = this.calculateResult(lastOperand, currentDisplayValue, lastOperator);
    if (this.state.exception){result=-result;
      this.setState({exception:false})
    }
    this.setState({
      currentDisplayValue: String(result),
      lastOperator: null,
      lastOperand: null
    });
    console.log("last operand:",this.state.lastOperand);
    console.log("last operator:",this.state.lastOperator);
    console.log("current display value:",this.state.currentDisplayValue);

  }

  handleClearClick() {
    this.setState({
      currentDisplayValue: '0',
      lastOperator: null,
      lastOperand: null
    });
  }

  handleDecimalClick() {
    this.setState(prevState => {
      if (!prevState.currentDisplayValue.includes('.')) {
        return {
          currentDisplayValue: prevState.currentDisplayValue + '.'
        };
      }
      return null;
    });
  }

  calculateResult(operand1, operand2, operator) {
    const num1 = parseFloat(operand1) || 0;
    const num2 = parseFloat(operand2) || 0;

    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num2 !== 0 ? num1 / num2 : 'Error'; // Prevent division by zero
      default:
        return num2;
    }
  }

  render() {
    const buttonArray = [
      { id: 'zero', label: '0' },
      { id: 'one', label: '1' },
      { id: 'two', label: '2' },
      { id: 'three', label: '3' },
      { id: 'four', label: '4' },
      { id: 'five', label: '5' },
      { id: 'six', label: '6' },
      { id: 'seven', label: '7' },
      { id: 'eight', label: '8' },
      { id: 'nine', label: '9' },
      { id: 'add', label: '+' },
      { id: 'subtract', label: '-' },
      { id: 'multiply', label: '*' },
      { id: 'divide', label: '/' },
      { id: 'decimal', label: '.' },
      { id: 'clear', label: 'C' },
      { id: 'equals', label: '=' }
    ];

    return (
      <div className="calculator">
        <Display displayValue={this.state.currentDisplayValue} />
        <div className="buttons">
          {buttonArray.map(button => (
            <Button
              key={button.id}
              id={button.id}
              label={button.label}
              onClick={() => {
                if (button.id === 'clear') this.handleClearClick();
                else if (button.id === 'equals') this.handleEqualClick();
                else if (['add', 'subtract', 'multiply', 'divide'].includes(button.id)) {
                  this.handleOperatorClick(button.label);
                } else if (button.id === 'decimal') this.handleDecimalClick();
                else {
                  this.handleNumberClick(button.label);
                }
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

class Button extends Component {
  render() {
    const { id, label, onClick } = this.props;

    return (
      <button id={id} className="button" onClick={onClick}>
        {label}
      </button>
    );
  }
}

class Display extends Component {
  render() {
    const { displayValue } = this.props;

    return (
      <div id="display" className="display">
        {displayValue}
      </div>
    );
  }
}

export default App;
