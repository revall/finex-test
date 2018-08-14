import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {simpleAction} from './actions/simpleAction';
import withRoot from './withRoot';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataTable from './components/DataTable';


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 2,
  },
});


const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

class App extends React.Component {
  static propTypes = {classes: PropTypes.object.isRequired,};

  simpleAction = () => {
    this.props.simpleAction();
  };

  render() {
    const {classes} = this.props;


    return (
      <div className={classes.root}>
        <Typography variant="display1" gutterBottom>
          Finex
        </Typography>
        <Typography variant="subheading" gutterBottom>
          Тестовое задание
        </Typography>
        <pre>{JSON.stringify(this.props)}</pre>
        <Button variant="contained" color="secondary" onClick={this.simpleAction}>Test redux action</Button>
        <DataTable/>

      </div>
    );
  }
}


export default withRoot(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App)));
