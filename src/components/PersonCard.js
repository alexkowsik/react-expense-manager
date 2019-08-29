import React from 'react';
import './PersonCard.css';

const Error = props => {
    if (props.error) return <p className='error-message'>Please check your Inputs...</p>;
    else return null;
};

export default class PersonCard extends React.Component {
    state = {
        name: undefined,
        value: undefined,
        inputInvalid: true
    };

    render(props) {
        const submitMoney = e => {
            this.setState({
                amount: e.target.value,
                inputInvalid: !this.state.inputInvalid
            });
            console.log(this.state);
        };

        return (
            <div className='person-card'>
                <input type='name' value={this.state.name} placeholder='Person Name' />
                <input type='number' value={this.state.value} placeholder='Value' />
                <Error error={this.state.inputInvalid} />
                <button onClick={submitMoney}>Submit</button>
            </div>
        );
    }
}
