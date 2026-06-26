import { useEffect, useState } from 'react'
import './App.css'



type LocationApiDataType = {
  data: {
    alets: Array<unknown>
    amenities: Array<unknown>
    css: String
    events: Array<unknown>
    kiosk: Object
    locations: Array<unknown>
    schedules: Array<Object>
    screen: Object
    venue: Object
  },
  errors: null | unknown
  meta: {
    version: String
    requestedAt: string
  }
}



function App() {

  const [apiData, setApiData] = useState<null | LocationApiDataType>();
  const [selectedLocation, setSelectedLocation] = useState<null>();

  // Fetch data (runs twice only in dev mode)
  useEffect(() => {
    fetch("https://testapi.io/api/ndenlinger/roveiq").then(data => data.json()).then((json) => {
      setApiData(json as LocationApiDataType);
      console.log(json);
    }).catch(() => {
      console.error("Error fetching API data.");
    })

    return () => {
      setApiData(null);
    }
  }, [])



  if (!apiData) {
    return <>...Loading initial data</>
  }


  return (
    <>
      <section className='flex flex-col sm:flex-row w-full h-screen'>

        <div className='bg-red-100 w-full py-6'>
          <div className='overflow-y-scroll px-6 h-full'>
            <ul className='flex flex-col gap-6 text-right'>
              {apiData.data.locations.map(location => {
                return <li>{location?.name}</li>
              })}
            </ul>
          </div>
        </div>

        <div className='bg-green-100 w-full min-w-md p-4'>
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

        <div className="w-full p-4">
        </div>
      </section>

      {/* <section id="spacer"></section> */}
      {/* <footer className='h-14 w-full flex flex-col justify-center items-center'>
          <p className='text-xs'>
          data last updated: { new Date(apiData?.meta?.requestedAt)?.toString()}
          </p>
      </footer> */}
    </>
  )
}

export default App
