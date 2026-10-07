import {
  defineField,
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import {
  ASSIGNEE_OBLIGATIONS_FIELD_UNIVERSAL_IDENTIFIER,
  OBLIGATION_ASSIGNEE_FIELD_UNIVERSAL_IDENTIFIER,
  OBLIGATION_OBJECT_UNIVERSAL_IDENTIFIER,
} from '../constants/universal-identifiers';

export default defineField({
  universalIdentifier: ASSIGNEE_OBLIGATIONS_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember.universalIdentifier,
  type: FieldType.RELATION,
  name: 'contaopsObligations',
  label: 'Obligaciones asignadas',
  icon: 'IconCalendarEvent',
  relationTargetObjectMetadataUniversalIdentifier:
    OBLIGATION_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    OBLIGATION_ASSIGNEE_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: { relationType: RelationType.ONE_TO_MANY },
});
