export function dateFromObjectId(id: string): Date {
  return new Date(parseInt(id.substring(0, 8), 16) * 1000);
}
