import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import {
  ASSIGNEE_OBLIGATIONS_FIELD_UNIVERSAL_IDENTIFIER,
  OBLIGATION_ASSIGNEE_FIELD_UNIVERSAL_IDENTIFIER,
  OBLIGATION_OBJECT_UNIVERSAL_IDENTIFIER,
} from '../constants/universal-identifiers';

export default defineField({
  universalIdentifier: OBLIGATION_ASSIGNEE_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier: OBLIGATION_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'assignee',
  label: 'Responsable',
  icon: 'IconUsers',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    ASSIGNEE_OBLIGATIONS_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'assigneeId',
  },
});
