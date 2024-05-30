import React, { useState } from 'react';
import { Button, Typography } from '@douyinfe/semi-ui';

const { Text } = Typography;

const Grouping = ({ students }) => {
    const [groups, setGroups] = useState([]);

    const createGroups = (groupSize) => {
        const shuffled = [...students].sort(() => 0.5 - Math.random());
        const newGroups = [];
        for (let i = 0; i < shuffled.length; i += groupSize) {
            newGroups.push(shuffled.slice(i, i + groupSize));
        }
        setGroups(newGroups);
    };

    return (
        <div>
            <Button onClick={() => createGroups(3)}>分组（每组3人）</Button>
            {groups.map((group, index) => (
                <div key={index}>
                    <Text>组 {index + 1}:</Text>
                    {group.map(name => (
                        <Text key={name}>{name}</Text>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grouping;
