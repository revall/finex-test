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
import PieChart from './Charts';

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy];
}

const currencies = [
  {value: 'USD', label: '$'},
  {value: 'RUB', label: '₽'},
];

const rows = [
  {name: 'name', numeric: false, label: 'Название продукта'},
  {name: 'quantity', numeric: true, label: 'Кол-во'},
  {name: 'price', numeric: true, label: 'Цена'},
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
    page: 0,
    rowsPerPage: 10,
    showFilter: true,
    dataFilter: {},
    currency: 'RUB',
    data: []
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
    this.props.updateData(id, property, value, this.state.currency);
    this.setData();
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

  setCurrency = (currency) => {
    this.setState({currency});
  };

  setDataFilter = (filter) => {
    this.setState(prevState => ({dataFilter: {...prevState.dataFilter, ...filter}}));
  };

  setData = () => {
    const data = this.props.getData(this.state.currency);
    this.setState({data});
  };

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currency !== prevState.currency) {
      this.setData();
    }
  }

  render() {
    const {classes} = this.props;
    const {order, orderBy, rowsPerPage, page, showFilter, currency, data} = this.state;

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar tableTitle={'Каталог продукции'} currencies={currencies}
                              toggleFilter={this.toggleFilter} setCurrency={this.setCurrency}/>
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
        <TotalCounter data={data} currency={currency}/>
        <PieChart data={data}/>

      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  updateData: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

export default withStyles(styles)(EnhancedTable);
