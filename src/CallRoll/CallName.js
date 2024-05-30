import React, { useState } from 'react';
import { Button, Modal, Typography } from '@douyinfe/semi-ui';
import './CallName.css';

const { Text } = Typography;

const CallName = ({ students }) => {
    const [currentStudent, setCurrentStudent] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCallName = () => {
        if (students.length > 0) {
            const randomIndex = Math.floor(Math.random() * students.length);
            setCurrentStudent(students[randomIndex]);
            setIsModalVisible(true);
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="call-name-container">
            <Button onClick={handleCallName} className="call-name-button">点名</Button>
            <Modal
                title="点名结果"
                visible={isModalVisible}
                onCancel={handleModalClose}
                onOk={handleModalClose}
                className="centered-modal"
            >
                {currentStudent && (
                    <Text>当前学生: {currentStudent}</Text>
                )}
            </Modal>
        </div>
    );
};

export default CallName;
