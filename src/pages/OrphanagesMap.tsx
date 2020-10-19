import React, { useEffect, useState } from 'react';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import mapMarkerImg from '../images/map-marker.svg'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import '../styles/pages/orphanagesMap.css';
import Leaflet from 'leaflet';
import api from '../services/api';
import Orphanage from './Orphanage';


const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

export default function OrphanagesMap() {

    const [orphanages, setOrphanages] = useState<Orphanage[]>([])


    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
            
        })
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um Orfanato no Mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :)</p>
                </header>

                <footer>
                    <strong>Bertioga</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>

            <Map center={[-23.8267078, -46.1029775]}
                zoom={14}
                style={{ width: '100%', height: '100%' }}>
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {
                    
                    orphanages.map(orphanage => {
                        return (
                            <Marker
                                icon={mapIcon}
                                position={[orphanage.latitude,orphanage.longitude]}
                                key={orphanage.id}
                            >
                                
                                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                    {orphanage.name}
                                    <Link to={`/orphanages/${orphanage.id}`}>
                                        <FiArrowRight size={20} color='#FFF' />
                                    </Link>
                                </Popup>
                            </Marker>)
                    })
                }

            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    );


}