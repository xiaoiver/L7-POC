import { PointLayer } from '@l7-poc/layers';
import { Scene } from '@l7-poc/scene';
import * as dat from 'dat.gui';
import * as React from 'react';

export default class Mapbox extends React.Component {
  private gui: dat.GUI;
  private $stats: Node;

  public componentWillUnmount() {
    if (this.gui) {
      this.gui.destroy();
    }
    if (this.$stats) {
      document.body.removeChild(this.$stats);
    }
  }

  public async componentDidMount() {
    const response = await fetch(
      'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_geography_regions_points.geojson',
    );
    const scene = new Scene({
      id: 'map',
      type: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [120.19382669582967, 30.258134],
      pitch: 0,
      zoom: 1,
    });
    const pointLayer = new PointLayer();

    // TODO: new GeoJSONSource()
    pointLayer.source({
      data: await response.json(),
    });
    scene.addLayer(pointLayer);
    scene.render();

    /*** 运行时修改样式属性 ***/

    const gui = new dat.GUI();
    this.gui = gui;
    const pointFolder = gui.addFolder('Point 样式属性');
    pointFolder
      .addColor(pointLayer.styleOptions, 'pointColor')
      .onChange((pointColor: [number, number, number]) => {
        pointLayer.style({
          pointColor,
        });
        scene.render();
      });

    pointFolder
      .add(pointLayer.styleOptions, 'strokeWidth', 1, 10, 0.1)
      .onChange((strokeWidth: number) => {
        pointLayer.style({
          strokeWidth,
        });
        scene.render();
      });
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
