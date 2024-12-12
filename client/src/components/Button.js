import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ onClick, children, className = '', type = 'button', variant = 'primary', icon = null, fullWidth = false }) => {
    return (
        <button
            onClick={onClick}
            className={`btn ${variant} ${className} ${fullWidth ? 'full-width' : ''}`}
            type={type}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            <span className="btn-text">{children}</span>
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger']),
    icon: PropTypes.node,
    fullWidth: PropTypes.bool,
};

export default Button;