import { useEffect, useState } from 'react'
import './App.css'

function App() {


  const apiData = useState();

  // Fetch data (runs twice only in dev mode)
  useEffect(() => {

  }, [])


  return (
    <>
      <section className='flex flex-col sm:flex-row w-full'>

        <div className='h-screen bg-red-100 w-full p-4'>
          <div className='overflow-y-scroll'>
          </div>
        </div>

        <div className='h-screen bg-green-100 w-full min-w-md p-4'>
          <div className="flex flex-col bg-green-200 gap-4">
            
            <div className='flex-1 min-h-32'>
              selected Location image
              <img src="" />
            </div>

            <div className='flex w-full justify-between mb-12'>
              <p>
                Selection Logo image
              </p>
              <p>
                Location name
              </p>
            </div>

            <div className=''>
              location other data
            </div>
          </div>
        </div>

        <div className="h-screen w-full p-4">
        </div>

      </section>
      <section id="spacer"></section>
    </>
  )
}

export default App
