import { openReverseGeocoder } from "@geolonia/open-reverse-geocoder";
import { Spot } from "pages/api/event/types";

export default async function getSpotPrefCity(spots: Spot[]) {
    for (let s of spots) {
        const geoRes = await openReverseGeocoder([s.longitude, s.latitude]);
        s.prefecture = geoRes.prefecture;
        s.city = geoRes.city;
    }
}
