import React, { useState, useEffect } from "react";
import { Tabs, TabPane, Button, InputNumber, Typography, Spin, Descriptions, List, Divider } from '@douyinfe/semi-ui';
import { IconArrowLeft, IconEdit } from "@douyinfe/semi-icons";
import { useNavigate, useLocation } from "react-router-dom";
import * as XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';
import styles from './index.module.css';
import imageUrl from '../AD.png';
import imgepay from '../payment.png';

function Modal({ onClose, student, onAddPoint, onSubtractPoint }) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>随机选择的学生是：</h2> 
                <p>{student.name}</p>
                <div>
                    <Button onClick={onAddPoint} style={{ marginRight: 8 }}>+1分</Button>
                    <Button onClick={onSubtractPoint}>-1分</Button>
                </div>
                <button onClick={onClose}>关闭</button>
            </div>
        </div>
    );
}

function Students({ students, isGroup, changePointsButton, course }) {
    const style = {
        border: '1px solid var(--semi-color-border)',
        backgroundColor: 'var(--semi-color-bg-2)',
        borderRadius: '3px',
        paddingLeft: '20px',
        margin: '8px 2px',
    };
    const [attendance, setAttendance] = useState([]);

// 更新签到状态
const markAttendance = (studentId) => {
    const updatedAttendance = attendance.map(student => {
        if (student.id === studentId) {
            return { ...student, isPresent: true };
        }
        return student;
    });
    setAttendance(updatedAttendance);
};

// 在 useEffect 中初始化 attendance 状态
useEffect(() => {
    if (students.length > 0) {
        const initialAttendance = students.map(student => ({ id: student.id, isPresent: false }));
        setAttendance(initialAttendance);
    }
}, [students]);

    const [showModal, setShowModal] = useState(false);
    const [randomStudent, setRandomStudent] = useState(null);
    const downloadAttendance = () => {
        const headers = ['学生姓名', '签到状态'];
        const data = attendance.map(student => [student.name, student.isPresent ? '已签到' : '未签到']);
        const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
        XLSX.writeFile(wb, 'attendance.xlsx');
    };
    
    <Button onClick={downloadAttendance}>一键下载考勤表</Button>
    
    const callName = () => {
        if (students.length === 0) {
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * students.length);
        const selectedStudent = students[randomIndex];
        setRandomStudent(selectedStudent);
        setShowModal(true);
    };

    return (
        <>
            {Array.isArray(students) ? (
                <List
                    grid={{
                        gutter: 12,
                        xs: 0,
                        sm: 0,
                        md: 12,
                        lg: 8,
                        xl: 8,
                        xxl: 6,
                    }}
                    dataSource={students}
                    renderItem={item => (
                        <List.Item style={style}>
                            <div>
                                <h3 style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{!isGroup && item.isCall ? '😇' : ''}{item.name}</h3>
                                {changePointsButton ? <InputNumber defaultValue={item.points} onChange={num => {
                                    fetch(`http://localhost:4000/${course}/${item.id}`, {
                                        method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ points: num }),
                                    })
                                }} /> :
                                    <Descriptions
                                        align="center"
                                        size="small"
                                        row
                                        data={[
                                            { key: '分数', value: item.points }
                                        ]}
                                    />}
                            </div>
                        </List.Item>
                    )}
                />
            ) : (
                <Spin />
            )}
            {students.length > 0 && (
                <Button theme='solid' type='primary' style={{ marginRight: 8 }} onClick={callName}>随机点名</Button>
            )}
            {showModal && <Modal onClose={() => setShowModal(false)} student={randomStudent} />}
        </>
    )
}

function App() {
    const location = useLocation();
    const course = location.state;
    const [students, setStudents] = useState([]);
    const [changePointsButton, setChangePointsButton] = useState(false);
    const navigate = useNavigate();
    const { Title, Text } = Typography;
    const [showAd, setShowAd] = useState(false);
    const [showPayPrompt, setShowPayPrompt] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAd(true);
        }, 5000); // 5秒后显示广告

        return () => clearTimeout(timer);
    }, []);

    const handleCloseAd = () => {
        setShowAd(false);
        setShowPayPrompt(true); // 显示支付提示
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

            const names = rows.map((row, index) => ({ id: index, name: row[0], points: 0 }));

            setStudents(names);
        };

        reader.readAsArrayBuffer(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
                    <p>想关闭广告？立即支付998！限时特惠不要999不要999，只要998</p>
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
                    <Students
                        students={students}
                        isGroup={false}
                        changePointsButton={changePointsButton}
                        course={course} />
                </TabPane>

                <TabPane tab={'分组'} itemKey={'2'}>
                    <Students
                        students={students}
                        isGroup={true}
                        course={course} />
                    <Text>每组人数：</Text>
                    <InputNumber min={2} max={6} step={1} defaultValue={2} />
                    <Button theme='solid' type='primary' style={{ marginRight: 8 }}>随机分组</Button>
                </TabPane>
            </Tabs>

            <div {...getRootProps()} style={{ marginTop: '20px' }}>
                <input {...getInputProps()} />
                <p>将 Excel 文件拖拽至此处上传</p>
            </div>
        </div>
    )
}

export default App;
