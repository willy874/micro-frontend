import { createContext } from '@micro-app/framework';
import { initTranslation } from '../locale';
import { BaseApplicationContext } from '@micro-app/framework';
import { SharedSliceContext } from '@/slices/shared';
import { SubSliceContext } from '@/slices/sub-slice';

export class ApplicationContext extends BaseApplicationContext {
  init(
    portal: Core.PortalContext,
    props: Record<string, string | undefined> = {}
  ) {
    const { isSelf, basename } = props;
    this.isSelf = Boolean(isSelf);
    if (basename) this.shared.router.basename = basename;
    this.shared.portal = portal;
    this.use(initTranslation);
    this.createSlice(SharedSliceContext, SubSliceContext);
  }

  getCurrentLocale() {
    return this.shared.portal.getCurrentLocale();
  }

  getCurrentUser() {
    return this.shared.portal.getCurrentUser();
  }

  checkUserPermission(action: string) {
    return this.shared.portal.checkUserPermission(action);
  }
}

export const [AppCtx, AppCtxProvider] = createContext<ApplicationContext>();
