import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import { INVOICE_IDENTIFIERS } from '../constants/invoicing-identifiers';

export default defineField({
  universalIdentifier: INVOICE_IDENTIFIERS.clientField,
  objectUniversalIdentifier: INVOICE_IDENTIFIERS.object,
  type: FieldType.RELATION,
  name: 'client',
  label: 'Cliente',
  icon: 'IconBuildingSkyscraper',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier: INVOICE_IDENTIFIERS.clientInvoicesField,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'clientId',
  },
});
