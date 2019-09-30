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
      'https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json',
    );
    const scene = new Scene({
      id: 'map',
      type: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [120.19382669582967, 30.258134],
      pitch: 0,
      zoom: 1,
    });
    const pointLayer = new PointLayer({});

    // TODO: new GeoJSONSource()
    pointLayer
      .source(await response.json())
      .size('mag', [2, 10])
      .color('mag', [
        '#2E8AE6',
        '#69D1AB',
        '#DAF291',
        '#FFD591',
        '#FF7A45',
        '#CF1D49',
      ]);
    scene.addLayer(pointLayer);
    console.log(pointLayer);
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
