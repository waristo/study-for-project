import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const Home = () => {
  const [url, setUrl] = useState(null);

  const onChange = (e) => {
    setUrl(e.target.value)
  }

  const onClick = () => {
    axios.put('http://127.0.0.1:8000/xss/', {url : url});
  }

  return (
    <div>
      <h1>홈</h1>
      <TextField id="standard-search" label="URL" type="search" onChange={onChange} value={url}/>
      <Button variant="contained" onClick={onClick}>Search</Button>
      {/*<div>*/}
      {/*  <b>url: {url}</b>*/}
      {/*</div>*/}
    </div>
  );
};

export default Home;
