import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, className = '', type = 'button' }) => {
    return (
        <button onClick={onClick} className={`btn ${className}`} type={type}>
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;