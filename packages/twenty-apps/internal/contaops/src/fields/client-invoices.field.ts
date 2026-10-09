import {
  defineField,
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import { INVOICE_IDENTIFIERS } from '../constants/invoicing-identifiers';

export default defineField({
  universalIdentifier: INVOICE_IDENTIFIERS.clientInvoicesField,
  objectUniversalIdentifier: STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  type: FieldType.RELATION,
  name: 'contaopsInvoices',
  label: 'Facturas',
  icon: 'IconFileInvoice',
  relationTargetObjectMetadataUniversalIdentifier: INVOICE_IDENTIFIERS.object,
  relationTargetFieldMetadataUniversalIdentifier: INVOICE_IDENTIFIERS.clientField,
  universalSettings: { relationType: RelationType.ONE_TO_MANY },
});
