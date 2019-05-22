import React from 'react';
import Slider from "./components/slider";

function sliderItemExample(props,uniqueKey) {
    return (
        <div key={uniqueKey} className="exampleSliderItem">
            <div>{props.title}</div>
            <div>{props.description}</div>
            <img src={props.avatar} alt=""/>
        </div>
    );
}


function App() {
  return (
    <div className="App">
      <Slider url="http://localhost:4000/list"
              theme="light"
              itemsRenderer={[sliderItemExample]}
              showItems="1"
              maxFadeItems="2"
      />
    </div>
  );
}

export default App;
