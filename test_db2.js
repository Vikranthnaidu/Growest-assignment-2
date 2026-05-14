const { Client } = require('/Users/vikranth/Downloads/SIP-Management 2/node_modules/pg');
const client = new Client({
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  port: 6543,
  user: 'postgres.cwfwwkqfuubtysbpkpfh',
  password: 'uKaHq2lwz9jSvJx8',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await client.connect();
  const users = await client.query('SELECT * FROM user_login LIMIT 1');
  const user = users.rows[0];
  console.log("User:", user);
  
  const loginRes = await fetch("http://localhost:4000/sip/invest/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, password: user.password })
  });
  
  const setCookie = loginRes.headers.get('set-cookie');
  console.log("Set-Cookie:", setCookie);
  
  const holdingsRes = await fetch(`http://localhost:4000/sip/invest/${user.investor_id}/holdings`, {
      method: "GET",
      headers: { "Cookie": setCookie }
  });
  
  console.log("Holdings response:", holdingsRes.status);
  const holdingsData = await holdingsRes.text();
  console.log("Holdings:", holdingsData);
  
  process.exit(0);
}
run();
