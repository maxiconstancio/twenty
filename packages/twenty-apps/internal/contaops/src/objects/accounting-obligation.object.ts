import { defineObject, FieldType } from 'twenty-sdk/define';

import {
  OBLIGATION_DUE_DATE_FIELD_UNIVERSAL_IDENTIFIER,
  OBLIGATION_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  OBLIGATION_OBJECT_UNIVERSAL_IDENTIFIER,
  OBLIGATION_PERIOD_FIELD_UNIVERSAL_IDENTIFIER,
  OBLIGATION_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
} from '../constants/universal-identifiers';

export default defineObject({
  universalIdentifier: OBLIGATION_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'accountingObligation',
  namePlural: 'accountingObligations',
  labelSingular: 'Obligación contable',
  labelPlural: 'Obligaciones contables',
  description: 'Una obligación de un cliente para un período concreto.',
  icon: 'IconCalendarEvent',
  labelIdentifierFieldMetadataUniversalIdentifier:
    OBLIGATION_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: OBLIGATION_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Obligación',
      icon: 'IconAbc',
      isNullable: false,
      defaultValue: "''",
    },
    {
      universalIdentifier: OBLIGATION_PERIOD_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'period',
      label: 'Período',
      description: 'Período de trabajo, por ejemplo 2026-10.',
      icon: 'IconCalendar',
      isNullable: true,
    },
    {
      universalIdentifier: OBLIGATION_DUE_DATE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE,
      name: 'dueDate',
      label: 'Vencimiento',
      icon: 'IconCalendarEvent',
      isNullable: true,
    },
    {
      universalIdentifier: OBLIGATION_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'status',
      label: 'Estado',
      icon: 'IconProgress',
      isNullable: false,
      defaultValue: "'PENDING'",
      options: [
        {
          id: 'bd913023-bfca-4f03-bf04-16aac42b6f10',
          value: 'PENDING',
          label: 'Pendiente',
          color: 'gray',
          position: 0,
        },
        {
          id: 'bd913023-bfca-4f03-bf04-16aac42b6f11',
          value: 'WAITING_FOR_DOCUMENTS',
          label: 'Esperando documentación',
          color: 'orange',
          position: 1,
        },
        {
          id: 'bd913023-bfca-4f03-bf04-16aac42b6f12',
          value: 'IN_PROGRESS',
          label: 'En preparación',
          color: 'blue',
          position: 2,
        },
        {
          id: 'bd913023-bfca-4f03-bf04-16aac42b6f13',
          value: 'IN_REVIEW',
          label: 'En revisión',
          color: 'purple',
          position: 3,
        },
        {
          id: 'bd913023-bfca-4f03-bf04-16aac42b6f14',
          value: 'COMPLETED',
          label: 'Completada',
          color: 'green',
          position: 4,
        },
      ],
    },
  ],
});
