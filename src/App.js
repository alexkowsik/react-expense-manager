import React from 'react';
import './App.css';
import RefreshButton from './components/RefreshButton';
import Controller from './components/Controller';

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <Controller />
            </header>
            <RefreshButton />
        </div>
    );
}

export default App;
