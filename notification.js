export async function sendDiscordNotification(url, option) {
    const message = `재입고 알림(${option})\n${url}`;
    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
        throw new Error("Webhook URL이 설정되지 않았습니다.");
    }

    const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: message })
    });

    if (!res.ok) {
        throw new Error("Discord Webhook 전송 실패");
    }
}