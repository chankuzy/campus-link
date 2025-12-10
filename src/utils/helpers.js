export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

export const showMessage = (message) => {
    document.getElementById('app-message-content').innerText = message;
    document.getElementById('message-modal').classList.remove('hidden');
};