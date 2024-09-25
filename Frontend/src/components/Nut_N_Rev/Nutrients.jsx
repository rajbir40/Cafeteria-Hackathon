
import React from 'react'
import Table from './Table'

function Nutrients({item}) {
  return (
    <section>
  <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-24 lg:px-8">
    <div className="max-w-3xl">
      <h2 className="text-3xl font-bold sm:text-4xl">
        {item.item_title}
      </h2>
    </div>

    <div className=" grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full border-2">
        <img
          alt=""
          src={item.item_src}
          className="absolute inset-0 m-auto w-full object-cover"
        />
      </div>

      <div className="lg:py-1">
       <Table/>
      </div>
    </div>
  </div>
</section>
  )
}

export default Nutrients
