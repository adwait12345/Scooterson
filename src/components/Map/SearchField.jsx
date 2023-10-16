import { useMap } from "react-leaflet";
import { GeoSearchControl } from "leaflet-geosearch";
import React, { useEffect } from "react";
import L from "leaflet";
// import "react-leaflet-geosearch/lib/react-leaflet-geosearch.css";
// important to import css for leaflet-geosearch in the html head
// https://github.com/smeijer/leaflet-geosearch/issues/160
{
    /* <link
  rel="stylesheet"
  href="https://unpkg.com/leaflet-geosearch@3.7.0/assets/css/leaflet.css"
  /> */
}

// Get coordinates
// https://react-leaflet.js.org/docs/example-external-state/

const SearchField = (props) => {
    const map = useMap();

    // const searchControl = new GeoSearchControl({
    //   provider: new OpenStreetMapProvider()
    // });

    useEffect(() => {
        const searchControl = new GeoSearchControl({
            provider: props.provider,
            style: "bar",
            marker: {
                icon: new L.icon({
                    iconUrl:
                        "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
                    iconSize: [25, 41],
                    iconAnchor: [10, 41],
                    popupAnchor: [2, -40]
                })
            },
            ...props
        });
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, [map, props]);

    return null;
};
export default SearchField;
