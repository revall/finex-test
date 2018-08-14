import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import EnhancedTableHead from './DataTable/EnhancedTableHead';
import EnhancedTableToolbar from './DataTable/EnhancedTableToolbar';
import EditableTableCell from './DataTable/EditableTableCell';
import TotalCounter from './DataTable/TotalCounter';
import EnhancedTableFilter from './DataTable/EnhancedTableFilter';

let counter = 0;

function createData(name, quantity, price) {
  counter += 1;
  return {id: counter, name, quantity, price};
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy];
}

const rows = [
  {name: 'name', numeric: false, label: 'Название продукта'},
  {name: 'quantity', numeric: true, label: 'Кол-во'},
  {name: 'price', numeric: true, label: 'Цена'},
];
// TODO use minimongo or localstorage here
const data = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0)
];

const currencies = [
  {value: 'USD', label: '$'},
  {value: 'RUR', label: '₽'},
];

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'name',
    data: data,
    page: 0,
    rowsPerPage: 10,
    showFilter: true,
    dataFilter: {}

  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({order, orderBy});
  };


  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };

  createOnCellUpdateHandler = (id, property) => value => {
    const data = [...this.state.data];
    const updatedData = data.find(row => row.id === id);
    updatedData[property] = value;
    this.setState({data});
  };

  toggleFilter = event => {
    event.preventDefault();
    this.setState(prevState => ({
      showFilter: !prevState.showFilter,
      dataFilter: {}
    }));
  };

  dataFilter = (data) => {
    // very basic filter
    const filter = this.state.dataFilter;
    if (_.isEmpty(filter)) return true;

    for (const property in filter) {
      if (filter[property] === '') {
        continue;
      }

      if (_.isString(data[property])) {
        const regexp = new RegExp(filter[property], 'i');
        if (!regexp.test(data[property])) return false;
        // eslint-disable-next-line
      } else if (data[property] != filter[property]) return false;
    }

    return true;
  };

  setDataFilter = (filter) => {
    this.setState(prevState => ({dataFilter: {...prevState.dataFilter, ...filter}}));
  };

  render() {
    const {classes} = this.props;
    const {data, order, orderBy, rowsPerPage, page, showFilter} = this.state;

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar tableTitle={'Каталог продукции'} currencies={currencies}
                              toggleFilter={this.toggleFilter}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rows={rows}
            />
            <TableBody>
              {showFilter ? <EnhancedTableFilter rows={rows} setFilter={this.setDataFilter}/> : null}
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter(this.dataFilter)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      key={row.id}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <EditableTableCell onBlur={this.createOnCellUpdateHandler(row.id, 'quantity')}
                                         value={row['quantity']}/>
                      <EditableTableCell onBlur={this.createOnCellUpdateHandler(row.id, 'price')}
                                         value={row['price']}/>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component='div'
          count={data.length}
          labelRowsPerPage='Позиций на страницу'
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <TotalCounter data={data} currency={'USD'}/>


      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
