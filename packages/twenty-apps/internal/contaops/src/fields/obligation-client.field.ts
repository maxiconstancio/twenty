import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import {
  CLIENT_OBLIGATIONS_FIELD_UNIVERSAL_IDENTIFIER,
  OBLIGATION_CLIENT_FIELD_UNIVERSAL_IDENTIFIER,
  OBLIGATION_OBJECT_UNIVERSAL_IDENTIFIER,
} from '../constants/universal-identifiers';

export default defineField({
  universalIdentifier: OBLIGATION_CLIENT_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier: OBLIGATION_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'client',
  label: 'Cliente',
  icon: 'IconBuildingSkyscraper',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    CLIENT_OBLIGATIONS_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'clientId',
  },
});
