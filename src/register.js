import React, { useState } from 'react';
import { Typography, Divider, Button, Input, Modal } from '@douyinfe/semi-ui'; // 假设有弹窗组件 Modal
import { useNavigate } from "react-router-dom";
import './Register.css'; // 引入 CSS 文件

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [orderNumber, setOrderNumber] = useState(''); // 新增订单号状态
    const [paymentSuccess, setPaymentSuccess] = useState(false); // 新增支付状态

    const handleRegister = () => {
        if (password !== confirmPassword) {
            setErrorMsg('两次输入的密码不一致');
            return;
        }
        if (!paymentSuccess) { // 检查支付状态
            setErrorMsg('请完成支付后再注册');
            return;
        }
        // 保存密码到本地存储
        localStorage.setItem('user', JSON.stringify({ username, password }));
        // 注册成功后导航到登录页面
        navigate("/login");
    };

    const handlePayment = () => {
        // 弹出模态框，要求输入订单号
        Modal.confirm({
            title: '请输入订单号',
            content: (
                <div>
                    <Input
                        value={orderNumber}
                        placeholder="你支付的订单号"
                        onChange={(e) => setOrderNumber(e)} 
                    />
                    <img src={process.env.PUBLIC_URL + '/payment.jpg'} alt="payment" style={{ maxWidth: '100%', maxHeight: '100%', display: 'block', margin: 'auto' }} />
                </div>
            ),
            onOk: () => {
                // 订单号验证逻辑
                if (orderNumber.startsWith('100') && orderNumber.length === 32) {
                    // 假设验证通过，设置支付状态为 true
                    setPaymentSuccess(true);
                } else {
                    // 订单号不符合要求，显示错误消息
                    setErrorMsg('订单号不符合要求');
                }
            }
        });
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <Typography.Title level={2}>注册</Typography.Title>
                <Input
                    value={username}
                    placeholder="用户名"
                    onChange={(e) => setUsername(e)}
                />
                <Input
                    value={password}
                    placeholder="密码"
                    type="password"
                    onChange={(e) => setPassword(e)}
                />
                <Input
                    value={confirmPassword}
                    placeholder="确认密码"
                    type="password"
                    onChange={(e) => setConfirmPassword(e)}
                />
                <Button onClick={handlePayment}>支付</Button>
                <Button onClick={handleRegister}>注册</Button>
                <Button onClick={() => navigate("/login")}>返回登陆界面</Button>
                {errorMsg && <Typography.Text type="danger">{errorMsg}</Typography.Text>}
                <Divider />
            </div>
        </div>
    );
}

export default Register;
