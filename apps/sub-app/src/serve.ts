import { APP_ENV_APP_NAME } from './app/constants';
import { readRemoteModule } from './app/utils/remote';
import { getDefaultPortalContext } from './slices/shared';

(async function () {
  await readRemoteModule(APP_ENV_APP_NAME, './web-components');
  const wc = document.createElement('sub-app') as Core.AppElement;
  wc.setAttribute('data-is-self', 'true');
  document.body.appendChild(wc);
  wc.init(
    Object.assign(getDefaultPortalContext(), {
      //
    })
  );
})();
