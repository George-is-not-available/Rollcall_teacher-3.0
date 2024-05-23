import styles from './index.module.css';
import React, { useState, useEffect } from 'react';
import { Typography, Divider, Button, Input } from '@douyinfe/semi-ui';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const { Title, Text } = Typography;
    const [isPrint, setIsPrint] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        setIsEmpty(!inputValue || !inputValue2);
    }, [inputValue, inputValue2]);

    function isSucceed() {
        // Retrieve stored user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        // Check if stored user data exists and matches the input values
        if (storedUser && storedUser.username === inputValue && storedUser.password === inputValue2) {
            // Login successful, navigate to "/Courses"
            navigate("/courses");
        } else {
            // Login failed, display error message
            setIsPrint(true);
        }
    }

    return (
        <div className={styles.Page}>
            <div className={styles.App}>
                <img className={styles.logo} src="logo.svg" alt="logo" />
                <header className={styles.AppHeader}>
                    <div className={styles.firstPart}>
                        <Title heading={2}>欢迎登陆教师点名系统</Title>
                    </div>
                    <div className={styles.secondPart}>
                        <Input
                            autoFocus
                            value={inputValue}
                            id="inputField"
                            className="input"
                            placeholder='账户'
                            onChange={(e) => setInputValue(e)}
                        />
                        <Input
                            value={inputValue2}
                            className="input"
                            placeholder='密码'
                            mode="password"
                            onChange={(e) => setInputValue2(e)}
                        />
                    </div>
                    <div className={styles.thirdPart}>
                        <Button
                            onClick={isSucceed}
                            disabled={isEmpty}
                        >登录</Button>
                        <Title heading={6} type="quaternary"><span className={styles.blackText}>如果您还不是</span><span className={styles.goldenText}>尊贵的黄金至尊SVIP</span><span className={styles.blackText}>请点击这里</span><a onClick={() => navigate("/register")}>注册</a></Title>
                        <Text type="danger">{isPrint ? '登陆失败，请检查账户和密码' : ''}</Text>
                    </div>
                    <Divider className={styles.Divider} />
                </header>
            </div>
        </div>
    );
}

export default Login;
