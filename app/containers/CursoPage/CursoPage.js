/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import './style.scss';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CursoPage () {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

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

      <form className={classes.root} autoComplete="off">

        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            id="outlined-name"
            label="Código e-MEC"
            margin="normal"
            variant="outlined"
            required
          />
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            id="outlined-name"
            label="Nome do curso"
            margin="normal"
            variant="outlined"
            required
          />
        </FormControl>

        <FormControl required variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
            Age
          </InputLabel>
          <Select
            // value={values.age}
            // onChange={handleChange}
            labelWidth={labelWidth}
            inputProps={{
              name: 'age',
              id: 'outlined-age-simple',
            }}

          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

      </form>

    </div>
  );
}
