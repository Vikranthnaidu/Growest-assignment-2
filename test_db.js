require('dotenv').config();
const client = require('./utils/pgManager');
async function test() {
    const res = await client.query('SELECT * FROM investor LIMIT 1');
    const investor_id = res.rows[0].investor_id;
    console.log("Investor:", investor_id);
    const holdings = await client.query(`
        SELECT i.first_name, i.investor_id, p.portfolio_id, a.id AS sip_id, a.amount, a.purchase_date, a.unit_value, a.status, m.id AS fund_id, m.name AS fund_name, m.amc_name, m.current_nav
        FROM investor AS i
        LEFT JOIN portfolio AS p ON i.investor_id = p.investor_id
        LEFT JOIN sip AS a ON p.portfolio_id = a.portfolio_id
        LEFT JOIN mf_details AS m ON a.mutual_id = m.id
        WHERE i.investor_id = $1
    `, [investor_id]);
    console.log("Holdings:", holdings.rows);
    process.exit(0);
}
test().catch(e => { console.error(e); process.exit(1); });
