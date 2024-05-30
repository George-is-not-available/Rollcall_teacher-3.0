import React from 'react';

export const AttenceStatus = {
    LATE: 1,
    LEAVE: 2,
    ABSENT: 3,
};

export const statusToString = {
    [AttenceStatus.LATE]: '迟到',
    [AttenceStatus.LEAVE]: '请假',
    [AttenceStatus.ABSENT]: '缺席',
};

const CourseDemo = () => {
    return (
        <div>
            <h2>Course Demo</h2>
            <p>This is a demo of the course content.</p>
        </div>
    );
};

export default CourseDemo;
