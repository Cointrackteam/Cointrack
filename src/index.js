import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from './App';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/fontawesome-all.css';
import './styles/magnific-popup.css';
import './styles/styles.css';
import './styles/swiper.css';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
document.getElementById('root')
);
