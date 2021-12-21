import React from 'react';
import { DatePicker } from 'antd';
import { Row, Col } from 'antd';
import logo from './logo.svg';
import { Button } from 'antd';
import { useReactMediaRecorder } from "./ReactMediaRecorder";

import ReactPlayer from 'react-player'

import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const RecordView = () => {
  const onStop = (blobUrl: string, blob: Blob): void => {
    console.log(blobUrl, blob)
  }
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ video: true, audio: true, screen: true, onStop });


  const realUrl = "";


  return (
    <div>




      {/* 
      <Row>
        <Col span={24}>
          <form action="http://127.0.0.1:3001/api/upload" encType="multipart/form-data" method="post">
            <div >
              <input type="file" name="blob" />
              <input type="text" placeholder="Number of speakers" name="nspeakers" />
              <input type="submit" value="Get me the stats!" />
            </div>
          </form>
        </Col>
      </Row> */}




      <Row>
        <Col span={24}> <p>{status}</p></Col>
      </Row>
      <Row>
        <Col span={12}><button onClick={startRecording}>Start Recording</button></Col>
        <Col span={12}><button onClick={stopRecording}>Stop Recording</button></Col>
      </Row> <Row>
        <Col span={24}>
          <ReactPlayer url={realUrl} controls={true} />
        </Col>
      </Row>

    </div>
  );
};
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Row>
          <Col span={24}> <RecordView /></Col>
        </Row>
        <Row>
          <Col span={12}><Button type="primary">Primary Button</Button></Col>
          <Col span={12}><DatePicker /></Col>
        </Row>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>



      </header>
    </div>
  );
}

export default App;
