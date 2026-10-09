import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
} from 'twenty-sdk/define';

import { INVOICE_IDENTIFIERS, ISSUER_IDENTIFIERS } from '../constants/invoicing-identifiers';

export default defineField({
  universalIdentifier: INVOICE_IDENTIFIERS.issuerField,
  objectUniversalIdentifier: INVOICE_IDENTIFIERS.object,
  type: FieldType.RELATION,
  name: 'issuer',
  label: 'Emisor',
  icon: 'IconBuildingSkyscraper',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    ISSUER_IDENTIFIERS.object,
  relationTargetFieldMetadataUniversalIdentifier: ISSUER_IDENTIFIERS.invoicesField,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'issuerId',
  },
});
