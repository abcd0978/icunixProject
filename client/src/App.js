import axios from 'axios'
import {React ,useState, useEffect} from 'react'

function App() {
  const [getValue, setGetValue] = useState('');//이름의 초기값 설정
  const [postValue, setPostValue] = useState('');

  const handleGChange = (event) => {
    const value = event.target.value;
    setGetValue(value);
  };
  const handlePChange = (event) => {
    const value = event.target.value;
    setPostValue(value);
  };

  function doTheGet(event){
    event.preventDefault();
    //작성해주시면 됩니다.
  }
  function doThePost(event){
    event.preventDefault();
    //작성해주시면 됩니다.
  }

  return (
    <div className="App">
      <form method='post' onSubmit={doThePost}>
        이름 입력: <input type="text" name="name" value={postValue} onChange={handlePChange} />
        <button>
          post전송
        </button>
      </form>
      <br/>
      <br/>
      <br/>
      <form method='get' onSubmit={doTheGet}>
        이름 입력: <input type="text" name="name" value={getValue} onChange={handleGChange}/>
        <button>
          get전송
        </button>
      </form>
    </div>
  );
}

export default App;
