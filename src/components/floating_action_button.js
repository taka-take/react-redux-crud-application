import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    position: "fixed",
    right: 12,
    bottom: 12
  },
});

const FloatingActionButton = ({ classes, component }) => (
  <Fab color="primary" aria-label="Add" className={classes.fab} component={component}>
    <AddIcon />
  </Fab>
)

FloatingActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButton);