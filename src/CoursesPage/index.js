import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddCoursePage from '../Addcourses/AddCoursePage';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  return (
    <div>
      <AddCoursePage setCourses={setCourses} />
      {/* 添加一个按钮，点击时跳转到添加课程页面 */}
    </div>
  );
}

export default CoursesPage;
