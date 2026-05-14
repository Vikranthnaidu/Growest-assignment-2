const http = require('http');

async function run() {
    try {
        const loginRes = await fetch("http://localhost:4000/sip/invest/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "sanjay.sharma@example.com", password: "password123" }) // from looking at userModel before, I remember typical names. Wait, let me just query DB first.
        });
        console.log(await loginRes.text());
    } catch(e) { console.error(e); }
}
run();
