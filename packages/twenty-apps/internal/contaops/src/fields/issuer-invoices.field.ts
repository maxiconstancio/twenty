import {
  defineField,
  FieldType,
  RelationType,
} from 'twenty-sdk/define';

import { INVOICE_IDENTIFIERS, ISSUER_IDENTIFIERS } from '../constants/invoicing-identifiers';

export default defineField({
  universalIdentifier: ISSUER_IDENTIFIERS.invoicesField,
  objectUniversalIdentifier: ISSUER_IDENTIFIERS.object,
  type: FieldType.RELATION,
  name: 'invoices',
  label: 'Facturas',
  icon: 'IconFileInvoice',
  relationTargetObjectMetadataUniversalIdentifier: INVOICE_IDENTIFIERS.object,
  relationTargetFieldMetadataUniversalIdentifier: INVOICE_IDENTIFIERS.issuerField,
  universalSettings: { relationType: RelationType.ONE_TO_MANY },
});
