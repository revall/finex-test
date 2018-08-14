import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


class CurrencySelector extends React.Component {
  static propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired
  };
// TODO handle currency change
  state = {
    currency: 'RUR',
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

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
