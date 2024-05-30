import React, { useState } from 'react';
import { Tabs, Button } from '@douyinfe/semi-ui';
import CourseDemo from './CourseDemo';
import AttendenceModal from './AttendenceModal';
import Grouping from './Grouping';
import FileUpload from './FileUpload';
import CallName from './CallName';
import './Attendance.css'; 

const { TabPane } = Tabs;

function App() {
    const [students, setStudents] = useState([]);
    const [visible, setVisible] = useState(false);
    const [showAd, setShowAd] = useState(true);

    const handleStudentsParsed = (parsedStudents) => {
        setStudents(parsedStudents);
    };

    const handleCloseAd = () => {
        setShowAd(false);
    };

    return (
        <div>
            <Tabs type="line">
                <TabPane tab="文件上传" itemKey="1">
                    <FileUpload onStudentsParsed={handleStudentsParsed} />
                </TabPane>
                <TabPane tab="考勤" itemKey="2">
                    <AttendenceModal students={students} />
                </TabPane>
                <TabPane tab="分组" itemKey="3">
                    <Grouping students={students} />
                </TabPane>
                <TabPane tab="点名" itemKey="4">
                    <CallName students={students} />
                </TabPane>
                <TabPane tab="课程演示" itemKey="5">
                    <CourseDemo />
                </TabPane>
            </Tabs>
            {showAd && (
                <div className="ad">
                    <Button onClick={handleCloseAd}>关闭广告</Button>
                </div>
            )}
        </div>
    );
}

export default App;
