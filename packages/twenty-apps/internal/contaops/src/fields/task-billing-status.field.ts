import {
  defineField,
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

export default defineField({
  universalIdentifier: 'bd913023-bfca-4f03-bf04-16aac42b6f1f',
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.universalIdentifier,
  type: FieldType.SELECT,
  name: 'contaopsBillingStatus',
  label: 'Facturable',
  description: 'Indica si el trabajo de esta tarea se factura al cliente.',
  icon: 'IconCreditCard',
  isNullable: false,
  defaultValue: "'NON_BILLABLE'",
  options: [
    {
      id: 'bd913023-bfca-4f03-bf04-16aac42b6f20',
      value: 'NON_BILLABLE',
      label: 'No facturable',
      color: 'gray',
      position: 0,
    },
    {
      id: 'bd913023-bfca-4f03-bf04-16aac42b6f21',
      value: 'BILLABLE',
      label: 'Facturable',
      color: 'green',
      position: 1,
    },
  ],
});
