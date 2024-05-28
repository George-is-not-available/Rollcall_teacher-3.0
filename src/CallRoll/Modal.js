// Modal.js
import React from "react";
import { Modal } from '@douyinfe/semi-ui';

function MyModal({ isOpen, onClose, children }) {
    return (
        <Modal
            visible={isOpen}
            onCancel={onClose}
            title="Modal Title"
            footer={null}
        >
            {children}
        </Modal>
    );
}

export default MyModal;
