// Modal.js
import { setGroupSize } from './AttendenceModal'; // 导入 setGroupSize 函数
// 然后在你的代码中使用 setGroupSize 函数

import React from 'react';
import { Button } from '@douyinfe/semi-ui';
import styles from './Modal.module.css'; // 根据需要引入样式文件

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

export default Modal;
