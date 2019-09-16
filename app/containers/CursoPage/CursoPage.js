/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, TextField } from '@material-ui/core';
import './style.scss';

export default class CursoPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="feature-page">
        <Helmet>
          <title>Curso</title>

          <meta
            name="description"
            content="Curso page of React.js Boilerplate application"
          />
        </Helmet>
        <h1>Curso</h1>

        <form>

          <TextField
            id="outlined-name"
            label="Código e-MEC"
            margin="normal"
            variant="outlined"
            required
          />

          <TextField
            id="outlined-name"
            label="Nome do curso"
            margin="normal"
            variant="outlined"
            required
          />

        </form>

      </div>
    );
  }
}
