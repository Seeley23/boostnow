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
    console.log('🚀 Starting Holy Grail Elite UI Setup...');

    // 1. Create Pages Table (Enhanced with UI & SEO/GEO)
    const pagesTable = await api.post('/tables', {
      name: 'Pages',
      fields: [
        { name: 'Slug', type: 'singleLineText' },
        { name: 'PageName', type: 'singleLineText' },
        { name: 'SEO_Title', type: 'singleLineText' },
        { name: 'SEO_Desc', type: 'multilineText' },
        { name: 'Status', type: 'singleSelect', options: { choices: [{ name: 'Draft' }, { name: 'Published' }] } },
        { name: 'Aesthetic_Mood', type: 'singleSelect', options: { choices: [
          { name: 'Minimal & Clean' },
          { name: 'Bold & Vibrant' },
          { name: 'Dark & Moody' },
          { name: 'Warm & Organic' }
        ] } },
        { name: 'Primary_Color', type: 'singleLineText' },
        { name: 'Font_Heading', type: 'singleLineText' },
        { name: 'Schema_Type', type: 'singleLineText' },
        { name: 'GEO_Score', type: 'number', options: { precision: 0 } },
      ],
    });
    console.log('✅ Pages Table Created with UI Controls');

    // 2. Create Page_Sections Table (Enhanced for Builder.io)
    await api.post('/tables', {
      name: 'Page_Sections',
      fields: [
        { name: 'Title', type: 'singleLineText' },
        { name: 'Content', type: 'multilineText' },
        { name: 'Order', type: 'number', options: { precision: 0 } },
        { name: 'Component_Name', type: 'singleLineText' },
        { name: 'HTML_Tag', type: 'singleSelect', options: { choices: [{ name: 'H1' }, { name: 'H2' }, { name: 'H3' }, { name: 'Article' }] } },
        { name: 'GEO_Citability', type: 'checkbox', options: { icon: 'check', color: 'greenBright' } },
        { name: 'Statistical_Data', type: 'multilineText' },
        { name: 'Animation_Type', type: 'singleSelect', options: { choices: [{ name: 'Fade' }, { name: 'Slide' }, { name: 'Zoom' }, { name: 'None' }] } },
        { name: 'Page', type: 'multipleRecordLinks', options: { linkedTableId: pagesTable.data.id } },
      ],
    });
    console.log('✅ Page_Sections Table Created with Builder.io Support');

    // 3. Create Design_System Table (Elite UI Tokens)
    await api.post('/tables', {
      name: 'Design_System',
      fields: [
        { name: 'Token_Name', type: 'singleLineText' },
        { name: 'Value', type: 'singleLineText' },
        { name: 'Type', type: 'singleSelect', options: { choices: [{ name: 'Color' }, { name: 'Font' }, { name: 'Spacing' }, { name: 'Radius' }] } },
        { name: 'Description', type: 'multilineText' },
      ],
    });
    console.log('✅ Design_System Table Created with Elite UI Tokens');

    // 4. Create Content_Queue Table (Autonomous Agent)
    await api.post('/tables', {
      name: 'Content_Queue',
      fields: [
        { name: 'Topic', type: 'singleLineText' },
        { name: 'Status', type: 'singleSelect', options: { choices: [{ name: 'Idea' }, { name: 'Researching' }, { name: 'Writing' }, { name: 'Review' }, { name: 'Published' }] } },
        { name: 'Keywords', type: 'singleLineText' },
        { name: 'Draft_Content', type: 'multilineText' },
        { name: 'GEO_Score', type: 'number', options: { precision: 0 } },
      ],
    });
    console.log('✅ Content_Queue Table Created for Autonomous Agent');

    console.log('🏆 Holy Grail Elite UI Infrastructure is Ready!');
  } catch (error) {
    console.error('❌ Setup Failed:', error.response?.data || error.message);
  }
}

setup();
