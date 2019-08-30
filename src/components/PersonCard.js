import React from 'react';
import './PersonCard.css';

const Error = props => {
    if (props.error) return <p className='error-message'>Please check your Inputs...</p>;
    else return null;
};

export default class PersonCard extends React.Component {
    state = {
        name: '',
        paid: '',
        willGet: '',
        inputInvalid: false,
        inputMade: false,
        showAlternative: false
    };

    lockIn = () => {
        this.setState({ showAlternative: true });
    };

    render(props) {
        const validateInput = () => {
            if (
                !/^[a-zA-ZäöüÄÖÜß 1234567890]+$/.test(this.state.name) ||
                this.state.name === '' ||
                isNaN(this.state.paid) ||
                this.state.paid === ''
            ) {
                this.setState({ inputInvalid: true, inputMade: false });
            } else {
                this.setState({ inputMade: true, inputInvalid: false });
            }
        };

        const handleNameChange = e => {
            this.setState({ name: e.target.value });
            validateInput();
        };

        const handlePaidChange = e => {
            this.setState({ paid: e.target.value });
            validateInput();
        };

        return this.state.showAlternative ? (
            <div className='person-card'>
                <h2 className='person-card-name'>Name: {this.state.name}</h2>
                <h2 className='person-card-paid'>Paid: {this.state.paid}</h2>
            </div>
        ) : (
            <div className='person-card'>
                <input
                    type='name'
                    paid={this.state.name}
                    placeholder='Person Name'
                    onChange={handleNameChange}
                />
                <input
                    type='number'
                    paid={this.state.paid}
                    placeholder='Paid amount'
                    onChange={handlePaidChange}
                />
                <Error error={this.state.inputInvalid} />
                <button onClick='handleInput'>Validate Inputs</button>
            </div>
        );
    }
}
