export interface IHomelabLinks {
  Base: {
    port: number,
    protocol: string,
    domain: string,
  },
  Sites: Array<{
    group: string,
    description?: string,
    items: Array<{
      lx: string,
      label: string,
      suffix?: string,
      description?: string,
    }>
  }>
}