'use client'

import mapboxgl from "mapbox-gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useEffect, useRef, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import MapPinModal from "./MapPinModal";
import { useSession } from "@/app/context/SessionContext";

export default function Map() {

    const mapContainer = useRef(null)
    const mapRef = useRef(null)

    const [point, setPoint] = useState<any>()
    const [address, setAddress] = useState<any>([])
    const [municipality, setMunicipality] = useState([])

    const [showModal, setShowModal] = useState(false)
    const onClose = () => setShowModal(false)

    const session = useSession();

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY

    // actual map creation
    useEffect(() => {
        if (mapContainer.current) {
            // creates the map, but doesn't load it
            const map = new mapboxgl.Map({
                container: mapContainer.current as HTMLElement,
                style: 'mapbox://styles/mapbox/dark-v11',
                center: [-73.41023123049351, 40.809516255241356],
                zoom: 10,
                minZoom: 5,
                maxZoom: 20,
                maxPitch: 0,
                maxBounds: [
                    [-74.056, 40.535],
                    [-71.85, 41.197],
                ],
            })

            // mouse hover now shows crosshair
            map.getCanvas().style.cursor = 'crosshair';

            // disables double click zoom
            map.doubleClickZoom.disable()

            // adds zoom and compass controls
            map.addControl(new mapboxgl.NavigationControl())

            // adds a current location button
            map.addControl(
                new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true,
                    },
                    trackUserLocation: true,
                })
            )

            // adds search bar to the top left corner of the map
            map.addControl(
                new MapboxGeocoder({
                    // @ts-ignore -- code works fine, TS throws errors, ignore for now
                    mapboxgl: mapboxgl,
                    accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_KEY!,
                    bbox: [-73.798552, 40.55391, -71.900128, 41.260419],
                }),
                'top-left'
            )

            // map is loaded onto the page
            map.on('load', () => {

                fetchDataAndAddToMap(map)


                // loads the town data source layer
                map.addSource('town-data', {
                    type: 'geojson',
                    data: './towns-map.json',
                })

                // visualizes the town area
                map.addLayer({
                    id: 'towns-fill',
                    type: 'fill',
                    source: 'town-data',
                    paint: {
                        'fill-color': '#2ca060',
                        'fill-opacity': 0.05,
                    },
                })

                // visualized the town outlines
                map.addLayer({
                    id: 'towns-outline',
                    type: 'line',
                    source: 'town-data',
                    paint: {
                        'line-color': '#165030',
                        'line-width': 2
                    },
                })

                map.addSource('pin-data', {
                    type: 'geojson',
                    data: { type: 'FeatureCollection', features: [] },
                })

                map.addLayer({
                    id: 'pin-points',
                    type: 'circle',
                    source: 'pin-data',
                    paint: {
                        'circle-radius': {
                            base: 1.75,
                            stops: [
                                [5, 1],
                                [10, 5],
                                [20, 30],
                            ],
                        },
                        'circle-color': [
                            'match',
                            ['get', 'type_num'],
                            1,
                            '#c2410c', // orange for pothole (1)
                            2,
                            '#15803d', // green for tree (2)
                            3,
                            '#eab308', // yellow for broken streetlight (3)
                            4,
                            '#2563eb', // blue for flood (4)
                            '#ccc', // gray for default color
                        ],
                        'circle-stroke-width': 2,
                        'circle-stroke-color': '#ffffff',
                    },
                })

                // changes the cursor to a pointer when the mouse is over the pins
                map.on('mouseenter', 'pin-points', (e: any) => {
                    map.getCanvas().style.cursor = 'pointer'
                })

                // changes the cursor back to the default when the mouse leaves the pins
                map.on('mouseleave', 'pin-points', () => {
                    map.getCanvas().style.cursor = ''
                })

                map.on('click', (e: any) => {
                    const clickedCoords = e.lngLat // stores the lat and long of where the mouse clicks
                    setPoint(clickedCoords)
                    const coordMapFeatures = map.queryRenderedFeatures(e.point) // stores the list of features of where the user clicks

                    // detects whether the user clicks inside town lines and on a road
                    if (coordMapFeatures.length > 0 && coordMapFeatures[0].source === 'pin-data') {
                        // console.log('clicked pin')
                    } else if (
                        // checks whether the user clicked on a road within town bounds
                        coordMapFeatures.length > 1 &&
                        coordMapFeatures[0].source === 'town-data' &&
                        coordMapFeatures[1].sourceLayer === 'road'
                    ) {
                        getAddressFromCoords(clickedCoords.lng, clickedCoords.lat) // geocodes the address point, cleans the address, and then stores it in state
                        if (coordMapFeatures[0].properties && coordMapFeatures[0].properties.name) {
                            setMunicipality(coordMapFeatures[0].properties.name) // stores the municipality of where the mouse clicks
                            setShowModal(true)
                        }
                        // setShowModal(true) // toggles the modal bool to show either modal
                    } else {
                        if (
                            // runs when a click is made outside of town bounds
                            coordMapFeatures.length === 0 ||
                            coordMapFeatures[0].source !== 'town-data'
                        ) {
                            // boundsErrorToast()
                        } else if (
                            // runs when the user doesn't click on a road
                            coordMapFeatures.length > 1 &&
                            coordMapFeatures[1].sourceLayer !== 'road'
                        ) {
                            // pinErrorToast()
                        }
                    }
                })

                const popup = new mapboxgl.Popup({
                    closeButton: true,
                    closeOnClick: true,
                })

                map.on('click', 'pin-points', (e: any) => {
                    // Copy coordinates array.
                    const coordinates = e.features[0].geometry.coordinates.slice()
                    const type_name = e.features[0].properties.type_name
                    const street_name = e.features[0].properties.street_name
                    const town_name = e.features[0].properties.town_name
                    const zipcode = e.features[0].properties.zipcode
                    const municipality = e.features[0].properties.municipality
                    const department = e.features[0].properties.department
                    const phone_number = e.features[0].properties.phone_number

                    console.log(e.features[0])

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
                    }

                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup
                        .setLngLat(coordinates)
                        .setHTML(
                            `<h2 style="text-align: center; font-weight: bold; font-size: 20px; padding: 5px; background-color: #125b49; border-radius: 10px; margin: 5px 10px 10px 10px; color: white">${type_name}</h2>
					        <h3 style="font-size: 16px; text-align: center; padding-bottom: 10px">${street_name}, ${town_name}, ${zipcode}</h3>
					        <h2 style="text-align: center; font-weight: bold; font-size: 20px; padding: 5px; background-color: #125b49; border-radius: 10px; margin: 5px 10px 10px 10px; color: white"">Contact</h2>
					        <h3 style="font-size: 16px; text-align: center; padding-bottom: 10px">${municipality} ${department}</h3>
					        <h3 style="font-size: 16px; text-align: center; font-weight: bold"><u>${phone_number}</u></h3>`
                        )
                        .addTo(map)

                    // center the pin clicked on
                    map.flyTo({
                        center: e.features[0].geometry.coordinates,
                        duration: 1000,
                    })
                })
            })
        }
    }, []);

    async function getAddressFromCoords(longitude: string, latitude: string) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=address&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`

        try {
            const response = await fetch(url)
            const data = await response.json()

            if (data.features && data.features.length > 0) {
                const rawAddress = data.features[0].place_name
                setAddress(cleanAddress(rawAddress))
                setShowModal(true)
            } else {
                console.log('No address data found.')
            }
        } catch (error) {
            console.error('Error fetching geocode data:', error)
        }
    }

    function cleanAddress(rawAddress: any) {
        const components = rawAddress.split(', ')
        const street = components[0].replace(/^\d+\s/, '')
        const town = components[1].trim()
        const zipcodeMatch = components[2].match(/\b\d{5}\b/)
        const zipcode = zipcodeMatch ? zipcodeMatch[0] : ''
        return [street, town, zipcode]
    }

    const fetchDataAndAddToMap = async (map: any) => {
        try {
            const response = await fetch('/api/get-pins', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()

            console.log(data)

            const features = data.map((item: { id: any; latitude: string; longitude: string; issue_type: any; issue_types: { type: any; }; street_name: any; town_name: any; zipcode: any; municipality_name: any; government: { department_name: any; phone_number: any; }; }) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [
                        parseFloat(item.longitude),
                        parseFloat(item.latitude),
                    ],
                },
                properties: {
                    id: item.id,
                    type_num: item.issue_type,
                    // @ts-ignore -- code works completely fine, TS is throwing errors
                    type_name: item.issue_type,
                    street_name: item.street_name,
                    town_name: item.town_name,
                    zipcode: item.zipcode,
                    municipality_name: item.municipality_name,
                    // @ts-ignore -- code works completely fine, TS is throwing errors
                    department_name: item.department_name,
                    // @ts-ignore -- code works completely fine, TS is throwing errors
                    phone_number: item.phone_number,
                },
            }))

            // creates an empty geojson feature collection
            const geojsonData = {
                type: 'FeatureCollection',
                features: features,
            }

            // adds the pins from the point features to the geojson
            if (map.getSource('pin-data')) {
                map.getSource('pin-data').setData(geojsonData)
            }

            // Save the coordinates to localStorage
            // localStorage.setItem('lastPin', JSON.stringify({
            //     longitude: finalData.longitude,
            //     latitude: finalData.latitude
            // }));
            onClose(); // Close the modal before refreshing
            // window.location.reload(); // Refresh the page
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="relative h-[calc(100vh-50px)] w-full">
            <div
                ref={mapContainer}
                className="h-full w-full z-10"
            />

            {showModal && (
                <div className="absolute inset-0 z-50 bg-[#00000077] flex items-center justify-center">
                    {session ? (
                        <MapPinModal
                            point={point}
                            address={address}
                            municipality={municipality}
                            onClose={onClose}
                        />
                    ) : (
                        <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm text-center">
                            <h2 className="text-xl font-bold mb-4">Login Required</h2>
                            <p className="mb-6">You need to be logged in to drop a pin.</p>
                            <button
                                onClick={onClose}
                                className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800 transition"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            )}

        </div>

    )

}