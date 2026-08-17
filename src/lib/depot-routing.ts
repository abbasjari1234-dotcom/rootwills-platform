interface DepotCandidate {
  id: string;
  latitude: number;
  longitude: number;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

const EARTH_RADIUS_KM = 6371;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// Haversine great-circle distance in kilometres.
function distanceKm(a: Coordinates, b: Coordinates): number {
  const dLat = toRadians(b.latitude - a.latitude);
  const dLon = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);

  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));

  return EARTH_RADIUS_KM * c;
}

// Geocode a UK postcode via postcodes.io (free, no API key required — swap
// for Google Places / Mapbox if you need address autocomplete too, per the
// brief; postcodes.io is the pragmatic default for postcode-only lookups).
export async function geocodePostcode(postcode: string): Promise<Coordinates> {
  const clean = postcode.trim().replace(/\s+/g, '');
  const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(clean)}`);

  if (!res.ok) {
    throw new Error(`Could not find coordinates for postcode "${postcode}".`);
  }

  const { result } = await res.json();
  return { latitude: result.latitude, longitude: result.longitude };
}

export function findNearestDepot<T extends DepotCandidate>(
  origin: Coordinates,
  depots: T[]
): { depot: T; distanceKm: number } | null {
  if (depots.length === 0) return null;

  let nearest = depots[0];
  let nearestDistance = distanceKm(origin, depots[0]);

  for (const depot of depots.slice(1)) {
    const d = distanceKm(origin, depot);
    if (d < nearestDistance) {
      nearest = depot;
      nearestDistance = d;
    }
  }

  return { depot: nearest, distanceKm: nearestDistance };
}
