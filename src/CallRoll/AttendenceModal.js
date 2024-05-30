import React, { useState } from 'react';
import { List, Typography } from '@douyinfe/semi-ui';
import './Attendance.css';

const { Text } = Typography;

const Attendance = ({ students }) => {
    const [attendance, setAttendance] = useState({});

    const toggleAttendance = (name) => {
        setAttendance(prev => ({
            ...prev,
            [name]: (prev[name] === 'present' ? 'absent' : prev[name] === 'absent' ? 'leave' : 'present')
        }));
    };

    return (
        <List
            dataSource={students}
            renderItem={name => (
                <List.Item key={name}>
                    <Text>{name}</Text>
                    <Text
                        className={`attendance-status ${attendance[name]}`}
                        onClick={() => toggleAttendance(name)}
                    >
                        <a className="attendance-link">
                            {attendance[name] === 'present' ? '出席' :
                             attendance[name] === 'absent' ? '缺席' :
                             '请假'}
                        </a>
                    </Text>
                </List.Item>
            )}
        />
    );
};

export default Attendance;
