const axios = require('axios');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = 'appB0MrrpweuNvlQd';

async function createTable(tableData) {
  try {
    console.log(`Tworzenie tabeli: ${tableData.name}...`);
    const response = await axios.post(
      `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`,
      tableData,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(`Sukces! Tabela ${tableData.name} została utworzona.`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.log(`Tabela ${tableData.name} już istnieje lub błąd parametrów.`);
    } else {
      console.error(`Błąd przy tworzeniu tabeli ${tableData.name}:`, error.response ? error.response.data : error.message);
    }
  }
}

async function setup() {
  // 1. Tabela Pages
  const pagesTable = {
    name: "Pages",
    description: "Główne podstrony serwisu",
    fields: [
      { name: "Slug", type: "singleLineText" },
      { name: "PageName", type: "singleLineText" },
      { name: "SEO_Title", type: "singleLineText" },
      { name: "SEO_Desc", type: "multilineText" },
      {
        name: "Status",
        type: "singleSelect",
        options: {
          choices: [
            { name: "Draft", color: "yellowLight2" },
            { name: "Published", color: "greenLight2" }
          ]
        }
      }
    ]
  };

  const createdPages = await createTable(pagesTable);
  
  // 2. Tabela Page_Sections
  const sectionsTable = {
    name: "Page_Sections",
    description: "Sekcje treści dla poszczególnych stron",
    fields: [
      { name: "Page", type: "multipleRecordLinks", options: { foreignTableId: createdPages ? createdPages.id : "Pages" } },
      {
        name: "Section_Type",
        type: "singleSelect",
        options: {
          choices: [
            { name: "Hero" }, { name: "Problem" }, { name: "Solution" },
            { name: "Services" }, { name: "Results" }, { name: "Urgency" },
            { name: "Target" }, { name: "Process" }, { name: "FAQ" }, { name: "Contact" }
          ]
        }
      },
      { name: "Order", type: "number", options: { precision: 0 } },
      { name: "Title", type: "singleLineText" },
      { name: "Content", type: "multilineText" },
      { name: "Extra_Data", type: "multilineText" }
    ]
  };

  await createTable(sectionsTable);
  
  console.log("Konfiguracja CMS zakończona!");
}

setup();
