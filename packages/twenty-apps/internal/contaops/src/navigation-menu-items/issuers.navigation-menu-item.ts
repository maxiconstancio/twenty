import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';

import { ISSUER_IDENTIFIERS } from '../constants/invoicing-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: ISSUER_IDENTIFIERS.navigationMenuItem,
  position: 1,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: ISSUER_IDENTIFIERS.object,
});
