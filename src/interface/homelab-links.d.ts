export interface IHomelabLinksBase {
  port: number,
  protocol: string,
  domain: string,
}

export interface IHomelabLinksGroupItem {
  lx: string,
  label: string,
  suffix?: string,
  description?: string,
}

export interface IHomelabLinks {
  Base: IHomelabLinksBase,
  Sites: Array<{
    group: string,
    description?: string,
    items: IHomelabLinksGroupItem[]
  }>
}