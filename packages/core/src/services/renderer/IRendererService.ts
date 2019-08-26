export default interface IRendererService {
  init($container: HTMLDivElement): Promise<void>;
  render(): void;
}