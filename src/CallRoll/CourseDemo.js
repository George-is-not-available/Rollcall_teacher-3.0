import React from 'react';
import MP4 from './mp4.mp4';

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
            <h2>JavaScript</h2>
            <p>This is a video of the course content.</p>
            <video controls width="600">
                <source src={MP4} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default CourseDemo;
