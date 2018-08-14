import {lighten} from "@material-ui/core/styles/colorManipulator";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import CurrencySelector from '../Basic/CurrencySelector';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const {classes, tableTitle, currencies, toggleFilter} = props;

  return (
    <Toolbar className={classes.root}>
      <div className={classes.title}>
        <Typography variant="title" id="tableTitle">
          {tableTitle}
        </Typography>
      </div>
      <div className={classes.spacer}/>
      <div className={classes.actions}>
        <Tooltip title="Выбор валюты">
          <IconButton aria-label="Currency selector">
            <CurrencySelector currencies={currencies}/>
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.actions}>
        <Tooltip title="Фильтр">
          <IconButton aria-label="Filter list">
            <FilterListIcon onClick={toggleFilter}/>
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  tableTitle: PropTypes.string.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired
};

const StyledEnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

export default StyledEnhancedTableToolbar;
