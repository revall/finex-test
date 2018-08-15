import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


class CurrencySelector extends React.Component {
  static propTypes = {
    setCurrency: PropTypes.func.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired
  };

  state = {
    currency: 'RUB',
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currency !== prevState.currency) {
      this.props.setCurrency(this.state.currency);
    }
  }

  render() {
    const {currencies} = this.props;
    const {currency} = this.state;
    return (<Select
      value={currency}
      onChange={this.handleChange}
      inputProps={{name: 'currency'}}
    >
      {currencies.map(currency => (<MenuItem key={currency.value} value={currency.value}>{currency.label}</MenuItem>))}
    </Select>);
  }
}

export default CurrencySelector;
