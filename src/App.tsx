import { useEffect, useState } from 'react';
import './App.css';
import { LocationInfo } from './components/LocationInfo';
import { AdPanel } from './components/AdPanel';
import clsx from 'clsx';

export type LocationApiDataType = {
  data: {
    alets: Array<unknown>;
    amenities: Array<unknown>;
    css: string;
    events: Array<unknown>;
    kiosk: object;
    locations: Array<{ id: number }>;
    schedules: Array<object>;
    screen: object;
    venue: object;
  };
  errors: null | unknown;
  meta: {
    version: string;
    requestedAt: string;
  };
};

function App() {
  const [apiData, setApiData] = useState<null | LocationApiDataType>();
  const [selectedLocationId, setSelectedLocationId] = useState<number>();

  // Fetch data (runs twice only in dev mode)
  useEffect(() => {
    fetch('https://testapi.io/api/ndenlinger/roveiq')
      .then((data) => data.json())
      .then((json) => {
        setApiData(json as LocationApiDataType);
        console.log(json);
      })
      .catch(() => {
        console.error('Error fetching API data.');
      });

    return () => {
      setApiData(null);
    };
  }, []);

  const LocationButtonClick = (id: number) => {
    setSelectedLocationId(id);
  };

  if (!apiData) {
    return <>...Loading initial data</>;
  }

  return (
    <>
      <section className="flex flex-col sm:flex-row w-full h-screen">
        <div className="w-full py-6">
          <div className="block sm:hidden">
            <select
              value={selectedLocationId}
              onChange={(e) => {
                setSelectedLocationId(Number(e.target.value));
              }}
            >
              {apiData.data.locations.map((location) => {
                return (
                  <option
                    key={location?.id}
                    className="rounded p-2 hover:text-blue-400 hover:bg-gray-50 hover:cursor-pointer"
                    value={location.id}
                  >
                    {location?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="hidden sm:block overflow-y-scroll h-full">
            <div className="flex flex-col gap-6 text-right">
              {apiData.data.locations.map((location) => {
                return (
                  <button
                    key={location?.id}
                    className={clsx(
                      'rounded p-2 hover:text-blue-400 hover:bg-gray-50 hover:cursor-pointer',
                      selectedLocationId == location.id ? 'bg-teal-100' : 'bg-white',
                    )}
                    onClick={() => LocationButtonClick(location.id)}
                  >
                    {location?.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full sm:min-w-md md:min-w-lg lg:min-w-xl flex-1 px-4 sm:px-0">
          <LocationInfo apiData={apiData} locationId={selectedLocationId} />
        </div>

        <div className="w-full h-full p-4 sm:px-1 sm:py-0 bg-gray-50 sm:ml-6 flex flex-col">
          <div className="mt-5">
            <p className="text-xs pb-1">Ads:</p>
            <AdPanel adData={apiData?.data?.schedules} />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
