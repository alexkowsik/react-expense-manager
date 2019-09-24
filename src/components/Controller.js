import React from 'react';
import './Controller.css';

const Error = props => {
  if (props.error) return <p className='error-message'>Please check your Inputs...</p>;
  else return null;
};

const PersonCard = props => {
  return (
    <div className='controller-items'>
      {props.person.inputMade ? (
        <div className='person-card'>
          <h2 className='person-card-name'>Name: {props.person.name}</h2>
          <h2 className='person-card-paid'>Paid: {props.person.paid}</h2>
          <h2 className='person-card-willGet'>
            Will get: {props.person.willGet === '' ? '...pending' : props.person.willGet}
          </h2>
        </div>
      ) : (
        <div className='person-card'>
          <input
            type='name'
            paid={props.person.name}
            placeholder='Person Name'
            onChange={e => props.handleNameChange(e, props.person.id)}
          />
          <input
            type='number'
            paid={props.person.paid}
            placeholder='Has already paid'
            onChange={e => props.handlePaidChange(e, props.person.id)}
          />
          <Error error={props.person.inputInvalid} />
        </div>
      )}
    </div>
  );
};

export default class Controller extends React.Component {
  state = {
    id: 0,
    budget: '',
    PersonCards: [],
    inputInvalid: false,
    budgetSet: false,
    personAdded: false
  };

  validateInput = person => {
    if (
      !/^[a-zA-ZäöüÄÖÜß 1234567890-_.,]+$/.test(person.name) ||
      person.name === '' ||
      isNaN(person.paid) ||
      person.paid === ''
    )
      return false;
    else return true;
  };

  addPerson = () => {
    let persons = [...this.state.PersonCards];
    const id = this.state.id;
    persons.push({
      id: id,
      name: '',
      paid: '',
      willGet: 0,
      inputInvalid: false,
      inputMade: false
    });
    this.setState({ PersonCards: persons, personAdded: true, id: id + 1 });
  };

  checkAllPersonInputs = () => {
    let personList = [...this.state.PersonCards];

    if (
      personList.every((person, index) => {
        if (this.validateInput(person)) {
          personList[index].inputMade = true;
          return true;
        }
        return false;
      })
    ) {
      this.setState({ PersonCards: personList });
      return true;
    } else {
      this.setState({ PersonCards: personList });
      return false;
    }
  };

  setBudget = e => {
    e.persist();

    if (isNaN(e.target.value)) {
      e.target.value = '';
      e.target.placeholder = 'Please enter a valid number...';
    } else this.setState({ budget: e.target.value });
  };

  computeResults = () => {
    if (!this.checkAllPersonInputs()) return false;
    else if (isNaN(this.state.budget)) {
      this.setState({ inputInvalid: true });
      return false;
    } else if (this.state.budget === '') {
      this.setState({ budget: 0, inputInvalid: false, budgetSet: true });
      this.computeEndResults();
    } else {
      this.setState({ budgetSet: true, inputInvalid: false });
      this.computeEndResults();
    }
  };

  getSumOfPaid = () => {
    let sumOfPaid = 0;

    for (let i = 0; i < this.state.PersonCards.length; i++) {
      sumOfPaid += parseFloat(this.state.PersonCards[i].paid);
    }
    console.log(sumOfPaid);
    return sumOfPaid;
  };

  computeEndResults = () => {
    let persons = [...this.state.PersonCards];
    const sumOfPaid = this.getSumOfPaid();

    const paidOverBudget = parseFloat(this.state.budget) - sumOfPaid;

    if (paidOverBudget >= 0)
      persons.forEach(person => {
        person.willGet = parseFloat(person.paid);
      });
    else
      persons.forEach(person => {
        person.willGet =
          parseFloat(person.paid) - (sumOfPaid - parseFloat(this.state.budget)) / persons.length;
      });

    this.setState({ PersonCards: persons });
  };

  handleNameChange = (e, id) => {
    let persons = [...this.state.PersonCards];
    persons[id].name = e.target.value;

    this.setState({ PersonCards: persons });
  };

  handlePaidChange = (e, id) => {
    let persons = [...this.state.PersonCards];
    persons[id].paid = e.target.value;

    this.setState({ PersonCards: persons });
  };

  render() {
    const computeButton =
      this.state.personAdded && !this.state.budgetSet ? (
        <button className='compute-button' onClick={this.computeResults}>
          Compute results
        </button>
      ) : null;

    const budgetInput = this.state.budgetSet ? (
      <h1> Budget: {this.state.budget}</h1>
    ) : (
      <input
        type='number'
        className='budget-input'
        placeholder='Enter a budget...'
        value={this.state.budget}
        onChange={this.setBudget}
      ></input>
    );

    const addPersonButton =
      !this.state.budgetSet && !this.state.inputInvalid ? (
        <button onClick={this.addPerson}>Add Person</button>
      ) : null;

    return (
      <div className='controller'>
        <div className='head'>
          {budgetInput}
          {computeButton}
        </div>

        <div className='controller-items'>
          {this.state.PersonCards.map(person => {
            return (
              <PersonCard
                key={person.id}
                person={person}
                handleNameChange={this.handleNameChange}
                handlePaidChange={this.handlePaidChange}
              />
            );
          })}
        </div>

        {addPersonButton}
      </div>
    );
  }
}
