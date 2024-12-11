import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children, title = '' }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button onClick={onClose} className="modal-close">&times;</button>
                </div>
                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
};

export default Modal;