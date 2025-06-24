'use client'

import mapboxgl from "mapbox-gl";
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
            });
        }
    }, []);

    return (
        <div
            ref={mapContainer}
            className='fixed top-0 right-0 bottom-0 left-0 h-[calc(100vh-50px)] z-1'
        />
    )
}