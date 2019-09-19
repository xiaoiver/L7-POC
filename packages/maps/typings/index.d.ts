interface Window {
  onLoad: () => void;
}

interface IAMapEvent {
  camera: {
    fov: number;
    near: number;
    far: number;
    height: number;
    pitch: number; 
    rotation: number; 
    aspect: number;
  }
}

interface IAMapInstance {
  on(eventName: string, handler: (event: IAMapEvent) => void): void;
  getZoom(): number;
}

interface IMapboxInstance {
  on(eventName: string, handler: () => void): void;
  getZoom(): number;
  getPitch(): number;
  getBearing(): number;
  getCenter(): any;
  transform: {
    width: number;
    height: number;
  }
}
