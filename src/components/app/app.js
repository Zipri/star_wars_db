import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true})
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    return (
      <div>
        <Header />

        <div className="beauty">
          <button
            className="btn btn-outline-warning ohh"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
        </div>
        {planet}

        <PeoplePage /> <br/>
        <PeoplePage /> <br/>

      </div>
    )
  }
}
