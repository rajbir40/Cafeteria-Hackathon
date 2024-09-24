import React from 'react'
import Nutrients from './Nutrients'
import Comments from './Comments'



function Info({item}) {

  return (
    <div>
      <Nutrients item={item}/>
      <Comments/>
    </div>
  )
}

export default Info
