import { defineObject, FieldType } from 'twenty-sdk/define';

import { ISSUER_IDENTIFIERS } from '../constants/invoicing-identifiers';

export default defineObject({
  universalIdentifier: ISSUER_IDENTIFIERS.object,
  nameSingular: 'invoiceIssuer',
  namePlural: 'invoiceIssuers',
  labelSingular: 'Emisor',
  labelPlural: 'Emisores',
  description: 'Emisor de las facturas del estudio.',
  icon: 'IconBuildingSkyscraper',
  labelIdentifierFieldMetadataUniversalIdentifier: ISSUER_IDENTIFIERS.nameField,
  fields: [
    {
      universalIdentifier: ISSUER_IDENTIFIERS.nameField,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Nombre',
      icon: 'IconAbc',
      isNullable: false,
      defaultValue: "''",
    },
    {
      universalIdentifier: ISSUER_IDENTIFIERS.taxIdentifierField,
      type: FieldType.TEXT,
      name: 'taxIdentifier',
      label: 'CUIT',
      icon: 'IconId',
      isNullable: true,
    },
    {
      universalIdentifier: ISSUER_IDENTIFIERS.statusField,
      type: FieldType.SELECT,
      name: 'status',
      label: 'Estado',
      icon: 'IconProgress',
      isNullable: false,
      defaultValue: "'ACTIVE'",
      options: [
        {
          id: ISSUER_IDENTIFIERS.activeOption,
          value: 'ACTIVE',
          label: 'Activo',
          color: 'green',
          position: 0,
        },
        {
          id: ISSUER_IDENTIFIERS.inactiveOption,
          value: 'INACTIVE',
          label: 'Inactivo',
          color: 'gray',
          position: 1,
        },
      ],
    },
  ],
});
