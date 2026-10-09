import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';

import { INVOICE_IDENTIFIERS } from '../constants/invoicing-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: INVOICE_IDENTIFIERS.navigationMenuItem,
  position: 2,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: INVOICE_IDENTIFIERS.object,
});
