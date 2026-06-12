// Initialize Time
function updateTime() {
    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, '0');
    
    const taskbarTimeStr = `${hours}:${minutes} ${ampm}`;
    const lockTimeStr = `${hours}:${minutes}`;
    
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const lockDateStr = now.toLocaleDateString('en-US', dateOptions);
    const taskbarDateStr = `${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear()}`;

    const lockTime = document.getElementById('lockTime');
    const lockDate = document.getElementById('lockDate');
    const taskbarTime = document.getElementById('time');
    const taskbarDate = document.getElementById('date');

    if (lockTime) lockTime.textContent = lockTimeStr;
    if (lockDate) lockDate.textContent = lockDateStr;
    if (taskbarTime) taskbarTime.textContent = taskbarTimeStr;
    if (taskbarDate) taskbarDate.textContent = taskbarDateStr;
}

setInterval(updateTime, 1000);
updateTime();

// Lock Screen Logic
const lockScreen = document.getElementById('lockScreen');
let isUnlocked = false;

function unlock() {
    if (!isUnlocked && lockScreen) {
        isUnlocked = true;
        lockScreen.classList.add('hidden');
    }
}

// 1. Spacebar to unlock
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        unlock();
    }
});

// 2. Swipe up to unlock (Touch)
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    // Swipe up means end Y is smaller than start Y
    if (touchStartY - touchEndY > 50) {
        unlock();
    }
}, { passive: true });

// 3. Mouse wheel up to unlock
document.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) { // Scrolling down actually means pushing content up (swipe up)
        unlock();
    }
}, { passive: true });

// 4. Click anywhere on lock screen to unlock
if (lockScreen) {
    lockScreen.addEventListener('click', unlock);
}
