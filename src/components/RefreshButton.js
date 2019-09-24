import React from 'react';
import './RefreshButton.css';

export default class RefreshButton extends React.Component {
  refreshPage = () => {
    console.log('Clicked');
    window.location.reload();
  };

  render() {
    return (
      <button className='refresh-button' onClick={this.refreshPage}>
        Reload
      </button>
    );
  }
}
