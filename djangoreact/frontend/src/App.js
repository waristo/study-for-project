import {useState, useCallback} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import NewsCard from './components/Card/NewsCard';
import * as userActions from './store/modules/user/actions';

function App() {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const {
    query,
    news,
  } = useSelector((state) => ({
    query: state.user.query,
    news: state.user.news,
  }), shallowEqual) // shallowEqual 얕은 비교

  const handleInputChange = (e) => {
    // 뉴스 검색 쿼리
    console.log('handleInputChange => ', e.target.value)
    dispatch(userActions.set_news_query(e.target.value))
  }
  const handleSubmit = useCallback(() => {
    dispatch(userActions.post_auth_jwt(query))
  }, [query])
  const handleInputId = (e) => {
    setId(e.target.value)
  }
  const handleInputPass = (e) => {
    setPass(e.target.value)
  }
  const handleLogin = useCallback(() => {
    console.log('id, pass', id, pass)
  }, [id, pass])
  console.log('news => ', news);
  return (
    <>
      <h1>Hello</h1>
      <form onSubmit={handleLogin}>
        <label>
          ID :
          <input type="text" name="id" onChange={handleInputId} />
        </label>
        <label>
          Pass :
          <input type="text" name="pw" onChange={handleInputPass} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>{id}</p>
      <p>{pass}</p>
        <label>
          URL :
          <input type="text" name="query" onChange={handleInputChange} />
        </label>
      <button onClick={handleSubmit}>
        검색
      </button>
      {
        news.map((item, index) => (
          <NewsCard
            key={index}
            title={item.title}
            link={item.link}
            description={item.description}
          />
        ))
      }
    </>
  )
}

export default App;
