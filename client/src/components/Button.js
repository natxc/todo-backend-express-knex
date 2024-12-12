import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, className = '', type = 'button', variant = 'primary', icon = null }) => {
    return (
        <button onClick={onClick} className={`btn ${variant} ${className}`} type={type}>
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
};

export default Button;