import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  input: {
    textAlign: 'right',
    fontSize: '16.25px'
  },
});

class EditableTableCell extends React.Component {

  static propTypes = {
    value: PropTypes.number,
    classes: PropTypes.object.isRequired,
    onBlur: PropTypes.func
  };

  static defaultProps = {
    value: 0,
    onBlur: event => {
      event.preventDefault();
    }
  };

  state = {
    value: this.props.value,
    updated: false
  };


  handleChange = event => {
    //TODO: make better input filter
    const newValue = parseFloat(event.target.value);
    event.preventDefault();
    if (newValue >= 0) {
      this.setState({value: newValue, updated: true});

    }
  };

  onBlur = event => {
    event.preventDefault();
    if (this.state.updated === true) {
      this.props.onBlur(this.state.value);
    }
    this.setState({updated: false});
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value});
    }
  }

  render() {
    const {value} = this.state;
    const {classes} = this.props;
    return (
      <TableCell numeric>
        <Input classes={classes}
               onChange={this.handleChange}
               value={value}
               onBlur={this.onBlur}
               inputProps={{
                 min: '0',
               }}
               type={'number'}
               disableUnderline/>
      </TableCell>);
  }
}


export default withStyles(styles)(EditableTableCell);
