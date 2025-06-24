'use client'

import mapboxgl from "mapbox-gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useEffect, useRef } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map() {

    const mapContainer = useRef(null)
    const mapRef = useRef(null)

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY
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
            })

            map.doubleClickZoom.disable()
            // adds controls for the zoom and compass buttons
            map.addControl(new mapboxgl.NavigationControl())
            // adds control for locate me button
            map.addControl(
                new mapboxgl.GeolocateControl({
                    mapboxgl: mapboxgl,
                    positionOptions: {
                        enableHighAccuracy: true,
                    },
                    trackUserLocation: true,
                })
            )

            map.addControl(
                new MapboxGeocoder({
                    mapboxgl: mapboxgl,
                    accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_KEY!,
                    bbox: [-73.798552, 40.55391, -71.900128, 41.260419],
                }),
                'top-left'
            )

            map.on('load', () => {
                // loads the town data source layer
                map.addSource('town-data', {
                    type: 'geojson',
                    data: './towns-map.json',
                })

                map.addLayer({
                    id: 'towns-fill',
                    type: 'fill',
                    source: 'town-data',
                    paint: {
                        'fill-color': '#2ca060',
                        'fill-opacity': 0.05,
                    },
                })

                map.addLayer({
                    id: 'towns-outline',
                    type: 'line',
                    source: 'town-data',
                    paint: {
                        'line-color': '#165030',
                        'line-width': 2,
                    },
                })
            })

        }

    }, []);



    return (
        <div
            ref={mapContainer}
            className='fixed top-0 right-0 bottom-0 left-0 h-[calc(100vh-50px)] z-1'
        />
    )
}