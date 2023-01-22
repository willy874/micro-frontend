import { useContext } from 'react';
import { AppCtx } from '@/app/contexts';

const DefaultPage = () => {
  const appCtx = useContext(AppCtx);
  return (
    <div>
      <button
        style={{
          background: '#000',
          cursor: 'pointer',
          border: '1px solid #fff',
          margin: '4px',
        }}
        onClick={() => console.log(appCtx)}
      >
        getApplicationContext
      </button>
    </div>
  );
};

export default DefaultPage;
