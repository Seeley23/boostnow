const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = 'appB0MrrpweuNvlQd';

async function setup() {
  console.log('Tworzenie tabeli Prospects...');
  const response = await fetch(
    `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "Prospects",
        description: "CRM-lite for GEO Agency management",
        fields: [
          { name: 'Domain', type: 'url' },
          { name: 'Company', type: 'singleLineText' },
          { name: 'Status', type: 'singleSelect', options: { choices: [{ name: 'Lead' }, { name: 'Qualified' }, { name: 'Proposal' }, { name: 'Won' }, { name: 'Lost' }] } },
          { name: 'GEO_Score', type: 'number', options: { precision: 0 } },
          { name: 'Monthly_Value', type: 'currency', options: { symbol: '€', precision: 0 } },
          { name: 'Notes', type: 'multilineText' }
        ]
      })
    }
  );
  
  const result = await response.json();
  if (result.error) {
    console.error('Błąd:', result.error);
  } else {
    console.log('Sukces! Tabela Prospects została utworzona. ID:', result.id);
  }
}

setup();
