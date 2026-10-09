import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { homedir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const APPLICATION_PATH = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPOSITORY_PATH = resolve(APPLICATION_PATH, '../../../..');
const BACKUP_PATH = resolve(APPLICATION_PATH, '.local/demo-backup.json');
const LOCALE = 'es-ES';
const CLIENT_NAMES = [
  'DEMO · Almacén San Martín',
  'DEMO · Consultora del Sur',
  'DEMO · Taller Los Hermanos',
  'DEMO · Panadería La Espiga',
  'DEMO · Estudio de Arquitectura Norte',
  'DEMO · Distribuidora Río Plata',
  'DEMO · Servicios Informáticos Horizonte',
  'DEMO · Librería El Encuentro',
  'DEMO · Transporte del Centro',
  'DEMO · Cafetería Las Acacias',
];
const OBLIGATION_EXAMPLES = [
  { name: 'IVA mensual · DEMO', period: '2026-09', dueDate: '2026-10-20', status: 'PENDING', clientIndex: 0 },
  { name: 'Ingresos Brutos · DEMO', period: '2026-09', dueDate: '2026-10-15', status: 'WAITING_FOR_DOCUMENTS', clientIndex: 1 },
  { name: 'Liquidación de sueldos · DEMO', period: '2026-10', dueDate: '2026-10-30', status: 'IN_PROGRESS', clientIndex: 2 },
  { name: 'Cargas sociales · DEMO', period: '2026-09', dueDate: '2026-10-09', status: 'IN_REVIEW', clientIndex: 3 },
  { name: 'Conciliación bancaria · DEMO', period: '2026-09', dueDate: '2026-10-05', status: 'COMPLETED', clientIndex: 4 },
  { name: 'Cierre contable · DEMO', period: '2026', dueDate: '2026-12-31', status: 'PENDING', clientIndex: 5 },
];

const configuration = JSON.parse(await readFile(resolve(homedir(), '.twenty/config.json'), 'utf8'));
const remote = configuration.remotes?.[configuration.defaultRemote];
if (!remote || remote.apiUrl !== 'http://localhost:2020') {
  throw new Error('Esta herramienta solo admite la instancia local http://localhost:2020.');
}
const token = remote.apiKey || remote.twentyCLIAccessToken;
if (!token) throw new Error('Conectar primero la CLI de Twenty con la instancia local.');

const request = async (path, method = 'GET', body) => {
  const response = await fetch(remote.apiUrl + path, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const result = await response.json();
  if (!response.ok || result.errors) {
    throw new Error(`${method} ${path}: ${JSON.stringify(result)}`);
  }
  return result;
};

const listAll = async (collection) => {
  const records = [];
  let cursor;
  do {
    const suffix = cursor ? `&starting_after=${encodeURIComponent(cursor)}` : '';
    const page = await request(`/rest/${collection}?limit=200${suffix}`);
    records.push(...page.data[collection]);
    cursor = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : undefined;
  } while (cursor);
  return records;
};
const companies = await listAll('companies');
const members = (await request('/rest/workspaceMembers?limit=10')).data.workspaceMembers;
const demoMember = members.find((member) => member.userEmail === 'tim@apple.dev');
if (!demoMember) throw new Error('No se encontró el usuario de demostración.');
const obligationsResponse = await request('/rest/accountingObligations?limit=100');
const seedConstants = await readFile(resolve(REPOSITORY_PATH,
  'packages/twenty-server/src/engine/workspace-manager/dev-seeder/data/constants/company-data-seeds.constant.ts'), 'utf8');
const seedIdentifiers = new Set([...seedConstants.matchAll(/ID_\d+: '([0-9a-f-]+)'/g)].map((match) => match[1]));
const seedCompanies = companies.filter((company) => seedIdentifiers.has(company.id));
const keptCompanies = [...seedCompanies].sort((left, right) => left.position - right.position).slice(0, 10);
const keptIdentifiers = new Set(keptCompanies.map((company) => company.id));
const removedCompanies = seedCompanies.filter((company) => !keptIdentifiers.has(company.id));
const changedSeedCompanies = removedCompanies.filter((company) => company.contaopsTaxIdentifier);
if (changedSeedCompanies.length) {
  throw new Error('Hay empresas de ejemplo con CUIT cargado. No se eliminan automáticamente.');
}
if (keptCompanies.length !== 10) throw new Error('No hay 10 empresas de ejemplo disponibles.');

console.log(JSON.stringify({
  companiesBefore: companies.length,
  demoCompaniesToKeep: keptCompanies.length,
  demoCompaniesToSoftDelete: removedCompanies.length,
  otherCompaniesPreserved: companies.length - seedCompanies.length,
  obligationsBefore: obligationsResponse.totalCount,
  locale: LOCALE,
}, null, 2));

if (process.argv.includes('--inspect')) {
  const result = await request('/metadata', 'POST', {
    query: 'query Inspect($name: String!) { __type(name: $name) { fields { name } } }',
    variables: { name: 'Mutation' },
  });
  console.log(JSON.stringify(result.data.__type.fields.filter((field) => field.name === 'updateWorkspaceMemberSettings')));
} else if (process.argv.includes('--apply')) {
  await mkdir(dirname(BACKUP_PATH), { recursive: true });
  // Nunca sobrescribir la copia previa a la primera modificación.
  try {
    await writeFile(BACKUP_PATH, JSON.stringify({
      createdAt: new Date().toISOString(), apiUrl: remote.apiUrl,
      companies, demoMember, keptCompanyIds: [...keptIdentifiers],
      removedCompanyIds: removedCompanies.map((company) => company.id),
      obligations: obligationsResponse.data.accountingObligations,
    }, null, 2), { flag: 'wx' });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }

  await request('/metadata', 'POST', {
    query: 'mutation UpdateLocale($input: UpdateWorkspaceMemberSettingsInput!) { updateWorkspaceMemberSettings(input: $input) }',
    variables: { input: { workspaceMemberId: demoMember.id, update: { locale: LOCALE } } },
  });
  const emptyLink = { primaryLinkLabel: '', primaryLinkUrl: '', secondaryLinks: [] };
  for (const [index, company] of keptCompanies.entries()) {
    await request(`/rest/companies/${company.id}`, 'PATCH', {
      name: CLIENT_NAMES[index],
      contaopsTaxIdentifier: `30-${String(index + 1).padStart(8, '0')}-0`,
      accountOwnerId: demoMember.id,
      domainName: emptyLink,
      linkedinLink: emptyLink,
      address: { addressStreet1: '', addressStreet2: '', addressCity: 'Buenos Aires',
        addressPostcode: '', addressState: 'Buenos Aires', addressCountry: 'Argentina',
        addressLat: null, addressLng: null },
    });
  }
  for (const [index, example] of OBLIGATION_EXAMPLES.entries()) {
    const { clientIndex, ...fields } = example;
    const identifier = `c07a0000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`;
    const existing = obligationsResponse.data.accountingObligations.find((obligation) => obligation.id === identifier);
    if (existing) continue;
    await request('/rest/accountingObligations', 'POST', {
      id: identifier, ...fields, clientId: keptCompanies[clientIndex].id, assigneeId: demoMember.id,
    });
  }
  for (let index = 0; index < removedCompanies.length; index += 50) {
    const identifiers = removedCompanies.slice(index, index + 50).map((company) => company.id);
    const filter = encodeURIComponent(`id[in]:[${identifiers.join(',')}]`);
    const result = await request(`/rest/companies?filter=${filter}`, 'DELETE');
    if (result.data.deleteCompanies.length !== identifiers.length) {
      throw new Error('La cantidad de empresas enviadas a la papelera no coincide.');
    }
    console.log(`Empresas enviadas a papelera: ${Math.min(index + 50, removedCompanies.length)}/${removedCompanies.length}`);
  }
  const finalCompanies = await request('/rest/companies?limit=1000');
  const finalObligations = await request('/rest/accountingObligations?limit=100');
  const finalMember = await request(`/rest/workspaceMembers/${demoMember.id}`);
  console.log(JSON.stringify({ companies: finalCompanies.totalCount,
    obligations: finalObligations.totalCount, member: finalMember.data,
    backup: BACKUP_PATH }, null, 2));
}
