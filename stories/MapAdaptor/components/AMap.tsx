import * as React from 'react';
import { Scene } from '@l7-poc/scene';
import { PointLayer } from '@l7-poc/layers';
import data from './data.json';

export default class AMap extends React.Component {
  public componentDidMount() {
    const scene = new Scene({
      center: [120.19382669582967, 30.258134],
      id: 'map',
      pitch: 0,
      style: 'dark',
      type: 'amap',
      zoom: 1,
      enableMultiPassRenderer: true,
    });
    const pointLayer = new PointLayer();
    pointLayer.source({
      data,
    });
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
