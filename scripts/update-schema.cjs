const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = 'appB0MrrpweuNvlQd';

async function addField(tableId, fieldData) {
  console.log(`Dodawanie pola ${fieldData.name} do tabeli ${tableId}...`);
  const response = await fetch(
    `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables/${tableId}/fields`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fieldData)
    }
  );
  const text = await response.text();
  let result;
  try {
    result = JSON.parse(text);
  } catch (e) {
    console.error(`Błąd parsowania JSON dla pola ${fieldData.name}:`, text);
    return;
  }
  if (result.error) {
    console.error(`Błąd przy dodawaniu pola ${fieldData.name}:`, JSON.stringify(result.error));
  } else {
    console.log(`Sukces: Dodano pole ${fieldData.name}`);
  }
}

async function run() {
  // Uwaga: Musimy znać ID tabel lub użyć ich nazw, ale API meta/fields wymaga ID lub nazwy tabeli w URL
  // W Airtable API nazwa tabeli działa w URL meta/bases/:baseId/tables/:tableIdOrName/fields
  
  const pagesFields = [
    { name: 'Schema_Type', type: 'singleSelect', options: { choices: [{ name: 'Article' }, { name: 'LocalBusiness' }, { name: 'FAQPage' }, { name: 'Product' }, { name: 'Service' }] } },
    { name: 'Primary_Keyword', type: 'singleLineText' },
    { name: 'Semantic_Keywords', type: 'multilineText' },
    { name: 'AI_Summary', type: 'multilineText' },
    { name: 'Author_Name', type: 'singleLineText' },
    { name: 'Author_Bio', type: 'multilineText' },
    { name: 'Last_Updated', type: 'date', options: { dateFormat: { name: 'iso', format: 'YYYY-MM-DD' } } },
    { name: 'Canonical_URL', type: 'singleLineText' }
  ];

  const sectionFields = [
    { name: 'HTML_Tag', type: 'singleSelect', options: { choices: [{ name: 'H1' }, { name: 'H2' }, { name: 'H3' }, { name: 'Section' }, { name: 'Article' }] } },
    { name: 'GEO_Citability_Mode', type: 'checkbox', options: { icon: 'check', color: 'greenBright' } },
    { name: 'Image_Alt', type: 'singleLineText' },
    { name: 'Schema_Markup', type: 'multilineText' },
    { name: 'Statistical_Data', type: 'multilineText' }
  ];

  console.log("Aktualizacja tabeli Pages...");
  for (const field of pagesFields) {
    await addField('Pages', field);
  }

  console.log("Aktualizacja tabeli Page_Sections...");
  for (const field of sectionFields) {
    await addField('Page_Sections', field);
  }
}

run();
