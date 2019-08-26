import * as React from 'react';
import { storiesOf } from '@storybook/react';
// @ts-ignore
import notes from './Map.md';
import AMap from './components/AMap';
import Mapbox from './components/Mapbox';

storiesOf('地图底图测试', module)
  .add('高德地图', () => <AMap />,
  {
    notes: { markdown: notes }
  })
  .add('Mapbox', () => <Mapbox />,
  {
    notes: { markdown: notes }
  });
