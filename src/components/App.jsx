import React from "react";
import Header from "./Header";
import "../assets/styles.css";
import Word from "./Word";

function App() {

    return (
        <div className="game-container">
            <Header />
            <Word />
        </div>
        
    );
}

export default App;