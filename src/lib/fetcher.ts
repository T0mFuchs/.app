export const fetcher = (url: string, method: string) =>
  fetch(url, { method: method }).then((res) => res.json());
