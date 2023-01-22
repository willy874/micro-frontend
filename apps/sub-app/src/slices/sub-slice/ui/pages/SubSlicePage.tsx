import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  RestClient,
  responseHandler,
  Languages,
  LanguageList,
  useTranslation,
  storeObserver,
} from '@/slices/shared';
import { useSubSliceCtx } from '../contexts';

const getToken = () => {
  try {
    const vuex = JSON.parse(localStorage.getItem('vuex') as any);
    return vuex.core.auth.token;
  } catch (error) {
    return '';
  }
};

const SubSlicePage = storeObserver(() => {
  const { t, locale } = useTranslation();
  const navigate = useNavigate();
  const slice = useSubSliceCtx();
  const { portal, note } = slice.shared;

  const onProxy = () => {
    const http = portal.getHttpInterface();
    new RestClient({ http })
      .send({ url: '/api/workflows/latest/line', method: 'GET' })
      .then(responseHandler)
      .then((res) => {
        console.log('proxy', res);
      });
  };
  const onSend = () => {
    new RestClient({ authorization: getToken() || 'NO_TOKEN' })
      .send({
        baseURL: 'https://mini-ansen.pentium.network',
        url: '/api/workflows/latest/line',
        method: 'GET',
      })
      .then(responseHandler)
      .then((res) => {
        console.log('send', res);
      });
  };
  const onHandler = () => {
    const http = portal.getHttpInterface();
    RestClient.handler(http.get, '/api/workflows/latest/line')
      .then(responseHandler)
      .then((res: any) => {
        console.log('handler', res);
      });
  };
  const onChangeLanguage = () => {
    const index = LanguageList.indexOf(locale.language as Languages);
    locale.changeLanguage(LanguageList[(index + 1) % LanguageList.length]);
  };
  const handleUpdateNextThing = () => {
    note.updateNextThing(new Date().toISOString());
  };

  return (
    <>
      <div>
        <h3>User</h3>
        <div>NAME: {portal.getCurrentUser().name}</div>
        <div>UID: {portal.getCurrentUser().uid}</div>
      </div>
      <br />
      <div>
        <h3>RestClient</h3>
        <Button onClick={onProxy}>Proxy</Button>
        <Button onClick={onSend}>Send</Button>
        <Button onClick={onHandler}>Handler</Button>
      </div>
      <br />
      <div>
        <h3>shared</h3>
        <div>{note.nextThing}</div>
        <Button onClick={handleUpdateNextThing}>update next thing</Button>
      </div>
      <br />
      <div>
        <h3>i18next</h3>
        <div>{t('A mixture of both uppercase and lowercase letters')}</div>
        <div>{t('Basic information')}</div>
        <Button onClick={onChangeLanguage}>chage language</Button>
      </div>
      <br />
      <Button
        onClick={() => {
          navigate('/timer-page');
        }}
      >
        go to timer page
      </Button>
    </>
  );
});

export default SubSlicePage;
