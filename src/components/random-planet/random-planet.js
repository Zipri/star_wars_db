import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import './random-planet.css';
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true
  };

  constructor() {
    super();
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 4000);
    // clearInterval(this.interval);
  };

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random()*21) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  render() {
    const { loading, planet, error } = this.state;

    const haveData = !(loading || error);

    const spinner = loading ? <Spinner /> : null;
    const errorMsg = error ? <ErrorIndicator /> : null
    const content = haveData ? <PlanetView planet={planet}/> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMsg}
        {spinner}
        {content}
      </div>
    );
  }
};

const PlanetView = ({ planet }) => {
  const {
    rotationPeriod,
    population,
    diameter,
    name,
    id } = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term color">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term color">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term color">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}
