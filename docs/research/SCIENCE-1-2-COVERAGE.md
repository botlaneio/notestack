# Science Chapters 1–2: source map and implementation

Source: user-uploaded **10th English Science Part - 1 2026-27-1-58.pdf** (13,237,211 bytes). Chapter 1 printed pp1–16; Chapter 2 pp17–36. Front-matter contents confirms KTBS Part 1 includes Chapters 1,2,5,6,11,12; the numerical NCERT chapter identifiers are retained. Chapters 5 onward are outside this implementation. No original PDF is deployed. Prompts, explanations and schematic observation diagrams are authored adaptations; source chemical data and references are retained and discrepancies explained.

## Inventory

| Source unit | Guided checks | Numbered activities | In-text parts | End-exercise parts | All source activities | Fresh independent responses |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 Chemical Reactions and Equations | 27 | 11 | 13 | 34 | 67 | 7 |
| 2 Acids, Bases and Salts | 37 | 15 | 19 | 25 | 72 | 7 |

Chapter 1 in-text coverage: p6 Q1,Q2(i–iii),Q3(i–ii); p10 Q1(i–ii),Q2; p13 Q1,Q2,Q3(i–ii). End exercises retain all Q1–20, splitting Q5–8(a–d),Q16(a/b),Q20(a/b). All Activities 1.1–1.11, the unnumbered endothermic activity p10 and the four-beaker group activity p16 are mapped. Foundations include the worked iron/steam and Mg balancing, equation notation and conditions, energy examples, remaining source reaction examples, everyday change and oxidation. Decomposition, combination, displacement, double displacement, precipitation and redox are distinguished; categories can overlap.

Chapter 2 in-text coverage: p18 Q1;p22 Q1–3;p25 Q1–6;p28 Q1–4;p33 Q1–5. End exercises retain Q1–15; Q5(a–d),Q9(a–e) plus concentration order,Q12(a/b),and the two compound-specific portions of Q15 are separate activities. All Activities 2.1–2.15 and both group activities (natural indicator and soda–acid extinguisher model) are mapped. Tables 2.1–2.4 retain all nine indicator samples,ten pH-observation samples,eight naturally occurring acid examples and eight salt-pH samples. The nine-salt formula/family activity is also tabulated. Foundations cover natural/synthetic indicators,oxide reactions,hydronium/OH−/alkalis,pH/strength/concentration,all everyday-pH contexts and sidebars,common salt/chlor-alkali products and source uses,bleaching powder,baking soda/powder,washing soda,crystal water,gypsum and Plaster of Paris.

The app describes reported observations and theoretical models. It does not conduct physical experiments. Unprovided temperatures,pH readings,extract colours and soil optima are not fabricated as observations. The group activity predictions and typical salt/indicator colours are explicitly expectations. Experimental work remains dependent on an appropriately supervised laboratory.

## Scientific/source clarifications

- Exercise 1 Q8(a): printed BaBr2(s) is inconsistent with barium bromide's aqueous solubility. The formal balanced exchange is shown, but no net ionic precipitate is claimed for the all-soluble aqueous mixture.
- Exercise 1 Q1: the intended answer is explained at the level of reactant PbO versus metallic Pb product; reduction of lead centres is separately acknowledged rather than presenting “lead never gets reduced” as universal chemistry.
- Silver bromide decomposition: bromine's phase depends on conditions; it is liquid at ordinary room temperature. Light-induced decomposition is retained without blindly repeating an ambient-gas label.
- Quicklime/slaked-lime whitewashing wording is disambiguated; calcium hydroxide is sparingly soluble.
- Nitric acid is an oxidising-acid exception to a blanket acid–metal hydrogen rule; source Activity 2.3 does not imply all listed acids behave identically.
- Zincate is identified using the source's simplified equation without treating its printed state/formula as a complete account of aqueous speciation.
- Strong/weak means ionisation,concentrated/dilute means amount per volume. The pH ordering exercise uses descriptive solution labels,not proof of intrinsic acid/base strength.
- pH 7 neutrality and the simple [H3O+][OH−] relation use the stated 25°C idealisation. The app's 0–14 lab range is not a universal bound; indicators have transitions,and colourless phenolphthalein does not prove exact neutrality.
- Basic solutions contain some hydronium; distilled water has low rather than absolutely zero conductivity. A dark bulb has a detection threshold.
- Salt solutions need not be neutral; water of crystallisation is a formula-unit ratio,not surface wetness or a physically divided molecule in the hemihydrate.
- Modern lichen description replaces the outdated plant/Thallophyta classification. Natural acid tables are examples,not exclusive mixture compositions.
- Book pH/body/tooth/sting/antacid scenarios are scoped as educational chemistry. No medication,sting treatment,dosing,homemade extinguisher or concentrated-reagent procedure is prescribed. Venom/physiology is not reduced to a single universal pH statement.

## Architecture, accessibility and saved work

Nine new static routes: Science index and two chapters with guided/practice/check/coverage modes. Shared lesson,workbook,coverage and navigation components accept a Science subject while preserving Maths defaults and existing storage keys. Science records use `ns-science-<slug>-...` keys. Written equations and explanations are not automatically graded: students submit,open a model and explicitly self-review each requirement; teacher verification remains pending. Numeric fields check requested quantities or the smallest whole-number coefficients,not general scientific correctness. Independent checks hide models until submission and offer no hints.

Interactive models: conserved atom counting with editable coefficients and fixed formulae; water electrolysis/electrode/volume ratio; pH and indicator transitions; strong monoprotic acid/base reacting-amount neutralisation; all eight source salt-pH relationships; reversible source copper-sulphate hydration observations. Atom counts include parentheses and crystal-water formulae. Diagrams are redrawn schematic observation models,not literal apparatus plans or measurement records. Labels,live results,keyboard controls and horizontally scrolling tables are reused from the existing study system.

## Reference lock and decision ledger

Refero skill applied; build target is the existing NoteStack learning system and the uploaded textbook's scientific structure. Preserve navy #182c42,action blue #3156a1,white/pale-blue surfaces,DM Sans/Manrope,one focused activity,hints and forgiving retries. Existing reference research: Brilliant demonstration stage (style b36dc35b-59df-4a85-8927-9a46308575e0) for manipulable mathematical/scientific models; Duolingo check/feedback/continue (screen 91791b8a-26e5-4020-b987-6227803a6987) for progression. The green Science cover accent stays in subject imagery; do not redefine action colour meanings. Use existing labelled native inputs,buttons,tables,written response and self-review components. Diagrams use meaningful material colours with text labels so colour is not the sole carrier of meaning. No unrelated visual redesign or fabricated AI tutor is introduced.

## Validation

Validation evidence is recorded below after execution.

Local validation: all 65 unit tests passed, including the existing Maths suite. TypeScript and the static/Cloudflare production build passed. Chromium completed all 64 guided checks,139 source activities and14 independent responses,with wrong-answer/hint revision evidence,model/checklist review,save/reload restoration,coverage links and Science storage isolation. Separate interaction checks passed every chemistry tool,invalid coefficient handling,source-table row counts,ungraded draft persistence,all Science study modes at320/390px,homepage navigation at320–1280px,and Maths navigation/legacy storage. Desktop/mobile screenshots were inspected against the existing lesson design. A further opened-solution layout check exposed long-formula overflow at320px; shared study text now permits wrapping within a long token,while tables retain horizontal scrolling. Final checks verify this fix and the updated source reaction models.

Final local checks: the rebuilt version passed all139 opened source solutions at320px without page overflow,the longest guided formulae,the revised four-point nitric-acid model self-review,and the full interaction/mobile/Maths regression checks again. All74 static study routes responded200 (65 Maths and9 Science). Original PDFs are not in the published assets. All65 unit tests and the final production build passed.
