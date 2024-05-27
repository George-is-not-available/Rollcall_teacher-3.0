// index.js (CallRoll组件)

import React, { useState, useEffect } from "react";
import { Tabs, TabPane, Button, Typography } from '@douyinfe/semi-ui';
import { IconArrowLeft, IconEdit } from "@douyinfe/semi-icons";
import { useNavigate, useLocation } from "react-router-dom";
import * as XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';
import Modal from './Modal'; // 引入Modal组件
import imageUrl from '../AD.png';
import imgepay from '../payment.png';
import styles from './index.module.css';

function CallRoll() {
    const location = useLocation();
    const course = location.state;
    const [changePointsButton, setChangePointsButton] = useState(false);
    const navigate = useNavigate();
    const { Title } = Typography;
    const [showAd, setShowAd] = useState(false);
    const [showPayPrompt, setShowPayPrompt] = useState(false);
    const [students, setStudents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [randomStudent, setRandomStudent] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAd(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (students.length > 0) {
            const initialAttendance = students.map(student => ({ id: student.id, name: student.name, isPresent: false, points: student.points }));
            setAttendance(initialAttendance);
        }
    }, [students]);

    const handleCloseAd = () => {
        setShowAd(false);
        setShowPayPrompt(true);
    };

    const handleClick = () => {
        navigate("/Courses");
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const studentsWithGroup = rows.map((row, index) => ({ id: index, name: row[0], points: 0, group: row[1] }));
            const uniqueGroups = [...new Set(studentsWithGroup.map(student => student.group))];

            setGroups(uniqueGroups);
            setStudents(studentsWithGroup);
        };

        reader.readAsArrayBuffer(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const markAttendance = (studentId) => {
        const updatedAttendance = attendance.map(student => {
            if (student.id === studentId) {
                return { ...student, isPresent: !student.isPresent }; // 切换签到状态
            }
            return student;
        });
        setAttendance(updatedAttendance);
    };

    const downloadAttendance = () => {
        const headers = ['学生姓名', '签到状态'];
        const data = attendance.map(student => [student.name, student.isPresent ? '未签到' : '已签到']);
        const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
        XLSX.writeFile(wb, '考勤表.xlsx'); // 修改下载文件名
    };

    const callName = () => {
        if (students.length === 0) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * students.length);
        const selectedStudent = students[randomIndex];
        setRandomStudent(selectedStudent);
        setShowModal(true);
    };

    const addPoint = () => {
        const updatedStudents = students.map(student => {
            if (student.id === randomStudent.id) {
                return { ...student, points: student.points + 1 };
            }
            return student;
        });
        setStudents(updatedStudents);
    };

    const subtractPoint = () => {
        const updatedStudents = students.map(student => {
            if (student.id === randomStudent.id) {
                return { ...student, points: student.points - 1 };
            }
            return student;
        });
        setStudents(updatedStudents);
    };

    const handleGroupChange = (group) => {
        setSelectedGroup(group);
    };

    return (
        <div>
            {showAd && (
                <a href="#" onClick={handleCloseAd} style={{
                    position: "absolute",
                    left: "0",
                    bottom: "0",
                    width: "300px",
                    height: "200px",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "left 0.5s ease-in-out",
                    zIndex: "9999",
                    textDecoration: "none",
                    color: "#333",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <img src={imageUrl} alt="广告图片" style={{ width: "600px", marginBottom: "20px" }} />
                    <div style={{
                        position: "absolute",
                        top: "-119px",
                        right: "-150px",
                    }}>
                        <button onClick={handleCloseAd}>关闭</button>
                    </div>
                </a>
            )}

            {showPayPrompt && (
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#fff",
                    padding: "20px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    zIndex: "9999"
                }}>
                    <img src={imgepay} alt="支付图片" style={{ width: "600px", marginBottom: "20px" }} />
                    <p>
                        亲，您本次抽中了超级大奖，您有机会花少钱办大事！<br />
                        你还在等待什么,立即享受限时凉心价现已开启,<br />
                        不要999,也不要1000,只要<span className="red-text">998￥，36000天历史超低价</span>，千万别错过!
                    </p>

                    <div style={{ textAlign: "center" }}>
                        <button onClick={handleCloseAd}>关闭</button>
                    </div>
                </div>
            )}

            <IconArrowLeft onClick={handleClick} />

            <Button onClick={() => {
                setChangePointsButton(!changePointsButton);
            }}
                type="secondary"><IconEdit />{changePointsButton ? '确认分数' : '修改分数'}</Button>

            <Title style={{ margin: '8px 0' }} > {course} </Title>
            <Tabs type="line">
                <TabPane tab={'点名'} itemKey={'1'}>
                    <div>
                        <select onChange={(e) => handleGroupChange(e.target.value)}>
                            <option value="">所有小组</option>
                            {groups.map(group => (
                                <option key={group} value={group}>{group}</option>
                            ))}
                        </select>
                    </div>
                    <Students
                        students={selectedGroup ? students.filter(student => student.group === selectedGroup) : students}
                        isGroup={false}
                        changePointsButton={changePointsButton}
                        course={course}
                    />
                </TabPane>
                <TabPane tab={'小组'} itemKey={'2'}>
                    <Students
                        students={students}
                        isGroup={true}
                        changePointsButton={changePointsButton}
                        course={course}
                    />
                </TabPane>
            </Tabs>

            <div {...getRootProps({ className: 'dropzone' })} style={{
                border: '2px dashed var(--semi-color-border)',
                borderRadius: '4px',
                padding: '20px',
                textAlign: 'center',
                marginTop: '20px'
            }}>
                <input {...getInputProps()} />
                <p>拖拽文件到此处，或点击上传学生名单</p>
            </div>

            {/* Modal组件 */}
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    student={randomStudent}
                    onAddPoint={addPoint}
                    onSubtractPoint={subtractPoint}
                />
            )}
        </div>
    );
}

export default CallRoll;

