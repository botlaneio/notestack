import type {Chapter} from './maths-chapters.ts';
export const mensurationChapters:Chapter[]=[
  {
    "number": 11,
    "slug": "areas-related-to-circles",
    "title": "Areas Related to Circles",
    "sections": [
      "11.1 Areas of Sector and Segment of a Circle",
      "11.2 Summary"
    ],
    "summary": [
      [
        "Name the region",
        "A sector uses radii; a segment uses a chord. Minor and major regions have different complements."
      ],
      [
        "Scale a full circle",
        "Arc length and sector area use the fraction θ/360 of the circumference and disc area."
      ],
      [
        "Subtract carefully",
        "Minor segment=sector−central triangle; cost and increases require the correct final quantity."
      ]
    ],
    "challenge": "Sketch a segment, mark the central triangle, and find both its minor and major areas without confusing them with sectors.",
    "steps": [
      {
        "id": "c11-boundaries",
        "section": 0,
        "title": "Name the boundary before choosing a formula",
        "intro": "A sector is enclosed by two radii and an arc. A segment is enclosed by a chord and its arc.",
        "simple": "Drawing the chord divides a minor sector into a central triangle and a minor segment.",
        "example": [
          "Drawing the chord divides a minor sector into a central triangle and a minor segment.",
          "Subtracting the triangle turns the sector area into the segment area."
        ],
        "question": "Which region is bounded by a chord and an arc?",
        "options": [
          "Sector",
          "Segment",
          "The whole disc"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. Drawing the chord divides a minor sector into a central triangle and a minor segment.",
          "Correct. Subtracting the triangle turns the sector area into the segment area.",
          "Check the named region, the boundary and the units. Drawing the chord divides a minor sector into a central triangle and a minor segment."
        ],
        "hints": [
          "Drawing the chord divides a minor sector into a central triangle and a minor segment.",
          "Subtracting the triangle turns the sector area into the segment area."
        ],
        "explorer": "sector"
      },
      {
        "id": "c11-minor-major",
        "section": 0,
        "title": "Two arcs, two regions",
        "intro": "A chord usually determines a smaller minor region and a larger major region. Corresponding central angles add to 360°.",
        "simple": "For a 60° minor sector, the major sector angle is 300°.",
        "example": [
          "For a 60° minor sector, the major sector angle is 300°.",
          "At a diameter the two halves are equal semicircles."
        ],
        "question": "What is the major angle paired with 120°?",
        "options": [
          "60°",
          "120°",
          "240°"
        ],
        "correct": 2,
        "feedback": [
          "Check the named region, the boundary and the units. For a 60° minor sector, the major sector angle is 300°.",
          "Check the named region, the boundary and the units. For a 60° minor sector, the major sector angle is 300°.",
          "Correct. At a diameter the two halves are equal semicircles."
        ],
        "hints": [
          "For a 60° minor sector, the major sector angle is 300°.",
          "At a diameter the two halves are equal semicircles."
        ]
      },
      {
        "id": "c11-fraction-turn",
        "section": 0,
        "title": "Use a fraction of a full turn",
        "intro": "The full disc corresponds to 360°. A θ-degree sector gets the fraction θ/360 of its area.",
        "simple": "A60° sector is 1/6 of the disc, so area=(60/360)πr².",
        "example": [
          "A60° sector is 1/6 of the disc, so area=(60/360)πr².",
          "The formula expects degrees; radius must use the same length units as the requested answer."
        ],
        "question": "What fraction of a disc is a 45° sector?",
        "options": [
          "1/4",
          "1/8",
          "1/2"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. A60° sector is 1/6 of the disc, so area=(60/360)πr².",
          "Correct. The formula expects degrees; radius must use the same length units as the requested answer.",
          "Check the named region, the boundary and the units. A60° sector is 1/6 of the disc, so area=(60/360)πr²."
        ],
        "hints": [
          "A60° sector is 1/6 of the disc, so area=(60/360)πr².",
          "The formula expects degrees; radius must use the same length units as the requested answer."
        ]
      },
      {
        "id": "c11-arc-area",
        "section": 0,
        "title": "Arc length and area are different quantities",
        "intro": "An arc is part of the circumference; a sector is part of the disc. Their formulas have different units.",
        "simple": "Arc=(θ/360)2πr, measured in length units.",
        "example": [
          "Arc=(θ/360)2πr, measured in length units.",
          "Sector area=(θ/360)πr², measured in square units."
        ],
        "question": "Which expression gives an area?",
        "options": [
          "(θ/360)2πr",
          "(θ/360)πr²",
          "2 r"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. Arc=(θ/360)2πr, measured in length units.",
          "Correct. Sector area=(θ/360)πr², measured in square units.",
          "Check the named region, the boundary and the units. Arc=(θ/360)2πr, measured in length units."
        ],
        "hints": [
          "Arc=(θ/360)2πr, measured in length units.",
          "Sector area=(θ/360)πr², measured in square units."
        ]
      },
      {
        "id": "c11-sector-perimeter",
        "section": 0,
        "title": "A sector perimeter includes two radii",
        "intro": "The curved arc alone does not surround a sector. Add both straight radius boundaries.",
        "simple": "For r=7 and θ=90°, the arc is 11 using π=22/7.",
        "example": [
          "For r=7 and θ=90°, the arc is 11 using π=22/7.",
          "Perimeter=11+7+7=25 cm."
        ],
        "question": "What must be added to the arc?",
        "options": [
          "πr²",
          "Two radii",
          "One diameter squared"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. For r=7 and θ=90°, the arc is 11 using π=22/7.",
          "Correct. Perimeter=11+7+7=25 cm.",
          "Check the named region, the boundary and the units. For r=7 and θ=90°, the arc is 11 using π=22/7."
        ],
        "hints": [
          "For r=7 and θ=90°, the arc is 11 using π=22/7.",
          "Perimeter=11+7+7=25 cm."
        ]
      },
      {
        "id": "c11-recover-radius",
        "section": 0,
        "title": "Recover r from a circumference",
        "intro": "If circumference is given, first solve 2πr=C. The given length is not automatically the radius.",
        "simple": "For C=22 cm and π=22/7, r=3.5 cm.",
        "example": [
          "For C=22 cm and π=22/7, r=3.5 cm.",
          "A quadrant has 1/4 of the disc area, giving 77/8 cm²."
        ],
        "question": "What is the radius when circumference is 22 cm?",
        "options": [
          "22 cm",
          "7 cm",
          "3.5 cm"
        ],
        "correct": 2,
        "feedback": [
          "Check the named region, the boundary and the units. For C=22 cm and π=22/7, r=3.5 cm.",
          "Check the named region, the boundary and the units. For C=22 cm and π=22/7, r=3.5 cm.",
          "Correct. A quadrant has 1/4 of the disc area, giving 77/8 cm²."
        ],
        "hints": [
          "For C=22 cm and π=22/7, r=3.5 cm.",
          "A quadrant has 1/4 of the disc area, giving 77/8 cm²."
        ]
      },
      {
        "id": "c11-clock",
        "section": 0,
        "title": "Time determines the swept angle",
        "intro": "A minute hand takes 60 minutes for 360°. Its length is the radius of the swept sector.",
        "simple": "Five minutes gives(5/60)×360=30°.",
        "example": [
          "Five minutes gives(5/60)×360=30°.",
          "For a 14 cm hand, area=(30/360)(22/7)14²=154/3 cm²."
        ],
        "question": "What angle does a minute hand sweep in 10 minutes?",
        "options": [
          "10°",
          "60°",
          "90°"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. Five minutes gives(5/60)×360=30°.",
          "Correct. For a 14 cm hand, area=(30/360)(22/7)14²=154/3 cm².",
          "Check the named region, the boundary and the units. Five minutes gives(5/60)×360=30°."
        ],
        "hints": [
          "Five minutes gives(5/60)×360=30°.",
          "For a 14 cm hand, area=(30/360)(22/7)14²=154/3 cm²."
        ]
      },
      {
        "id": "c11-segment90",
        "section": 0,
        "title": "Subtract a right central triangle",
        "intro": "For a 90° central angle, the two radii are perpendicular. The triangle area is r²/2.",
        "simple": "For r=10 and π=3.14, sector area=78.5 and triangle area=50.",
        "example": [
          "For r=10 and π=3.14, sector area=78.5 and triangle area=50.",
          "Minor segment area=78.5−50=28.5 cm²."
        ],
        "question": "Which quantity must be subtracted from sector area?",
        "options": [
          "The central triangle",
          "The whole disc",
          "The arc length"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Minor segment area=78.5−50=28.5 cm².",
          "Check the named region, the boundary and the units. For r=10 and π=3.14, sector area=78.5 and triangle area=50.",
          "Check the named region, the boundary and the units. For r=10 and π=3.14, sector area=78.5 and triangle area=50."
        ],
        "hints": [
          "For r=10 and π=3.14, sector area=78.5 and triangle area=50.",
          "Minor segment area=78.5−50=28.5 cm²."
        ]
      },
      {
        "id": "c11-segment60",
        "section": 0,
        "title": "The 60° triangle is equilateral",
        "intro": "Two radii meet at 60°. With equal radii, the other two triangle angles are also 60°, so its chord has length r.",
        "simple": "The triangle area is(sqrt(3)/4)r².",
        "example": [
          "The triangle area is(sqrt(3)/4)r².",
          "For r=21, minor segment=231−441 sqrt(3)/4 using π=22/7."
        ],
        "question": "What is the central triangle type?",
        "options": [
          "Equilateral",
          "Right-angled",
          "Scalene"
        ],
        "correct": 0,
        "feedback": [
          "Correct. For r=21, minor segment=231−441 sqrt(3)/4 using π=22/7.",
          "Check the named region, the boundary and the units. The triangle area is(sqrt(3)/4)r².",
          "Check the named region, the boundary and the units. The triangle area is(sqrt(3)/4)r²."
        ],
        "hints": [
          "The triangle area is(sqrt(3)/4)r².",
          "For r=21, minor segment=231−441 sqrt(3)/4 using π=22/7."
        ]
      },
      {
        "id": "c11-segment120",
        "section": 0,
        "title": "Use a half-angle for 120°",
        "intro": "A perpendicular from the centre to the chord bisects both the chord and the isosceles central angle.",
        "simple": "Each half-angle is 60°. Altitude=r cos 60°=r/2 and chord=2 r sin 60°=r sqrt(3).",
        "example": [
          "Each half-angle is 60°. Altitude=r cos 60°=r/2 and chord=2 r sin 60°=r sqrt(3).",
          "Triangle area=(1/2)(r/2)(r sqrt(3))=r²sqrt(3)/4."
        ],
        "question": "What is the altitude for radius 12 cm?",
        "options": [
          "12 cm",
          "6 cm",
          "12 sqrt(3) cm"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. Each half-angle is 60°. Altitude=r cos 60°=r/2 and chord=2 r sin 60°=r sqrt(3).",
          "Correct. Triangle area=(1/2)(r/2)(r sqrt(3))=r²sqrt(3)/4.",
          "Check the named region, the boundary and the units. Each half-angle is 60°. Altitude=r cos 60°=r/2 and chord=2 r sin 60°=r sqrt(3)."
        ],
        "hints": [
          "Each half-angle is 60°. Altitude=r cos 60°=r/2 and chord=2 r sin 60°=r sqrt(3).",
          "Triangle area=(1/2)(r/2)(r sqrt(3))=r²sqrt(3)/4."
        ]
      },
      {
        "id": "c11-complements",
        "section": 0,
        "title": "Match the kind of complement",
        "intro": "Major sector=disc−minor sector. Major segment=disc−minor segment. These are different partitions.",
        "simple": "For r=10,θ=90°,π=3.14: major sector=235.5 but major segment=285.5 cm².",
        "example": [
          "For r=10,θ=90°,π=3.14: major sector=235.5 but major segment=285.5 cm².",
          "The major segment also contains the central triangle; do not switch the names."
        ],
        "question": "To find a major segment, subtract which area from the disc?",
        "options": [
          "Minor sector",
          "Minor segment",
          "Central triangle only"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. For r=10,θ=90°,π=3.14: major sector=235.5 but major segment=285.5 cm².",
          "Correct. The major segment also contains the central triangle; do not switch the names.",
          "Check the named region, the boundary and the units. For r=10,θ=90°,π=3.14: major sector=235.5 but major segment=285.5 cm²."
        ],
        "hints": [
          "For r=10,θ=90°,π=3.14: major sector=235.5 but major segment=285.5 cm².",
          "The major segment also contains the central triangle; do not switch the names."
        ]
      },
      {
        "id": "c11-grazing",
        "section": 0,
        "title": "A corner can restrict a circle to a quadrant",
        "intro": "At a right-angled field corner, the horse reaches a quarter-circle if the rope is shorter than both adjacent field sides.",
        "simple": "The 5 m rope in a 15 m square givesπ×5²/4.",
        "example": [
          "The 5 m rope in a 15 m square givesπ×5²/4.",
          "If the rope grows to 10 m, the increase isπ(10²−5²)/4, not the new total area."
        ],
        "question": "Which quantity gives the increase?",
        "options": [
          "New area minus old area",
          "New area only",
          "New radius minus old radius"
        ],
        "correct": 0,
        "feedback": [
          "Correct. If the rope grows to 10 m, the increase isπ(10²−5²)/4, not the new total area.",
          "Check the named region, the boundary and the units. The 5 m rope in a 15 m square givesπ×5²/4.",
          "Check the named region, the boundary and the units. The 5 m rope in a 15 m square givesπ×5²/4."
        ],
        "hints": [
          "The 5 m rope in a 15 m square givesπ×5²/4.",
          "If the rope grows to 10 m, the increase isπ(10²−5²)/4, not the new total area."
        ]
      },
      {
        "id": "c11-brooch",
        "section": 0,
        "title": "Separate wire length from region area",
        "intro": "A brooch can use wire along its rim and internal diameters. Those lengths add; a sector area comes from the disc.",
        "simple": "For diameter 35 mm and 5 diameters, wire length=π×35+5×35=285 mm.",
        "example": [
          "For diameter 35 mm and 5 diameters, wire length=π×35+5×35=285 mm.",
          "Ten equal sectors divide the disc area by 10; they do not divide the wire total into area."
        ],
        "question": "How much length do the 5 diameters contribute?",
        "options": [
          "35 mm",
          "175 mm",
          "110 mm"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. For diameter 35 mm and 5 diameters, wire length=π×35+5×35=285 mm.",
          "Correct. Ten equal sectors divide the disc area by 10; they do not divide the wire total into area.",
          "Check the named region, the boundary and the units. For diameter 35 mm and 5 diameters, wire length=π×35+5×35=285 mm."
        ],
        "hints": [
          "For diameter 35 mm and 5 diameters, wire length=π×35+5×35=285 mm.",
          "Ten equal sectors divide the disc area by 10; they do not divide the wire total into area."
        ]
      },
      {
        "id": "c11-sweeps",
        "section": 0,
        "title": "Add disjoint sweeps only when they do not overlap",
        "intro": "Each wiper cleans a sector. Non-overlap allows their areas to be added directly.",
        "simple": "Two equal sweeps give 2×(115/360)π×25².",
        "example": [
          "Two equal sweeps give 2×(115/360)π×25².",
          "If regions overlapped, adding both would count their overlap twice."
        ],
        "question": "What makes direct addition valid in the book’s wiper problem?",
        "options": [
          "The wipers do not overlap",
          "The angle is 115°",
          "The blades have the same colour"
        ],
        "correct": 0,
        "feedback": [
          "Correct. If regions overlapped, adding both would count their overlap twice.",
          "Check the named region, the boundary and the units. Two equal sweeps give 2×(115/360)π×25².",
          "Check the named region, the boundary and the units. Two equal sweeps give 2×(115/360)π×25²."
        ],
        "hints": [
          "Two equal sweeps give 2×(115/360)π×25².",
          "If regions overlapped, adding both would count their overlap twice."
        ]
      },
      {
        "id": "c11-designs",
        "section": 0,
        "title": "Six designs outside a hexagon",
        "intro": "A regular hexagon inscribed in a circle splits into six equilateral central triangles. The decorative designs lie outside it.",
        "simple": "Design area=disc area−regular hexagon area.",
        "example": [
          "Design area=disc area−regular hexagon area.",
          "For r=28,π=22/7, sqrt(3)=1.7, designs cover 464.8 cm² and cost₹162.68 at₹0.35/cm²."
        ],
        "question": "Which area is charged for the designs?",
        "options": [
          "The whole disc",
          "The hexagon only",
          "The six outer segments"
        ],
        "correct": 2,
        "feedback": [
          "Check the named region, the boundary and the units. Design area=disc area−regular hexagon area.",
          "Check the named region, the boundary and the units. Design area=disc area−regular hexagon area.",
          "Correct. For r=28,π=22/7, sqrt(3)=1.7, designs cover 464.8 cm² and cost₹162.68 at₹0.35/cm²."
        ],
        "hints": [
          "Design area=disc area−regular hexagon area.",
          "For r=28,π=22/7, sqrt(3)=1.7, designs cover 464.8 cm² and cost₹162.68 at₹0.35/cm²."
        ]
      },
      {
        "id": "c11-prescribed-values",
        "section": 0,
        "title": "Follow the stated numerical model",
        "intro": "Use the π and sqrt(3) values specified for that question. Keep intermediate values before final rounding.",
        "simple": "Some exercises useπ=22/7, othersπ=3.14; one explicitly uses sqrt(3)=1.73.",
        "example": [
          "Some exercises useπ=22/7, othersπ=3.14; one explicitly uses sqrt(3)=1.73.",
          "If no square-root approximation is requested, an exact expression such as 231−441 sqrt(3)/4 is appropriate."
        ],
        "question": "What should you do if a question specifiesπ=3.14?",
        "options": [
          "Replace it with 22/7 anyway",
          "Use 3.14 throughout that calculation",
          "Use both values and average"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. Some exercises useπ=22/7, othersπ=3.14; one explicitly uses sqrt(3)=1.73.",
          "Correct. If no square-root approximation is requested, an exact expression such as 231−441 sqrt(3)/4 is appropriate.",
          "Check the named region, the boundary and the units. Some exercises useπ=22/7, othersπ=3.14; one explicitly uses sqrt(3)=1.73."
        ],
        "hints": [
          "Some exercises useπ=22/7, othersπ=3.14; one explicitly uses sqrt(3)=1.73.",
          "If no square-root approximation is requested, an exact expression such as 231−441 sqrt(3)/4 is appropriate."
        ]
      },
      {
        "id": "c11-retrieve",
        "section": 1,
        "title": "Retrieve the two main formulas",
        "intro": "Area and length both scale by the angle fraction, but the full-circle starting quantities differ.",
        "simple": "A full circumference is 2πr; a full disc area isπr².",
        "example": [
          "A full circumference is 2πr; a full disc area isπr².",
          "Use the named quantity and its units to choose the right formula."
        ],
        "question": "What is the area of a semicircle?",
        "options": [
          "πr",
          "πr²/2",
          "2πr"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. A full circumference is 2πr; a full disc area isπr².",
          "Correct. Use the named quantity and its units to choose the right formula.",
          "Check the named region, the boundary and the units. A full circumference is 2πr; a full disc area isπr²."
        ],
        "hints": [
          "A full circumference is 2πr; a full disc area isπr².",
          "Use the named quantity and its units to choose the right formula."
        ]
      },
      {
        "id": "c11-check-interpretation",
        "section": 1,
        "title": "Check what was requested",
        "intro": "The final answer might be a minor region, major region, increase, cost or wire length. Interpret the calculation before finishing.",
        "simple": "An area in mm² cannot be a wire length; a new total is not an increase.",
        "example": [
          "An area in mm² cannot be a wire length; a new total is not an increase.",
          "For segments, check that minor+major equals the disc area."
        ],
        "question": "Which check is valid?",
        "options": [
          "Minor segment+major segment=disc area",
          "Minor sector+minor segment=disc area",
          "Area always equals circumference"
        ],
        "correct": 0,
        "feedback": [
          "Correct. For segments, check that minor+major equals the disc area.",
          "Check the named region, the boundary and the units. An area in mm² cannot be a wire length; a new total is not an increase.",
          "Check the named region, the boundary and the units. An area in mm² cannot be a wire length; a new total is not an increase."
        ],
        "hints": [
          "An area in mm² cannot be a wire length; a new total is not an increase.",
          "For segments, check that minor+major equals the disc area."
        ]
      }
    ]
  },
  {
    "number": 12,
    "slug": "surface-areas-and-volumes",
    "title": "Surface Areas and Volumes",
    "sections": [
      "12.1 Introduction",
      "12.2 Surface Area of a Combination of Solids",
      "12.3 Volume of a Combination of Solids",
      "12.4 Summary"
    ],
    "summary": [
      [
        "Decompose the object",
        "Identify basic solids, common radii, vertical heights and slant heights."
      ],
      [
        "Trace the boundary",
        "Exclude contact faces, include exposed rings and cavity walls, and identify open or grounded faces."
      ],
      [
        "Account for space",
        "Add joined volumes; subtract cavities, obstructions or displaced water; apply units and density."
      ]
    ],
    "challenge": "Explain the exposed boundary of a composite object, calculate its area and volume separately, and justify every added or subtracted part.",
    "steps": [
      {
        "id": "c12-basic-solids",
        "section": 0,
        "title": "Recognise the pieces",
        "intro": "A capsule, a toy or a test tube can combine solids you already know. Start by naming the pieces.",
        "simple": "A capsule combines a cylinder with two hemispherical ends.",
        "example": [
          "A capsule combines a cylinder with two hemispherical ends.",
          "A test tube can be modelled by a cylinder with one hemisphere; a cone-on-hemisphere toy is another combination."
        ],
        "question": "Which describes a capsule?",
        "options": [
          "A cone only",
          "A cylinder and two hemispheres",
          "A cuboid and a pyramid"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. A capsule combines a cylinder with two hemispherical ends.",
          "Correct. A test tube can be modelled by a cylinder with one hemisphere; a cone-on-hemisphere toy is another combination.",
          "Check the named region, the boundary and the units. A capsule combines a cylinder with two hemispherical ends."
        ],
        "hints": [
          "A capsule combines a cylinder with two hemispherical ends.",
          "A test tube can be modelled by a cylinder with one hemisphere; a cone-on-hemisphere toy is another combination."
        ],
        "explorer": "composite"
      },
      {
        "id": "c12-dimensions",
        "section": 0,
        "title": "Radius and vertical height come first",
        "intro": "Convert diameters to radii. Subtract component heights from the total only after naming the pieces.",
        "simple": "A hemisphere of radius r has axial height r, not 2 r.",
        "example": [
          "A hemisphere of radius r has axial height r, not 2 r.",
          "For a 15.5 cm cone-on-hemisphere toy with radius 3.5, cone height=12 cm."
        ],
        "question": "How tall is a hemisphere of radius 3.5 cm?",
        "options": [
          "7 cm",
          "3.5 cm",
          "1.75 cm"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. A hemisphere of radius r has axial height r, not 2 r.",
          "Correct. For a 15.5 cm cone-on-hemisphere toy with radius 3.5, cone height=12 cm.",
          "Check the named region, the boundary and the units. A hemisphere of radius r has axial height r, not 2 r."
        ],
        "hints": [
          "A hemisphere of radius r has axial height r, not 2 r.",
          "For a 15.5 cm cone-on-hemisphere toy with radius 3.5, cone height=12 cm."
        ]
      },
      {
        "id": "c12-hidden-faces",
        "section": 1,
        "title": "Joining hides contact faces",
        "intro": "The exterior surface is the boundary you can reach from outside. A joined face is no longer part of it.",
        "simple": "For a cone joined to a same-radius hemisphere, the two flat discs are hidden.",
        "example": [
          "For a cone joined to a same-radius hemisphere, the two flat discs are hidden.",
          "Exterior area isπrl+2πr², not the sum of their closed total areas."
        ],
        "question": "How many disc faces are excluded at the join?",
        "options": [
          "None",
          "One",
          "Two"
        ],
        "correct": 2,
        "feedback": [
          "Check the named region, the boundary and the units. For a cone joined to a same-radius hemisphere, the two flat discs are hidden.",
          "Check the named region, the boundary and the units. For a cone joined to a same-radius hemisphere, the two flat discs are hidden.",
          "Correct. Exterior area isπrl+2πr², not the sum of their closed total areas."
        ],
        "hints": [
          "For a cone joined to a same-radius hemisphere, the two flat discs are hidden.",
          "Exterior area isπrl+2πr², not the sum of their closed total areas."
        ],
        "explorer": "composite"
      },
      {
        "id": "c12-slant",
        "section": 1,
        "title": "Cone area uses slant height",
        "intro": "A right cone has vertical height h and slant height l=sqrt(r²+h²). Use l in its curved areaπrl.",
        "simple": "For r=3.5, h=12, slant l=12.5 cm.",
        "example": [
          "For r=3.5, h=12, slant l=12.5 cm.",
          "Volume instead uses the vertical height h inπr²h/3."
        ],
        "question": "Which height belongs in curved surface area?",
        "options": [
          "Slant height",
          "Vertical height",
          "Total toy height"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Volume instead uses the vertical height h inπr²h/3.",
          "Check the named region, the boundary and the units. For r=3.5, h=12, slant l=12.5 cm.",
          "Check the named region, the boundary and the units. For r=3.5, h=12, slant l=12.5 cm."
        ],
        "hints": [
          "For r=3.5, h=12, slant l=12.5 cm.",
          "Volume instead uses the vertical height h inπr²h/3."
        ]
      },
      {
        "id": "c12-joined-cubes",
        "section": 1,
        "title": "Two cubes lose a pair of faces",
        "intro": "Joining two cubes of side a along complete faces produces a cuboid 2 a×a×a.",
        "simple": "For a=4, area=2(8×4+8×4+4×4)=160 cm².",
        "example": [
          "For a=4, area=2(8×4+8×4+4×4)=160 cm².",
          "Equivalently subtract two hidden square faces from the sum of both cube areas."
        ],
        "question": "Which calculation works for arbitrary a?",
        "options": [
          "12 a²",
          "12 a²−2 a²",
          "12 a²−a²"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. For a=4, area=2(8×4+8×4+4×4)=160 cm².",
          "Correct. Equivalently subtract two hidden square faces from the sum of both cube areas.",
          "Check the named region, the boundary and the units. For a=4, area=2(8×4+8×4+4×4)=160 cm²."
        ],
        "hints": [
          "For a=4, area=2(8×4+8×4+4×4)=160 cm².",
          "Equivalently subtract two hidden square faces from the sum of both cube areas."
        ]
      },
      {
        "id": "c12-open-vessel",
        "section": 1,
        "title": "An open vessel has no top disc",
        "intro": "For a hollow cylinder mounted on a hollow hemisphere, the inside wall is the two curved surfaces.",
        "simple": "Total height 13 and common radius 7 give cylinder height 6.",
        "example": [
          "Total height 13 and common radius 7 give cylinder height 6.",
          "Inner area=2πr(h+r)=572 cm² using π=22/7."
        ],
        "question": "Should an imaginary lid be added?",
        "options": [
          "Yes",
          "No",
          "Only for inner surface area"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. Total height 13 and common radius 7 give cylinder height 6.",
          "Correct. Inner area=2πr(h+r)=572 cm² using π=22/7.",
          "Check the named region, the boundary and the units. Total height 13 and common radius 7 give cylinder height 6."
        ],
        "hints": [
          "Total height 13 and common radius 7 give cylinder height 6.",
          "Inner area=2πr(h+r)=572 cm² using π=22/7."
        ]
      },
      {
        "id": "c12-cube-cap",
        "section": 1,
        "title": "A hemisphere covers part of a cube face",
        "intro": "A hemisphere attached to a cube removes its base disc from the cube’s exposed top and adds curved hemisphere area.",
        "simple": "For cube edge 7 and maximum cap diameter 7, r=3.5.",
        "example": [
          "For cube edge 7 and maximum cap diameter 7, r=3.5.",
          "Area=6×7²−πr²+2πr²=332.5 cm²."
        ],
        "question": "What remains of the cube’s top face outside the cap?",
        "options": [
          "Nothing at all",
          "The square minus the circular base",
          "A second hemisphere"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. For cube edge 7 and maximum cap diameter 7, r=3.5.",
          "Correct. Area=6×7²−πr²+2πr²=332.5 cm².",
          "Check the named region, the boundary and the units. For cube edge 7 and maximum cap diameter 7, r=3.5."
        ],
        "hints": [
          "For cube edge 7 and maximum cap diameter 7, r=3.5.",
          "Area=6×7²−πr²+2πr²=332.5 cm²."
        ]
      },
      {
        "id": "c12-cavity",
        "section": 1,
        "title": "A cavity creates a new boundary",
        "intro": "Removing a hemisphere removes material, but its curved cavity wall becomes exposed. Surface area need not decrease.",
        "simple": "For cube edge l and depression radius l/2, subtractπ(l/2)² and add 2π(l/2)².",
        "example": [
          "For cube edge l and depression radius l/2, subtractπ(l/2)² and add 2π(l/2)².",
          "The resulting surface is(6+π/4)l²."
        ],
        "question": "Does removed volume guarantee smaller surface area?",
        "options": [
          "Yes",
          "No",
          "Only for cubes"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. For cube edge l and depression radius l/2, subtractπ(l/2)² and add 2π(l/2)².",
          "Correct. The resulting surface is(6+π/4)l².",
          "Check the named region, the boundary and the units. For cube edge l and depression radius l/2, subtractπ(l/2)² and add 2π(l/2)²."
        ],
        "hints": [
          "For cube edge l and depression radius l/2, subtractπ(l/2)² and add 2π(l/2)².",
          "The resulting surface is(6+π/4)l²."
        ]
      },
      {
        "id": "c12-capsule",
        "section": 1,
        "title": "Subtract both rounded ends from total length",
        "intro": "Two hemisphere ends together occupy axial length 2 r. The middle cylinder’s height is the total length minus 2 r.",
        "simple": "For length 14 mm and diameter 5 mm, r=2.5 and cylinder height 9 mm.",
        "example": [
          "For length 14 mm and diameter 5 mm, r=2.5 and cylinder height 9 mm.",
          "Surface=2πrh+4πr²=220 mm²."
        ],
        "question": "What is the straight middle length?",
        "options": [
          "14 mm",
          "9 mm",
          "11.5 mm"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. For length 14 mm and diameter 5 mm, r=2.5 and cylinder height 9 mm.",
          "Correct. Surface=2πrh+4πr²=220 mm².",
          "Check the named region, the boundary and the units. For length 14 mm and diameter 5 mm, r=2.5 and cylinder height 9 mm."
        ],
        "hints": [
          "For length 14 mm and diameter 5 mm, r=2.5 and cylinder height 9 mm.",
          "Surface=2πrh+4πr²=220 mm²."
        ]
      },
      {
        "id": "c12-overhang",
        "section": 1,
        "title": "Unequal bases leave an exposed ring",
        "intro": "A cone wider than its cylinder support has an exposed annular underside. The shared smaller disc alone is hidden.",
        "simple": "In the rocket example, orange area=πrl+πr²−πr′².",
        "example": [
          "In the rocket example, orange area=πrl+πr²−πr′².",
          "The cylinder’s curved wall and its lower base are yellow. Count the exposed lower base once."
        ],
        "question": "Which underside area remains visible?",
        "options": [
          "The whole cone base",
          "π(r²−r′²)",
          "No area whenever solids touch"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. In the rocket example, orange area=πrl+πr²−πr′².",
          "Correct. The cylinder’s curved wall and its lower base are yellow. Count the exposed lower base once.",
          "Check the named region, the boundary and the units. In the rocket example, orange area=πrl+πr²−πr′²."
        ],
        "hints": [
          "In the rocket example, orange area=πrl+πr²−πr′².",
          "The cylinder’s curved wall and its lower base are yellow. Count the exposed lower base once."
        ]
      },
      {
        "id": "c12-tent",
        "section": 1,
        "title": "Canvas follows exposed curved faces",
        "intro": "The tent’s cone-cylinder join is internal, and the book explicitly excludes canvas on the floor.",
        "simple": "For r=2, h=2.1, l=2.8, canvas=2πrh+πrl=44 m².",
        "example": [
          "For r=2, h=2.1, l=2.8, canvas=2πrh+πrl=44 m².",
          "At₹500/m² the cost is₹22000."
        ],
        "question": "What is excluded from the canvas calculation?",
        "options": [
          "Both the internal disc and the floor",
          "The conical roof",
          "The cylinder’s side"
        ],
        "correct": 0,
        "feedback": [
          "Correct. At₹500/m² the cost is₹22000.",
          "Check the named region, the boundary and the units. For r=2, h=2.1, l=2.8, canvas=2πrh+πrl=44 m².",
          "Check the named region, the boundary and the units. For r=2, h=2.1, l=2.8, canvas=2πrh+πrl=44 m²."
        ],
        "hints": [
          "For r=2, h=2.1, l=2.8, canvas=2πrh+πrl=44 m².",
          "At₹500/m² the cost is₹22000."
        ]
      },
      {
        "id": "c12-conical-hole",
        "section": 1,
        "title": "Trace every face after hollowing",
        "intro": "A conical cavity in a cylinder exposes its conical wall while leaving the cylinder side and the lower circular base.",
        "simple": "For r=0.7, h=2.4, l=2.5, area=2πrh+πrl+πr²=17.6 cm².",
        "example": [
          "For r=0.7, h=2.4, l=2.5, area=2πrh+πrl+πr²=17.6 cm².",
          "Rounded to the nearest cm² this is 18."
        ],
        "question": "Which flat face remains in this model?",
        "options": [
          "The lower circular base",
          "A full top lid over the cavity",
          "Both full end discs"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Rounded to the nearest cm² this is 18.",
          "Check the named region, the boundary and the units. For r=0.7, h=2.4, l=2.5, area=2πrh+πrl+πr²=17.6 cm².",
          "Check the named region, the boundary and the units. For r=0.7, h=2.4, l=2.5, area=2πrh+πrl+πr²=17.6 cm²."
        ],
        "hints": [
          "For r=0.7, h=2.4, l=2.5, area=2πrh+πrl+πr²=17.6 cm².",
          "Rounded to the nearest cm² this is 18."
        ]
      },
      {
        "id": "c12-volume-adds",
        "section": 2,
        "title": "Volume adds when solid pieces join",
        "intro": "Touching interfaces have area but no thickness. They do not require a volume subtraction.",
        "simple": "Cone-on-hemisphere volume=πr²h/3+2πr³/3.",
        "example": [
          "Cone-on-hemisphere volume=πr²h/3+2πr³/3.",
          "For r=h=1 this isπ cm³; the coefficient ofπ is 1."
        ],
        "question": "What volume should be subtracted for a shared flat interface?",
        "options": [
          "πr²",
          "None",
          "Twiceπr²"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. Cone-on-hemisphere volume=πr²h/3+2πr³/3.",
          "Correct. For r=h=1 this isπ cm³; the coefficient ofπ is 1.",
          "Check the named region, the boundary and the units. Cone-on-hemisphere volume=πr²h/3+2πr³/3."
        ],
        "hints": [
          "Cone-on-hemisphere volume=πr²h/3+2πr³/3.",
          "For r=h=1 this isπ cm³; the coefficient ofπ is 1."
        ]
      },
      {
        "id": "c12-cone-ends",
        "section": 2,
        "title": "Remove both cone heights from total length",
        "intro": "A cylinder with two cone ends has cylindrical height=total length−first cone height−second cone height.",
        "simple": "For total 12 and each cone 2, the cylinder height is 8 cm.",
        "example": [
          "For total 12 and each cone 2, the cylinder height is 8 cm.",
          "With radius 1.5, total volume=21π=66 cm³."
        ],
        "question": "What cylinder height should be used?",
        "options": [
          "12 cm",
          "10 cm",
          "8 cm"
        ],
        "correct": 2,
        "feedback": [
          "Check the named region, the boundary and the units. For total 12 and each cone 2, the cylinder height is 8 cm.",
          "Check the named region, the boundary and the units. For total 12 and each cone 2, the cylinder height is 8 cm.",
          "Correct. With radius 1.5, total volume=21π=66 cm³."
        ],
        "hints": [
          "For total 12 and each cone 2, the cylinder height is 8 cm.",
          "With radius 1.5, total volume=21π=66 cm³."
        ]
      },
      {
        "id": "c12-percentage",
        "section": 2,
        "title": "Apply the percentage to total volume",
        "intro": "For sweets with two hemisphere ends, first compute cylinder plus sphere volume, then multiply by count and syrup fraction.",
        "simple": "For length 5 and diameter 2.8, cylinder height=2.2 cm.",
        "example": [
          "For length 5 and diameter 2.8, cylinder height=2.2 cm.",
          "Syrup in 45 sweets=45×0.30×one-sweet volume≈338 cm³."
        ],
        "question": "What does 30%mean as a multiplier?",
        "options": [
          "30",
          "0.30",
          "1.30"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. For length 5 and diameter 2.8, cylinder height=2.2 cm.",
          "Correct. Syrup in 45 sweets=45×0.30×one-sweet volume≈338 cm³.",
          "Check the named region, the boundary and the units. For length 5 and diameter 2.8, cylinder height=2.2 cm."
        ],
        "hints": [
          "For length 5 and diameter 2.8, cylinder height=2.2 cm.",
          "Syrup in 45 sweets=45×0.30×one-sweet volume≈338 cm³."
        ]
      },
      {
        "id": "c12-subtraction",
        "section": 2,
        "title": "Subtract all removed cavities",
        "intro": "A wooden pen stand retains its cuboid volume minus the volumes of all conical holes.",
        "simple": "There are 4 holes, so subtract 4×πr²h/3, not one cone only.",
        "example": [
          "There are 4 holes, so subtract 4×πr²h/3, not one cone only.",
          "For the book’s dimensions, remaining wood is 7853/15≈523.53 cm³."
        ],
        "question": "Which height enters the cone volume?",
        "options": [
          "Its depth, measured vertically",
          "Its slant length",
          "The entire cuboid length"
        ],
        "correct": 0,
        "feedback": [
          "Correct. For the book’s dimensions, remaining wood is 7853/15≈523.53 cm³.",
          "Check the named region, the boundary and the units. There are 4 holes, so subtract 4×πr²h/3, not one cone only.",
          "Check the named region, the boundary and the units. There are 4 holes, so subtract 4×πr²h/3, not one cone only."
        ],
        "hints": [
          "There are 4 holes, so subtract 4×πr²h/3, not one cone only.",
          "For the book’s dimensions, remaining wood is 7853/15≈523.53 cm³."
        ]
      },
      {
        "id": "c12-displacement",
        "section": 2,
        "title": "Submerged solids displace their volume",
        "intro": "In a brim-full vessel, a fully submerged solid makes an equal volume of water spill out.",
        "simple": "One-quarter of a 200π/3 cone capacity is 50π/3.",
        "example": [
          "One-quarter of a 200π/3 cone capacity is 50π/3.",
          "Divide by theπ/6 volume of each lead shot to obtain 100 shots."
        ],
        "question": "What does the spilled water volume equal?",
        "options": [
          "The total submerged shot volume",
          "The exposed surface area",
          "The full cone capacity in every case"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Divide by theπ/6 volume of each lead shot to obtain 100 shots.",
          "Check the named region, the boundary and the units. One-quarter of a 200π/3 cone capacity is 50π/3.",
          "Check the named region, the boundary and the units. One-quarter of a 200π/3 cone capacity is 50π/3."
        ],
        "hints": [
          "One-quarter of a 200π/3 cone capacity is 50π/3.",
          "Divide by theπ/6 volume of each lead shot to obtain 100 shots."
        ]
      },
      {
        "id": "c12-density",
        "section": 2,
        "title": "Density converts volume to mass",
        "intro": "Use mass=density×volume with compatible units. Convert grams to kilograms only after multiplying.",
        "simple": "For density 8 g/cm³, a volume V cm³ has mass 8 V g.",
        "example": [
          "For density 8 g/cm³, a volume V cm³ has mass 8 V g.",
          "Divide the gram result by 1000 to obtain kilograms."
        ],
        "question": "What converts 892262.4 g to kg?",
        "options": [
          "Multiply by 1000",
          "Divide by 1000",
          "Divide by 100"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. For density 8 g/cm³, a volume V cm³ has mass 8 V g.",
          "Correct. Divide the gram result by 1000 to obtain kilograms.",
          "Check the named region, the boundary and the units. For density 8 g/cm³, a volume V cm³ has mass 8 V g."
        ],
        "hints": [
          "For density 8 g/cm³, a volume V cm³ has mass 8 V g.",
          "Divide the gram result by 1000 to obtain kilograms."
        ]
      },
      {
        "id": "c12-water-left",
        "section": 2,
        "title": "Inserted volume is not water remaining",
        "intro": "A full vessel loses water equal to a fitting, fully submerged solid’s volume. Remaining water is capacity minus that displaced amount.",
        "simple": "Cylinder capacity 648000π minus toy volume 288000π leaves 360000π cm³.",
        "example": [
          "Cylinder capacity 648000π minus toy volume 288000π leaves 360000π cm³.",
          "Check the total toy height 120+60=180 matches the vessel height."
        ],
        "question": "Which calculation gives water left?",
        "options": [
          "Capacity+solid volume",
          "Solid volume only",
          "Capacity−solid volume"
        ],
        "correct": 2,
        "feedback": [
          "Check the named region, the boundary and the units. Cylinder capacity 648000π minus toy volume 288000π leaves 360000π cm³.",
          "Check the named region, the boundary and the units. Cylinder capacity 648000π minus toy volume 288000π leaves 360000π cm³.",
          "Correct. Check the total toy height 120+60=180 matches the vessel height."
        ],
        "hints": [
          "Cylinder capacity 648000π minus toy volume 288000π leaves 360000π cm³.",
          "Check the total toy height 120+60=180 matches the vessel height."
        ]
      },
      {
        "id": "c12-capacity",
        "section": 2,
        "title": "Use inside dimensions for capacity",
        "intro": "A vessel’s available space is computed using its inside dimensions. A neck adds space; a raised solid bottom subtracts it.",
        "simple": "The sphere-plus-neck model in Exercise 12.2 8 gives 346.51 cm³ using π=3.14.",
        "example": [
          "The sphere-plus-neck model in Exercise 12.2 8 gives 346.51 cm³ using π=3.14.",
          "A glass with a raised hemispherical bottom holds less than its apparent full cylindrical capacity."
        ],
        "question": "Which measurements describe capacity?",
        "options": [
          "Outside dimensions regardless of thickness",
          "Inside dimensions",
          "Only the surface coating thickness"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. The sphere-plus-neck model in Exercise 12.2 8 gives 346.51 cm³ using π=3.14.",
          "Correct. A glass with a raised hemispherical bottom holds less than its apparent full cylindrical capacity.",
          "Check the named region, the boundary and the units. The sphere-plus-neck model in Exercise 12.2 8 gives 346.51 cm³ using π=3.14."
        ],
        "hints": [
          "The sphere-plus-neck model in Exercise 12.2 8 gives 346.51 cm³ using π=3.14.",
          "A glass with a raised hemispherical bottom holds less than its apparent full cylindrical capacity."
        ]
      },
      {
        "id": "c12-units",
        "section": 3,
        "title": "Square and cubic conversions differ",
        "intro": "Area and volume scale with different powers of the length conversion.",
        "simple": "1 m²=10000 cm²;1 m³=1000000 cm³.",
        "example": [
          "1 m²=10000 cm²;1 m³=1000000 cm³.",
          "1 cm³=1 mL and 1000 cm³=1 L."
        ],
        "question": "How many cm³ are in 1 m³?",
        "options": [
          "100",
          "10000",
          "1000000"
        ],
        "correct": 2,
        "feedback": [
          "Check the named region, the boundary and the units. 1 m²=10000 cm²;1 m³=1000000 cm³.",
          "Check the named region, the boundary and the units. 1 m²=10000 cm²;1 m³=1000000 cm³.",
          "Correct. 1 cm³=1 mL and 1000 cm³=1 L."
        ],
        "hints": [
          "1 m²=10000 cm²;1 m³=1000000 cm³.",
          "1 cm³=1 mL and 1000 cm³=1 L."
        ]
      },
      {
        "id": "c12-audit",
        "section": 3,
        "title": "Explain the operation before calculating",
        "intro": "For each component, identify whether it contributes a boundary area, material volume, empty capacity, or displacement.",
        "simple": "A joining disc is excluded from exterior area but no volume is lost by joining.",
        "example": [
          "A joining disc is excluded from exterior area but no volume is lost by joining.",
          "A cavity adds curved boundary while its volume is removed. State the requested quantity, units and rounding."
        ],
        "question": "Which statement is correct?",
        "options": [
          "Area and volume always subtract the same terms",
          "Boundary and space require separate accounting",
          "Every hollow object has zero surface area"
        ],
        "correct": 1,
        "feedback": [
          "Check the named region, the boundary and the units. A joining disc is excluded from exterior area but no volume is lost by joining.",
          "Correct. A cavity adds curved boundary while its volume is removed. State the requested quantity, units and rounding.",
          "Check the named region, the boundary and the units. A joining disc is excluded from exterior area but no volume is lost by joining."
        ],
        "hints": [
          "A joining disc is excluded from exterior area but no volume is lost by joining.",
          "A cavity adds curved boundary while its volume is removed. State the requested quantity, units and rounding."
        ]
      }
    ]
  }
];
