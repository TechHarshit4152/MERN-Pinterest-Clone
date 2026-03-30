import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import API from '../api/axios';



const Home = () => {

  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
  
  const [pins, setpins] = useState([])
  const [page, setpage] = useState(1)

  useEffect(()=> {
    fetchPins()
  }, [])

  const fetchPins = async()=> {
    try {
      const res = await API.get(`/getpins?page=${page}&limit=20`)

      setpins(res.data.pins)
    } catch (err){
      console.log(err)
    }
  }


  return (
    <div className='w-full HomePage lg:columns-5 md:columns-3 sm:columns-2  pt-28 overflow-y-auto px-3 pb-10 gap-3  '>

      {pins.map((pin)=> (
        <Cards  key={pin._id} img={pin.image} title={pin.title} />
      ))}

    </div>
  )
}

export default Home