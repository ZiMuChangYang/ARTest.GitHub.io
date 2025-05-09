// API列表
const API_LIST = [
    'https://api.yimian.xyz/img',
    'https://api.lolimi.cn/API/tup/xjj.php',
    'https://api.lolimi.cn/API/meizi/api.php?type=image',
    'https://www.onexiaolaji.cn/RandomPicture/api/?key=qq249663924',
    'https://v2.xxapi.cn/api/meinvpic?return=302',
    'https://v2.xxapi.cn/api/baisi?return=302',
    'https://v2.xxapi.cn/api/heisi?return=302',
    'https://cdn.seovx.com/?mom=302',
    'https://cdn.seovx.com/ha/?mom=302',
    'https://api.pearktrue.cn/api/beautifulgirl/?type=image',
    'http://api.yujn.cn/api/zzxjj.php',
    'http://api.yujn.cn/api/cos.php',
    'http://api.yujn.cn/api/jk.php?',
    'http://api.yujn.cn/api/yscos.php??',
    'http://api.yujn.cn/api/heisi.php',
    'http://api.yujn.cn/api/tui.php?',
    'https://free.wqwlkj.cn/wqwlapi/ks_xjj.php?type=image',
    'https://free.wqwlkj.cn/wqwlapi/hlxcos.php?type=image'
];

// 获取DOM元素
const randomImage = document.getElementById('randomImage');
const loading = document.getElementById('loading');
const nextBtn = document.getElementById('nextBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const container = document.querySelector('.container');

// 显示加载状态
function showLoading() {
    loading.classList.add('active');
}

// 隐藏加载状态
function hideLoading() {
    loading.classList.remove('active');
}

// 随机选择一个API
function getRandomApi() {
    return API_LIST[Math.floor(Math.random() * API_LIST.length)];
}

// 获取随机图片
async function getRandomImage() {
    try {
        showLoading();
        const apiUrl = getRandomApi();

        // 创建新的图片对象
        const img = new Image();
        
        // 添加图片加载超时处理
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Image load timeout')), 10000);
        });

        const loadPromise = new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = () => reject(new Error('Failed to load image'));
        });

        // 设置图片源
        img.src = apiUrl;

        // 等待图片加载或超时
        await Promise.race([loadPromise, timeoutPromise]);
        
        // 图片加载成功
        randomImage.src = apiUrl;
        hideLoading();
        
    } catch (error) {
        console.error('获取图片失败:', error);
        hideLoading();
        // 发生错误时重试
        setTimeout(getRandomImage, 2000);
    }
}

// 切换全屏
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`全屏错误: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// 事件监听
nextBtn.addEventListener('click', getRandomImage);
fullscreenBtn.addEventListener('click', toggleFullscreen);
container.addEventListener('click', (e) => {
    if (e.target === randomImage || e.target === container) {
        getRandomImage();
    }
});

// 页面加载完成后获取第一张图片
window.addEventListener('load', getRandomImage);

// 添加键盘快捷键
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowRight') {
        getRandomImage();
    } else if (e.code === 'KeyF') {
        toggleFullscreen();
    }
}); 