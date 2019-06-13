import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import SuccessMessage from './messages/SuccessMessage'; 
import ErrorMessage from './messages/ErrorMessage'; 

class MovieCreate extends React.Component {
  state = {
    title: '',
    director: '',
    metascore: undefined,
    errorMessage: undefined,
    successMessage: false
  }

  changeHandler = e => {
    let value = e.target.value

    this.setState({
      [e.target.name]: value
    })
  }

  handlerSubmitForm = e => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/movies', {
        title: this.state.title,
        director: this.state.director,
        metascore: parseInt(this.state.metascore),
        stars: [ 'Johnny Bravo', 'CatDog', 'Johnny Test']
      })
      .then( () => this.setState({ successMessage: true }) )
      .catch( err => {
        console.log(err.response);
        this.setState({ errorMessage: err.response.data });
      })
  }

  render() {
    return (
      <Form onSubmit={this.handlerSubmitForm}>
        <h1>Add a Movie</h1>
        <input
          type="text"
          name="title"
          maxLength="50"
          placeholder="Movie title"
          onChange={this.changeHandler}
        ></input>
        <input
          type="text"
          name="director" 
          maxLength="50"
          placeholder="Director name"
          onChange={this.changeHandler}
        ></input>
        <input
          type="number"
          name="metascore"
          placeholder="Metascore"
          onChange={this.changeHandler}
        ></input>
        <button type="submit" onClick={this.handlerSubmitForm}>Add Movie</button>
        {
          this.state.successMessage && (
            <SuccessMessage />)
        }
        {
          this.state.errorMessage && (
            <ErrorMessage error={this.state.errorMessage}/>)
        }
      </Form>
    )
  }
}

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  background: white;
  padding: 50px;
  border: 1px solid #000;

  h1 {
    margin: 0 0 10px 0;
  }

  input {
    padding: 5px;
    margin-bottom: 10px;
  }

  button {
    cursor: pointer;
    outline: none;
    border: 0;
    padding: 10px 15px;
    background: #87cefa;
    color: #000;
    font-weight: bold;
    text-decoration: underline;
  }
`;

export default MovieCreate;