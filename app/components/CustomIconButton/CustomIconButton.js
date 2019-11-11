import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles(theme => ({
  icon: {
    margin: 'none',
  },
}));

export default function CustomIconButton() {
  const classes = useStyles();

  return (
      <IconButton className={classes.button}>
        <HelpIcon
            fontSize="small"
        />
      </IconButton>
  );
}
