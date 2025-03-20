document.getElementById("container").style.display = "none";
let userName = "You"

function enterUserName(event) {
    if(event.key !== "Enter") return;

    userName = document.getElementById("userName").value?.trim() || "You";

    document.getElementById("userName").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("message").focus();
}

function formatResponseData(data) {
    if (data.reply) {
        data.reply = data.reply.replace(/\. /g, ".<br>"); // Xuống dòng sau dấu ". "
        data.reply = data.reply.replace(/\?/g, "?<br>"); // Thay thế "\n" bằng "<br>"
        data.reply = data.reply.replace(/\!/g, "!<br>"); // Thay thế "\n" bằng "<br>"
        data.reply = data.reply.replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre><code class="language-$1">$2</code></pre>');
    }
    return data;
}

async function sendMessage() {
    const userMessage = document.getElementById("message").value;
    if (!userMessage) return;

    // Hiển thị tin nhắn người dùng
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<div class="user"> ${userName} <br> ${userMessage}</div>`;
    document.getElementById("message").value = "";

    try {
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        formatResponseData(data);
        chatbox.innerHTML += `<div class="bot">Bot: ${data.reply}</div>`;
        chatbox.scrollTop = chatbox.scrollHeight; 
    } catch (error) {
        chatbox.innerHTML += `<div class="bot">Bot: Lỗi kết nối đến server!</div>`;
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}