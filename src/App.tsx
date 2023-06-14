import React, { useEffect, useState } from 'react'
import BibleText from './bible_text/BibleText'
import TitleBar from './authentication/TitleBar'
function App() {
    return (
        <div className="App">
            <TitleBar />
            <BibleText />
        </div>
    )
}

export default App
