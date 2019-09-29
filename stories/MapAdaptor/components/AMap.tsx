import * as React from 'react';
import { Scene } from '@l7-poc/scene';
import { PointLayer } from '@l7-poc/layers';

export default class AMap extends React.Component {
  public async componentDidMount() {
    const response = await fetch(
      'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_geography_regions_points.geojson',
    );

    const scene = new Scene({
      center: [120.19382669582967, 30.258134],
      id: 'map',
      pitch: 0,
      style: 'dark',
      type: 'amap',
      zoom: 1,
    });
    const pointLayer = new PointLayer({});
    pointLayer.source(await response.json());
    scene.addLayer(pointLayer);
    scene.render();
  }

  public render() {
    return (
      <div
        id="map"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    );
  }
}
