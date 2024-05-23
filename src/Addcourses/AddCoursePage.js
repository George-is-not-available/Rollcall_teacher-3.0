import React, { useState, useEffect } from 'react';
import { Modal, Input, Button } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import './AddCoursePage.css';

const AddCoursePage = ({ setCourses }) => {
  const [visible, setVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [courseList, setCourseList] = useState([]);

  // 加载本地存储中的课程数据
  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      setCourseList(JSON.parse(storedCourses));
    }
  }, []);

  const handleAddCourse = () => {
    setVisible(true);
  };

  const handleOk = () => {
    const newCourse = { id: Date.now(), name: newName };
    setCourses(prevCourses => [...prevCourses, newCourse]);
    setCourseList([...courseList, newCourse]);
    setVisible(false);
    setNewName('');

    // 将更新后的课程数据保存到本地存储
    localStorage.setItem('courses', JSON.stringify([...courseList, newCourse]));
  };

  const handleCancel = () => {
    setVisible(false);
    setNewName('');
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个课程吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const updatedList = courseList.filter(course => course.id !== id);
        setCourseList(updatedList);

        // 更新本地存储中的课程数据
        localStorage.setItem('courses', JSON.stringify(updatedList));
      },
    });
  };

  return (
    <div>
      <Button onClick={handleAddCourse}>+ 新建课程</Button>
      <Modal
        visible={visible}
        title="新建课程"
        motion={true}
        okText="新建"
        onCancel={handleCancel}
        onOk={handleOk}
        maskClosable={false}
      >
        <Input className="course-input" placeholder="课程名称" value={newName} onChange={(e) => setNewName(e)} />
      </Modal>
      {courseList.map(course => (
        <div key={course.id} className="course-box">
          <Link to="/callroll" className="course-name">{course.name}</Link>
          <Button className="delete-button" onClick={() => handleDelete(course.id)}>
            删除
          </Button>
        </div>
      ))}
    </div>
  );
}

export default AddCoursePage;
