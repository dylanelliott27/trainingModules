import React from 'react'

export default function Dashboard() {

  
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
    <>
    <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-danger">Back to main menu</button>
    </div>
    <div className="formwrapper">
        <form id="recordform" className="form" onSubmit={submitForm}>
        </form>
    </div>
    </>
    )
}
