import React, { useState } from "react";
import PropTypes from "prop-types";

import styles from "./AnExample.scss";

const AnExample = ({ msg }) => {
  const [count, setCount] = useState(1);
  return (
    <div className={styles.example}>
      {msg} : {count}
    </div>
  );
};

AnExample.propTypes = {
  msg: PropTypes.string
};

AnExample.defaultProps = {
  msg: "HAPPY HOOKS"
};

export default AnExample;
