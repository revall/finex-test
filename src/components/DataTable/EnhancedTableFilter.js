import React from "react";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class EnhancedTableFilter extends React.Component {
  state = {
    dataFilter: {}

  };
  static propTypes = {
    rows: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      numeric: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired,
    setFilter: PropTypes.func.isRequired
  };


  createOnChangeHandler = (property) => event => {
    event.preventDefault();
    const filter = {};
    filter[property] = event.target.value;
    this.setState(prevState => ({dataFilter: {...prevState.dataFilter, ...filter}}));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.dataFilter !== prevState.dataFilter) {
      this.props.setFilter(this.state.dataFilter);
    }
  }

  render() {
    const {rows} = this.props;
    return (
      <TableRow>
        {rows.map(row => {
          return (
            <TableCell
              key={row.name}
              numeric={row.numeric}
            >
              <input style={{textAlign: row.numeric ? 'right' : 'left'}}
                     onChange={this.createOnChangeHandler(row.name)}></input>
            </TableCell>
          );
        }, this)}
      </TableRow>
    );
  }
}

export default EnhancedTableFilter;
