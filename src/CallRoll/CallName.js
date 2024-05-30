import React, { useState } from 'react';
import { Button, Typography } from '@douyinfe/semi-ui';

const { Text } = Typography;

const CallName = ({ students }) => {
    const [currentStudent, setCurrentStudent] = useState(null);

    const handleCallName = () => {
        if (students.length > 0) {
            const randomIndex = Math.floor(Math.random() * students.length);
            setCurrentStudent(students[randomIndex]);
        }
    };

    return (
        <div>
            <Button onClick={handleCallName}>点名</Button>
            {currentStudent && (
                <Text>
                    当前学生: {currentStudent}
                </Text>
            )}
        </div>
    );
};

export default CallName;
