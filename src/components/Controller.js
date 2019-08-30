import React from 'react';
import './Controller.css';
import PersonCard from './PersonCard';

export default class Controller extends React.Component {
    state = {
        budget: '',
        PersonCards: [],
        alternatives: [],
        inputInvalid: false,
        budgetSet: false,
        personAdded: false
    };

    addPerson = () => {
        const persons = [...this.state.PersonCards];
        const alts = [...this.state.references];

        alts.push(false);
        persons.push(<PersonCard />);
        this.setState({ PersonCards: persons, references: alts, personAdded: true });
    };

    checkAllPersonInputs = () => {
        if (
            this.state.PersonCards.every(person => {
                return person.state.inputMade;
            })
        )
            return true;
        else return false;
    };

    setAllPersonInputs = () => {
        this.state.PersonCards.forEach((person, index) => person.setInput());
    };

    setBudget = e => {
        this.setState({ budget: e.target.value });
    };

    computeResults = e => {
        this.setAllPersonInputs();

        if (!this.checkAllPersonInputs) return false;
        else if (isNaN(this.state.budget)) {
            this.setState({ inputInvalid: true });
            return false;
        } else if (this.state.budget === '')
            this.setState({ budget: 0, inputInvalid: false, budgetSet: true });
        else this.setState({ budgetSet: true, inputInvalid: false });

        this.state.PersonCards.forEach((person, index) => {
            this.state.references[index].current.lockIn();
        });

        console.log('lol', this.state);
    };

    render() {
        let computeButton = this.state.personAdded ? (
            <button className='compute-button' onClick={this.computeResults}>
                Compute results
            </button>
        ) : null;

        return !this.state.budgetSet ? (
            <div className='controller'>
                <div className='head'>
                    <input
                        type='number'
                        className='budget-input'
                        placeholder='Enter a budget...'
                        value={this.state.budget}
                        onChange={this.setBudget}
                    ></input>
                    {computeButton}
                </div>

                <button onClick={this.addPerson}>Add Person</button>
                <div className='controller-items'>
                    {this.state.PersonCards.map((personCard, index) => (
                        <div key={index}>{personCard}</div>
                    ))}
                </div>
            </div>
        ) : (
            <div className='controller'>
                <div className='head head-after'>
                    <h1> Budget: {this.state.budget}</h1>
                </div>
                <div className='controller-items'>
                    {this.state.PersonCards.map((personCard, index) => (
                        <div key={index}>{personCard}</div>
                    ))}
                </div>
            </div>
        );
    }
}
