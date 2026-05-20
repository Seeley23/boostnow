const axios = require('axios');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!AIRTABLE_API_KEY || !BASE_ID) {
  console.error('Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID');
  process.exit(1);
}

const api = axios.create({
  baseURL: `https://api.airtable.com/v0/meta/bases/${BASE_ID}`,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

async function setup() {
  try {
    console.log('🚀 Starting Holy Grail Airtable Setup...');

    // 1. Create Pages Table
    const pagesTable = await api.post('/tables', {
      name: 'Pages',
      fields: [
        { name: 'Slug', type: 'singleLineText' },
        { name: 'PageName', type: 'singleLineText' },
        { name: 'SEO_Title', type: 'singleLineText' },
        { name: 'SEO_Desc', type: 'multilineText' },
        { name: 'Status', type: 'singleSelect', options: { choices: [{ name: 'Draft' }, { name: 'Published' }] } },
        { name: 'Schema_Type', type: 'singleLineText' },
        { name: 'Author_Name', type: 'singleLineText' },
        { name: 'GEO_Score', type: 'number', options: { precision: 0 } },
      ],
    });
    console.log('✅ Pages Table Created');

    // 2. Create Page_Sections Table
    await api.post('/tables', {
      name: 'Page_Sections',
      fields: [
        { name: 'Title', type: 'singleLineText' },
        { name: 'Content', type: 'multilineText' },
        { name: 'Order', type: 'number', options: { precision: 0 } },
        { name: 'HTML_Tag', type: 'singleSelect', options: { choices: [{ name: 'H1' }, { name: 'H2' }, { name: 'H3' }, { name: 'Article' }] } },
        { name: 'GEO_Citability', type: 'checkbox', options: { icon: 'check', color: 'greenBright' } },
        { name: 'Statistical_Data', type: 'multilineText' },
        { name: 'Page', type: 'multipleRecordLinks', options: { linkedTableId: pagesTable.data.id } },
      ],
    });
    console.log('✅ Page_Sections Table Created');

    // 3. Create Design_System Table
    await api.post('/tables', {
      name: 'Design_System',
      fields: [
        { name: 'Token_Name', type: 'singleLineText' },
        { name: 'Value', type: 'singleLineText' },
        { name: 'Type', type: 'singleSelect', options: { choices: [{ name: 'Color' }, { name: 'Font' }, { name: 'Radius' }] } },
      ],
    });
    console.log('✅ Design_System Table Created');

    console.log('🏆 Holy Grail Infrastructure is Ready!');
  } catch (error) {
    console.error('❌ Setup Failed:', error.response?.data || error.message);
  }
}

setup();
