import React from 'react'

export default function extra() {
  return (
    <div>
      
    </div>
  )
}

import React from 'react'

export default function Timetable(props) {
    const ml=()=>{
        if(props.isExpanded){
        if(window.innerWidth < 768){
            return "3rem"
        }
        else{
            return "11.5rem"
        }
    }
else{
        if(window.innerWidth > 768){
            return "3rem"
        }
        else{
            return "3rem"
        }}
    }
  return (
    <div style={{marginLeft:ml()}} className="main-content">
      
      <h1>hdjjd</h1>
    </div>
  )
}