'use client'

import mapboxgl from "mapbox-gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useEffect, useRef, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import MapPinModal from "./MapPinModal";
import { useSession } from "@/app/context/SessionContext";
import MapLegend from "./MapLegend";

export default function Map() {

    const mapContainer = useRef<HTMLDivElement | null>(null)
    const mapRef = useRef<mapboxgl.Map | null>(null)

    const [point, setPoint] = useState<any>()
    const [address, setAddress] = useState<any>([])
    const [municipality, setMunicipality] = useState([])

    const [showModal, setShowModal] = useState(false)
    const onClose = () => setShowModal(false)

    const session = useSession();
    const uuid = session?.user?.sub;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY

    // actual map creation
    useEffect(() => {
        if (mapContainer.current) {
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
            });

            mapRef.current = map;

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

                map.on('mouseenter', () => {
                    map.getCanvas().style.cursor = 'crosshair'
                })

                map.on('mousedown', () => {
                    map.getCanvas().style.cursor = 'crosshair'
                })

                map.on('mouseup', () => {
                    map.getCanvas().style.cursor = 'crosshair'
                })

                map.on('mouseout', () => {
                    map.getCanvas().style.cursor = 'crosshair'
                })

                map.on('dragstart', () => {
                    map.getCanvas().style.cursor = 'crosshair'
                })

                map.on('dragend', () => {
                    map.getCanvas().style.cursor = 'crosshair'
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
                            showMapTooltip("Out of bounds.", e.point);
                        } else if (
                            // runs when the user doesn't click on a road
                            coordMapFeatures.length > 1 &&
                            coordMapFeatures[1].sourceLayer !== 'road'
                        ) {
                            // pinErrorToast()
                            showMapTooltip("Pins must be placed on roads", e.point);
                            // console.log(coordMapFeatures)
                            // console.log(e)
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
                    const street = e.features[0].properties.street
                    const town = e.features[0].properties.town
                    const zipcode = e.features[0].properties.zipcode
                    const municipality = e.features[0].properties.municipality
                    const department = e.features[0].properties.department
                    const phone_number = e.features[0].properties.phone_number

                    // console.log(e.features[0])

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
                        .setHTML(`
                            <div style="font-family: sans-serif; padding: 12px; max-width: 260px;">
                                <h2 style="
                                    font-size: 18px;
                                    font-weight: 600;
                                    background-color: #125b49;
                                    color: white;
                                    padding: 8px;
                                    border-radius: 8px;
                                    text-align: center;
                                    margin: 0 0 8px 0;"
                                >
                                    ${type_name}
                                </h2>

                                <p style="font-size: 14px; text-align: center; margin-bottom: 12px;">
                                    ${street}, ${town}, ${zipcode}
                                </p>

                                <div style="
                                    font-size: 16px;
                                    font-weight: 600;
                                    background-color: #125b49;
                                    color: white;
                                    padding: 6px;
                                    border-radius: 6px;
                                    text-align: center;
                                    margin-bottom: 8px;">
                                    Contact
                                </div>

                                <p style="font-size: 14px; text-align: center; margin: 4px 0;">
                                    ${municipality} - ${department}
                                </p>

                                <p style="font-size: 14px; text-align: center; font-weight: bold; text-decoration: underline;">
                                    ${phone_number}
                                </p>
                            </div>
                        `)
                    popup.addTo(map);

                    // Wait for DOM to render, then modify the close button
                    const closeButton = document.querySelector('.mapboxgl-popup-close-button') as HTMLElement;

                    if (closeButton) {
                        closeButton.style.fontSize = '20px'; // default is 14px
                        closeButton.style.fontWeight = 'bold';
                        closeButton.style.color = '#125b49'; // optional
                        closeButton.style.top = '6px'; // optional position tweaks
                        closeButton.style.right = '8px';
                    }
                    // center the pin clicked on
                    map.flyTo({
                        center: e.features[0].geometry.coordinates,
                        duration: 1000,
                    })
                })
            })
        }
    }, []);


    function showMapTooltip(message: string, point: mapboxgl.Point) {
        const existing = document.querySelector('.map-tooltip');
        if (existing) existing.remove();

        const tooltip = document.createElement('div');
        tooltip.className = 'map-tooltip';
        tooltip.textContent = message;

        Object.assign(tooltip.style, {
            position: 'absolute',
            left: `${point.x}px`,
            top: `${point.y}px`,
            transform: 'translate(-50%, -100%)',
            background: 'rgba(180, 30, 30, 0.5)',

            color: 'white',
            padding: '6px 10px',
            borderRadius: '6px',
            fontSize: '13px',
            pointerEvents: 'none',
            zIndex: 1000,
            animation: 'wiggle 0.4s ease, fadeOut 2s 0.4s forwards',
        });

        mapContainer.current?.appendChild(tooltip);

        setTimeout(() => tooltip.remove(), 2000);
    }


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
                // console.log('No address data found.')
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
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            const features = data.map(
                (item: {
                    id: any;
                    latitude: string;
                    longitude: string;
                    issue_type: any;
                    issue_type_name: any;
                    street: any;
                    town: any;
                    zipcode: any;
                    municipality: any;
                    department: any;
                    phone_number: any;
                }) => ({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(item.longitude), parseFloat(item.latitude)],
                    },
                    properties: {
                        id: item.id,
                        type_num: item.issue_type,
                        type_name: item.issue_type_name,
                        street: item.street,
                        town: item.town,
                        zipcode: item.zipcode,
                        municipality: item.municipality,
                        department: item.department,
                        phone_number: item.phone_number,
                    },
                })
            );

            const geojsonData = {
                type: 'FeatureCollection',
                features: features,
            };

            if (map.getSource('pin-data')) {
                map.getSource('pin-data').setData(geojsonData);
            }
        } catch (error) {
            console.error('Error fetching pins:', error);
        }
    };

    return (
        <div className="fixed top-[64px] left-0 right-0 bottom-0 z-0">
            <MapLegend />


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
                            fetchDataAndAddToMap={() => fetchDataAndAddToMap(mapRef.current)} // Pass the function with mapRef
                            uuid={uuid}
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