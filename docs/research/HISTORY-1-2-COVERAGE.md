# History Chapters1–2: source map and implementation

Source: user-uploaded Social Science - History.pdf,48 PDF pages. This batch covers only the first two chapters, printed pp1–12 and13–18, as the user selected. Chapters3–4 in the upload remain outside this batch. The original PDF is not published. The extract does not independently establish an edition year, so History source footers say uploaded extract rather than inventing2026–27metadata.

## Inventory

- Chapter1, The Advent of Europeans to India:23guided checks;52source tasks. Includes all14exercise questions (I1–7,II8–14), the presidency-cities activity, three source-map reading tasks (settlements,physical context,key), nine “Know this” sidebar responses plus BCE/CE notation,23foundation responses and a chapter review.
- Chapter2, The Extension of the British Rule:17guided checks;29source tasks. Includes all9exercise questions (I1–4,II5–9), the strategy-essay activity, Ranjit Singh sidebar,17foundations and chapter review.
- Seven independent written questions per chapter use fresh scenarios and corrected-claim analysis; these are not counted as source exercises. Written responses remain ungraded, with model comparison and criterion-specific self-review. All fill-in prompts are self-contained and include their factual stem.

Coverage includes all named company sections, Marthanda Varma, all three Carnatic wars, succession alignments, Dastaks, Plassey,Buxar,Diwani and dual government; all three Maratha wars, six Subsidiary Alliance conditions, both Sikh conflicts, Ranjit Singh and lapse policy/state list. Mysore wars are introduced where the book introduces them; full teaching belongs to later History Chapter4.

## Historical source handling

Distinguish textbook claims from interpretations rather than grading contested material as certain. Source references and school exercise targets are retained; explanatory qualifications include:

- Existing Asian and Indian Ocean networks preceded Portuguese arrival.1453did not simply end every overland trade route;1498was a new direct Portuguese Cape route, not discovery of an unknown India. Suez opened1869; Cape Agulhas—not Cape of Good Hope—is Africa’s southernmost point.
- Source dates conflict:1613Surat versus p11’s1639Surat (1639fitsMadras); Roe’s mission1615–1619rather than starting1617; Dupleix’s1742governorship versus another passage’s1746. A1628Portuguese company entry is not the date Portuguese first arrived.
- Marthanda Varma concerns Travancore, not Wayanad. Source trading-centre names and administrative-reform claims are discussed. Capital-shift attribution is flagged for verification because official accounts differ; no unsupported exact year is invented.
- The Fort William “Black Hole” narrative and146/123casualty figures are attributed and disputed. Plassey outcomes are explained through alliances,resources and political leverage rather than inherent traits assigned to whole populations. The source indemnity figure is explicitly attributed to the supplied book, not a financial audit.
- Hector Munro commanded at Buxar; Diwani followed in1765. Company revenue authority is distinct from Indian officials carrying out collection and nominal Nawabi administration. Neither a battle nor a revenue grant meant immediate direct administration of all India.
- Bassein’s Peshwa was Baji Rao II, not the text’s “Balaji Rao II.” Salbai did not abolish the confederacy;1818abolished the Peshwa office. Dependence in1846is distinguished from Punjab annexation1849.1857has multiple causes; lapse was one grievance.
- Lapse concerned recognition of succession in dependent states, not a universal prohibition on adoption. Source Udaipur is ambiguous and is not mapped to Mewar by assumption. Awadh is not presented as a lapse annexation.
- Serampore is associated with a Danish trading post; an apparent source D is not silently treated as Dutch. Bassein’s unclear map category is not invented. Text/map company associations can overlap or change over time.

References checked and linked in the application: UCLA MANAS (Black Hole and British India overviews); Cambridge Anglo-Maratha campaigns excerpt; British Library Roe archive records; National Museum of Denmark Serampore history. Kerala government palace/city sources were checked for capital chronology and their differing accounts were preserved as uncertainty. Links are further reading, not endorsement or proof of every sentence.

## Interaction and map provenance

Six explorer contexts: event timeline/date comparison; schematic Cape/Suez route toggle; geographic locator; changing alliance comparison; expansion-method/condition comparison; Bengal authority transitions. Timelines state that event positions are evenly spaced rather than a proportional axis, and chronology alone does not prove causation. Policy switches are explanatory conditions, not a simulation guaranteeing political outcomes.

Chapter1locator includes34settlements from map/prose with approximate coordinates,company filters,aliases,selected-point highlighting and enlarged view. Chapter2uses11political centres rather than recycling the trading-company list. Political-centre points do not depict state extents. Physical context uses Natural Earth110m public-domain admin0country geometry (nvkelso/natural-earth-vector ne_110m_admin_0_countries.geojson). These are present-day geographic reference outlines, explicitly not colonial possessions or historical boundaries. Close settlements overlap at small scale; selectors and enlargement distinguish names. Sailing tracks are topology schematics, not navigation maps. The source map’s river names remain a separate explained physical-context task; no invented river courses are drawn.

## Design lock and integration

Existing NoteStack guided UI is the direct build target: navy/blue/white,DM Sans/Manrope,focused teaching panels. Reuse the Refero-backed Brilliant panel reference b36dc35b-59df-4a85-8927-9a46308575e0,Duolingo screen91791b8a-26e5-4020-b987-6227803a6987and completion flow11811 as documented in REAL-NUMBERS-PILOT.md. Preserve palette roles,native labelled controls,44px targets,enlargement and forgiving check→feedback→continue flow. No new marketing direction.

Decision ledger: book geography→named locator rather than decorative map; changing participants→two-row alliance comparison rather than implied fixed sides; economic/political distinctions→authority table; dates→ordered event selector and gap calculation; disputed claims→collapsible sourced notes; new subject→separate routes,label and local-storage namespace. Shared Maths sketches and drawing pads remain Maths-only. Science laboratory notices remain Science-only. History has written-review copy,without irrelevant exact-expression or laboratory instructions. Home navigation exposes Guided History; index clearly limits availability to History1–2.

## Validation

112unit tests pass, including complete source inventories,writing self-review,study state,timeline ordering,date gaps,map filters,coordinate bounds,policy differences and separation of political centres from company settlements. TypeScript and Cloudflare production build pass. Chromium completes40guided checks,81source responses and14independent responses,including wrong-answer/hint history,recaps,save/reload,coverage links and subject storage isolation. All81opened source solutions and40guide layouts pass320px overflow checks. Feature checks cover route selection,filtered settlement location,enlarged maps,date comparison,alliances,policy conditions and dual-government roles. Existing Maths/Science navigation and storefront mobile layout pass. Map/mobile and Bengal-power desktop screenshots inspected against the existing design lock.
