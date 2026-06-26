import { useEffect, useState } from 'react'
import './App.css'
import { LocationInfo } from './components/LocationInfo'



export type LocationApiDataType = {
  data: {
    alets: Array<unknown>
    amenities: Array<unknown>
    css: String
    events: Array<unknown>
    kiosk: Object
    locations: Array<{id: number}>
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
  const [selectedLocationId, setSelectedLocationId] = useState<number>();

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


  const LocationButtonClick = (id: Number) => {
    setSelectedLocationId(id);
  }


  if (!apiData) {
    return <>...Loading initial data</>
  }


  return (
    <>
      <section className='flex flex-col sm:flex-row w-full h-screen'>

        <div className='w-full py-6'>
          <div className='overflow-y-scroll h-full'>
            <div className='flex flex-col gap-6 text-right'>
              {apiData.data.locations.map(location => {
                return (
                  <button 
                    className='rounded p-2 hover:text-blue-400 hover:bg-gray-50'
                    onClick={() => LocationButtonClick(location.id)}
                    >
                      {location?.name}
                    </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className='w-full sm:min-w-md md:min-w-lg lg:min-w-xl flex-1 px-4 sm:px-0'>
          <LocationInfo apiData={apiData} locationId={selectedLocationId} />
        </div>

        <div className="w-full p-4 ">
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
