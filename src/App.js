import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {simpleAction} from './actions/simpleAction';
import withRoot from './withRoot';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataTable from './components/DataTable';


const EXCHANGE_RATE = 60;
let counter = 0;

function createData(name, quantity, basePrice) {
  counter += 1;
  return {
    id: counter, name, quantity, basePrice,
    get USD() {
      return Math.round(this.basePrice * 100 / EXCHANGE_RATE) / 100;
    },
    set USD(value) {
      this.basePrice = value * EXCHANGE_RATE;
    },
    get RUB() {
      return this.basePrice;
    },
    set RUB(value) {
      this.basePrice = value;
    }

  };
}

const baseData = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 20.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 10),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0)
];


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


  getData = (currency) => {
    console.log('Set currency:', currency);
    const data = baseData.map(row => {
      row.price = row[currency];
      return row;
    });
    return data;
  };

  updateData = (id, property, value, currency) => {
    console.log(id, property, value, currency);
    const updatedData = baseData.find(row => row.id === id);
    if (property === 'price') {
      updatedData[currency] = value;
    }
    else {
      updatedData[property] = value;
    }

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
        <DataTable getData={this.getData} updateData={this.updateData}/>

      </div>
    );
  }
}


export default withRoot(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App)));
