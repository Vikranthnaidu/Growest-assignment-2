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
  const investor_id = user.investor_id;
  console.log("Testing with investor:", investor_id);

  // Login to get cookie
  const loginRes = await fetch("http://localhost:4000/sip/invest/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: user.email, password: user.password })
  });
  const cookie = loginRes.headers.get('set-cookie');
  const loginData = await loginRes.json();
  console.log("\n=== LOGIN ===");
  console.log("Status:", loginRes.status, loginData);

  // Test holdings
  const holdingsRes = await fetch(`http://localhost:4000/sip/invest/${investor_id}/holdings`, {
    method: "GET",
    headers: { "Cookie": cookie }
  });
  const holdingsData = await holdingsRes.json();
  console.log("\n=== HOLDINGS ===");
  console.log("Status:", holdingsRes.status);
  console.log("Count:", holdingsData.holdings?.length, "rows");
  if (holdingsData.holdings?.length) console.log("Sample:", JSON.stringify(holdingsData.holdings[0], null, 2));

  // Test total assets / networth
  const networthRes = await fetch(`http://localhost:4000/sip/invest/${investor_id}/networth`, {
    method: "GET",
    headers: { "Cookie": cookie }
  });
  const networthData = await networthRes.json();
  console.log("\n=== TOTAL ASSETS (NETWORTH) ===");
  console.log("Status:", networthRes.status);
  console.log("Data:", JSON.stringify(networthData, null, 2));

  // Test transactions
  const transRes = await fetch(`http://localhost:4000/sip/trans/${investor_id}/transactions`, {
    method: "GET",
    headers: { "Cookie": cookie }
  });
  const transData = await transRes.json();
  console.log("\n=== TRANSACTIONS ===");
  console.log("Status:", transRes.status);
  console.log("Count:", transData.transactions?.length, "rows");
  if (transData.transactions?.length) console.log("Sample:", JSON.stringify(transData.transactions[0], null, 2));

  process.exit(0);
}
run().catch(e => { console.error(e); process.exit(1); });
