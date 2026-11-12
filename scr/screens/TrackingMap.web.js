
import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from 'react-leaflet';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const PIZZARIA = [-23.1857, -46.8978];
const CLIENTE = [-23.1935, -46.8845];

const pizzariaIcon = L.divIcon({
  className: 'map-marker',
  html: '<div style="font-size:30px">🍕</div>',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const clienteIcon = L.divIcon({
  className: 'map-marker',
  html: '<div style="font-size:30px">🏠</div>',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const entregadorIcon = L.divIcon({
  className: 'map-marker',
  html: '<div style="font-size:34px">🛵</div>',
  iconSize: [42, 42],
  iconAnchor: [21, 21],
});

function AjustarMapa() {
  const map = useMap();

  useEffect(() => {
    map.fitBounds([PIZZARIA, CLIENTE], {
      padding: [45, 45],
    });
  }, [map]);

  return null;
}

export default function TrackingMap({ onProgress }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((current) => Math.min(current + 0.003, 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const entregador = [
    PIZZARIA[0] + (CLIENTE[0] - PIZZARIA[0]) * progress,
    PIZZARIA[1] + (CLIENTE[1] - PIZZARIA[1]) * progress,
  ];

  useEffect(() => {
    onProgress?.(progress);
  }, [progress, onProgress]);

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 350 }}>
      <MapContainer
        center={PIZZARIA}
        zoom={15}
        scrollWheelZoom
        style={{
          width: '100%',
          height: '100%',
          minHeight: 350,
          borderRadius: 15,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <AjustarMapa />

        <Marker position={PIZZARIA} icon={pizzariaIcon}>
          <Popup>D'Lucas Delivery - Pizzaria</Popup>
        </Marker>

        <Marker position={CLIENTE} icon={clienteIcon}>
          <Popup>Endereço de entrega</Popup>
        </Marker>

        <Polyline
          positions={[PIZZARIA, CLIENTE]}
          pathOptions={{
            color: '#999999',
            weight: 5,
            dashArray: '8 8',
          }}
        />

        <Polyline
          positions={[PIZZARIA, entregador]}
          pathOptions={{
            color: '#FF6600',
            weight: 6,
          }}
        />

        <Marker position={entregador} icon={entregadorIcon}>
          <Popup>
            {progress >= 1 ? 'Entrega concluída!' : 'Entregador a caminho!'}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
