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
  
  const loginRes = await fetch("http://localhost:4000/sip/invest/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, password: user.password })
  });
  
  const setCookie = loginRes.headers.get('set-cookie');
  
  const assetsRes = await fetch(`http://localhost:4000/sip/invest/INV001/networth`, {
      method: "GET",
      headers: { "Cookie": setCookie }
  });
  
  console.log("Assets response:", assetsRes.status);
  const assetsData = await assetsRes.text();
  console.log("Assets:", assetsData);
  
  process.exit(0);
}
run();
