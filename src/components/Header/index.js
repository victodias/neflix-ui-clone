import React from 'react';
import './index.css';

export default ({black}) => {
    return(
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/220px-Netflix_logo.svg.png" alt="logo da netflix"/></a>
            </div>
            <div className="header--user"><a href="/">
             <img src="https://i.pinimg.com/originals/c3/3b/32/c33b322b61b8f30f0df1d0b3de690734.png" alt="usuário"/>
             </a></div>
        </header>
    );
}