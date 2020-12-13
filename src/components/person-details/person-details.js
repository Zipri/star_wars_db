import React, { Component } from 'react';

import './person-details.css';
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../error-button";

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) return;

    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState({ person });
      })
  }

  render() {
    const { person } = this.state;

    if (!person) {
      return (
        <React.Fragment>
          <span className=" color">Choose the </span>
          <span>Hero</span>
          <span className=" color"> from a Hero-List</span>
        </React.Fragment>
      )
    }

    const {id,
          name,
          gender,
          eyeColor,
          birthYear} = person;

    return (
      <div className="person-details card">
        <img className="person-image"
             src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>

        <div className="card-body">
          <div className="d-flex">
            <h4>{name}</h4>
            <span className="left"><ErrorButton /></span>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term color">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term color">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term color">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
