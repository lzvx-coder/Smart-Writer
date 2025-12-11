const { app, BrowserWindow } = require('electron');
const path = require('path');

// 定义创建窗口的函数
function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900, // 设定最小宽度
    minHeight: 600, // 设定最小高度
    title: '智能写作与批改助手',
    webPreferences: {
      // 确保您的 HTML 应用中的 API 调用能够正常工作
      contextIsolation: false, 
      nodeIntegration: true, 
    }
  });

  // 加载您的 index.html 文件
  mainWindow.loadFile('index.html');

  // (可选) 可以在开发阶段打开开发者工具进行调试
  // mainWindow.webContents.openDevTools();
}

// 当 Electron 完成初始化后，创建窗口
app.whenReady().then(() => {
  createWindow();

  // 在 macOS 上，没有窗口打开时点击 Dock 图标会重新创建一个窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 除非用户按下 Cmd + Q，否则保持应用活跃
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});