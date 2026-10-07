import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';

import { OBLIGATION_OBJECT_UNIVERSAL_IDENTIFIER } from '../constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: 'bd913023-bfca-4f03-bf04-16aac42b6f1e',
  position: 0,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: OBLIGATION_OBJECT_UNIVERSAL_IDENTIFIER,
});
