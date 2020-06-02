import React, {useState} from 'react'
import './dashboard.css';
import Createmodule from './createmodule';

export default function Dashboard() {
    const [currentPage, setCurrentPage] = useState();
    const submitForm = (e) => {
        console.log('called');
        e.preventDefault();
        const form = document.getElementById('recordform');
        var forminfo = new FormData(form);
  
        fetch('/api/insert', {body: forminfo, method: 'post'})
        .then(res =>{
            if(res.status === 200){
                console.log("SUCCESS");
                //props.successSubmit();
            }
        })
    }

    return (
        <div className="dashboardcontainer">
            <div className="leftnav">
                <h1>ONBOARD</h1>
                <ul className="leftnavitems">
                    <li>
                        DASHBOARD
                    </li>
                    <li onClick={() => setCurrentPage('create')}>
                        CREATE A MODULE
                    </li>
                    <li>
                        MANAGE A MODULE
                    </li>
                    <li>
                        MANAGE EMPLOYEES
                    </li>
                </ul>
            </div>
            <div className="rightscreenwrapper">
                <div className="topnav">
                    <p>Logout</p>
                    <img src={require("./account_circle-24px.svg")}></img>
                </div>
                {currentPage === 'create' ? <Createmodule /> :
                <>    
                <div className="dashboardview">
                    <h1 className="welcomemessage">
                        Welcome, Dylan!
                    </h1>
                    <div className="availablemodules">
                        <h2>Available Modules</h2>
                        <div>Module1</div>
                        <div>Module2</div>
                        <div>Module3</div>
                        <div>Module4</div>
                        <div>Module5</div>
                        <div>Module6</div>
                        <div>Module7</div>
                        <div>Module8</div>
                    </div>
                    <div className="bottomwrapper">
                        <div className="completedmodules">
                            <p>completed1</p>
                            <p>completed1</p>
                            <p>completed1</p>
                            <p>completed1</p>
                        </div>
                        <div className="statistics">
                            <h2>stats</h2>
                        </div>
                    </div>
                </div>
                </>
                }
            </div>
        </div>
    )
}
