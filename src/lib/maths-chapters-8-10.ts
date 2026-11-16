import type {Chapter} from './maths-chapters.ts';
export const partTwoChapters:Chapter[]=[
  {
    "number": 8,
    "slug": "introduction-to-trigonometry",
    "title": "Introduction to Trigonometry",
    "sections": [
      "8.1 Introduction",
      "8.2 Trigonometric Ratios",
      "8.3 Trigonometric Ratios of Some Specific Angles",
      "8.4 Trigonometric Identities",
      "8.5 Summary"
    ],
    "summary": [
      [
        "Six ratios",
        "Name opposite, adjacent and hypotenuse relative to the chosen angle."
      ],
      [
        "Exact values",
        "Derive the 30°, 45° and 60° rows; distinguish zero from undefined at endpoints."
      ],
      [
        "Identities",
        "Use Pythagoras and reciprocal/quotient relationships, retaining denominator restrictions."
      ]
    ],
    "challenge": "Build a right triangle from one ratio, then prove a fresh identity without looking at the model.",
    "steps": [
      {
        "id": "c8-purpose",
        "section": 0,
        "title": "Measure through a triangle",
        "intro": "Trigonometry links acute angles and side ratios in right triangles. It lets you infer a length without directly measuring it.",
        "simple": "An upright tower, level ground and a straight line of sight form a right triangle.",
        "example": [
          "An upright tower, level ground and a straight line of sight form a right triangle.",
          "We first learn the ratios, then use them for heights and distances in Chapter 9."
        ],
        "question": "Which shape underlies these ratios?",
        "options": [
          "Any four-sided figure",
          "A right triangle",
          "Only a circle"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. An upright tower, level ground and a straight line of sight form a right triangle.",
          "Correct. We first learn the ratios, then use them for heights and distances in Chapter 9.",
          "Check the reference angle, the definition and any denominator restriction. An upright tower, level ground and a straight line of sight form a right triangle."
        ],
        "hints": [
          "An upright tower, level ground and a straight line of sight form a right triangle.",
          "We first learn the ratios, then use them for heights and distances in Chapter 9."
        ]
      },
      {
        "id": "c8-name-sides",
        "section": 1,
        "title": "Choose the angle before naming the sides",
        "intro": "The hypotenuse is opposite the right angle. Opposite and adjacent refer to a chosen acute angle.",
        "simple": "In ABC right-angled at B, AC is the hypotenuse. At A, BC is opposite and AB adjacent.",
        "example": [
          "In ABC right-angled at B, AC is the hypotenuse. At A, BC is opposite and AB adjacent.",
          "At C, AB becomes opposite and BC adjacent; AC stays the hypotenuse."
        ],
        "question": "At angle C, which side is opposite?",
        "options": [
          "BC",
          "AC",
          "AB"
        ],
        "correct": 2,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. In ABC right-angled at B, AC is the hypotenuse. At A, BC is opposite and AB adjacent.",
          "Check the reference angle, the definition and any denominator restriction. In ABC right-angled at B, AC is the hypotenuse. At A, BC is opposite and AB adjacent.",
          "Correct. At C, AB becomes opposite and BC adjacent; AC stays the hypotenuse."
        ],
        "hints": [
          "In ABC right-angled at B, AC is the hypotenuse. At A, BC is opposite and AB adjacent.",
          "At C, AB becomes opposite and BC adjacent; AC stays the hypotenuse."
        ],
        "explorer": "trig"
      },
      {
        "id": "c8-sine-cosine",
        "section": 1,
        "title": "Sine and cosine compare with the hypotenuse",
        "intro": "For an acute angle, sine is opposite/hypotenuse and cosine is adjacent/hypotenuse.",
        "simple": "With opposite 3, adjacent 4 and hypotenuse 5, sin=3/5 and cos=4/5.",
        "example": [
          "With opposite 3, adjacent 4 and hypotenuse 5, sin=3/5 and cos=4/5.",
          "Both ratios lie strictly between 0 and 1 for an acute angle."
        ],
        "question": "What is cosine in this triangle?",
        "options": [
          "3/4",
          "4/5",
          "5/4"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. With opposite 3, adjacent 4 and hypotenuse 5, sin=3/5 and cos=4/5.",
          "Correct. Both ratios lie strictly between 0 and 1 for an acute angle.",
          "Check the reference angle, the definition and any denominator restriction. With opposite 3, adjacent 4 and hypotenuse 5, sin=3/5 and cos=4/5."
        ],
        "hints": [
          "With opposite 3, adjacent 4 and hypotenuse 5, sin=3/5 and cos=4/5.",
          "Both ratios lie strictly between 0 and 1 for an acute angle."
        ]
      },
      {
        "id": "c8-tangent",
        "section": 1,
        "title": "Tangent compares the two legs",
        "intro": "tan A=opposite/adjacent. Unlike sine and cosine, tangent can exceed 1.",
        "simple": "For opposite 4 and adjacent 3, tan A=4/3.",
        "example": [
          "For opposite 4 and adjacent 3, tan A=4/3.",
          "The hypotenuse is not part of the tangent definition."
        ],
        "question": "Can tan A exceed 1?",
        "options": [
          "Yes",
          "No",
          "Only at 90°, where it equals 1"
        ],
        "correct": 0,
        "feedback": [
          "Correct. The hypotenuse is not part of the tangent definition.",
          "Check the reference angle, the definition and any denominator restriction. For opposite 4 and adjacent 3, tan A=4/3.",
          "Check the reference angle, the definition and any denominator restriction. For opposite 4 and adjacent 3, tan A=4/3."
        ],
        "hints": [
          "For opposite 4 and adjacent 3, tan A=4/3.",
          "The hypotenuse is not part of the tangent definition."
        ]
      },
      {
        "id": "c8-reciprocals",
        "section": 1,
        "title": "Three reciprocal ratios",
        "intro": "cosec A=1/sin A, sec A=1/cos A and cot A=1/tan A, wherever the denominator is non-zero.",
        "simple": "For opposite 5, adjacent 12, hypotenuse 13: cosec=13/5, sec=13/12, cot=12/5.",
        "example": [
          "For opposite 5, adjacent 12, hypotenuse 13: cosec=13/5, sec=13/12, cot=12/5.",
          "“cot A” names a ratio; it does not mean cot multiplied by A."
        ],
        "question": "Which is the reciprocal of cosine?",
        "options": [
          "cosec",
          "sec",
          "cot"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. For opposite 5, adjacent 12, hypotenuse 13: cosec=13/5, sec=13/12, cot=12/5.",
          "Correct. “cot A” names a ratio; it does not mean cot multiplied by A.",
          "Check the reference angle, the definition and any denominator restriction. For opposite 5, adjacent 12, hypotenuse 13: cosec=13/5, sec=13/12, cot=12/5."
        ],
        "hints": [
          "For opposite 5, adjacent 12, hypotenuse 13: cosec=13/5, sec=13/12, cot=12/5.",
          "“cot A” names a ratio; it does not mean cot multiplied by A."
        ]
      },
      {
        "id": "c8-similarity",
        "section": 1,
        "title": "Why size does not change the ratios",
        "intro": "Right triangles with the same acute angle are similar by AA. Their corresponding side ratios agree.",
        "simple": "A 3–4–5 triangle enlarged to 6–8–10 still has sine 3/5=6/10.",
        "example": [
          "A 3–4–5 triangle enlarged to 6–8–10 still has sine 3/5=6/10.",
          "Angle, rather than triangle size, determines each trigonometric ratio."
        ],
        "question": "What happens to sine if every side doubles?",
        "options": [
          "It doubles",
          "It halves",
          "It stays the same"
        ],
        "correct": 2,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. A 3–4–5 triangle enlarged to 6–8–10 still has sine 3/5=6/10.",
          "Check the reference angle, the definition and any denominator restriction. A 3–4–5 triangle enlarged to 6–8–10 still has sine 3/5=6/10.",
          "Correct. Angle, rather than triangle size, determines each trigonometric ratio."
        ],
        "hints": [
          "A 3–4–5 triangle enlarged to 6–8–10 still has sine 3/5=6/10.",
          "Angle, rather than triangle size, determines each trigonometric ratio."
        ]
      },
      {
        "id": "c8-recover-leg",
        "section": 1,
        "title": "Recover the missing side first",
        "intro": "One ratio can specify proportional sides. Use Pythagoras to recover the third, then form the remaining ratios.",
        "simple": "If sin A=3/4, choose opposite 3 k and hypotenuse 4 k. Adjacent=sqrt(7)k.",
        "example": [
          "If sin A=3/4, choose opposite 3 k and hypotenuse 4 k. Adjacent=sqrt(7)k.",
          "Thus cos A=sqrt(7)/4 and tan A=3/sqrt(7)."
        ],
        "question": "What is the adjacent side for k=1?",
        "options": [
          "1",
          "sqrt(7)",
          "5"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. If sin A=3/4, choose opposite 3 k and hypotenuse 4 k. Adjacent=sqrt(7)k.",
          "Correct. Thus cos A=sqrt(7)/4 and tan A=3/sqrt(7).",
          "Check the reference angle, the definition and any denominator restriction. If sin A=3/4, choose opposite 3 k and hypotenuse 4 k. Adjacent=sqrt(7)k."
        ],
        "hints": [
          "If sin A=3/4, choose opposite 3 k and hypotenuse 4 k. Adjacent=sqrt(7)k.",
          "Thus cos A=sqrt(7)/4 and tan A=3/sqrt(7)."
        ]
      },
      {
        "id": "c8-cot-equation",
        "section": 1,
        "title": "Divide before interpreting a given ratio",
        "intro": "The equation 15 cot A=8 means cot A=8/15. Read the equation before assigning sides.",
        "simple": "Take adjacent 8, opposite 15 and hypotenuse 17.",
        "example": [
          "Take adjacent 8, opposite 15 and hypotenuse 17.",
          "Then sin A=15/17 and sec A=17/8."
        ],
        "question": "Which side is 15 here?",
        "options": [
          "Adjacent",
          "Opposite",
          "Hypotenuse"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. Take adjacent 8, opposite 15 and hypotenuse 17.",
          "Correct. Then sin A=15/17 and sec A=17/8.",
          "Check the reference angle, the definition and any denominator restriction. Take adjacent 8, opposite 15 and hypotenuse 17."
        ],
        "hints": [
          "Take adjacent 8, opposite 15 and hypotenuse 17.",
          "Then sin A=15/17 and sec A=17/8."
        ]
      },
      {
        "id": "c8-side-sum",
        "section": 1,
        "title": "Use Pythagoras with a side sum",
        "intro": "If two lengths occur in a sum, express one in terms of the other before squaring.",
        "simple": "For right PQR with PQ=5 and PR+QR=25, set QR=x and PR=25−x.",
        "example": [
          "For right PQR with PQ=5 and PR+QR=25, set QR=x and PR=25−x.",
          "(25−x)²=x²+25 gives QR=12 and PR=13."
        ],
        "question": "Which is the hypotenuse?",
        "options": [
          "PQ",
          "QR",
          "PR"
        ],
        "correct": 2,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. For right PQR with PQ=5 and PR+QR=25, set QR=x and PR=25−x.",
          "Check the reference angle, the definition and any denominator restriction. For right PQR with PQ=5 and PR+QR=25, set QR=x and PR=25−x.",
          "Correct. (25−x)²=x²+25 gives QR=12 and PR=13."
        ],
        "hints": [
          "For right PQR with PQ=5 and PR+QR=25, set QR=x and PR=25−x.",
          "(25−x)²=x²+25 gives QR=12 and PR=13."
        ]
      },
      {
        "id": "c8-notation",
        "section": 1,
        "title": "A squared ratio is not a double angle",
        "intro": "sin²A means (sin A)². sin(2 A) means the sine of the angle twice A.",
        "simple": "At A=30°, sin²A=1/4 but sin(2 A)=sin 60°=sqrt(3)/2.",
        "example": [
          "At A=30°, sin²A=1/4 but sin(2 A)=sin 60°=sqrt(3)/2.",
          "The exponent acts on the ratio; the number inside the brackets acts on the angle."
        ],
        "question": "What does tan²A mean?",
        "options": [
          "tan(2 A)",
          "(tan A)²",
          "2 tan A"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. At A=30°, sin²A=1/4 but sin(2 A)=sin 60°=sqrt(3)/2.",
          "Correct. The exponent acts on the ratio; the number inside the brackets acts on the angle.",
          "Check the reference angle, the definition and any denominator restriction. At A=30°, sin²A=1/4 but sin(2 A)=sin 60°=sqrt(3)/2."
        ],
        "hints": [
          "At A=30°, sin²A=1/4 but sin(2 A)=sin 60°=sqrt(3)/2.",
          "The exponent acts on the ratio; the number inside the brackets acts on the angle."
        ]
      },
      {
        "id": "c8-angle45",
        "section": 2,
        "title": "Derive 45° from equal legs",
        "intro": "An isosceles right triangle has two 45° angles. Choose both legs 1.",
        "simple": "Pythagoras gives hypotenuse sqrt(2).",
        "example": [
          "Pythagoras gives hypotenuse sqrt(2).",
          "sin 45°=cos 45°=1/sqrt(2), tan 45°=cot 45°=1."
        ],
        "question": "What is sec 45°?",
        "options": [
          "1/2",
          "sqrt(2)",
          "1"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. Pythagoras gives hypotenuse sqrt(2).",
          "Correct. sin 45°=cos 45°=1/sqrt(2), tan 45°=cot 45°=1.",
          "Check the reference angle, the definition and any denominator restriction. Pythagoras gives hypotenuse sqrt(2)."
        ],
        "hints": [
          "Pythagoras gives hypotenuse sqrt(2).",
          "sin 45°=cos 45°=1/sqrt(2), tan 45°=cot 45°=1."
        ]
      },
      {
        "id": "c8-angle30",
        "section": 2,
        "title": "Split an equilateral triangle",
        "intro": "An altitude in an equilateral triangle of side 2 makes two right triangles with sides 1, sqrt(3), 2.",
        "simple": "The angle opposite the short side is 30°.",
        "example": [
          "The angle opposite the short side is 30°.",
          "sin 30°=1/2, cos 30°=sqrt(3)/2 and tan 30°=1/sqrt(3)."
        ],
        "question": "What is the hypotenuse in this construction?",
        "options": [
          "1",
          "sqrt(3)",
          "2"
        ],
        "correct": 2,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. The angle opposite the short side is 30°.",
          "Check the reference angle, the definition and any denominator restriction. The angle opposite the short side is 30°.",
          "Correct. sin 30°=1/2, cos 30°=sqrt(3)/2 and tan 30°=1/sqrt(3)."
        ],
        "hints": [
          "The angle opposite the short side is 30°.",
          "sin 30°=1/2, cos 30°=sqrt(3)/2 and tan 30°=1/sqrt(3)."
        ]
      },
      {
        "id": "c8-angle60",
        "section": 2,
        "title": "Read the other acute angle",
        "intro": "The same half-equilateral triangle has a 60° angle, opposite its sqrt(3) side.",
        "simple": "sin 60°=sqrt(3)/2, cos 60°=1/2 and tan 60°=sqrt(3).",
        "example": [
          "sin 60°=sqrt(3)/2, cos 60°=1/2 and tan 60°=sqrt(3).",
          "Reciprocals give sec 60°=2, cosec 60°=2/sqrt(3) and cot 60°=1/sqrt(3)."
        ],
        "question": "Which is cos 60°?",
        "options": [
          "1/2",
          "sqrt(3)/2",
          "2"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Reciprocals give sec 60°=2, cosec 60°=2/sqrt(3) and cot 60°=1/sqrt(3).",
          "Check the reference angle, the definition and any denominator restriction. sin 60°=sqrt(3)/2, cos 60°=1/2 and tan 60°=sqrt(3).",
          "Check the reference angle, the definition and any denominator restriction. sin 60°=sqrt(3)/2, cos 60°=1/2 and tan 60°=sqrt(3)."
        ],
        "hints": [
          "sin 60°=sqrt(3)/2, cos 60°=1/2 and tan 60°=sqrt(3).",
          "Reciprocals give sec 60°=2, cosec 60°=2/sqrt(3) and cot 60°=1/sqrt(3)."
        ]
      },
      {
        "id": "c8-endpoints",
        "section": 2,
        "title": "Zero and undefined are different",
        "intro": "Endpoint values extend the acute ratios. They must not be found by dividing by zero.",
        "simple": "At 0°, sin=0, cos=1, tan=0, sec=1; cot and cosec are undefined.",
        "example": [
          "At 0°, sin=0, cos=1, tan=0, sec=1; cot and cosec are undefined.",
          "At 90°, sin=1, cos=0, cot=0, cosec=1; tan and sec are undefined."
        ],
        "question": "What is tan 90°?",
        "options": [
          "0",
          "1",
          "Undefined"
        ],
        "correct": 2,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. At 0°, sin=0, cos=1, tan=0, sec=1; cot and cosec are undefined.",
          "Check the reference angle, the definition and any denominator restriction. At 0°, sin=0, cos=1, tan=0, sec=1; cot and cosec are undefined.",
          "Correct. At 90°, sin=1, cos=0, cot=0, cosec=1; tan and sec are undefined."
        ],
        "hints": [
          "At 0°, sin=0, cos=1, tan=0, sec=1; cot and cosec are undefined.",
          "At 90°, sin=1, cos=0, cot=0, cosec=1; tan and sec are undefined."
        ]
      },
      {
        "id": "c8-range",
        "section": 2,
        "title": "Track the angle range",
        "intro": "Within 0° to 90°, sine increases and cosine decreases. For acute angles, both are positive.",
        "simple": "sin 30°=1/2 < sin 60°=sqrt(3)/2.",
        "example": [
          "sin 30°=1/2 < sin 60°=sqrt(3)/2.",
          "cos 30°=sqrt(3)/2 > cos 60°=1/2. These are statements about this chapter’s range."
        ],
        "question": "Which decreases as the angle rises from 0° to 90°?",
        "options": [
          "Sine",
          "Cosine",
          "Both"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. sin 30°=1/2 < sin 60°=sqrt(3)/2.",
          "Correct. cos 30°=sqrt(3)/2 > cos 60°=1/2. These are statements about this chapter’s range.",
          "Check the reference angle, the definition and any denominator restriction. sin 30°=1/2 < sin 60°=sqrt(3)/2."
        ],
        "hints": [
          "sin 30°=1/2 < sin 60°=sqrt(3)/2.",
          "cos 30°=sqrt(3)/2 > cos 60°=1/2. These are statements about this chapter’s range."
        ]
      },
      {
        "id": "c8-angle-equations",
        "section": 2,
        "title": "Turn ratios into angle equations",
        "intro": "Special values identify angles when the stated domain makes the choice unique. Then solve the resulting linear equations.",
        "simple": "If sin(A−B)=1/2 and cos(A+B)=1/2 with the stated acute ranges, A−B=30° and A+B=60°.",
        "example": [
          "If sin(A−B)=1/2 and cos(A+B)=1/2 with the stated acute ranges, A−B=30° and A+B=60°.",
          "Adding gives A=45°, then B=15°."
        ],
        "question": "Why is the stated angle range needed?",
        "options": [
          "To choose the correct angle from the ratio",
          "To change the side lengths",
          "To make every ratio an integer"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Adding gives A=45°, then B=15°.",
          "Check the reference angle, the definition and any denominator restriction. If sin(A−B)=1/2 and cos(A+B)=1/2 with the stated acute ranges, A−B=30° and A+B=60°.",
          "Check the reference angle, the definition and any denominator restriction. If sin(A−B)=1/2 and cos(A+B)=1/2 with the stated acute ranges, A−B=30° and A+B=60°."
        ],
        "hints": [
          "If sin(A−B)=1/2 and cos(A+B)=1/2 with the stated acute ranges, A−B=30° and A+B=60°.",
          "Adding gives A=45°, then B=15°."
        ]
      },
      {
        "id": "c8-no-distribute",
        "section": 2,
        "title": "Sine does not distribute over a sum",
        "intro": "Do not treat a trigonometric function like multiplication.",
        "simple": "For A=B=30°, sin(A+B)=sin 60°=sqrt(3)/2.",
        "example": [
          "For A=B=30°, sin(A+B)=sin 60°=sqrt(3)/2.",
          "But sin A+sin B=1, so these expressions are different."
        ],
        "question": "Is sin(A+B)=sin A+sin B always true?",
        "options": [
          "Yes",
          "No",
          "Only because the symbols match"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. For A=B=30°, sin(A+B)=sin 60°=sqrt(3)/2.",
          "Correct. But sin A+sin B=1, so these expressions are different.",
          "Check the reference angle, the definition and any denominator restriction. For A=B=30°, sin(A+B)=sin 60°=sqrt(3)/2."
        ],
        "hints": [
          "For A=B=30°, sin(A+B)=sin 60°=sqrt(3)/2.",
          "But sin A+sin B=1, so these expressions are different."
        ]
      },
      {
        "id": "c8-fundamental",
        "section": 3,
        "title": "Derive the fundamental identity",
        "intro": "Pythagoras divided by hypotenuse squared gives the first identity.",
        "simple": "opposite²+adjacent²=hypotenuse².",
        "example": [
          "opposite²+adjacent²=hypotenuse².",
          "Divide each term by hypotenuse² to obtain sin²A+cos²A=1."
        ],
        "question": "What is sin²A+cos²A?",
        "options": [
          "2",
          "1",
          "sin(2 A)"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. opposite²+adjacent²=hypotenuse².",
          "Correct. Divide each term by hypotenuse² to obtain sin²A+cos²A=1.",
          "Check the reference angle, the definition and any denominator restriction. opposite²+adjacent²=hypotenuse²."
        ],
        "hints": [
          "opposite²+adjacent²=hypotenuse².",
          "Divide each term by hypotenuse² to obtain sin²A+cos²A=1."
        ]
      },
      {
        "id": "c8-derived-identities",
        "section": 3,
        "title": "Divide an identity carefully",
        "intro": "From sin²A+cos²A=1, division produces two more identities, with denominator restrictions.",
        "simple": "Divide by cos²A: tan²A+1=sec²A, if cos A≠0.",
        "example": [
          "Divide by cos²A: tan²A+1=sec²A, if cos A≠0.",
          "Divide by sin²A: 1+cot²A=cosec²A, if sin A≠0."
        ],
        "question": "Which equals sec²A−tan²A?",
        "options": [
          "0",
          "1",
          "−1"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. Divide by cos²A: tan²A+1=sec²A, if cos A≠0.",
          "Correct. Divide by sin²A: 1+cot²A=cosec²A, if sin A≠0.",
          "Check the reference angle, the definition and any denominator restriction. Divide by cos²A: tan²A+1=sec²A, if cos A≠0."
        ],
        "hints": [
          "Divide by cos²A: tan²A+1=sec²A, if cos A≠0.",
          "Divide by sin²A: 1+cot²A=cosec²A, if sin A≠0."
        ]
      },
      {
        "id": "c8-one-ratio",
        "section": 3,
        "title": "Express every ratio using one",
        "intro": "For an acute angle all six ratios are positive, so take the positive square root after using an identity.",
        "simple": "If u=sin A, cos A=sqrt(1−u²).",
        "example": [
          "If u=sin A, cos A=sqrt(1−u²).",
          "Then tan A=u/sqrt(1−u²) and sec A=1/sqrt(1−u²)."
        ],
        "question": "Why select the positive square root?",
        "options": [
          "A is acute",
          "All roots are always positive",
          "The variable is named u"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Then tan A=u/sqrt(1−u²) and sec A=1/sqrt(1−u²).",
          "Check the reference angle, the definition and any denominator restriction. If u=sin A, cos A=sqrt(1−u²).",
          "Check the reference angle, the definition and any denominator restriction. If u=sin A, cos A=sqrt(1−u²)."
        ],
        "hints": [
          "If u=sin A, cos A=sqrt(1−u²).",
          "Then tan A=u/sqrt(1−u²) and sec A=1/sqrt(1−u²)."
        ]
      },
      {
        "id": "c8-identity-work",
        "section": 3,
        "title": "Prove by transforming one side",
        "intro": "An identity proof shows a chain of valid equal expressions. Start with one side, use known identities and justify cancellation.",
        "simple": "(sec A+tan A)(1−sin A)=(1+sin A)(1−sin A)/cos A.",
        "example": [
          "(sec A+tan A)(1−sin A)=(1+sin A)(1−sin A)/cos A.",
          "This equals(1−sin²A)/cos A=cos A for acute A."
        ],
        "question": "What makes this a proof rather than a numerical check?",
        "options": [
          "It works algebraically throughout the stated domain",
          "It uses one sample angle",
          "It starts by assuming the answer"
        ],
        "correct": 0,
        "feedback": [
          "Correct. This equals(1−sin²A)/cos A=cos A for acute A.",
          "Check the reference angle, the definition and any denominator restriction. (sec A+tan A)(1−sin A)=(1+sin A)(1−sin A)/cos A.",
          "Check the reference angle, the definition and any denominator restriction. (sec A+tan A)(1−sin A)=(1+sin A)(1−sin A)/cos A."
        ],
        "hints": [
          "(sec A+tan A)(1−sin A)=(1+sin A)(1−sin A)/cos A.",
          "This equals(1−sin²A)/cos A=cos A for acute A."
        ]
      },
      {
        "id": "c8-square-root-sign",
        "section": 3,
        "title": "Keep the sign when taking a square root",
        "intro": "sqrt(z²)=|z|. An angle restriction may let you remove the absolute value.",
        "simple": "sqrt((1+sin A)/(1−sin A))=|(1+sin A)/cos A|.",
        "example": [
          "sqrt((1+sin A)/(1−sin A))=|(1+sin A)/cos A|.",
          "For acute A, cos A>0 and 1+sin A>0, so the result is sec A+tan A."
        ],
        "question": "Which fact removes the absolute value here?",
        "options": [
          "A is acute, so the fraction is positive",
          "Square roots preserve every sign",
          "There is a plus sign in the question"
        ],
        "correct": 0,
        "feedback": [
          "Correct. For acute A, cos A>0 and 1+sin A>0, so the result is sec A+tan A.",
          "Check the reference angle, the definition and any denominator restriction. sqrt((1+sin A)/(1−sin A))=|(1+sin A)/cos A|.",
          "Check the reference angle, the definition and any denominator restriction. sqrt((1+sin A)/(1−sin A))=|(1+sin A)/cos A|."
        ],
        "hints": [
          "sqrt((1+sin A)/(1−sin A))=|(1+sin A)/cos A|.",
          "For acute A, cos A>0 and 1+sin A>0, so the result is sec A+tan A."
        ]
      },
      {
        "id": "c8-cancellation-domain",
        "section": 3,
        "title": "Cancellation does not repair an undefined expression",
        "intro": "A common factor may be cancelled only where it is non-zero. Keep the original domain.",
        "simple": "For(sinθ−2 sin³θ)/(2 cos³θ−cosθ), cancelling 2 cos²θ−1 gives tanθ.",
        "example": [
          "For(sinθ−2 sin³θ)/(2 cos³θ−cosθ), cancelling 2 cos²θ−1 gives tanθ.",
          "At 45° that factor is 0, and the original expression is 0/0. The identity excludes 45°."
        ],
        "question": "Is the original fraction defined at 45°?",
        "options": [
          "Yes, because tan 45°=1",
          "No",
          "Yes, because both parts are zero"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. For(sinθ−2 sin³θ)/(2 cos³θ−cosθ), cancelling 2 cos²θ−1 gives tanθ.",
          "Correct. At 45° that factor is 0, and the original expression is 0/0. The identity excludes 45°.",
          "Check the reference angle, the definition and any denominator restriction. For(sinθ−2 sin³θ)/(2 cos³θ−cosθ), cancelling 2 cos²θ−1 gives tanθ."
        ],
        "hints": [
          "For(sinθ−2 sin³θ)/(2 cos³θ−cosθ), cancelling 2 cos²θ−1 gives tanθ.",
          "At 45° that factor is 0, and the original expression is 0/0. The identity excludes 45°."
        ]
      },
      {
        "id": "c8-recap-ratios",
        "section": 4,
        "title": "Retrieve the ratio definitions",
        "intro": "Before using a remembered value, identify the reference angle and name the sides.",
        "simple": "In a 7–24–25 triangle, an angle opposite 7 has sine 7/25.",
        "example": [
          "In a 7–24–25 triangle, an angle opposite 7 has sine 7/25.",
          "Its cosine is 24/25 and tangent 7/24."
        ],
        "question": "What is its cosecant?",
        "options": [
          "25/7",
          "7/25",
          "24/7"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Its cosine is 24/25 and tangent 7/24.",
          "Check the reference angle, the definition and any denominator restriction. In a 7–24–25 triangle, an angle opposite 7 has sine 7/25.",
          "Check the reference angle, the definition and any denominator restriction. In a 7–24–25 triangle, an angle opposite 7 has sine 7/25."
        ],
        "hints": [
          "In a 7–24–25 triangle, an angle opposite 7 has sine 7/25.",
          "Its cosine is 24/25 and tangent 7/24."
        ]
      },
      {
        "id": "c8-recap-proof",
        "section": 4,
        "title": "Separate calculation from proof",
        "intro": "Typed values can be checked automatically. A written identity proof needs valid reasoning and domain checks.",
        "simple": "Showing an equality at 30° tests one case only.",
        "example": [
          "Showing an equality at 30° tests one case only.",
          "A proof must establish the equality for every angle in its stated domain."
        ],
        "question": "What should a complete identity proof include?",
        "options": [
          "One calculator example",
          "Algebraic reasoning and domain restrictions",
          "Only the final expression"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. Showing an equality at 30° tests one case only.",
          "Correct. A proof must establish the equality for every angle in its stated domain.",
          "Check the reference angle, the definition and any denominator restriction. Showing an equality at 30° tests one case only."
        ],
        "hints": [
          "Showing an equality at 30° tests one case only.",
          "A proof must establish the equality for every angle in its stated domain."
        ]
      }
    ]
  },
  {
    "number": 9,
    "slug": "applications-of-trigonometry",
    "title": "Some Applications of Trigonometry",
    "sections": [
      "9.1 Heights and Distances",
      "9.2 Summary"
    ],
    "summary": [
      [
        "Draw the model",
        "Mark eye level, upright heights, horizontal distances and lines of sight."
      ],
      [
        "Choose a ratio",
        "Use sine or cosine when a sloping length is involved; tangent for height and horizontal distance."
      ],
      [
        "Two observations",
        "Form one equation per observation; decide whether distances add or subtract."
      ]
    ],
    "challenge": "Sketch a two-angle height problem, solve it exactly, and explain the assumptions that make its right triangles valid.",
    "steps": [
      {
        "id": "c9-line-of-sight",
        "section": 0,
        "title": "Begin at the observer’s eye",
        "intro": "A line of sight joins the observer’s eye to the target. The horizontal through the eye is the reference for viewing angles.",
        "simple": "Looking upward makes an angle above this horizontal; looking downward makes one below it.",
        "example": [
          "Looking upward makes an angle above this horizontal; looking downward makes one below it.",
          "Do not measure elevation or depression from a vertical wall."
        ],
        "question": "Elevation is measured from which reference?",
        "options": [
          "The vertical",
          "The horizontal through the eye",
          "The sloping line itself"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. Looking upward makes an angle above this horizontal; looking downward makes one below it.",
          "Correct. Do not measure elevation or depression from a vertical wall.",
          "Check the reference angle, the definition and any denominator restriction. Looking upward makes an angle above this horizontal; looking downward makes one below it."
        ],
        "hints": [
          "Looking upward makes an angle above this horizontal; looking downward makes one below it.",
          "Do not measure elevation or depression from a vertical wall."
        ]
      },
      {
        "id": "c9-elevation-depression",
        "section": 0,
        "title": "Transfer a depression angle",
        "intro": "Horizontal lines through observer and target are parallel on the level-ground model. A line of sight is a transversal.",
        "simple": "The angle of depression at the observer equals the angle of elevation from the target, by alternate interior angles.",
        "example": [
          "The angle of depression at the observer equals the angle of elevation from the target, by alternate interior angles.",
          "This lets the same right-triangle ratios solve both viewing directions."
        ],
        "question": "Which angle equals a 30° depression angle?",
        "options": [
          "Elevation 30° from the target",
          "Elevation 60° from the target",
          "The angle to the vertical is always 30°"
        ],
        "correct": 0,
        "feedback": [
          "Correct. This lets the same right-triangle ratios solve both viewing directions.",
          "Check the reference angle, the definition and any denominator restriction. The angle of depression at the observer equals the angle of elevation from the target, by alternate interior angles.",
          "Check the reference angle, the definition and any denominator restriction. The angle of depression at the observer equals the angle of elevation from the target, by alternate interior angles."
        ],
        "hints": [
          "The angle of depression at the observer equals the angle of elevation from the target, by alternate interior angles.",
          "This lets the same right-triangle ratios solve both viewing directions."
        ]
      },
      {
        "id": "c9-assumptions",
        "section": 0,
        "title": "State the geometric assumptions",
        "intro": "The model needs upright structures, level common ground and the stated positions on a straight line.",
        "simple": "A vertical tower and level ground meet at 90°.",
        "example": [
          "A vertical tower and level ground meet at 90°.",
          "A rough sketch records which segment is vertical, horizontal or sloping; it need not be to scale."
        ],
        "question": "Why can we treat the tower and ground as perpendicular?",
        "options": [
          "Because that is an explicit upright/level assumption",
          "Because every photograph looks upright",
          "Because the angle is acute"
        ],
        "correct": 0,
        "feedback": [
          "Correct. A rough sketch records which segment is vertical, horizontal or sloping; it need not be to scale.",
          "Check the reference angle, the definition and any denominator restriction. A vertical tower and level ground meet at 90°.",
          "Check the reference angle, the definition and any denominator restriction. A vertical tower and level ground meet at 90°."
        ],
        "hints": [
          "A vertical tower and level ground meet at 90°.",
          "A rough sketch records which segment is vertical, horizontal or sloping; it need not be to scale."
        ]
      },
      {
        "id": "c9-tangent-model",
        "section": 0,
        "title": "Height over horizontal distance",
        "intro": "When you know the horizontal distance and elevation angle, tangent directly relates them to vertical rise.",
        "simple": "For a ground observer 15 m from a tower, tan 60°=h/15.",
        "example": [
          "For a ground observer 15 m from a tower, tan 60°=h/15.",
          "Hence h=15 sqrt(3) m. Change the angle below to see the relation."
        ],
        "question": "Which equation is correct?",
        "options": [
          "h=15/tan 60°",
          "h=15 tan 60°",
          "h=15 sin 60°"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. For a ground observer 15 m from a tower, tan 60°=h/15.",
          "Correct. Hence h=15 sqrt(3) m. Change the angle below to see the relation.",
          "Check the reference angle, the definition and any denominator restriction. For a ground observer 15 m from a tower, tan 60°=h/15."
        ],
        "hints": [
          "For a ground observer 15 m from a tower, tan 60°=h/15.",
          "Hence h=15 sqrt(3) m. Change the angle below to see the relation."
        ],
        "explorer": "heights"
      },
      {
        "id": "c9-hypotenuse",
        "section": 0,
        "title": "A rope or ladder is a sloping side",
        "intro": "The hypotenuse is the taut rope, straight slide or ladder, not the horizontal ground distance.",
        "simple": "A20 m rope at 30° gives h=20 sin 30°=10 m.",
        "example": [
          "A20 m rope at 30° gives h=20 sin 30°=10 m.",
          "If a ladder reaches height h at angleθ, its length is h/sinθ."
        ],
        "question": "Which is the ladder length for height 6 m at 30°?",
        "options": [
          "3 m",
          "12 m",
          "6 m"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. A20 m rope at 30° gives h=20 sin 30°=10 m.",
          "Correct. If a ladder reaches height h at angleθ, its length is h/sinθ.",
          "Check the reference angle, the definition and any denominator restriction. A20 m rope at 30° gives h=20 sin 30°=10 m."
        ],
        "hints": [
          "A20 m rope at 30° gives h=20 sin 30°=10 m.",
          "If a ladder reaches height h at angleθ, its length is h/sinθ."
        ]
      },
      {
        "id": "c9-eye-level",
        "section": 0,
        "title": "Subtract eye height first",
        "intro": "Elevation from a person’s eyes gives the rise above eye level. Add the eye height to get total structure height.",
        "simple": "For a 1.5 m observer 28.5 m away at 45°, rise=28.5 tan 45°=28.5 m.",
        "example": [
          "For a 1.5 m observer 28.5 m away at 45°, rise=28.5 tan 45°=28.5 m.",
          "Total chimney height=28.5+1.5=30 m."
        ],
        "question": "Which vertical height belongs inside the tangent equation?",
        "options": [
          "Full structure height",
          "Structure height minus eye height",
          "Eye height only"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. For a 1.5 m observer 28.5 m away at 45°, rise=28.5 tan 45°=28.5 m.",
          "Correct. Total chimney height=28.5+1.5=30 m.",
          "Check the reference angle, the definition and any denominator restriction. For a 1.5 m observer 28.5 m away at 45°, rise=28.5 tan 45°=28.5 m."
        ],
        "hints": [
          "For a 1.5 m observer 28.5 m away at 45°, rise=28.5 tan 45°=28.5 m.",
          "Total chimney height=28.5+1.5=30 m."
        ]
      },
      {
        "id": "c9-broken-tree",
        "section": 0,
        "title": "A broken tree has two lengths to add",
        "intro": "The standing stump is one leg; the broken part is the hypotenuse. Their sum gives the original height.",
        "simple": "At horizontal distance 8 m and angle 30°, stump=8 tan 30°=8/sqrt(3).",
        "example": [
          "At horizontal distance 8 m and angle 30°, stump=8 tan 30°=8/sqrt(3).",
          "Broken length=8/cos 30°=16/sqrt(3). Add to get 8 sqrt(3) m."
        ],
        "question": "Which gives the original tree height?",
        "options": [
          "Broken part only",
          "Stump only",
          "Stump plus broken part"
        ],
        "correct": 2,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. At horizontal distance 8 m and angle 30°, stump=8 tan 30°=8/sqrt(3).",
          "Check the reference angle, the definition and any denominator restriction. At horizontal distance 8 m and angle 30°, stump=8 tan 30°=8/sqrt(3).",
          "Correct. Broken length=8/cos 30°=16/sqrt(3). Add to get 8 sqrt(3) m."
        ],
        "hints": [
          "At horizontal distance 8 m and angle 30°, stump=8 tan 30°=8/sqrt(3).",
          "Broken length=8/cos 30°=16/sqrt(3). Add to get 8 sqrt(3) m."
        ]
      },
      {
        "id": "c9-upper-structure",
        "section": 0,
        "title": "Separate a mast from its building",
        "intro": "One angle may locate the roof and another the top of the structure above it. Use their shared horizontal distance.",
        "simple": "A20 m building’s roof at 45° gives d=20 m. At 60° the tower’s top is 20 sqrt(3) m high in total.",
        "example": [
          "A20 m building’s roof at 45° gives d=20 m. At 60° the tower’s top is 20 sqrt(3) m high in total.",
          "The tower alone is 20(sqrt(3)−1) m."
        ],
        "question": "What must be subtracted from total height?",
        "options": [
          "The building height",
          "The horizontal distance",
          "The viewing angle"
        ],
        "correct": 0,
        "feedback": [
          "Correct. The tower alone is 20(sqrt(3)−1) m.",
          "Check the reference angle, the definition and any denominator restriction. A20 m building’s roof at 45° gives d=20 m. At 60° the tower’s top is 20 sqrt(3) m high in total.",
          "Check the reference angle, the definition and any denominator restriction. A20 m building’s roof at 45° gives d=20 m. At 60° the tower’s top is 20 sqrt(3) m high in total."
        ],
        "hints": [
          "A20 m building’s roof at 45° gives d=20 m. At 60° the tower’s top is 20 sqrt(3) m high in total.",
          "The tower alone is 20(sqrt(3)−1) m."
        ]
      },
      {
        "id": "c9-same-point",
        "section": 0,
        "title": "Two targets from one point share a distance",
        "intro": "Keep the same ground distance in both equations when the observer stays in one place.",
        "simple": "For a pedestal h and statue 1.6 m: tan 45°=h/d and tan 60°=(h+1.6)/d.",
        "example": [
          "For a pedestal h and statue 1.6 m: tan 45°=h/d and tan 60°=(h+1.6)/d.",
          "First d=h, then solve sqrt(3)h=h+1.6."
        ],
        "question": "Which distance appears in both equations?",
        "options": [
          "The same d",
          "Two unrelated distances",
          "The statue height"
        ],
        "correct": 0,
        "feedback": [
          "Correct. First d=h, then solve sqrt(3)h=h+1.6.",
          "Check the reference angle, the definition and any denominator restriction. For a pedestal h and statue 1.6 m: tan 45°=h/d and tan 60°=(h+1.6)/d.",
          "Check the reference angle, the definition and any denominator restriction. For a pedestal h and statue 1.6 m: tan 45°=h/d and tan 60°=(h+1.6)/d."
        ],
        "hints": [
          "For a pedestal h and statue 1.6 m: tan 45°=h/d and tan 60°=(h+1.6)/d.",
          "First d=h, then solve sqrt(3)h=h+1.6."
        ]
      },
      {
        "id": "c9-walk-closer",
        "section": 0,
        "title": "Two observations while walking",
        "intro": "When the observer moves toward a tower, the vertical rise stays fixed while the horizontal distance decreases.",
        "simple": "For rise 28.5 m: at 30°, d₁=28.5 sqrt(3); at 60°, d₂=9.5 sqrt(3).",
        "example": [
          "For rise 28.5 m: at 30°, d₁=28.5 sqrt(3); at 60°, d₂=9.5 sqrt(3).",
          "The walk is d₁−d₂=19 sqrt(3) m."
        ],
        "question": "A larger elevation angle at fixed height means what?",
        "options": [
          "Greater horizontal distance",
          "Smaller horizontal distance",
          "No change"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. For rise 28.5 m: at 30°, d₁=28.5 sqrt(3); at 60°, d₂=9.5 sqrt(3).",
          "Correct. The walk is d₁−d₂=19 sqrt(3) m.",
          "Check the reference angle, the definition and any denominator restriction. For rise 28.5 m: at 30°, d₁=28.5 sqrt(3); at 60°, d₂=9.5 sqrt(3)."
        ],
        "hints": [
          "For rise 28.5 m: at 30°, d₁=28.5 sqrt(3); at 60°, d₂=9.5 sqrt(3).",
          "The walk is d₁−d₂=19 sqrt(3) m."
        ]
      },
      {
        "id": "c9-equal-poles",
        "section": 0,
        "title": "Split a known width",
        "intro": "For equal poles on opposite road edges, let the observation point divide the road into x and width−x.",
        "simple": "For an 80 m road and angles 60°, 30°: h=x sqrt(3)=(80−x)/sqrt(3).",
        "example": [
          "For an 80 m road and angles 60°, 30°: h=x sqrt(3)=(80−x)/sqrt(3).",
          "3 x=80−x gives x=20, other distance 60 and h=20 sqrt(3)."
        ],
        "question": "Why do the two distances add to 80?",
        "options": [
          "The point lies between the two feet",
          "The poles have equal heights",
          "Every pair of distances adds"
        ],
        "correct": 0,
        "feedback": [
          "Correct. 3 x=80−x gives x=20, other distance 60 and h=20 sqrt(3).",
          "Check the reference angle, the definition and any denominator restriction. For an 80 m road and angles 60°, 30°: h=x sqrt(3)=(80−x)/sqrt(3).",
          "Check the reference angle, the definition and any denominator restriction. For an 80 m road and angles 60°, 30°: h=x sqrt(3)=(80−x)/sqrt(3)."
        ],
        "hints": [
          "For an 80 m road and angles 60°, 30°: h=x sqrt(3)=(80−x)/sqrt(3).",
          "3 x=80−x gives x=20, other distance 60 and h=20 sqrt(3)."
        ]
      },
      {
        "id": "c9-canal",
        "section": 0,
        "title": "Mark the farther observation correctly",
        "intro": "A point 20 m farther from a tower has distance width+20, not width−20.",
        "simple": "For canal width w: h=w tan 60°=(w+20)tan 30°.",
        "example": [
          "For canal width w: h=w tan 60°=(w+20)tan 30°.",
          "3 w=w+20 gives w=10 m."
        ],
        "question": "Which distance belongs to the 30° observation?",
        "options": [
          "w",
          "w−20",
          "w+20"
        ],
        "correct": 2,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. For canal width w: h=w tan 60°=(w+20)tan 30°.",
          "Check the reference angle, the definition and any denominator restriction. For canal width w: h=w tan 60°=(w+20)tan 30°.",
          "Correct. 3 w=w+20 gives w=10 m."
        ],
        "hints": [
          "For canal width w: h=w tan 60°=(w+20)tan 30°.",
          "3 w=w+20 gives w=10 m."
        ]
      },
      {
        "id": "c9-same-side-ships",
        "section": 0,
        "title": "Same-side distances subtract",
        "intro": "Two targets on the same side of a tower have a separation equal to the difference of their distances from its foot.",
        "simple": "A75 m lighthouse gives distances 75 sqrt(3) and 75 for depression 30°, 45°.",
        "example": [
          "A75 m lighthouse gives distances 75 sqrt(3) and 75 for depression 30°, 45°.",
          "Separation=75(sqrt(3)−1), because both ships are on the same ray."
        ],
        "question": "When should these distances be added instead?",
        "options": [
          "When the targets lie on opposite sides of the foot",
          "Always",
          "When their angles differ"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Separation=75(sqrt(3)−1), because both ships are on the same ray.",
          "Check the reference angle, the definition and any denominator restriction. A75 m lighthouse gives distances 75 sqrt(3) and 75 for depression 30°, 45°.",
          "Check the reference angle, the definition and any denominator restriction. A75 m lighthouse gives distances 75 sqrt(3) and 75 for depression 30°, 45°."
        ],
        "hints": [
          "A75 m lighthouse gives distances 75 sqrt(3) and 75 for depression 30°, 45°.",
          "Separation=75(sqrt(3)−1), because both ships are on the same ray."
        ]
      },
      {
        "id": "c9-opposite-banks",
        "section": 0,
        "title": "Opposite-side distances add",
        "intro": "If the vertical projection of a bridge observer lies between the banks, total width is the sum of the two horizontal runs.",
        "simple": "At height 3 m with depression 30°, 45°, the runs are 3 sqrt(3) and 3.",
        "example": [
          "At height 3 m with depression 30°, 45°, the runs are 3 sqrt(3) and 3.",
          "Width=3(sqrt(3)+1) m."
        ],
        "question": "What is the width expression?",
        "options": [
          "3 sqrt(3)−3",
          "3 sqrt(3)+3",
          "3 sqrt(3)/3"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. At height 3 m with depression 30°, 45°, the runs are 3 sqrt(3) and 3.",
          "Correct. Width=3(sqrt(3)+1) m.",
          "Check the reference angle, the definition and any denominator restriction. At height 3 m with depression 30°, 45°, the runs are 3 sqrt(3) and 3."
        ],
        "hints": [
          "At height 3 m with depression 30°, 45°, the runs are 3 sqrt(3) and 3.",
          "Width=3(sqrt(3)+1) m."
        ]
      },
      {
        "id": "c9-balloon",
        "section": 0,
        "title": "Track a constant-height target",
        "intro": "For a horizontally moving balloon, use height above eye level, then compare horizontal positions.",
        "simple": "88.2−1.2=87 m above the observer’s eyes. At 60° the run is 29 sqrt(3); at 30° it is 87 sqrt(3).",
        "example": [
          "88.2−1.2=87 m above the observer’s eyes. At 60° the run is 29 sqrt(3); at 30° it is 87 sqrt(3).",
          "Distance travelled=58 sqrt(3) m."
        ],
        "question": "Why does the angle decrease as it moves away?",
        "options": [
          "The horizontal run increases at fixed rise",
          "The balloon must be descending",
          "The observer’s height changes"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Distance travelled=58 sqrt(3) m.",
          "Check the reference angle, the definition and any denominator restriction. 88.2−1.2=87 m above the observer’s eyes. At 60° the run is 29 sqrt(3); at 30° it is 87 sqrt(3).",
          "Check the reference angle, the definition and any denominator restriction. 88.2−1.2=87 m above the observer’s eyes. At 60° the run is 29 sqrt(3); at 30° it is 87 sqrt(3)."
        ],
        "hints": [
          "88.2−1.2=87 m above the observer’s eyes. At 60° the run is 29 sqrt(3); at 30° it is 87 sqrt(3).",
          "Distance travelled=58 sqrt(3) m."
        ]
      },
      {
        "id": "c9-speed-ratio",
        "section": 0,
        "title": "A height may cancel from a time problem",
        "intro": "Use the same unknown height in each observation and a constant-speed model. You need not know the tower height.",
        "simple": "At 30° the car is h sqrt(3) away; at 60° it is h/sqrt(3) away. The difference 2 h/sqrt(3) takes 6 s.",
        "example": [
          "At 30° the car is h sqrt(3) away; at 60° it is h/sqrt(3) away. The difference 2 h/sqrt(3) takes 6 s.",
          "Remaining distance is half that difference, so remaining time is 3 s."
        ],
        "question": "What makes the time proportional to distance?",
        "options": [
          "Constant speed",
          "Equal angles",
          "A known tower height"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Remaining distance is half that difference, so remaining time is 3 s.",
          "Check the reference angle, the definition and any denominator restriction. At 30° the car is h sqrt(3) away; at 60° it is h/sqrt(3) away. The difference 2 h/sqrt(3) takes 6 s.",
          "Check the reference angle, the definition and any denominator restriction. At 30° the car is h sqrt(3) away; at 60° it is h/sqrt(3) away. The difference 2 h/sqrt(3) takes 6 s."
        ],
        "hints": [
          "At 30° the car is h sqrt(3) away; at 60° it is h/sqrt(3) away. The difference 2 h/sqrt(3) takes 6 s.",
          "Remaining distance is half that difference, so remaining time is 3 s."
        ]
      },
      {
        "id": "c9-recap-model",
        "section": 1,
        "title": "Choose a ratio from the sides",
        "intro": "Name the known and desired sides before choosing sine, cosine or tangent.",
        "simple": "Height and horizontal run suggest tangent. Height and a sloping rope suggest sine.",
        "example": [
          "Height and horizontal run suggest tangent. Height and a sloping rope suggest sine.",
          "Use consistent units, keep exact surds until the end and check whether the result is a total or a difference."
        ],
        "question": "Which ratio directly connects height and horizontal run?",
        "options": [
          "Sine",
          "Cosine",
          "Tangent"
        ],
        "correct": 2,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. Height and horizontal run suggest tangent. Height and a sloping rope suggest sine.",
          "Check the reference angle, the definition and any denominator restriction. Height and horizontal run suggest tangent. Height and a sloping rope suggest sine.",
          "Correct. Use consistent units, keep exact surds until the end and check whether the result is a total or a difference."
        ],
        "hints": [
          "Height and horizontal run suggest tangent. Height and a sloping rope suggest sine.",
          "Use consistent units, keep exact surds until the end and check whether the result is a total or a difference."
        ]
      },
      {
        "id": "c9-recap-interpret",
        "section": 1,
        "title": "Check the answer against the picture",
        "intro": "A valid equation still needs a sensible interpretation: lengths positive, hypotenuse longest, and the requested structure isolated.",
        "simple": "A slide length must exceed its non-zero vertical height.",
        "example": [
          "A slide length must exceed its non-zero vertical height.",
          "If your result is shorter, check whether you multiplied by sine instead of dividing."
        ],
        "question": "Can a straight slide be shorter than its vertical drop?",
        "options": [
          "Yes",
          "No",
          "Only at 30°"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. A slide length must exceed its non-zero vertical height.",
          "Correct. If your result is shorter, check whether you multiplied by sine instead of dividing.",
          "Check the reference angle, the definition and any denominator restriction. A slide length must exceed its non-zero vertical height."
        ],
        "hints": [
          "A slide length must exceed its non-zero vertical height.",
          "If your result is shorter, check whether you multiplied by sine instead of dividing."
        ]
      }
    ]
  },
  {
    "number": 10,
    "slug": "circles",
    "title": "Circles",
    "sections": [
      "10.1 Introduction",
      "10.2 Tangent to a Circle",
      "10.3 Number of Tangents from a Point on a Circle",
      "10.4 Summary"
    ],
    "summary": [
      [
        "Tangent and normal",
        "A tangent meets a circle once and is perpendicular to the radius at contact."
      ],
      [
        "Equal tangents",
        "Two tangent segments from one external point have equal lengths."
      ],
      [
        "Proof applications",
        "Use congruence, angle sums, chord bisection and equal tangent segments."
      ]
    ],
    "challenge": "Prove an equal-tangent result and use it to solve a fresh circumscribed-figure problem.",
    "steps": [
      {
        "id": "c10-recall",
        "section": 0,
        "title": "Recall the circle’s fixed distance",
        "intro": "A circle consists of points at one fixed positive distance, the radius, from its centre.",
        "simple": "A point closer than the radius is inside; farther is outside.",
        "example": [
          "A point closer than the radius is inside; farther is outside.",
          "This comparison determines how many tangents can pass through the point."
        ],
        "question": "Where is a point 3 units from the centre of a radius 5 circle?",
        "options": [
          "Inside",
          "On the circle",
          "Outside"
        ],
        "correct": 0,
        "feedback": [
          "Correct. This comparison determines how many tangents can pass through the point.",
          "Check the reference angle, the definition and any denominator restriction. A point closer than the radius is inside; farther is outside.",
          "Check the reference angle, the definition and any denominator restriction. A point closer than the radius is inside; farther is outside."
        ],
        "hints": [
          "A point closer than the radius is inside; farther is outside.",
          "This comparison determines how many tangents can pass through the point."
        ],
        "explorer": "tangent"
      },
      {
        "id": "c10-secant",
        "section": 1,
        "title": "Distinguish a line from its chord",
        "intro": "A secant line meets a circle in two points. The segment between those points is a chord.",
        "simple": "A diameter is a chord through the centre; the whole line containing it is a secant.",
        "example": [
          "A diameter is a chord through the centre; the whole line containing it is a secant.",
          "A tangent line meets the circle at exactly one point."
        ],
        "question": "A line meeting the circle twice is called what?",
        "options": [
          "Radius",
          "Secant",
          "Tangent"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. A diameter is a chord through the centre; the whole line containing it is a secant.",
          "Correct. A tangent line meets the circle at exactly one point.",
          "Check the reference angle, the definition and any denominator restriction. A diameter is a chord through the centre; the whole line containing it is a secant."
        ],
        "hints": [
          "A diameter is a chord through the centre; the whole line containing it is a secant.",
          "A tangent line meets the circle at exactly one point."
        ]
      },
      {
        "id": "c10-contact",
        "section": 1,
        "title": "One contact point",
        "intro": "The tangent and the circle share a single point, called the point of contact or point of tangency.",
        "simple": "There is a tangent at every point of a circle.",
        "example": [
          "There is a tangent at every point of a circle.",
          "A circle has infinitely many tangents overall, but only one at a specified contact point."
        ],
        "question": "How many tangents can the circle have in total?",
        "options": [
          "One",
          "Two",
          "Infinitely many"
        ],
        "correct": 2,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. There is a tangent at every point of a circle.",
          "Check the reference angle, the definition and any denominator restriction. There is a tangent at every point of a circle.",
          "Correct. A circle has infinitely many tangents overall, but only one at a specified contact point."
        ],
        "hints": [
          "There is a tangent at every point of a circle.",
          "A circle has infinitely many tangents overall, but only one at a specified contact point."
        ]
      },
      {
        "id": "c10-radius-perpendicular",
        "section": 1,
        "title": "The contact radius is perpendicular",
        "intro": "Theorem 10.1: the tangent is perpendicular to the radius through the contact point.",
        "simple": "For tangent PT at T and centre O, OT⊥PT.",
        "example": [
          "For tangent PT at T and centre O, OT⊥PT.",
          "The right angle is at T, not at O or at the external point P."
        ],
        "question": "Where is the right angle?",
        "options": [
          "The contact point",
          "The centre",
          "The external point"
        ],
        "correct": 0,
        "feedback": [
          "Correct. The right angle is at T, not at O or at the external point P.",
          "Check the reference angle, the definition and any denominator restriction. For tangent PT at T and centre O, OT⊥PT.",
          "Check the reference angle, the definition and any denominator restriction. For tangent PT at T and centre O, OT⊥PT."
        ],
        "hints": [
          "For tangent PT at T and centre O, OT⊥PT.",
          "The right angle is at T, not at O or at the external point P."
        ]
      },
      {
        "id": "c10-theorem-proof",
        "section": 1,
        "title": "Why the tangent radius is shortest",
        "intro": "Every other point Q on the tangent line lies outside the circle, so OQ exceeds the contact radius OP.",
        "simple": "OP is the shortest segment from O to the tangent line.",
        "example": [
          "OP is the shortest segment from O to the tangent line.",
          "The shortest distance from a point to a line is perpendicular. Therefore OP⊥the tangent."
        ],
        "question": "Which fact finishes this proof?",
        "options": [
          "Equal arcs",
          "Shortest distance to a line is perpendicular",
          "Every chord is a diameter"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. OP is the shortest segment from O to the tangent line.",
          "Correct. The shortest distance from a point to a line is perpendicular. Therefore OP⊥the tangent.",
          "Check the reference angle, the definition and any denominator restriction. OP is the shortest segment from O to the tangent line."
        ],
        "hints": [
          "OP is the shortest segment from O to the tangent line.",
          "The shortest distance from a point to a line is perpendicular. Therefore OP⊥the tangent."
        ]
      },
      {
        "id": "c10-normal",
        "section": 1,
        "title": "The normal goes through the centre",
        "intro": "The line containing the contact radius is called the normal. It is perpendicular to the tangent.",
        "simple": "At a contact P, there is a unique perpendicular to the tangent through P.",
        "example": [
          "At a contact P, there is a unique perpendicular to the tangent through P.",
          "Since OP is that perpendicular, the normal passes through O."
        ],
        "question": "What is the normal at P?",
        "options": [
          "The tangent itself",
          "The line OP",
          "Any chord through P"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. At a contact P, there is a unique perpendicular to the tangent through P.",
          "Correct. Since OP is that perpendicular, the normal passes through O.",
          "Check the reference angle, the definition and any denominator restriction. At a contact P, there is a unique perpendicular to the tangent through P."
        ],
        "hints": [
          "At a contact P, there is a unique perpendicular to the tangent through P.",
          "Since OP is that perpendicular, the normal passes through O."
        ]
      },
      {
        "id": "c10-tangent-length",
        "section": 1,
        "title": "A tangent line has no finite length",
        "intro": "When a question gives a tangent length from an external point, it means the segment to the contact point.",
        "simple": "If centre-to-point distance is 13 and radius 5, the tangent segment length is sqrt(13²−5²)=12.",
        "example": [
          "If centre-to-point distance is 13 and radius 5, the tangent segment length is sqrt(13²−5²)=12.",
          "The sloping centre-to-point segment is the hypotenuse in this right triangle."
        ],
        "question": "Which length is the hypotenuse?",
        "options": [
          "Radius",
          "Tangent segment",
          "Centre to external point"
        ],
        "correct": 2,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. If centre-to-point distance is 13 and radius 5, the tangent segment length is sqrt(13²−5²)=12.",
          "Check the reference angle, the definition and any denominator restriction. If centre-to-point distance is 13 and radius 5, the tangent segment length is sqrt(13²−5²)=12.",
          "Correct. The sloping centre-to-point segment is the hypotenuse in this right triangle."
        ],
        "hints": [
          "If centre-to-point distance is 13 and radius 5, the tangent segment length is sqrt(13²−5²)=12.",
          "The sloping centre-to-point segment is the hypotenuse in this right triangle."
        ]
      },
      {
        "id": "c10-parallel-tangents",
        "section": 1,
        "title": "At most two parallel tangents",
        "intro": "Tangents at the endpoints of a diameter are both perpendicular to that diameter, so they are parallel.",
        "simple": "For a chosen direction, the circle has one supporting tangent on each side.",
        "example": [
          "For a chosen direction, the circle has one supporting tangent on each side.",
          "Thus at most two tangents can be parallel to each other."
        ],
        "question": "What is the maximum number of parallel tangents?",
        "options": [
          "1",
          "2",
          "Infinitely many"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. For a chosen direction, the circle has one supporting tangent on each side.",
          "Correct. Thus at most two tangents can be parallel to each other.",
          "Check the reference angle, the definition and any denominator restriction. For a chosen direction, the circle has one supporting tangent on each side."
        ],
        "hints": [
          "For a chosen direction, the circle has one supporting tangent on each side.",
          "Thus at most two tangents can be parallel to each other."
        ]
      },
      {
        "id": "c10-point-counts",
        "section": 2,
        "title": "Count by the point’s position",
        "intro": "A point inside the circle has no tangent through it; on the circle it has one; outside it has two.",
        "simple": "Compare centre distance d with radius r: d<r gives 0, d=r gives 1, d>r gives 2.",
        "example": [
          "Compare centre distance d with radius r: d<r gives 0, d=r gives 1, d>r gives 2.",
          "Do not confuse this fixed-point count with infinitely many tangent lines over the entire circle."
        ],
        "question": "How many through an external point?",
        "options": [
          "0",
          "1",
          "2"
        ],
        "correct": 2,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. Compare centre distance d with radius r: d<r gives 0, d=r gives 1, d>r gives 2.",
          "Check the reference angle, the definition and any denominator restriction. Compare centre distance d with radius r: d<r gives 0, d=r gives 1, d>r gives 2.",
          "Correct. Do not confuse this fixed-point count with infinitely many tangent lines over the entire circle."
        ],
        "hints": [
          "Compare centre distance d with radius r: d<r gives 0, d=r gives 1, d>r gives 2.",
          "Do not confuse this fixed-point count with infinitely many tangent lines over the entire circle."
        ],
        "explorer": "tangent"
      },
      {
        "id": "c10-equal-tangents",
        "section": 2,
        "title": "Equal segments from one external point",
        "intro": "Theorem 10.2: two tangents PQ, PR from one external point P have equal lengths.",
        "simple": "Join OP, OQ, OR. The two triangles have right contact angles, equal radii and common hypotenuse OP.",
        "example": [
          "Join OP, OQ, OR. The two triangles have right contact angles, equal radii and common hypotenuse OP.",
          "RHS congruence gives PQ=PR."
        ],
        "question": "Which congruence criterion applies?",
        "options": [
          "RHS",
          "AAA congruence",
          "Equal area"
        ],
        "correct": 0,
        "feedback": [
          "Correct. RHS congruence gives PQ=PR.",
          "Check the reference angle, the definition and any denominator restriction. Join OP, OQ, OR. The two triangles have right contact angles, equal radii and common hypotenuse OP.",
          "Check the reference angle, the definition and any denominator restriction. Join OP, OQ, OR. The two triangles have right contact angles, equal radii and common hypotenuse OP."
        ],
        "hints": [
          "Join OP, OQ, OR. The two triangles have right contact angles, equal radii and common hypotenuse OP.",
          "RHS congruence gives PQ=PR."
        ]
      },
      {
        "id": "c10-bisector",
        "section": 2,
        "title": "The centre lies on the angle bisector",
        "intro": "The same congruent right triangles also give equal angles at the external point.",
        "simple": "∠QPO=∠OPR, so OP bisects the angle between PQ and PR.",
        "example": [
          "∠QPO=∠OPR, so OP bisects the angle between PQ and PR.",
          "If the full angle is 80°, each half is 40°."
        ],
        "question": "What is each half of an 80° angle?",
        "options": [
          "40°",
          "50°",
          "80°"
        ],
        "correct": 0,
        "feedback": [
          "Correct. If the full angle is 80°, each half is 40°.",
          "Check the reference angle, the definition and any denominator restriction. ∠QPO=∠OPR, so OP bisects the angle between PQ and PR.",
          "Check the reference angle, the definition and any denominator restriction. ∠QPO=∠OPR, so OP bisects the angle between PQ and PR."
        ],
        "hints": [
          "∠QPO=∠OPR, so OP bisects the angle between PQ and PR.",
          "If the full angle is 80°, each half is 40°."
        ]
      },
      {
        "id": "c10-supplement",
        "section": 2,
        "title": "Central and tangent angles supplement",
        "intro": "Join the centre to both contact points. The quadrilateral has two right angles.",
        "simple": "For tangents TP, TQ, ∠POQ+∠PTQ=180°.",
        "example": [
          "For tangents TP, TQ, ∠POQ+∠PTQ=180°.",
          "If the central angle is 110°, the tangent angle is 70°."
        ],
        "question": "What is the tangent angle for central angle 124°?",
        "options": [
          "56°",
          "62°",
          "124°"
        ],
        "correct": 0,
        "feedback": [
          "Correct. If the central angle is 110°, the tangent angle is 70°.",
          "Check the reference angle, the definition and any denominator restriction. For tangents TP, TQ, ∠POQ+∠PTQ=180°.",
          "Check the reference angle, the definition and any denominator restriction. For tangents TP, TQ, ∠POQ+∠PTQ=180°."
        ],
        "hints": [
          "For tangents TP, TQ, ∠POQ+∠PTQ=180°.",
          "If the central angle is 110°, the tangent angle is 70°."
        ]
      },
      {
        "id": "c10-concentric-chord",
        "section": 2,
        "title": "A chord can be tangent to another circle",
        "intro": "For concentric circles, a chord of the larger may touch the smaller. The common radius to contact is perpendicular to the chord.",
        "simple": "The perpendicular from the centre bisects the larger chord.",
        "example": [
          "The perpendicular from the centre bisects the larger chord.",
          "With radii 5 and 3, half-chord=sqrt(25−9)=4; full chord=8."
        ],
        "question": "Why double the computed 4?",
        "options": [
          "It is only half the chord",
          "The circles have two centres",
          "Every tangent is twice a radius"
        ],
        "correct": 0,
        "feedback": [
          "Correct. With radii 5 and 3, half-chord=sqrt(25−9)=4; full chord=8.",
          "Check the reference angle, the definition and any denominator restriction. The perpendicular from the centre bisects the larger chord.",
          "Check the reference angle, the definition and any denominator restriction. The perpendicular from the centre bisects the larger chord."
        ],
        "hints": [
          "The perpendicular from the centre bisects the larger chord.",
          "With radii 5 and 3, half-chord=sqrt(25−9)=4; full chord=8."
        ]
      },
      {
        "id": "c10-tangent-sums",
        "section": 2,
        "title": "Use equal tangents at each vertex",
        "intro": "A circumscribed quadrilateral touches the circle on all four sides. Split each side into its two tangent segments.",
        "simple": "From each vertex the two contact lengths are equal. Replacing and regrouping gives AB+CD=AD+BC.",
        "example": [
          "From each vertex the two contact lengths are equal. Replacing and regrouping gives AB+CD=AD+BC.",
          "These are sums of opposite sides, not necessarily equality of individual opposite sides."
        ],
        "question": "Which relation must hold?",
        "options": [
          "AB=CD always",
          "AB+CD=AD+BC",
          "AB+BC=CD+DA always"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. From each vertex the two contact lengths are equal. Replacing and regrouping gives AB+CD=AD+BC.",
          "Correct. These are sums of opposite sides, not necessarily equality of individual opposite sides.",
          "Check the reference angle, the definition and any denominator restriction. From each vertex the two contact lengths are equal. Replacing and regrouping gives AB+CD=AD+BC."
        ],
        "hints": [
          "From each vertex the two contact lengths are equal. Replacing and regrouping gives AB+CD=AD+BC.",
          "These are sums of opposite sides, not necessarily equality of individual opposite sides."
        ]
      },
      {
        "id": "c10-rhombus",
        "section": 2,
        "title": "Add the parallelogram condition",
        "intro": "A circumscribed parallelogram already has equal opposite sides. The tangent-sum relation then forces adjacent sides equal.",
        "simple": "AB=CD and AD=BC, so AB+CD=AD+BC becomes 2 AB=2 AD.",
        "example": [
          "AB=CD and AD=BC, so AB+CD=AD+BC becomes 2 AB=2 AD.",
          "All four sides are equal: the parallelogram is a rhombus."
        ],
        "question": "Must it be a square?",
        "options": [
          "Yes",
          "No, right angles are not established",
          "Only if the radius is 4"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. AB=CD and AD=BC, so AB+CD=AD+BC becomes 2 AB=2 AD.",
          "Correct. All four sides are equal: the parallelogram is a rhombus.",
          "Check the reference angle, the definition and any denominator restriction. AB=CD and AD=BC, so AB+CD=AD+BC becomes 2 AB=2 AD."
        ],
        "hints": [
          "AB=CD and AD=BC, so AB+CD=AD+BC becomes 2 AB=2 AD.",
          "All four sides are equal: the parallelogram is a rhombus."
        ]
      },
      {
        "id": "c10-incircle-sides",
        "section": 2,
        "title": "Use area to finish an incircle problem",
        "intro": "For a triangle with an incircle, area equals radius×semiperimeter, because joining the centre to vertices produces three triangles of altitude r.",
        "simple": "With BC split into 8 and 6 and radius 4, let tangent length from A be x. Then sides are x+8, x+6, 14 and s=x+14.",
        "example": [
          "With BC split into 8 and 6 and radius 4, let tangent length from A be x. Then sides are x+8, x+6, 14 and s=x+14.",
          "Equating Heron area squared with[4(x+14)]² gives x=7, hence AB=15 and AC=13."
        ],
        "question": "What is the triangle area formula used here?",
        "options": [
          "r×semiperimeter",
          "r×perimeter",
          "πr²"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Equating Heron area squared with[4(x+14)]² gives x=7, hence AB=15 and AC=13.",
          "Check the reference angle, the definition and any denominator restriction. With BC split into 8 and 6 and radius 4, let tangent length from A be x. Then sides are x+8, x+6, 14 and s=x+14.",
          "Check the reference angle, the definition and any denominator restriction. With BC split into 8 and 6 and radius 4, let tangent length from A be x. Then sides are x+8, x+6, 14 and s=x+14."
        ],
        "hints": [
          "With BC split into 8 and 6 and radius 4, let tangent length from A be x. Then sides are x+8, x+6, 14 and s=x+14.",
          "Equating Heron area squared with[4(x+14)]² gives x=7, hence AB=15 and AC=13."
        ]
      },
      {
        "id": "c10-opposite-central",
        "section": 2,
        "title": "Use vertex angle bisectors",
        "intro": "The centre of a circle inscribed in a quadrilateral lies on each vertex angle bisector.",
        "simple": "∠AOB=180°−(A+B)/2 and∠COD=180°−(C+D)/2.",
        "example": [
          "∠AOB=180°−(A+B)/2 and∠COD=180°−(C+D)/2.",
          "Since A+B+C+D=360°, these central angles sum to 180°."
        ],
        "question": "What is ∠AOB+∠COD?",
        "options": [
          "90°",
          "180°",
          "360°"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. ∠AOB=180°−(A+B)/2 and∠COD=180°−(C+D)/2.",
          "Correct. Since A+B+C+D=360°, these central angles sum to 180°.",
          "Check the reference angle, the definition and any denominator restriction. ∠AOB=180°−(A+B)/2 and∠COD=180°−(C+D)/2."
        ],
        "hints": [
          "∠AOB=180°−(A+B)/2 and∠COD=180°−(C+D)/2.",
          "Since A+B+C+D=360°, these central angles sum to 180°."
        ]
      },
      {
        "id": "c10-three-tangents",
        "section": 2,
        "title": "Three tangents can make a right central angle",
        "intro": "For parallel tangents and a third tangent meeting them at A, B, the centre lines OA, OB bisect supplementary angles at A, B.",
        "simple": "Their halves sum to 90°.",
        "example": [
          "Their halves sum to 90°.",
          "The triangle AOB then has∠AOB=90°. A proof must identify the parallel lines and angle bisectors."
        ],
        "question": "What justifies the half angles?",
        "options": [
          "Equal tangent right-triangle congruence",
          "The sketch looks symmetric",
          "All circle angles are bisected"
        ],
        "correct": 0,
        "feedback": [
          "Correct. The triangle AOB then has∠AOB=90°. A proof must identify the parallel lines and angle bisectors.",
          "Check the reference angle, the definition and any denominator restriction. Their halves sum to 90°.",
          "Check the reference angle, the definition and any denominator restriction. Their halves sum to 90°."
        ],
        "hints": [
          "Their halves sum to 90°.",
          "The triangle AOB then has∠AOB=90°. A proof must identify the parallel lines and angle bisectors."
        ]
      },
      {
        "id": "c10-recap-proof",
        "section": 3,
        "title": "State the theorem before applying it",
        "intro": "A right-triangle calculation needs the radius-tangent perpendicularity, not just an approximate right angle in a drawing.",
        "simple": "For radius 7 and external distance 25, tangent length=sqrt(625−49)=24.",
        "example": [
          "For radius 7 and external distance 25, tangent length=sqrt(625−49)=24.",
          "The radius at contact gives the right angle needed for Pythagoras."
        ],
        "question": "Why is Pythagoras valid?",
        "options": [
          "The contact radius is perpendicular to the tangent",
          "Every triangle near a circle is right",
          "The distance 25 is a diameter"
        ],
        "correct": 0,
        "feedback": [
          "Correct. The radius at contact gives the right angle needed for Pythagoras.",
          "Check the reference angle, the definition and any denominator restriction. For radius 7 and external distance 25, tangent length=sqrt(625−49)=24.",
          "Check the reference angle, the definition and any denominator restriction. For radius 7 and external distance 25, tangent length=sqrt(625−49)=24."
        ],
        "hints": [
          "For radius 7 and external distance 25, tangent length=sqrt(625−49)=24.",
          "The radius at contact gives the right angle needed for Pythagoras."
        ]
      },
      {
        "id": "c10-recap-domain",
        "section": 3,
        "title": "Keep the fixed-point count separate",
        "intro": "Finish by checking what the question counts or measures: all tangents, tangents through a fixed point, or tangent segment lengths.",
        "simple": "An outside point has two tangent segments of equal positive length.",
        "example": [
          "An outside point has two tangent segments of equal positive length.",
          "A point on the circle has one tangent line; a point inside has none."
        ],
        "question": "For an inside point, can a line through it be tangent?",
        "options": [
          "Yes",
          "No",
          "Only when horizontal"
        ],
        "correct": 1,
        "feedback": [
          "Check the reference angle, the definition and any denominator restriction. An outside point has two tangent segments of equal positive length.",
          "Correct. A point on the circle has one tangent line; a point inside has none.",
          "Check the reference angle, the definition and any denominator restriction. An outside point has two tangent segments of equal positive length."
        ],
        "hints": [
          "An outside point has two tangent segments of equal positive length.",
          "A point on the circle has one tangent line; a point inside has none."
        ]
      }
    ]
  }
];
