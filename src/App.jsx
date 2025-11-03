import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import getRelatz from './database/getRelatz';

import Header from './Components/Header.jsx';

import Overview from './pages/Overview';
import Metadata from './pages/Metadata';
import HeaderSetter from './pages/HeaderSetter';

export default function App() {
    const [ relatz, setRelatz ] = useState( getRelatz() );

    return (
        <BrowserRouter>
            <main className='absolute w-6/10 h-screen py-3 px-8'>
                <Header />
                
                <Routes>
                    <Route path='/' element={
                        <Overview
                            relatz={ relatz }
                            setRelatz={ setRelatz }
                        />
                    } />
                    <Route path='/metadata'
                        element={
                            <Metadata 
                                relatz={ relatz }
                                setRelatz={ setRelatz }
                            />
                        }
                    />
                    <Route path='/header'
                        element={
                            <HeaderSetter
                                relatz={ relatz }
                                setRelatz={ setRelatz }
                            />
                        }
                    />
                </Routes>
            </main>

            {/*
            <Preview />
            */}
        </BrowserRouter>
    )
}