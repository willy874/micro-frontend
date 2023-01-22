import { Button } from 'antd';
import { storeObserver } from '@/slices/shared';
import { useNavigate } from 'react-router-dom';
import { useSubSliceCtx } from '../contexts';

const TimerPage = storeObserver(() => {
  const navigate = useNavigate();
  const slice = useSubSliceCtx();

  const { timer } = slice.store;
  const { note } = slice.shared;

  const handleIncreaseTimer = () => {
    timer.increaseTimer();
  };

  const handleTestCommand = () => {
    timer.testCommand();
  };

  const testSharedCommand = () => {
    timer.testSharedCommand();
  };

  const getPostsQuery = () => {
    timer.getPosts(1);
  };

  const handleUpdateNextThing = () => {
    note.updateNextThing(new Date().toISOString());
  };

  return (
    <div>
      <div>
        <span>Seconds passed: {timer.secondsPassed}</span>
        <Button onClick={handleIncreaseTimer}>increase Timer</Button>
        <Button onClick={handleTestCommand}>test command</Button>
        <Button onClick={testSharedCommand}>test shared command</Button>
      </div>
      <br />
      <div>
        <h3>Get Posts Query</h3>
        <Button onClick={getPostsQuery}>get posts query</Button>
        {timer.postList.map((post) => (
          <div key={post.id}>
            <p>id: {post.id}</p>
            <p>userId: {post.userId}</p>
            <p>title: {post.title}</p>
            <p>body: {post.body}</p>
          </div>
        ))}
      </div>
      <br />
      <div>
        <h3>shared</h3>
        <div>{note.nextThing}</div>
        <Button onClick={handleUpdateNextThing}>update next thing</Button>
      </div>
      <Button
        onClick={() => {
          navigate('/');
        }}
      >
        go to home
      </Button>
    </div>
  );
});

export default TimerPage;
