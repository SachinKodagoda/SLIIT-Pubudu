// This will receive an object with target field that is of type HTMLInputElement
export interface IHtmlSelectedElement {
  target: HTMLSelectElement;
}

export interface IHtmlInputElement {
  target: HTMLInputElement;
}

export interface IHtmlVideoElement {
  target: HTMLVideoElement;
}

export interface IHtmlCanvasElement {
  target: HTMLCanvasElement;
}

export interface IHtmlDivElement {
  target: HTMLDivElement;
  current: HTMLDivElement;
}
