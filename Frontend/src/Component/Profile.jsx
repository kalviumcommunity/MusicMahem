import data from "../data.json"
import React from 'react'

export default function Profile() {
  return (
    <div>
      {
        data.map((data,index)=>{
            return(
                <>
                <h1 >My Fav Singer</h1>
                    <div className="style" key={index} >
                        <h3> Singer : {data.Singer}</h3>
                        <strong>Song : {data.Song}</strong>
                        <h5>Language : {data.Language}</h5>
                    </div>
                </>
            )
        })
      }
    </div>
  )
}
