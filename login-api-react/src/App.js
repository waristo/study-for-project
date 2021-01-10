import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import MyName from './components/MyName';
import {useState} from 'react'
import axios from 'axios';


const App = () => {
  
  const [mydata, setMyData] = useState([]);
  const [myQuery, setMyQuery] = useState('');

  const _handleSubmit = () => {
    axios.get('/v1/search/news',
                        {params:{query: myQuery}, 
                        headers: { 'X-Naver-Client-Id': 'kSZmYJJptfOqxc32IsIH', 
                        'X-Naver-Client-Secret': 'TAs1DQc46o'} }).then((response) =>{
                          setMyData(response.data.items);
                          console.log(response.data.items)
                        })

  };

  return (
    <div className="App">
          
      <input type="text" onChange={(e) => {setMyQuery(e.target.value)}} />
      <button onClick = {_handleSubmit}>submit</button><br/>
     

      {
        mydata.map((item, index) => {return(
          <Card
          key = {index}
          title={item.title}
          description={item.description}
          pubDate={item.pubDate}
          />);
        })
      }
          </div>
  );

  
}

export default App;