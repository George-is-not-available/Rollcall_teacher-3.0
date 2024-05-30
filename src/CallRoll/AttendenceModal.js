import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Button, Spin, List, Modal, Typography } from '@douyinfe/semi-ui';
import { statusToString } from './CourseDemo'; // 添加这一行

const { Text } = Typography;

const AbsenceButtons = ({ detail, update }) => {
    const [attence, setAttence] = useState(detail.attence);
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        if (!isFirstRender) {
            axios
                .patch(`http://localhost:4000/attenceToday/${detail.id}`, { attence })
                .then(update);
        } else {
            setIsFirstRender(false);
        }
    }, [attence]);

    const handleClick = (status) => {
        setAttence(prevAttence => prevAttence === status ? 0 : status);
    };

    return (
        <div>
            {Object.entries(statusToString).map(([status, label]) => (
                <Button
                    key={status}
                    theme={attence == status ? 'solid' : 'light'}
                    onClick={() => handleClick(status)}
                >
                    {label}
                </Button>
            ))}
        </div>
    );
};

const AttendenceModal = ({ visible, onClose }) => {
    const { data, error, isLoading, mutate } = useSWR('http://localhost:4000/attences', (url) => axios.get(url).then(res => res.data));

    if (isLoading) return <Spin />;
    if (error) return <div>加载考勤数据时出错</div>;

    return (
        <Modal title="考勤详情" visible={visible} onCancel={onClose}>
            <List
                dataSource={data}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <Text>{item.date}</Text>
                        <AbsenceButtons detail={item} update={mutate} />
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default AttendenceModal;
