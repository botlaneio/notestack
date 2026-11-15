import type {Chapter} from './maths-chapters.ts';
export const geometryChapters: Chapter[] = [
  {
    "number": 6,
    "slug": "triangles",
    "title": "Triangles",
    "sections": [
      "6.1 Introduction",
      "6.2 Similar Figures",
      "6.3 Similarity of Triangles",
      "6.4 Criteria for Similarity of Triangles",
      "6.5 Summary"
    ],
    "summary": [
      [
        "Similar versus congruent",
        "Similar figures have the same shape; congruent figures also have the same size."
      ],
      [
        "Correspondence matters",
        "Write matching vertices in order, then compare matching sides and angles."
      ],
      [
        "Basic Proportionality Theorem",
        "A line parallel to one side divides the other two sides in the same ratio; the converse also holds."
      ],
      [
        "Similarity criteria",
        "Use AA/AAA, SSS or SAS with the included angle to justify similarity, then use proportional sides."
      ]
    ],
    "challenge": "In triangle ABC, D lies on AB and E on AC with DE parallel to BC. If AD = 4, DB = 6 and AE = 6, find EC and explain why triangles ADE and ABC are similar.",
    "steps": [
      {
        "id": "shape",
        "section": 0,
        "title": "Same shape, a different size",
        "intro": "An enlarged photograph changes size while keeping its shape. Similar figures work the same way. Congruent figures have both the same shape and the same size.",
        "simple": "Similarity allows a consistent enlargement or reduction. Congruence allows no size change.",
        "example": [
          "Two circles of different radii are similar.",
          "Two triangles with corresponding sides 3, 4, 5 and 6, 8, 10 are similar but not congruent."
        ],
        "question": "Which statement is always true?",
        "options": [
          "Congruent figures are similar",
          "Similar figures are always congruent",
          "Any two triangles are similar"
        ],
        "correct": 0,
        "feedback": [
          "Yes. Congruent figures have scale factor 1, so they are also similar.",
          "Similarity allows different sizes, so the converse is false.",
          "Triangles can have different shapes and angles."
        ],
        "hints": [
          "Congruence includes both shape and size.",
          "Similarity only requires the same shape."
        ]
      },
      {
        "id": "polygons",
        "section": 1,
        "title": "Check shape, not just appearance",
        "intro": "Two polygons with the same number of sides are similar when corresponding angles are equal and corresponding sides are proportional. For general polygons, both conditions matter.",
        "simple": "Matching angles alone may stretch a figure; proportional sides alone may still let its angles change.",
        "example": [
          "A 2 × 3 rectangle and a 4 × 6 rectangle are similar.",
          "A 2 × 3 rectangle and a 4 × 8 rectangle have equal angles but different side ratios."
        ],
        "question": "Are rectangles measuring 3 × 5 and 6 × 10 similar?",
        "options": [
          "No, because their sizes differ",
          "Yes, their angles match and side ratios are both 1:2",
          "Yes, because any two rectangles are similar"
        ],
        "correct": 1,
        "feedback": [
          "Different size is allowed for similar figures.",
          "Correct. 3/6 = 5/10, and all corresponding angles are right angles.",
          "Rectangles can have different length-to-width ratios; equal angles alone are not enough."
        ],
        "hints": [
          "Compare 3/6 with 5/10.",
          "Both ratios equal 1/2, and the angles are equal."
        ]
      },
      {
        "id": "correspondence",
        "section": 1,
        "title": "The vertex order tells you what matches",
        "intro": "Writing ΔABC ∼ ΔPQR means A ↔ P, B ↔ Q and C ↔ R. Therefore AB/PQ = BC/QR = AC/PR, and matching angles are equal.",
        "simple": "Read both triangle names in the same order. Never mix a side with the wrong partner.",
        "example": [
          "ΔABC ∼ ΔPQR gives AB ↔ PQ and AC ↔ PR.",
          "If AB = 4 and PQ = 6, the scale factor from ABC to PQR is 6/4 = 1.5."
        ],
        "question": "If ΔABC ∼ ΔPQR, which side corresponds to BC?",
        "options": [
          "PR",
          "PQ",
          "QR"
        ],
        "correct": 2,
        "feedback": [
          "PR corresponds to AC, not BC.",
          "PQ corresponds to AB.",
          "Yes. B ↔ Q and C ↔ R, so BC ↔ QR."
        ],
        "hints": [
          "Match the endpoints one at a time.",
          "The second and third vertices are paired."
        ]
      },
      {
        "id": "bpt",
        "section": 2,
        "title": "A parallel line keeps the split in balance",
        "intro": "In ΔABC, let D lie on AB and E on AC. If DE ∥ BC, the Basic Proportionality Theorem gives AD/DB = AE/EC. Move the parallel segment below and compare the two splits.",
        "simple": "A line parallel to the base cuts the other two sides in the same proportion. Compare the upper part with the lower part on each side.",
        "example": [
          "If AD = 2, DB = 3 and AE = 4, then 2/3 = 4/EC.",
          "Cross-multiplying gives EC = 6."
        ],
        "question": "When DE ∥ BC, which equality is guaranteed?",
        "options": [
          "AD/DB = AE/EC",
          "AD/DB = EC/AE",
          "AD = DB"
        ],
        "correct": 0,
        "feedback": [
          "Correct. The matching upper-to-lower ratios are equal.",
          "The ratio on the second side is reversed. Use the same order on both sides.",
          "A parallel cut need not pass through the midpoints."
        ],
        "hints": [
          "Compare top part to bottom part on both sides.",
          "AD matches AE; DB matches EC."
        ],
        "explorer": "triangle"
      },
      {
        "id": "bpt-length",
        "section": 2,
        "title": "Keep parts and whole sides separate",
        "intro": "In a BPT calculation, AD/DB compares two parts of AB. The ratio AD/AB is a part-to-whole ratio. Both can be useful, but do not mix their partners.",
        "simple": "First decide whether you are comparing part to part or part to whole. Keep that choice consistent.",
        "example": [
          "AD = 3 and DB = 2 imply AB = 5.",
          "If DE ∥ BC, then AD/DB = AE/EC and AD/AB = AE/AC."
        ],
        "question": "DE ∥ BC, AD = 4, DB = 6 and AE = 6. What is EC?",
        "options": [
          "4",
          "9",
          "15"
        ],
        "correct": 1,
        "feedback": [
          "Use 4/6 = 6/EC; 4 would not satisfy it.",
          "Yes. 4EC = 36, so EC = 9.",
          "15 is the whole AC = 6 + 9, not EC."
        ],
        "hints": [
          "AD/DB = AE/EC gives 4/6 = 6/EC.",
          "Cross-multiply: 4EC = 36."
        ]
      },
      {
        "id": "converse",
        "section": 2,
        "title": "Use the split to prove parallel lines",
        "intro": "The converse of BPT says: if a line divides two sides of a triangle in the same ratio, it is parallel to the third side. D and E must lie on the relevant sides.",
        "simple": "Equal side splits let you conclude parallelism. A drawing that looks parallel is not a proof.",
        "example": [
          "AD = 2, DB = 3, AE = 4 and EC = 6.",
          "AD/DB = 2/3 = 4/6 = AE/EC, so DE ∥ BC."
        ],
        "question": "D lies on AB and E on AC. If AD = 3, DB = 5, AE = 6 and EC = 10, what follows?",
        "options": [
          "DE ∥ BC by the converse of BPT",
          "DE is perpendicular to BC",
          "No conclusion is possible"
        ],
        "correct": 0,
        "feedback": [
          "Correct. 3/5 = 6/10, so the converse applies.",
          "Equal split ratios establish parallelism, not perpendicularity.",
          "The equal ratios provide exactly the needed information."
        ],
        "hints": [
          "Compare 3/5 and 6/10.",
          "They are equal, so use the converse."
        ]
      },
      {
        "id": "proof",
        "section": 2,
        "title": "Why does the proportionality work?",
        "intro": "For DE ∥ BC, triangles BDE and CDE have the same base DE and equal heights, so their areas are equal. Area ratios with a shared altitude then connect the side splits.",
        "simple": "The proof compares areas in two ways. Equal-area triangles connect the two sides of the big triangle.",
        "example": [
          "ar(ADE)/ar(BDE) = AD/DB: these triangles share the altitude from E to AB.",
          "ar(ADE)/ar(CDE) = AE/EC: these triangles share the altitude from D to AC.",
          "Since ar(BDE) = ar(CDE), the two ratios are equal."
        ],
        "question": "Why are ar(BDE) and ar(CDE) equal when DE ∥ BC?",
        "options": [
          "All triangles have equal areas",
          "They have the same base DE and equal heights between parallel lines",
          "Their sides must all be equal"
        ],
        "correct": 1,
        "feedback": [
          "Triangle areas depend on their bases and heights.",
          "Exactly. Equal base and equal height give equal areas.",
          "Equal areas do not require all corresponding sides to be equal."
        ],
        "hints": [
          "Use area = 1/2 × base × height.",
          "B and C lie on a line parallel to DE."
        ]
      },
      {
        "id": "aa",
        "section": 3,
        "title": "Two matching angles are enough",
        "intro": "If two angles of one triangle equal two angles of another, the third angles also match because triangle angles sum to 180°. This is AA similarity; checking all three is AAA.",
        "simple": "Two angle matches force the same triangular shape, even when the sizes differ.",
        "example": [
          "A triangle with angles 40°, 60°, 80° is similar to another with those angles.",
          "The corresponding angles tell you the correct vertex order."
        ],
        "question": "One triangle has angles 50° and 60°. Another has angles 60° and 70°. Are they similar?",
        "options": [
          "No, none of their angles match",
          "Yes, by AA: both have angles 50°, 60°, 70°",
          "Only if their side lengths are equal"
        ],
        "correct": 1,
        "feedback": [
          "Use the angle sum to find the missing angles.",
          "Correct. The missing angles are 70° and 50°.",
          "Equal lengths are needed for congruence, not similarity."
        ],
        "hints": [
          "Find each third angle using 180°.",
          "Both angle sets become 50°, 60°, 70°."
        ]
      },
      {
        "id": "sss",
        "section": 3,
        "title": "Three side ratios tell the same story",
        "intro": "SSS similarity requires all three corresponding side ratios to be equal. Use a consistent correspondence, such as smallest to smallest, middle to middle and largest to largest.",
        "simple": "Every side must scale by the same factor. One or two matching ratios are not enough for SSS.",
        "example": [
          "3/6 = 4/8 = 5/10 = 1/2.",
          "Triangles with sides 3, 4, 5 and 6, 8, 10 are similar."
        ],
        "question": "Are triangles with sides 4, 5, 6 and 8, 10, 12 similar?",
        "options": [
          "Yes, by SSS similarity",
          "No, because no angles are given",
          "Yes, by SSS congruence"
        ],
        "correct": 0,
        "feedback": [
          "Yes. All three corresponding side ratios are 1/2.",
          "SSS similarity does not require angles to be supplied separately.",
          "The corresponding lengths are unequal, so this is similarity rather than congruence."
        ],
        "hints": [
          "Compare 4/8, 5/10 and 6/12.",
          "All ratios equal 1/2."
        ]
      },
      {
        "id": "sas",
        "section": 3,
        "title": "The angle must sit between the sides",
        "intro": "SAS similarity needs two proportional side pairs and an equal included angle: the angle formed by those two sides. An unrelated angle is not enough for this criterion.",
        "simple": "The given angle must be the hinge joining the two sides you compare.",
        "example": [
          "AB/DE = AC/DF = 1/2 and ∠A = ∠D.",
          "Since ∠A is between AB and AC, the triangles are similar by SAS."
        ],
        "question": "AB/DE = AC/DF = 2/3. Which extra information completes SAS similarity?",
        "options": [
          "∠B = ∠E",
          "∠A = ∠D",
          "BC = EF"
        ],
        "correct": 1,
        "feedback": [
          "Those are not the angles included between the specified side pairs.",
          "Correct. These angles lie between the compared sides.",
          "One more side equality alone does not establish the required equal ratios or included angle."
        ],
        "hints": [
          "AB and AC meet at A. DE and DF meet at D.",
          "Use the angles at those meeting vertices."
        ]
      },
      {
        "id": "missing-side",
        "section": 3,
        "title": "Use similarity to find a missing length",
        "intro": "Once similarity is justified, matching sides share one scale factor. Write a proportion before calculating.",
        "simple": "State the matching sides first; then multiply by the same enlargement factor.",
        "example": [
          "ΔABC ∼ ΔPQR, AB = 6 and PQ = 9.",
          "The enlargement factor is 9/6 = 1.5.",
          "If BC = 8, then QR = 8 × 1.5 = 12."
        ],
        "question": "ΔABC ∼ ΔPQR. AB = 5, PQ = 15 and AC = 7. Find PR.",
        "options": [
          "7",
          "12",
          "21"
        ],
        "correct": 2,
        "feedback": [
          "The second triangle is three times as large in corresponding lengths.",
          "Additive differences are not the similarity rule; use a ratio.",
          "Yes. PR/AC = PQ/AB = 3, so PR = 21."
        ],
        "hints": [
          "Find the factor 15/5.",
          "Multiply 7 by 3."
        ]
      },
      {
        "id": "shadows",
        "section": 3,
        "title": "Use a shared sun angle",
        "intro": "On level ground, vertical objects and their shadows form right triangles. With the same sun angle, these triangles are similar by AA. Height-to-shadow ratios are equal.",
        "simple": "Compare heights with heights and shadows with shadows. Both measurements must use the same units.",
        "example": [
          "A 1.5 m pole casts a 2 m shadow while a tree casts an 8 m shadow.",
          "Tree height / 8 = 1.5 / 2, so tree height = 6 m."
        ],
        "question": "At the same time, a 2 m pole has a 3 m shadow. A tree has a 12 m shadow. Find its height.",
        "options": [
          "8 m",
          "18 m",
          "6 m"
        ],
        "correct": 0,
        "feedback": [
          "Correct. h/12 = 2/3 gives h = 8 m.",
          "The height-to-shadow ratio is 2/3, not 3/2.",
          "The shadow is four times as long, so the height is four times 2 m."
        ],
        "hints": [
          "Use h/12 = 2/3.",
          "Multiply both sides by 12."
        ]
      },
      {
        "id": "exit-bpt",
        "section": 4,
        "title": "Your turn: find the cut",
        "intro": "State the theorem and keep the ratio order consistent.",
        "simple": "A parallel cut gives equal upper-to-lower side ratios.",
        "example": [],
        "question": "DE ∥ BC, AD = 5, DB = 3 and EC = 6. What is AE?",
        "options": [
          "10",
          "3.6",
          "8"
        ],
        "correct": 0,
        "feedback": [
          "Yes. 5/3 = AE/6 gives AE = 10.",
          "That reverses one of the ratios.",
          "Use the proportion rather than adding the side lengths."
        ],
        "hints": [
          "AD/DB = AE/EC.",
          "AE = 6 × 5/3."
        ]
      },
      {
        "id": "exit-criterion",
        "section": 4,
        "title": "Your turn: justify the shape match",
        "intro": "Choose the criterion supported by the actual information.",
        "simple": "Two equal angle pairs establish similarity.",
        "example": [],
        "question": "Two triangles have corresponding angles 35° and 90°. Which criterion establishes similarity?",
        "options": [
          "SAS",
          "AA",
          "SSS congruence"
        ],
        "correct": 1,
        "feedback": [
          "SAS requires two side ratios and their included angle.",
          "Correct. The two angle pairs are enough.",
          "No side lengths are given, and similarity does not imply congruence."
        ],
        "hints": [
          "The given information concerns two angles.",
          "Use AA similarity."
        ]
      },
      {
        "id": "exit-ratio",
        "section": 4,
        "title": "Your turn: use corresponding sides",
        "intro": "Write the correspondence before using the scale factor.",
        "simple": "For ΔABC ∼ ΔDEF, A ↔ D, B ↔ E and C ↔ F.",
        "example": [],
        "question": "ΔABC ∼ ΔDEF. AB = 8, DE = 12 and EF = 15. What is BC?",
        "options": [
          "22.5",
          "10",
          "19"
        ],
        "correct": 1,
        "feedback": [
          "This scales in the wrong direction; ABC is the smaller triangle.",
          "Correct. BC/15 = 8/12, so BC = 10.",
          "Similarity uses multiplication by a scale factor, not addition."
        ],
        "hints": [
          "BC corresponds to EF.",
          "BC = 15 × 8/12."
        ]
      }
    ]
  },
  {
    "number": 7,
    "slug": "coordinate-geometry",
    "title": "Coordinate Geometry",
    "sections": [
      "7.1 Introduction",
      "7.2 Distance Formula",
      "7.3 Section Formula",
      "7.4 Summary"
    ],
    "summary": [
      [
        "Coordinates",
        "Read (x, y) in that order. Signs locate the point relative to the axes."
      ],
      [
        "Distance",
        "PQ = √[(x₂ − x₁)² + (y₂ − y₁)²]; the result is never negative."
      ],
      [
        "Internal division",
        "If AP:PB = m:n, P = ((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n))."
      ],
      [
        "Midpoint",
        "Average the endpoint coordinates. The midpoint is the section-formula case m = n."
      ]
    ],
    "challenge": "For A(−2, 1) and B(6, 7), find AB, the midpoint, and the point dividing AB internally in the ratio 1:3. Check which endpoint the division point is nearer.",
    "steps": [
      {
        "id": "coordinates",
        "section": 0,
        "title": "A point needs two directions",
        "intro": "In (x, y), x gives horizontal position and y gives vertical position. Positive x is right, positive y is up. Distances and units must use a consistent scale on the coordinate axes.",
        "simple": "Read across first, then up or down. The order and signs both matter.",
        "example": [
          "(3, −2) is 3 units right and 2 units down from the origin.",
          "(0, 4) is on the y-axis."
        ],
        "question": "Where is P(−4, 3) relative to the origin?",
        "options": [
          "4 right, 3 down",
          "4 left, 3 up",
          "3 left, 4 up"
        ],
        "correct": 1,
        "feedback": [
          "Both directions have been reversed.",
          "Correct. Negative x means left; positive y means up.",
          "The first coordinate is horizontal, not vertical."
        ],
        "hints": [
          "x = −4 and y = 3.",
          "Move left 4, then up 3."
        ]
      },
      {
        "id": "distance",
        "section": 1,
        "title": "Turn the gap into a right triangle",
        "intro": "Between P(x₁, y₁) and Q(x₂, y₂), the horizontal and vertical changes are x₂ − x₁ and y₂ − y₁. Pythagoras gives PQ = √[(x₂ − x₁)² + (y₂ − y₁)²]. Move the point B in the explorer below to see the changes.",
        "simple": "The straight-line distance is the hypotenuse of a right triangle built from the horizontal and vertical gaps.",
        "example": [
          "P(1, 2), Q(4, 6): changes are 3 and 4.",
          "PQ = √(3² + 4²) = √25 = 5 units."
        ],
        "question": "Find the distance from (0, 0) to (3, 4).",
        "options": [
          "7",
          "1",
          "5"
        ],
        "correct": 2,
        "feedback": [
          "7 adds the two perpendicular gaps; it is not the straight-line distance.",
          "Subtracting the gaps is not the distance formula.",
          "Yes. √(9 + 16) = 5."
        ],
        "hints": [
          "Use √[(3 − 0)² + (4 − 0)²].",
          "The squared distance is 25."
        ],
        "explorer": "coordinate"
      },
      {
        "id": "signs",
        "section": 1,
        "title": "Subtract first, then square",
        "intro": "Negative coordinates do not make distances negative. Put each coordinate difference in parentheses before squaring. Reversing the endpoints gives the same squared distance.",
        "simple": "A leftward or downward change may be negative. Squaring removes its sign before the two squares are added.",
        "example": [
          "A(−2, 1), B(2, 4): x change = 4, y change = 3.",
          "AB = √(4² + 3²) = 5."
        ],
        "question": "What is the distance between (−3, −2) and (1, 1)?",
        "options": [
          "−5",
          "5",
          "7"
        ],
        "correct": 1,
        "feedback": [
          "A distance cannot be negative.",
          "Correct. The coordinate differences are 4 and 3, giving distance 5.",
          "4 + 3 describes the two-leg path, not the straight segment."
        ],
        "hints": [
          "1 − (−3) = 4 and 1 − (−2) = 3.",
          "Compute √(16 + 9)."
        ]
      },
      {
        "id": "axis-origin",
        "section": 1,
        "title": "Sometimes one gap is zero",
        "intro": "For points on the same horizontal or vertical line, one squared difference is zero. From the origin O(0, 0), the distance to P(x, y) is √(x² + y²).",
        "simple": "If the y-values match, only the horizontal gap matters. If the x-values match, only the vertical gap matters.",
        "example": [
          "Distance from (2, 5) to (8, 5) is |8 − 2| = 6.",
          "Distance from the origin to (−5, 12) is √(25 + 144) = 13."
        ],
        "question": "Find the distance between (−2, 3) and (−2, −5).",
        "options": [
          "−8",
          "2",
          "8"
        ],
        "correct": 2,
        "feedback": [
          "Distance is the non-negative size of the gap.",
          "The x-gap is 0, but the y-gap is 8.",
          "Yes. |−5 − 3| = 8."
        ],
        "hints": [
          "Both points have x = −2.",
          "Only the vertical difference remains."
        ]
      },
      {
        "id": "triangle-type",
        "section": 1,
        "title": "Let lengths describe the triangle",
        "intro": "Compute side lengths or squared lengths to test triangle properties. Equal sides suggest isosceles; three equal sides give equilateral; a² + b² = c² identifies a right angle opposite the longest side.",
        "simple": "Squared lengths often let you compare sides without working out square roots.",
        "example": [
          "A(0, 0), B(4, 0), C(0, 3).",
          "AB² = 16, AC² = 9, BC² = 25.",
          "16 + 9 = 25, so the triangle is right-angled at A."
        ],
        "question": "For A(0, 0), B(6, 0), C(0, 8), what is BC?",
        "options": [
          "10",
          "14",
          "2"
        ],
        "correct": 0,
        "feedback": [
          "Correct. BC = √(6² + 8²) = 10.",
          "14 adds the perpendicular legs rather than finding the straight distance.",
          "Subtracting 8 and 6 does not give this diagonal length."
        ],
        "hints": [
          "BC is the hypotenuse of the right triangle at A.",
          "Compute √(36 + 64)."
        ]
      },
      {
        "id": "collinear",
        "section": 1,
        "title": "When three points lie on one line",
        "intro": "If one point lies between the other two on a straight line, its two segment lengths add to the full segment length. This distance check can establish collinearity.",
        "simple": "For a bent path, the two pieces are longer than the straight route. Equality means the middle point lies on the segment.",
        "example": [
          "A(0, 0), B(1, 2), C(2, 4).",
          "AB = √5, BC = √5, AC = 2√5.",
          "AB + BC = AC, so B lies between A and C."
        ],
        "question": "A, B and C are distinct points with AB = 3, BC = 4 and AC = 7. What follows?",
        "options": [
          "They form a triangle with non-zero area",
          "They are collinear, with B between A and C",
          "C is the midpoint of AB"
        ],
        "correct": 1,
        "feedback": [
          "The equality 3 + 4 = 7 gives a degenerate triangle: a straight line.",
          "Correct. AB + BC = AC.",
          "The lengths do not describe C as a midpoint of AB."
        ],
        "hints": [
          "Compare AB + BC with AC.",
          "3 + 4 equals 7."
        ]
      },
      {
        "id": "equidistant",
        "section": 1,
        "title": "Equal distances make an equation",
        "intro": "If P is equidistant from A and B, set PA² = PB². Squaring avoids unnecessary square roots and keeps the equality valid because distances are non-negative.",
        "simple": "Write the two squared distances, make them equal, and solve for the unknown coordinate.",
        "example": [
          "P(x, 0) is equidistant from A(0, 0) and B(6, 0).",
          "x² = (x − 6)² → 12x = 36 → x = 3."
        ],
        "question": "P(x, 0) is equidistant from A(2, 0) and B(8, 0). Find x.",
        "options": [
          "3",
          "5",
          "10"
        ],
        "correct": 1,
        "feedback": [
          "The midpoint is not 3 when the endpoints are 2 and 8.",
          "Yes. (x − 2)² = (x − 8)² gives x = 5.",
          "The midpoint must lie between 2 and 8."
        ],
        "hints": [
          "Use (x − 2)² = (x − 8)².",
          "On this horizontal line the equal-distance point is the midpoint."
        ]
      },
      {
        "id": "section",
        "section": 2,
        "title": "A ratio tells you where to stop",
        "intro": "For internal division AP:PB = m:n, with positive m and n, P = ((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n)). A is (x₁, y₁) and B is (x₂, y₂).",
        "simple": "From A, travel the fraction m/(m+n) of the way towards B. The larger weight on B’s coordinates pulls the point nearer B.",
        "example": [
          "A(0, 0), B(8, 4), AP:PB = 1:3.",
          "P = ((1×8 + 3×0)/4, (1×4 + 3×0)/4) = (2, 1)."
        ],
        "question": "For AP:PB = 1:3, what fraction of the way from A to B is P?",
        "options": [
          "3/4",
          "1/4",
          "1/3"
        ],
        "correct": 1,
        "feedback": [
          "3/4 would correspond to AP:PB = 3:1.",
          "Correct. AP is one of the four equal ratio-parts in AB.",
          "AP/PB is 1/3, but AP/AB is 1/4."
        ],
        "hints": [
          "The full segment has 1 + 3 ratio-parts.",
          "AP accounts for 1 of those 4 parts."
        ],
        "explorer": "section"
      },
      {
        "id": "weighted",
        "section": 2,
        "title": "Give the opposite endpoint its weight",
        "intro": "If AP:PB = m:n, multiply B’s coordinates by m and A’s coordinates by n. Then divide by m+n. Work the x and y coordinates separately.",
        "simple": "The weights look reversed because a point with a short AP is closer to A, so A must have the larger weight.",
        "example": [
          "A(1, 2), B(7, 8), AP:PB = 1:2.",
          "P = ((7 + 2×1)/3, (8 + 2×2)/3) = (3, 4)."
        ],
        "question": "A(0, 0), B(9, 6), AP:PB = 2:1. Find P.",
        "options": [
          "(3, 2)",
          "(6, 4)",
          "(18, 12)"
        ],
        "correct": 1,
        "feedback": [
          "This is the 1:2 division point, not 2:1.",
          "Correct. P = (2×9/3, 2×6/3) = (6, 4).",
          "Remember to divide both weighted sums by 2 + 1 = 3."
        ],
        "hints": [
          "Use m = 2 and n = 1.",
          "P is two-thirds of the way from A to B."
        ]
      },
      {
        "id": "midpoint",
        "section": 2,
        "title": "Halfway means an equal split",
        "intro": "The midpoint has ratio 1:1, so its coordinates are ((x₁+x₂)/2, (y₁+y₂)/2). Average the coordinates separately.",
        "simple": "Add the two x-values and halve; then do the same for the y-values.",
        "example": [
          "A(−2, 1), B(6, 7).",
          "Midpoint = ((−2+6)/2, (1+7)/2) = (2, 4)."
        ],
        "question": "Find the midpoint of (−4, 2) and (6, 8).",
        "options": [
          "(2, 10)",
          "(1, 5)",
          "(5, 3)"
        ],
        "correct": 1,
        "feedback": [
          "These are sums rather than averages.",
          "Yes. (−4+6)/2 = 1 and (2+8)/2 = 5.",
          "Average corresponding coordinates rather than mixing x and y."
        ],
        "hints": [
          "Add x-values together and y-values together.",
          "Halve 2 and 10."
        ]
      },
      {
        "id": "ratio-back",
        "section": 2,
        "title": "Read the ratio back from the point",
        "intro": "When A, P and B are collinear and P lies between the endpoints, AP:PB can be found from their distances. On a horizontal line, the horizontal gaps are enough.",
        "simple": "Measure the first piece and the second piece in the same direction and reduce the ratio.",
        "example": [
          "A(0, 2), P(3, 2), B(9, 2).",
          "AP = 3, PB = 6, so AP:PB = 1:2."
        ],
        "question": "A(−2, 1), P(2, 1), B(8, 1). What is AP:PB?",
        "options": [
          "2:3",
          "3:2",
          "1:2"
        ],
        "correct": 0,
        "feedback": [
          "Correct. AP = 4 and PB = 6, so the ratio is 2:3.",
          "This reverses the order of AP and PB.",
          "The pieces are 4 and 6, not 4 and 8."
        ],
        "hints": [
          "AP = |2 − (−2)| and PB = |8 − 2|.",
          "Reduce 4:6."
        ]
      },
      {
        "id": "endpoint",
        "section": 2,
        "title": "Find an endpoint from the midpoint",
        "intro": "If M is the midpoint of AB, solve the two midpoint equations for the missing endpoint. For B: x₂ = 2x_M − x₁ and y₂ = 2y_M − y₁.",
        "simple": "Double the midpoint coordinate, then subtract the known endpoint coordinate.",
        "example": [
          "A(1, 3), M(4, 5).",
          "B = (2×4 − 1, 2×5 − 3) = (7, 7)."
        ],
        "question": "A(−2, 4), midpoint M(3, 1). Find B.",
        "options": [
          "(1, 5)",
          "(8, −2)",
          "(4, 2)"
        ],
        "correct": 1,
        "feedback": [
          "This does not place M halfway between A and B.",
          "Yes. x₂ = 6 + 2 = 8; y₂ = 2 − 4 = −2.",
          "Use twice the midpoint, not the midpoint itself."
        ],
        "hints": [
          "B = (2×3 − (−2), 2×1 − 4).",
          "Subtract the known endpoint from twice M."
        ]
      },
      {
        "id": "exit-distance",
        "section": 3,
        "title": "Your turn: straight-line distance",
        "intro": "Use the distance formula and retain parentheses around negative coordinates.",
        "simple": "Square the horizontal and vertical differences, add, then take the square root.",
        "example": [],
        "question": "Find the distance between (−1, −2) and (5, 6).",
        "options": [
          "14",
          "10",
          "2"
        ],
        "correct": 1,
        "feedback": [
          "14 adds the two gaps; the straight-line distance is shorter.",
          "Correct. √(6² + 8²) = 10.",
          "The difference of the gap sizes is not the distance."
        ],
        "hints": [
          "The differences are 6 and 8.",
          "Compute √(36 + 64)."
        ]
      },
      {
        "id": "exit-section",
        "section": 3,
        "title": "Your turn: divide a segment",
        "intro": "Use internal division and check which endpoint P is nearer.",
        "simple": "AP:PB = 1:2 means P is one-third of the way from A towards B.",
        "example": [],
        "question": "A(2, 1), B(8, 7). Find P dividing AB internally in the ratio AP:PB = 1:2.",
        "options": [
          "(6, 5)",
          "(4, 3)",
          "(5, 4)"
        ],
        "correct": 1,
        "feedback": [
          "This is two-thirds of the way from A, corresponding to 2:1.",
          "Correct. P = ((8+2×2)/3, (7+2×1)/3) = (4, 3).",
          "This is the midpoint, which divides in ratio 1:1."
        ],
        "hints": [
          "Move one-third of the vector (6, 6) from A.",
          "Add (2, 2) to (2, 1)."
        ]
      },
      {
        "id": "exit-midpoint",
        "section": 3,
        "title": "Your turn: halfway with negative coordinates",
        "intro": "Average each coordinate pair separately.",
        "simple": "A midpoint may lie on an axis even when neither endpoint does.",
        "example": [],
        "question": "What is the midpoint of (−6, 4) and (2, −4)?",
        "options": [
          "(−2, 0)",
          "(−4, 0)",
          "(2, −2)"
        ],
        "correct": 0,
        "feedback": [
          "Yes. (−6+2)/2 = −2 and (4−4)/2 = 0.",
          "−4 is the x-coordinate sum, before dividing by 2.",
          "Keep x-values together and y-values together."
        ],
        "hints": [
          "The y-values cancel.",
          "Halve the x-coordinate sum −4."
        ]
      }
    ]
  }
];
