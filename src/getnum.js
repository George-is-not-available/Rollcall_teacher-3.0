const puppeteer = require('puppeteer');

async function loginToWeChat(username, password) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://wechat.com/login');

    // 填写用户名和密码
    await page.type('#username', username);
    await page.type('#password', password);

    // 点击登录按钮
    await page.click('#login-button');

    // 等待登录成功后跳转到订单页面
    await page.waitForNavigation();

    // 获取登录后的 Cookie
    const cookies = await page.cookies();

    await browser.close();
    return cookies;
}

async function getOrderNumbers(cookies) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 设置 Cookie
    await page.setCookie(...cookies);

    // 访问订单页面
    await page.goto('https://wechat.com/orders');

    // 等待页面加载完成
    await page.waitForSelector('.order-number');

    // 获取订单号
    const orderNumbers = await page.evaluate(() => {
        const orderElements = document.querySelectorAll('.order-number');
        return Array.from(orderElements).map(element => element.textContent);
    });

    await browser.close();
    return orderNumbers;
}

async function main() {
    const username = 'Your_WeChat_Username';
    const password = 'Your_WeChat_Password';

    const cookies = await loginToWeChat(username, password);
    if (!cookies) {
        console.error('登录失败，无法获取订单号。');
        return;
    }

    const orderNumbers = await getOrderNumbers(cookies);
    if (!orderNumbers) {
        console.error('获取订单号失败。');
        return;
    }

    console.log('订单号：', orderNumbers);
}

// 每隔一段时间执行一次任务
const intervalId = setInterval(main, 60000); // 每隔 60 秒执行一次任务

// 在需要停止执行任务时调用 clearInterval(intervalId) 即可停止定时执行
