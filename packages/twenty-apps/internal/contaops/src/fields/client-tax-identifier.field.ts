import {
  defineField,
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

export default defineField({
  universalIdentifier: 'bd913023-bfca-4f03-bf04-16aac42b6f15',
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  type: FieldType.TEXT,
  name: 'contaopsTaxIdentifier',
  label: 'CUIT',
  description: 'Identificación tributaria del cliente.',
  icon: 'IconId',
  isNullable: true,
});
