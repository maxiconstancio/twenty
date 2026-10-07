import { defineView, ViewSortDirection } from 'twenty-sdk/define';

import {
  OBLIGATION_ASSIGNEE_FIELD_UNIVERSAL_IDENTIFIER,
  OBLIGATION_CLIENT_FIELD_UNIVERSAL_IDENTIFIER,
  OBLIGATION_DUE_DATE_FIELD_UNIVERSAL_IDENTIFIER,
  OBLIGATION_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  OBLIGATION_OBJECT_UNIVERSAL_IDENTIFIER,
  OBLIGATION_PERIOD_FIELD_UNIVERSAL_IDENTIFIER,
  OBLIGATION_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
} from '../constants/universal-identifiers';

export default defineView({
  universalIdentifier: 'bd913023-bfca-4f03-bf04-16aac42b6f16',
  name: 'Obligaciones por vencimiento',
  objectUniversalIdentifier: OBLIGATION_OBJECT_UNIVERSAL_IDENTIFIER,
  icon: 'IconTable',
  position: 0,
  fields: [
    {
      universalIdentifier: 'bd913023-bfca-4f03-bf04-16aac42b6f17',
      fieldMetadataUniversalIdentifier: OBLIGATION_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 240,
    },
    {
      universalIdentifier: 'bd913023-bfca-4f03-bf04-16aac42b6f18',
      fieldMetadataUniversalIdentifier: OBLIGATION_CLIENT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 200,
    },
    {
      universalIdentifier: 'bd913023-bfca-4f03-bf04-16aac42b6f19',
      fieldMetadataUniversalIdentifier: OBLIGATION_PERIOD_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: 'bd913023-bfca-4f03-bf04-16aac42b6f1a',
      fieldMetadataUniversalIdentifier: OBLIGATION_DUE_DATE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 3,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: 'bd913023-bfca-4f03-bf04-16aac42b6f1b',
      fieldMetadataUniversalIdentifier: OBLIGATION_ASSIGNEE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 4,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: 'bd913023-bfca-4f03-bf04-16aac42b6f1c',
      fieldMetadataUniversalIdentifier: OBLIGATION_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 5,
      isVisible: true,
      size: 210,
    },
  ],
  sorts: [
    {
      universalIdentifier: 'bd913023-bfca-4f03-bf04-16aac42b6f1d',
      fieldMetadataUniversalIdentifier: OBLIGATION_DUE_DATE_FIELD_UNIVERSAL_IDENTIFIER,
      direction: ViewSortDirection.ASC,
    },
  ],
});
