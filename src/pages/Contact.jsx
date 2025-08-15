import React from 'react'
export default function Contact(){
  return (
    <div style={{padding:'2rem'}}> 
      <h2 className='text-3xl font-bold mb-4'>Contact & Location</h2>
      <p>Email: <a href='mailto:strom2k25@licet.ac.in' className='text-cyan-300'>strom2k25@licet.ac.in</a></p>
      <p>Phone: +91 93611 76702 (Sanjeev Kumar)</p>
      <div style={{marginTop:12}}>
        <iframe title='map' src='https://www.google.com/maps?q=Loyola+ICAM+College+of+Engineering+and+Technology&z=15&output=embed' style={{width:'100%',height:320,border:0,borderRadius:8}} />
      </div>
    </div>
  )
}