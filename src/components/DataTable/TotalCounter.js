import Typography from "@material-ui/core/Typography";
import React from "react";
import PropTypes from "prop-types";


const TotalCounter = (props) => {
  const {data = [], currency = ''} = props;
  const sum = data.reduce((total, row) => {
    return total + row.quantity * row.price;
  }, 0);
  return (
    <Typography variant="body2" gutterBottom align={'right'}>
      {`Всего ${data.length} продуктов на ${sum.toLocaleString('ru-RU', {style: 'currency', currency})}`}
    </Typography>
  );

};

TotalCounter.propTypes = {
  currency: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  })).isRequired
};

export default TotalCounter;
