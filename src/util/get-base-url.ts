export function getBaseUrl(location: Location) {
  const { protocol, hostname, port } = location;

  if (port === '80' || port === '443') {
    return `${protocol}//${hostname}`;
  }

  return `${protocol}//${hostname}:${port}`;
}
