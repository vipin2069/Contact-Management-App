import React from "react";
import { useQuery } from "react-query";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface CountryData {
  countryInfo: any;
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  latitude: number;
  longitude: number;
}
const fetchCovidData = async (): Promise<CountryData[]> => {
  const response = await fetch("https://disease.sh/v3/covid-19/countries");
  const data = await response.json();
  return data;
};

const CovidMap: React.FC = () => {
  const { data, isLoading, isError } = useQuery("covidData", fetchCovidData);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <div className="mapPage flex flex-col items-center justify-center gap-4">
        <div className="mapDisplayContent flex flex-col items-center justify-center gap-4">
          <h2 className="m-auto text-2xl font-extrabold tracking-tight text-slate-900">
            Covid Detail map
          </h2>
          <p className="text-sm">
            <strong className="text-grey-400">Note:</strong> MAP that shows the
            country name, total number of active, recovered cases and deaths
          </p>
        </div>
        <div id="map" className="h-screen">
          <MapContainer
            center={[20.5, 78.9]}
            zoom={2}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data?.map((country) => (
              <Marker
                key={country.country}
                position={[country.countryInfo.lat, country.countryInfo.long]}
              >
                <Popup>
                  <div>
                    <div className="mb-2 flex gap-2 items-center">
                      <img
                        className="coutriesFlag"
                        src={country.countryInfo.flag}
                        alt=""
                      />
                      <h3>{country.country}</h3>
                    </div>
                    <p>Active cases: {country.active}</p>
                    <p>Recovered cases: {country.recovered}</p>
                    <p>Deaths: {country.deaths}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default CovidMap;
