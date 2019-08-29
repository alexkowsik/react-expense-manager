import React from 'react';
import './PersonCard.css';

const Error = props => {
    if (props.error) return <p className='error-message'>Please check your Inputs...</p>;
    else return null;
};

export default class PersonCard extends React.Component {
    state = {
        button: 'Submit',
        name: '',
        value: '',
        inputInvalid: false,
        inputMade: false
    };

    render(props) {
        const submitMoney = e => {
            if (
                !/^[a-zA-ZäöüÄÖÜß 1234567890]+$/.test(this.state.name) ||
                this.state.name === '' ||
                isNaN(this.state.value) ||
                this.state.value === ''
            ) {
                this.setState({ inputInvalid: true });
            } else {
                this.setState({ inputMade: true, inputInvalid: false });
            }

            console.log(this.state);
        };

        const handleNameChange = e => {
            this.setState({ name: e.target.value });
        };

        const handleValueChange = e => {
            this.setState({ value: e.target.value });
        };

        return this.state.inputMade ? (
            <div className='person-card'>
                <h2 className='person-card-name'>Name: {this.state.name}</h2>
                <h2 className='person-card-value'>Paid: {this.state.value}</h2>
            </div>
        ) : (
            <div className='person-card'>
                <input
                    type='name'
                    value={this.state.name}
                    placeholder='Person Name'
                    onChange={handleNameChange}
                />
                <input
                    type='number'
                    value={this.state.value}
                    placeholder='Paid amount'
                    onChange={handleValueChange}
                />
                <Error error={this.state.inputInvalid} />
                <button onClick={submitMoney}>{this.state.button}</button>
            </div>
        );
    }
}
