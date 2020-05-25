import React, {useState, useRef, useEffect} from 'react';
import './App.css';


function Landingpage() {

return (
  <>
    <div className="background-left">
    <img alt="logo" className="logo" src={require('./logo.png')} />
      <div className="left-content">
        <main className="calltoaction">
          <h1>Dynamic training modules to increase employee success</h1> 
          <p>loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem</p>
          <button>Try it out!</button>
        </main>
      </div>
    </div>
    <div className="background-right">
      <nav className="navigation">
        <ul className="navigationitems">
          <li>Pricing</li>
          <li>About</li>
          <li>Dashboard</li>
          <li>My Account</li>
          <li>face</li>
        </ul>
      </nav>
      <main className="flowchartcontainer">
        <div className="charts">
          <img alt="flowchart" className="flowchart" src={require('./flowchartbigger1.png')} />
          <img alt="flowchart" className="flowchart" src={require('./flowchartbigger2.png')} />
        </div>
      </main>
      <section className="stepscontainer">
        <div className="step stepone">
          <span className="stepcircle"><p>1</p></span>
          <h1>Create a module</h1>
        </div>
        <div className="step steptwo">
          <span className="stepcircle"><p>2</p></span>
          <h1>Create a module</h1>
        </div>
        <div className="step stepthree">
          <span className="stepcircle"><p>3</p></span>
          <h1>Create a module</h1>
        </div>
      </section>
    </div>
  </>
)
}

export default Landingpage;
