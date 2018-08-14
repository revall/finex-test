import React from "react";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";

class EnhancedTableHead extends React.Component {
  static propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      numeric: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {order, orderBy, rows} = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.name}
                numeric={row.numeric}
                sortDirection={orderBy === row.name ? order : false}
              >
                <Tooltip
                  title="Сортировка"
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.name}
                    direction={order}
                    onClick={this.createSortHandler(row.name)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

export default EnhancedTableHead;
