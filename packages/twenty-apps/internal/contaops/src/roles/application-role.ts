import { defineApplicationRole } from 'twenty-sdk/define';

import { APPLICATION_ROLE_UNIVERSAL_IDENTIFIER } from '../constants/universal-identifiers';

export default defineApplicationRole({
  universalIdentifier: APPLICATION_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'Aplicación ContaOps',
  description: 'Rol de la aplicación, sin automatizaciones con acceso a registros.',
  canReadAllObjectRecords: false,
  canUpdateAllObjectRecords: false,
  canSoftDeleteAllObjectRecords: false,
  canDestroyAllObjectRecords: false,
  canUpdateAllSettings: false,
  canBeAssignedToUsers: false,
  canBeAssignedToAgents: false,
  canBeAssignedToApiKeys: false,
});
