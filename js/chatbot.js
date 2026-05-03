class ChatHistory {
    constructor() {
        this.messages = [];
    }
    addMessage(message) {
        this.messages.push(message);
    }
    getHistory() {
        return this.messages;
    }
}

const historyMessages = new ChatHistory();

function showMessage(message, type) {
    const box = document.getElementById('chat-box');
    const div = document.createElement('div');
    div.className = 'msg ' + type;

    const sender = document.createElement('div');
    sender.className = 'sender';
    sender.textContent = type === 'user' ? 'Vous' : 'Bot EFREI';
    div.appendChild(sender);

    const txt = document.createElement('span');
    txt.textContent = message;
    div.appendChild(txt);

    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    historyMessages.addMessage({ message, type });
}

function processMessage(intents, message) {
    let response = "Je suis désolé, je ne comprends pas. Essayez : formations, admissions, Green IT, alternance ou contact.";
    intents.forEach(intent => {
        intent.patterns.forEach(pattern => {
            if (message.toLowerCase().includes(pattern.toLowerCase())) {
                response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
            }
        });
    });
    return response;
}

function sendMessage(intents) {
    const input = document.getElementById('user-input');
    const msg = input.value.trim();
    if (!msg) return;
    showMessage(msg, 'user');
    const response = processMessage(intents, msg);
    setTimeout(() => showMessage(response, 'bot'), 400);
    input.value = '';
}

function fetchJSON(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (Object.keys(data).length === 0 && data.constructor === Object)
                throw new Error('Empty JSON or malformed JSON');
            console.log(data);
            sendMessage(data.intents);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function askSuggestion(el) {
    document.getElementById('user-input').value = el.textContent;
    fetchJSON('../json/intents.json');
}

function saveMessages() {
    console.log('Saving chat history...');
    sessionStorage.setItem('chatHistory',
        JSON.stringify(historyMessages.getHistory().map(msg => msg.message)));
}

function loadMessages() {
    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory'));
    if (chatHistory) {
        chatHistory.forEach(message => {
            showMessage(message, message.sender);
        });
    }
}

window.addEventListener('beforeunload', saveMessages);
window.addEventListener('load', () => {
    showMessage("Bonjour ! Je suis le chatbot FAQ du Département Informatique EFREI. Posez-moi une question sur la Green IT, les formations, les admissions...", 'bot');
    loadMessages();
});