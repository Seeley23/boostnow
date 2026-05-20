const axios = require('axios');
const fs = require('fs');
const path = require('path');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = 'appB0MrrpweuNvlQd';

const dataApi = axios.create({
  baseURL: `https://api.airtable.com/v0/${BASE_ID}`,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

async function syncCMS() {
  try {
    console.log('🔄 Starting Full CMS Sync from Airtable...');

    // 1. Fetch all Pages
    const pagesResponse = await dataApi.get('/Pages');
    const pages = pagesResponse.data.records.map(record => ({
      id: record.id,
      ...record.fields
    }));

    // 2. Fetch all Page Sections
    const sectionsResponse = await dataApi.get('/Page_Sections');
    const sections = sectionsResponse.data.records.map(record => ({
      id: record.id,
      ...record.fields
    }));

    // 3. Assemble the CMS structure
    const cmsData = {
      pages: pages.map(page => {
        // Find sections belonging to this page and sort by Order
        const pageSections = sections
          .filter(section => section.Page && section.Page.includes(page.id))
          .sort((a, b) => (a.Order || 0) - (b.Order || 0))
          .map(section => ({
            type: section.Section_Type || 'Content_Block',
            title: section.Title,
            content: section.Content,
            stats: section.Statistical_Data,
            imageAlt: section.Image_Alt,
            ctaLabel: section.CTA_Label,
            ctaLink: section.CTA_Link
          }));

        return {
          slug: page.Slug,
          pageName: page.PageName,
          SEO_Title: page.SEO_Title,
          SEO_Desc: page.SEO_Desc,
          Focus_Keyphrase: page.Focus_Keyphrase,
          Schema_Markup: page.Schema_Markup,
          FAQ_Data: page.FAQ_Data,
          sections: pageSections
        };
      })
    };

    // 4. Save to the local JSON file used by Next.js
    const outputPath = path.join(__dirname, '../client/src/data/blog/website-cms.json');
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(cmsData, null, 2));

    console.log(`✅ Sync Complete! ${pages.length} pages and ${sections.length} sections synchronized.`);
    console.log(`📂 Data saved to: ${outputPath}`);

  } catch (error) {
    console.error('❌ Sync Failed:', error.response?.data || error.message);
  }
}

syncCMS();
