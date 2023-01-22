export function loadScript(
  url: string,
  el = document.body
): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    const target = document.querySelector(`script[src="${url}"]`);
    if (target) {
      return resolve(target as HTMLScriptElement);
    }
    const script = document.createElement('script');
    script.src = url;
    el.appendChild(script);
    script.onerror = () => {
      reject(new Error(`Failed to fetch remote: ${url}`));
    };
    script.onload = () => {
      resolve(script);
    };
  });
}

export interface RemoteModule {
  get<T = any>(module: string, getScope?: string): Promise<() => T>;
  init(shareScope: string, initScope?: string): void;
}

export function readRemoteModule<T = any>(name: string, moduleName = './app') {
  const app = (window as any)[name] as RemoteModule | undefined;
  if (!app) {
    throw new Error(`The ${name} is not define`);
  }
  return app.get<T>(moduleName).then((getModules) => {
    if (!getModules) {
      throw new Error(`The ${name} is not define`);
    }
    return getModules();
  });
}

export async function loadRemoteEntry(
  name: string,
  remote: string,
  el = document.body,
  filename = 'remoteEntry.js'
) {
  const app = (window as any)[name] as RemoteModule | undefined;
  if (!app) {
    await loadScript(remote + '/' + filename, el);
  }
  return Promise.resolve(!app);
}

export interface StaticAssets {
  [ext: string]: string | string[];
}

export type StaticAssetMap = {
  '': Record<string, StaticAssets>;
  app: Record<string, StaticAssets>;
  [name: string]: Record<string, StaticAssets>;
};

export const assetsMap = new Map<string, StaticAssetMap>();

export async function loadAssets(
  name: string,
  remote: string,
  filename = 'assets.json'
) {
  const url = remote + '/' + filename;
  const res = await fetch(url);
  const map = (await res.json()) as StaticAssetMap;
  assetsMap.set(name, map);
  return assetsMap.get(name);
}

export function createAssetsLink(name: string, remote: string) {
  const map = assetsMap.get(name);
  if (!map) {
    throw new Error(
      `Assets ${name} is not loaded, please execute "loadAssets()".`
    );
  }
  const appAssets = map[''];
  const assets: HTMLLinkElement[] = [];
  const createLink = (url: string) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = remote + '/' + url;
    return link;
  };
  if (Array.isArray(appAssets.css)) {
    appAssets.css.forEach((url) => {
      if (/\/chunk\./.test(url)) {
        assets.push(createLink(url));
      }
    });
  } else {
    if (typeof appAssets.css === 'string' && /\/chunk\./.test(appAssets.css)) {
      assets.push(createLink(appAssets.css));
    }
  }
  return assets;
}
