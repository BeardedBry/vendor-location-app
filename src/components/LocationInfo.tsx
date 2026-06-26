import type { LocationApiDataType } from '../App';

type LocationInfoProps = {
  apiData: LocationApiDataType;
  locationId: number;
};

export const LocationInfo = ({ apiData, locationId }: LocationInfoProps) => {
  const selectedLocation = apiData.data.locations.find((locations) => locations.id == locationId);

  if (!selectedLocation) {
    return (
      <div className="h-full w-full flex py-24 justify-center bg-gray-100">
        Select a valid location
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="min-h-32">
        <img
          src={selectedLocation?.banner_img}
          className="w-full"
          alt={`image of ${selectedLocation?.name}`}
        />
      </div>

      <div className="flex w-full justify-between p-4 items-center">
        <span>
          <img src={selectedLocation?.logo_img} className="max-h-20" alt={selectedLocation?.name} />
        </span>
        <span>
          <h3 className="text-xl">{selectedLocation?.name}</h3>
        </span>
      </div>

      <div className="text-left text-lg mb-16 pl-2">
        <p>{selectedLocation?.description}</p>
      </div>

      <div className="text-left border-t pt-4">
        <h4 className="font-semibold">Other Info</h4>

        <dl className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <div>
              <dt>Address:</dt>
              <dd>
                <div>{selectedLocation?.address1}</div>
                <div>
                  {selectedLocation?.city}, {selectedLocation?.zip}
                </div>
                <div>
                  <a href={`tel:${selectedLocation?.phone}`} className="text-blue-600">
                    {selectedLocation?.phone}
                  </a>
                </div>
              </dd>
            </div>
            <div>
              <dt>Hours:</dt>
              <dd>
                <div className="text-wrap max-w-40">{selectedLocation?.hours}</div>
              </dd>
            </div>
          </div>
          <div>
            <dt>Socials</dt>
            <dd>
              <a
                target="_blank"
                href={selectedLocation.url}
                className="hover:text-blue-300 text-blue-500 visited:text-purple-400"
              >
                {selectedLocation?.url}
              </a>
            </dd>
            <dd>
              <a
                target="_blank"
                href={selectedLocation.facebook_url}
                className="hover:text-blue-300 text-blue-500 visited:text-purple-400"
              >
                {selectedLocation?.facebook_url}
              </a>
            </dd>
            <dd>
              <a
                target="_blank"
                href={selectedLocation.instagram_url}
                className="hover:text-blue-300 text-blue-500 visited:text-purple-400"
              >
                {selectedLocation?.instagram_url}
              </a>
            </dd>
            <dd>
              <a
                target="_blank"
                href={selectedLocation.twitter_url}
                className="hover:text-blue-300 text-blue-500 visited:text-purple-400"
              >
                {selectedLocation?.twitter_url}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
