import React, {Component} from 'react';
import logo from '../img/logo.png';
import '../css/App.css';
import appStyle from '../css/App.module.css'
import Categories from '../components/Categories';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div className={appStyle.App}>
                <header className={appStyle.header}>
                    <img src={logo} alt="logo"/>
                </header>
                <Router>
                    <div>
                        <nav className={appStyle.nav}>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/categories">Categories</Link>
                                </li>
                            </ul>
                        </nav>

                        <div className={appStyle.container}>
                            <Switch>
                                <Route path="/categories">
                                    <Categories loadCategory={this.loadCategory}/>
                                </Route>
                                <Route path="/">
                                    <p>Welcome to my test assignment. Use the above navigation menu to continue.<br/>
                                        The instructions were as follows.<br/><br/>
                                        Bouw een app die door middel van de Star Wars API de volgende views laat zien:
                                    </p>
                                    <ul>
                                        <li>Een view die alle categorieën van de API toont</li>
                                        <li>Een view die items toont in een lijst die doorzoekbaar en sorteerbaar is zonder het gebruik van externe libraries.</li>
                                    </ul>
                                    <p>
                                        Eisen:
                                    </p>
                                    <ul>
                                        <li>Modulaire styling</li>
                                        <li>React met ES6+</li>
                                    </ul>
                                    <p>
                                        Bonuspunten:
                                    </p>
                                    <ul>
                                        <li>Styled-Components</li>
                                        <li>Redux</li>
                                        <li>Gebruik van een linter</li>
                                    </ul>
                                    <p>
                                        API url: <a href="https://swapi.co">https://swapi.co/</a>
                                    </p>

                                </Route>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
