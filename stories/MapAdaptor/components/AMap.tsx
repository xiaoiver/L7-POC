import * as React from 'react';
import { Scene } from '@l7-poc/scene';
import { PointLayer } from '@l7-poc/layers';

export default class AMap extends React.Component {
  componentDidMount() {
    const scene = new Scene({
      id: 'map',
      type: 'amap',
      style: 'dark',
      center: [ 120.19382669582967, 30.258134 ],
      pitch: 0,
      zoom: 1
    });
    const pointLayer = new PointLayer();
    scene.addLayer(pointLayer);
    scene.render();
  }

  render() {
    return <>
      <div id="map" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}></div>
    </>
  }
}