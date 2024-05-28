// Grouping.js
import React, { useState } from "react";
import { Button, InputNumber, List } from '@douyinfe/semi-ui';

function Grouping({ students, groupSize, setGroupSize }) {
    const [groupedStudents, setGroupedStudents] = useState([]);

    const handleGrouping = () => {
        const groupedStudents = [];
        for (let i = 0; i < students.length; i += groupSize) {
            groupedStudents.push(students.slice(i, i + groupSize));
        }
        setGroupedStudents(groupedStudents);
    };

    return (
        <div>
            <Button onClick={handleGrouping}>分组</Button>
            <InputNumber min={1} max={students.length} defaultValue={groupSize} onChange={setGroupSize} />
            {groupedStudents.map((group, index) => (
                <div key={index} style={{ marginTop: '20px' }}>
                    <h3>第 {index + 1} 组</h3>
                    <List
                        dataSource={group}
                        renderItem={item => (
                            <List.Item>{item.name}</List.Item>
                        )}
                    />
                </div>
            ))}
        </div>
    );
}

export default Grouping;
