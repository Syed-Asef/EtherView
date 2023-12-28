import './App.css';
import api from './api';
import React, {useState} from 'react'

function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(-1);
  const [value, setValue] = useState(0);
  const handleChange = (event) => {
    event.preventDefault();
    setAddress(event.target.value);
  }

  const handleClick = async (event) => {
    event.preventDefault();
    if (address != "" && !/\s/g.test(address)){
      const response = await api.get('/address/' + address);
      const data = response.data
      setBalance(data.result);
      const value_find = await api.get('/value/');
      const value_data = value_find.data;
      setValue(value_data.result.ethusd);
      console.log(value_data.result.ethusd)
    } else {
      setBalance(-1)
    }
  }

  return (
    <div className="bg-dark min-vh-100">
      <nav className="navbar navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">EtherView</a>
        </div>
      </nav>
      <div className="input-group ps-2 pe-5 pt-2 pb-4">
        <input type="text" className="form-control text-light bg-dark custom-input" placeholder="Address" aria-label ="Address" aria-describedby="button-addon2" onChange={handleChange}/>
        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleClick}>Search</button>
      </div>
      <div className='ps-2 pe-2'>
        {balance !== -1 && <p className='text-light h3'>Balance: {balance / 1000000000000000000} ETH <br /> Value: ${((balance / 1000000000000000000) * value).toFixed(2)}</p>}
      </div>
    </div>
  );
}

export default App;
