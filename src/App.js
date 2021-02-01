import React, {useState} from 'react';
import QrReader from 'react-qr-reader';
import JsonInfo from './JsonInfo.js';
import './App.css';
/* class App extends Component {
  state = {
    result: 'No result',
    qrResponse:{}
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data,
        qrResponse:JSON.parse(data)
      })
      console.log(data.CageId);
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '60%' }}
        />
        <p>{this.state.result}</p>
        <p>{this.state.qrResponse.CageId}</p>
      
      </div>
    )
  }
} */
/* export default function App(){

  const handleScan = (data) => {
      console.log(data);

      alert("Got scan: " + data);
  }

  const handleError = (error) => {
      console.log("Error: ", error);
  }

  return <QrReader delay={500} onScan={handleScan} onError={handleError}></QrReader>
  
} */

export default function App(){
  const [qrValue, setQrValue] = useState({});

  //const hello = 'Hello World';

  const handleScan = (data) => {
    if (data) {
      setQrValue(JSON.parse(data));
 
      doSomethingWithCage(JSON.parse(data).CageId);
    }
  };
 
  const handleError = (error) => {
    console.log("Error: ", error);
  };
 
  const doSomethingWithCage = (cageId) => {
    alert("I did something with cage: " + cageId);
    
  };
 
  return (
    <>
      <QrReader
        delay={500}
        onScan={handleScan}
        onError={handleError}
        style={{width:'50%', height:'50%'}}
      ></QrReader>
      <p>{JSON.stringify(qrValue)}</p>
      <p>CageId: {qrValue.CageId}</p>
      <JsonInfo data={qrValue.CageId}/>
    </>
  );
};