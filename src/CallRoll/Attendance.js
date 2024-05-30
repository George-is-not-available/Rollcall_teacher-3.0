import React, { useState } from 'react';
import { Button, List, Typography } from '@douyinfe/semi-ui';

const { Text } = Typography;

const Attendance = ({ students }) => {
    const [attendance, setAttendance] = useState({});

    const toggleAttendance = (name) => {
        setAttendance(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    return (
        <List
            dataSource={students}
            renderItem={name => (
                <List.Item key={name}>
                    <Text>{name}</Text>
                    <Button onClick={() => toggleAttendance(name)}>
                        {attendance[name] ? '缺席' : '出席'}
                    </Button>
                </List.Item>
            )}
        />
    );
};

export default Attendance;
