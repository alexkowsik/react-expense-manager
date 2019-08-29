import React from 'react';
import './App.css';
import PersonCard from './components/PersonCard';
import RefreshButton from './components/RefreshButton';

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <PersonCard />
            </header>
            <RefreshButton />
        </div>
    );
}

export default App;
