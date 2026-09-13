# Validation and data scope

- Source: user-provided 전국 평화의 소녀상 현장답사 가이드, 2026-09-10, six pages.
- Extracted all 79 table rows; retained names, addresses, directions, remarks and source pages.
- Only entry 34 has a coordinate in the source. Other maps and external links resolve provider search queries, not verified POI identifiers.
- Street view (2026-09-13): one click opens the Naver full panorama viewer. Jongno (guide 1) uses place 32594665 and the panorama/heading obtained from that place's Street View button; its live panorama and place marker were visually verified. Other entries use transient guide-address geocoding (excluding street-only/locality results), or the PDF coordinate for guide 34. Busan guide-address panorama was visually verified; its address is not a verified statue-facing camera position. Sejong's PDF coordinate did not load imagery in the browser check. No claim is made that all 79 statues have coverage or individually verified camera positions. Failed geocoding closes the pending window and shows an error; manual location search remains available.
- Itinerary order is user chosen; segment links open the next stop in Naver Maps search. Visitors select the place, directions and transit, then set the previous stop as origin. Source data lacks coordinates for direct transit deep links. No automatic shortest-path or in-app driving distance claims.
- Records and itinerary are local to this browser and origin. No cross-device synchronization.
- WebMCP select_statue is feature detected; no supported contract validation context was available. Browser interaction and physical-location checks have not been performed.

## Naver prefilled transit (2026-09-10)
- Button resolves both itinerary endpoints transiently via Esri non-stored geocoding, then opens the Naver web transit URL with Web Mercator coordinates and both original statue names.
- No geocoder results are saved to browser storage, the repository, or a database.
- Source-address/approach-point precision applies; not all statue coordinates are surveyed. Low-scoring/locality-only matches abort instead of routing to a city center.
- Seongbuk fountain plaza address supplement: https://sb.newstool.co.kr/view.php?aid=15689&eid=8928 (Dongseomun-dong 2-ga 130-2).
- Naver current public web parser inspected for coordinate format and SIMPLE_POI/transit handling; browser interaction not tested.
