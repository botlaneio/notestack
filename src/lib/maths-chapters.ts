import {appendices} from './maths-appendices.ts';
import {finalChapters} from './maths-chapters-13-14.ts';
import {mensurationChapters} from './maths-chapters-11-12.ts';
import {partTwoChapters} from './maths-chapters-8-10.ts';
import {chapterExpansions} from './chapter-expansions.ts';
import {geometryChapters} from './maths-chapters-6-7.ts';
import {steps as realSteps, sections as realSections, type LessonStep} from './real-numbers.ts';
export type Chapter = {number:number; code?:string; subject?:'maths'|'science'|'social-science';part?:number;sourcePending?:string; slug:string; title:string; sections:string[]; summary:string[][]; challenge:string; steps:LessonStep[];legacyIds?:string[]};
export const realNumbers: Chapter = {
 number:1,slug:'real-numbers',title:'Real Numbers',sections:realSections,steps:realSteps,
 summary:[['Prime factorisation','Composite numbers have a unique set of prime factors, apart from order.'],['HCF & LCM','Smaller shared prime powers for HCF; larger required prime powers for LCM.'],['Irrational numbers','Non-terminating, non-repeating decimals cannot be expressed as ratios of integers.'],['Proof by contradiction','A lowest-terms fraction cannot have a common factor in its numerator and denominator.']],
 challenge:'Complete both textbook exercises, then try the independent chapter check. Have your written proofs verified by a teacher.'
};
const foundationChapters: Chapter[] = [
  {
    "number": 2,
    "slug": "polynomials",
    "title": "Polynomials",
    "sections": [
      "2.1 Introduction",
      "2.2 Geometrical Meaning of the Zeroes of a Polynomial",
      "2.3 Relationship between Zeroes and Coefficients of a Polynomial",
      "2.4 Summary"
    ],
    "summary": [
      [
        "Degree & zeroes",
        "The degree is the highest power with a non-zero coefficient. A zero makes p(x) equal to 0."
      ],
      [
        "Read the graph",
        "Real zeroes are the x-coordinates where y = p(x) meets the x-axis, including a touch."
      ],
      [
        "Quadratic relationships",
        "For ax² + bx + c, a ≠ 0: α + β = −b/a and αβ = c/a."
      ],
      [
        "Cubic relationships",
        "For ax³ + bx² + cx + d: sum = −b/a, pairwise-product sum = c/a, product = −d/a."
      ]
    ],
    "challenge": "Find the zeroes of x² − 7x + 10 and verify their sum and product without looking at the examples.",
    "steps": [
      {
        "id": "degree",
        "section": 0,
        "title": "What makes it a polynomial?",
        "intro": "A polynomial in x is a sum of terms with real coefficients and non-negative integer powers of x. After like terms are combined, its degree is the highest power with a non-zero coefficient.",
        "simple": "Powers like x, x² and x³ are allowed. Terms like 1/x or √x are not polynomial terms in x.",
        "example": [
          "3x² − 2x + 7 has degree 2: quadratic.",
          "5x − 4 has degree 1: linear.",
          "A non-zero constant has degree 0; the zero polynomial has no defined degree."
        ],
        "question": "Which expression is a polynomial of degree 3?",
        "options": [
          "x³ − 4x + 1",
          "1/x³ + 2",
          "x² + √x"
        ],
        "correct": 0,
        "feedback": [
          "Yes. Its highest non-zero power is 3, and all powers are non-negative integers.",
          "1/x³ is x⁻³. A negative exponent is not allowed here.",
          "√x = x^(1/2), whose exponent is not an integer."
        ],
        "hints": [
          "Check both the powers and the highest non-zero power.",
          "A cubic has a non-zero x³ term and no higher power."
        ]
      },
      {
        "id": "evaluate",
        "section": 0,
        "title": "Put a number in place of x",
        "intro": "The value p(k) is found by replacing every x with k. A number k is a zero of p if p(k) = 0.",
        "simple": "A zero is an input that makes the output exactly zero. It is not necessarily the number 0.",
        "example": [
          "p(x) = x² − 4",
          "p(2) = 2² − 4 = 0, so 2 is a zero.",
          "p(0) = −4, so 0 is not a zero."
        ],
        "question": "For p(x) = 2x − 6, which number is a zero?",
        "options": [
          "0",
          "3",
          "6"
        ],
        "correct": 1,
        "feedback": [
          "p(0) = −6, not 0.",
          "Correct. p(3) = 2 × 3 − 6 = 0.",
          "p(6) = 12 − 6 = 6, not 0."
        ],
        "hints": [
          "Set 2x − 6 equal to 0.",
          "2x = 6, so divide by 2."
        ]
      },
      {
        "id": "graph",
        "section": 1,
        "title": "See a zero on the x-axis",
        "intro": "On the graph y = p(x), a zero occurs wherever y = 0. The x-axis is exactly the set of points where y = 0. Switch the graph below and count the distinct meeting points.",
        "simple": "Find where the curve crosses or just touches the horizontal axis. Read the x-value, not the y-value.",
        "example": [
          "For y = x² − 4, the curve meets the x-axis at (−2, 0) and (2, 0).",
          "The zeroes are −2 and 2, not the coordinate pairs."
        ],
        "question": "A graph meets the x-axis at (−3, 0) and (1, 0). What are its zeroes?",
        "options": [
          "0 and 0",
          "−3 and 1",
          "−3 and 0"
        ],
        "correct": 1,
        "feedback": [
          "Those are the y-coordinates; they are 0 at every x-axis meeting.",
          "Exactly. The zeroes are the x-coordinates −3 and 1.",
          "Read the x-coordinate from each meeting point."
        ],
        "hints": [
          "A zero is an input x for which the output y is 0.",
          "Look at the first coordinate of each ordered pair."
        ],
        "explorer": "polynomial"
      },
      {
        "id": "touch",
        "section": 1,
        "title": "Touching counts too",
        "intro": "A quadratic graph can meet the x-axis at two distinct points, touch it at one point, or miss it entirely. These correspond to 2, 1 or 0 distinct real zeroes.",
        "simple": "A curve does not have to cross the axis. A touch still means its output is zero.",
        "example": [
          "y = x² − 4: two distinct real zeroes.",
          "y = x²: one distinct real zero, 0.",
          "y = x² + 4: no real zeroes."
        ],
        "question": "How many distinct real zeroes does p(x) = x² have?",
        "options": [
          "0",
          "1",
          "2"
        ],
        "correct": 1,
        "feedback": [
          "p(0) = 0, so there is a real zero.",
          "Yes. The curve touches the axis only at x = 0.",
          "0 is a repeated zero, but there is only one distinct x-value."
        ],
        "hints": [
          "Try x = 0.",
          "Count different x-values, not how many times a factor repeats."
        ]
      },
      {
        "id": "at-most",
        "section": 1,
        "title": "Degree gives an upper limit",
        "intro": "A non-zero polynomial of degree n has at most n distinct real zeroes. It can have fewer. A cubic can have at most 3 distinct real zeroes.",
        "simple": "The degree gives a maximum, not a promise that every zero will be real and different.",
        "example": [
          "x³ − x = x(x − 1)(x + 1) has zeroes −1, 0, 1.",
          "x³ has only one distinct real zero: 0."
        ],
        "question": "Which statement about a cubic polynomial is correct?",
        "options": [
          "It always has 3 distinct real zeroes",
          "It has at most 3 distinct real zeroes",
          "It cannot have 1 real zero"
        ],
        "correct": 1,
        "feedback": [
          "Repeated zeroes and non-real roots can reduce the number of distinct real zeroes.",
          "Correct. “At most” is essential.",
          "x³ is a counterexample: its only distinct real zero is 0."
        ],
        "hints": [
          "Compare x³ with x³ − x.",
          "Degree 3 limits the maximum to 3."
        ]
      },
      {
        "id": "sum-product",
        "section": 2,
        "title": "Two zeroes leave two clues",
        "intro": "If α and β are the zeroes of ax² + bx + c, with a ≠ 0, then α + β = −b/a and αβ = c/a. Keep the signs attached to a, b and c.",
        "simple": "The coefficient of x tells you the sum after changing its sign and dividing by a. The constant tells you the product after dividing by a.",
        "example": [
          "For x² − 5x + 6: a = 1, b = −5, c = 6.",
          "Sum = −(−5)/1 = 5; product = 6/1 = 6.",
          "Its zeroes 2 and 3 agree: 2 + 3 = 5, 2 × 3 = 6."
        ],
        "question": "For 2x² − 7x + 3, what are the sum and product of its zeroes?",
        "options": [
          "Sum = −7/2, product = 3",
          "Sum = 7/2, product = 3/2",
          "Sum = 7, product = 3"
        ],
        "correct": 1,
        "feedback": [
          "Change the sign of b for the sum, and divide both expressions by a.",
          "Yes. −b/a = 7/2 and c/a = 3/2.",
          "The leading coefficient is 2; dividing by it matters."
        ],
        "hints": [
          "Here a = 2, b = −7 and c = 3.",
          "Use −(−7)/2 and 3/2."
        ]
      },
      {
        "id": "factor-verify",
        "section": 2,
        "title": "Find them, then verify",
        "intro": "Factor the polynomial to find its zeroes. If a product is zero, at least one factor is zero. Then compare the sum and product with the coefficient formulas.",
        "simple": "Write the polynomial as multiplied brackets. Set each bracket equal to zero.",
        "example": [
          "x² − x − 6 = (x − 3)(x + 2).",
          "The zeroes are 3 and −2.",
          "Their sum is 1 = −(−1)/1; product is −6 = −6/1."
        ],
        "question": "Which pair gives the zeroes of x² − x − 6?",
        "options": [
          "3 and 2",
          "−3 and 2",
          "3 and −2"
        ],
        "correct": 2,
        "feedback": [
          "3 × 2 is +6, but the required product is −6.",
          "The sum would be −1, whereas −b/a = 1.",
          "Correct. Both substitution and the sum/product check work."
        ],
        "hints": [
          "Find two numbers with sum 1 and product −6.",
          "One number is positive and the other negative."
        ]
      },
      {
        "id": "construct",
        "section": 2,
        "title": "Build a polynomial from its zeroes",
        "intro": "A monic quadratic with zeroes α and β is x² − (α + β)x + αβ. Any non-zero constant multiple has the same zeroes.",
        "simple": "“Monic” means the x² coefficient is 1. Add the zeroes and multiply them to build the coefficients.",
        "example": [
          "Zeroes 1 and 4 give sum 5 and product 4.",
          "A monic polynomial is x² − 5x + 4 = (x − 1)(x − 4)."
        ],
        "question": "What is the monic quadratic with zeroes −2 and 5?",
        "options": [
          "x² − 3x − 10",
          "x² + 3x − 10",
          "x² − 3x + 10"
        ],
        "correct": 0,
        "feedback": [
          "Yes. Sum = 3 and product = −10.",
          "The x coefficient is the negative of the sum, so it is −3.",
          "The product of −2 and 5 is −10, not +10."
        ],
        "hints": [
          "Sum = −2 + 5. Product = (−2) × 5.",
          "Substitute into x² − (sum)x + product."
        ]
      },
      {
        "id": "cubic",
        "section": 2,
        "title": "Three zeroes, three relationships",
        "intro": "For a cubic ax³ + bx² + cx + d, a ≠ 0, with zeroes α, β, γ: α + β + γ = −b/a, αβ + βγ + γα = c/a, and αβγ = −d/a.",
        "simple": "For a cubic, track the sum, the sum of all three pairwise products, and the product of all three zeroes.",
        "example": [
          "For x³ − 6x² + 11x − 6, the zeroes are 1, 2 and 3.",
          "Sum = 6; pairwise sum = 2 + 6 + 3 = 11; product = 6."
        ],
        "question": "For 2x³ − 3x² − 5x + 6, what is the product of its three zeroes?",
        "options": [
          "3",
          "−3",
          "−5/2"
        ],
        "correct": 1,
        "feedback": [
          "The cubic product is −d/a, so the sign is negative.",
          "Correct. −d/a = −6/2 = −3.",
          "−5/2 is c/a, the pairwise-product sum."
        ],
        "hints": [
          "Identify the constant d and leading coefficient a.",
          "Use the cubic product formula −d/a."
        ]
      },
      {
        "id": "cubic-pairs",
        "section": 2,
        "title": "Do not miss a pair",
        "intro": "With three zeroes there are three pairwise products: αβ, βγ and γα. Their sum is c/a, where c is the coefficient of x.",
        "simple": "Multiply each pair once, then add. Do not include squares or multiply all three together.",
        "example": [
          "For zeroes −1, 2, 4: pairwise products are −2, 8 and −4.",
          "Their sum is 2."
        ],
        "question": "For zeroes 1, 2 and 4, what is αβ + βγ + γα?",
        "options": [
          "8",
          "7",
          "14"
        ],
        "correct": 2,
        "feedback": [
          "8 is the product of all three zeroes, not the pairwise sum.",
          "7 is the sum of the zeroes, not the pairwise-product sum.",
          "Yes. 1 × 2 + 2 × 4 + 4 × 1 = 2 + 8 + 4 = 14."
        ],
        "hints": [
          "Write all three pairs: (1, 2), (2, 4), (4, 1).",
          "Add 2 + 8 + 4."
        ]
      },
      {
        "id": "exit-zero",
        "section": 3,
        "title": "Your turn: read the intercepts",
        "intro": "Apply the geometrical meaning without the worked example.",
        "simple": "A zero is an x-coordinate at which the graph has height zero.",
        "example": [],
        "question": "A polynomial graph touches the x-axis at x = −1 and crosses it at x = 3. How many distinct real zeroes are shown?",
        "options": [
          "1",
          "2",
          "3"
        ],
        "correct": 1,
        "feedback": [
          "The touching point counts as well as the crossing point.",
          "Yes. The two distinct zeroes shown are −1 and 3.",
          "Count distinct meeting positions: there are two."
        ],
        "hints": [
          "Touching also gives y = 0.",
          "The positions −1 and 3 are different."
        ]
      },
      {
        "id": "exit-relations",
        "section": 3,
        "title": "Your turn: coefficients to zeroes",
        "intro": "Use the correct signs and divide by the leading coefficient.",
        "simple": "For a quadratic, sum = −b/a and product = c/a.",
        "example": [],
        "question": "For 3x² + 6x − 9, which sum/product pair is correct?",
        "options": [
          "Sum = 2, product = −3",
          "Sum = −6, product = −9",
          "Sum = −2, product = −3"
        ],
        "correct": 2,
        "feedback": [
          "The sum uses −b/a, not b/a.",
          "Divide both coefficient expressions by a = 3.",
          "Correct. −6/3 = −2 and −9/3 = −3."
        ],
        "hints": [
          "a = 3, b = 6, c = −9.",
          "Calculate −6 ÷ 3 and −9 ÷ 3."
        ]
      },
      {
        "id": "exit-build",
        "section": 3,
        "title": "Your turn: build and check",
        "intro": "Use both relationships to make a polynomial.",
        "simple": "A monic quadratic is x² − (sum)x + product.",
        "example": [],
        "question": "A monic quadratic has zeroes with sum −4 and product 3. Which polynomial fits?",
        "options": [
          "x² + 4x + 3",
          "x² − 4x + 3",
          "x² + 4x − 3"
        ],
        "correct": 0,
        "feedback": [
          "Yes. Its zeroes −1 and −3 have sum −4 and product 3.",
          "The x coefficient is minus the sum, so it must be +4.",
          "The constant is the product, which is +3."
        ],
        "hints": [
          "Negate the sum −4 for the x coefficient.",
          "The constant must be +3."
        ]
      }
    ]
  },
  {
    "number": 3,
    "slug": "linear-equations",
    "title": "Pair of Linear Equations in Two Variables",
    "sections": [
      "3.1 Introduction",
      "3.2 Graphical Method of Solution of a Pair of Linear Equations",
      "3.3 Algebraic Methods of Solving a Pair of Linear Equations",
      "3.3.1 Substitution Method",
      "3.3.2 Elimination Method",
      "3.4 Summary"
    ],
    "summary": [
      [
        "A shared solution",
        "An ordered pair must satisfy both equations, not just one."
      ],
      [
        "Graphical meaning",
        "Intersecting lines: one solution. Parallel distinct lines: none. Coincident lines: infinitely many."
      ],
      [
        "Substitution",
        "Express one variable using the other, substitute, solve and back-substitute."
      ],
      [
        "Elimination",
        "Multiply when needed, add or subtract to cancel one variable, then solve and verify."
      ]
    ],
    "challenge": "Solve 2x + y = 11 and x − y = 1 by both substitution and elimination, then check both equations.",
    "steps": [
      {
        "id": "pair",
        "section": 0,
        "title": "Two clues, one shared answer",
        "intro": "A linear equation in two variables has the form ax + by + c = 0, where a and b are not both zero. A pair asks for values of x and y that make both equations true.",
        "simple": "One equation gives a clue. The second clue must agree with the same two numbers.",
        "example": [
          "x + y = 7 and x − y = 1.",
          "(4, 3) works: 4 + 3 = 7 and 4 − 3 = 1."
        ],
        "question": "Which ordered pair solves x + y = 9 and x − y = 3?",
        "options": [
          "(3, 6)",
          "(6, 3)",
          "(9, 3)"
        ],
        "correct": 1,
        "feedback": [
          "The sum works, but 3 − 6 = −3, not 3.",
          "Yes. 6 + 3 = 9 and 6 − 3 = 3.",
          "9 + 3 = 12, not 9."
        ],
        "hints": [
          "Check both equations for each pair.",
          "Adding the equations gives 2x = 12."
        ]
      },
      {
        "id": "model",
        "section": 0,
        "title": "Name the unknowns first",
        "intro": "Let x be the price of one notebook and y the price of one pen. Translate quantities into totals before solving.",
        "simple": "Multiply the number of items by each item’s price, then add the costs.",
        "example": [
          "Two notebooks and one pen cost ₹70: 2x + y = 70.",
          "One notebook and one pen cost ₹40: x + y = 40."
        ],
        "question": "Three notebooks and two pens cost ₹110. Which equation models this with the same x and y?",
        "options": [
          "3x + 2y = 110",
          "2x + 3y = 110",
          "x + y = 110"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Each quantity multiplies its own price.",
          "The notebook and pen quantities have been swapped.",
          "This would represent only one notebook and one pen."
        ],
        "hints": [
          "x is the price of a notebook, not the number of notebooks.",
          "Three notebooks cost 3x; two pens cost 2y."
        ]
      },
      {
        "id": "intersection",
        "section": 1,
        "title": "Where two lines agree",
        "intro": "Every point on a line satisfies its equation. A point on both lines satisfies both equations. Change the second line below to explore the three possible cases.",
        "simple": "An intersection is a shared point. Its x and y coordinates are the solution.",
        "example": [
          "x + y = 4 and y = x meet at (2, 2).",
          "Both statements are true there: 2 + 2 = 4 and 2 = 2."
        ],
        "question": "Two lines meet at (3, 2). What is the solution of their pair of equations?",
        "options": [
          "x = 2, y = 3",
          "x = 3, y = 2",
          "Only x = 3 is known"
        ],
        "correct": 1,
        "feedback": [
          "The order is (x, y), not (y, x).",
          "Exactly. Read x first and y second.",
          "The intersection gives both coordinates."
        ],
        "hints": [
          "An ordered pair is written (x, y).",
          "The first coordinate is 3; the second is 2."
        ],
        "explorer": "linear"
      },
      {
        "id": "parallel",
        "section": 1,
        "title": "When the clues disagree",
        "intro": "Distinct parallel lines never meet, so their equations have no common solution. Such a pair is inconsistent.",
        "simple": "If one clue says x + y must equal 4 and another says the same sum must equal 1, both cannot be true.",
        "example": [
          "x + y = 4 and x + y = 1 are parallel distinct lines.",
          "There is no ordered pair satisfying both."
        ],
        "question": "How many solutions do x + y = 5 and x + y = 8 have?",
        "options": [
          "One",
          "Infinitely many",
          "None"
        ],
        "correct": 2,
        "feedback": [
          "A shared pair cannot have two different sums.",
          "Infinitely many applies when the two equations describe the same line.",
          "Correct. The lines are parallel and distinct."
        ],
        "hints": [
          "Subtract the equations.",
          "You would get 0 = 3, which is impossible."
        ]
      },
      {
        "id": "coincident",
        "section": 1,
        "title": "When the clues repeat",
        "intro": "If one equation is a non-zero multiple of the other, both describe the same line. Every point on that line solves the pair: infinitely many solutions.",
        "simple": "The second clue adds no new information. You are looking at the same line twice.",
        "example": [
          "x + y = 4 and 2x + 2y = 8.",
          "Dividing the second equation by 2 gives the first."
        ],
        "question": "How many solutions do x − y = 2 and 3x − 3y = 6 have?",
        "options": [
          "Infinitely many",
          "None",
          "Exactly two"
        ],
        "correct": 0,
        "feedback": [
          "Yes. The second equation is three times the first.",
          "They agree everywhere on the shared line; they do not contradict.",
          "A line contains infinitely many points, not just two."
        ],
        "hints": [
          "Divide the second equation by 3.",
          "Both become x − y = 2."
        ]
      },
      {
        "id": "ratios",
        "section": 2,
        "title": "Predict the type before solving",
        "intro": "Write both equations in standard form a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0. When the denominators are non-zero, unequal a₁/a₂ and b₁/b₂ mean one solution; equal a and b ratios but a different c ratio mean none; all three equal mean infinitely many.",
        "simple": "Compare whether the equations have proportional coefficients. Do not divide by zero; use the equations or graph directly if a ratio is undefined.",
        "example": [
          "x + y − 4 = 0 and 2x + 2y − 10 = 0.",
          "a and b ratios are 1/2; the c ratio is 2/5.",
          "Parallel distinct lines: no solution."
        ],
        "question": "For x + y − 3 = 0 and 2x − y = 0, what do the a and b ratios show?",
        "options": [
          "No solution, since the lines have coefficients",
          "A unique solution, because 1/2 ≠ −1",
          "Infinitely many solutions, because c₂ = 0"
        ],
        "correct": 1,
        "feedback": [
          "Different a and b ratios mean the lines intersect.",
          "Correct. The a and b ratios are enough; there is no need to form c₁/c₂.",
          "c₂ = 0 makes that ratio undefined; it does not imply coincident lines."
        ],
        "hints": [
          "a₁/a₂ = 1/2 and b₁/b₂ = 1/(−1).",
          "Unequal ratios for a and b imply an intersection."
        ]
      },
      {
        "id": "substitute",
        "section": 3,
        "title": "Replace one unknown with an expression",
        "intro": "In substitution, isolate one variable and replace it in the other equation. This produces an equation with only one unknown.",
        "simple": "If y equals 7 − x, use 7 − x wherever y appears in the other equation.",
        "example": [
          "x + y = 7 gives y = 7 − x.",
          "For x − y = 1, substitute: x − (7 − x) = 1.",
          "2x = 8, so x = 4; then y = 3."
        ],
        "question": "If y = 9 − x and 2x + y = 12, what is the correct substituted equation?",
        "options": [
          "2x + 9 − x = 12",
          "2x + 9 + x = 12",
          "2x + y = 9 − x"
        ],
        "correct": 0,
        "feedback": [
          "Yes. Replace y with the entire expression 9 − x.",
          "The expression is 9 − x, so the minus sign must stay.",
          "The second equation’s right side remains 12; replace only y."
        ],
        "hints": [
          "Substitute into 2x + y = 12.",
          "Use parentheses first: 2x + (9 − x) = 12."
        ]
      },
      {
        "id": "sub-sign",
        "section": 3,
        "title": "A minus sign belongs to the whole bracket",
        "intro": "When subtracting an expression, change the sign of every term inside the bracket. Then solve and back-substitute.",
        "simple": "Subtracting (8 − x) means −8 + x, not −8 − x.",
        "example": [
          "y = 8 − x and x − y = 2.",
          "x − (8 − x) = 2 → 2x − 8 = 2.",
          "x = 5, then y = 3."
        ],
        "question": "For y = 10 − x and x − y = 4, what are x and y?",
        "options": [
          "x = 3, y = 7",
          "x = 7, y = 3",
          "x = 7, y = −3"
        ],
        "correct": 1,
        "feedback": [
          "3 − 7 = −4, not 4.",
          "Correct. 2x − 10 = 4, so x = 7 and y = 3.",
          "Back-substitution gives y = 10 − 7 = 3."
        ],
        "hints": [
          "x − (10 − x) = 4.",
          "2x = 14, then use y = 10 − x."
        ]
      },
      {
        "id": "eliminate",
        "section": 4,
        "title": "Make one variable disappear",
        "intro": "Add equations when a variable has opposite coefficients; subtract when its coefficients are equal. Apply each operation to both sides.",
        "simple": "Choose the operation that cancels one unknown, leaving a single-variable equation.",
        "example": [
          "x + y = 9 and x − y = 3.",
          "Add: 2x = 12, so x = 6.",
          "Then y = 3."
        ],
        "question": "For 2x + y = 11 and x − y = 1, which operation eliminates y immediately?",
        "options": [
          "Subtract the second from the first",
          "Add the equations",
          "Multiply the equations together"
        ],
        "correct": 1,
        "feedback": [
          "Subtracting produces 2y rather than cancelling y.",
          "Yes. +y and −y add to zero; 3x = 12.",
          "Elimination uses linear combinations, not multiplying equations together."
        ],
        "hints": [
          "Look at +y and −y.",
          "Opposite coefficients cancel when added."
        ]
      },
      {
        "id": "scale",
        "section": 4,
        "title": "Sometimes you need matching coefficients",
        "intro": "Multiply every term on both sides of an equation by the same non-zero number. Then add or subtract to cancel a variable.",
        "simple": "Scale the whole equation, not just the variable you want to cancel.",
        "example": [
          "2x + 3y = 12 and 3x + 2y = 13.",
          "Multiply the first by 3: 6x + 9y = 36. Multiply the second by 2: 6x + 4y = 26.",
          "Subtract: 5y = 10, so y = 2. Then x = 3."
        ],
        "question": "To eliminate x from 2x + 3y = 12 and 3x + 2y = 13, which scaling is valid?",
        "options": [
          "First ×3, second ×2, then subtract",
          "First ×2, second ×3, then add",
          "Change only 2x to 6x"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Both x coefficients become 6, so subtraction cancels them.",
          "This gives x coefficients 4 and 9; adding does not cancel them.",
          "Changing just one term changes the equation. Scale every term and both sides."
        ],
        "hints": [
          "A common multiple of 2 and 3 is 6.",
          "Make each x coefficient equal to 6."
        ]
      },
      {
        "id": "check-both",
        "section": 4,
        "title": "The last step is a check",
        "intro": "After solving, substitute the ordered pair into both original equations. This catches sign or arithmetic slips.",
        "simple": "A pair that works in only one equation is not the answer to the system.",
        "example": [
          "For 2x + y = 11 and x − y = 1, (4, 3) works.",
          "2 × 4 + 3 = 11 and 4 − 3 = 1."
        ],
        "question": "Does (5, 1) solve 2x + y = 11 and x − y = 1?",
        "options": [
          "Yes, because 2 × 5 + 1 = 11",
          "No, because 5 − 1 = 4, not 1",
          "No, because the first equation fails"
        ],
        "correct": 1,
        "feedback": [
          "It must satisfy both equations; the second fails.",
          "Exactly. Checking just the first equation is not enough.",
          "The first equation actually works; the second is the issue."
        ],
        "hints": [
          "Evaluate both left-hand sides separately.",
          "5 − 1 = 4."
        ]
      },
      {
        "id": "exit-solve",
        "section": 5,
        "title": "Your turn: solve the pair",
        "intro": "Use either substitution or elimination.",
        "simple": "Choose a method, solve for one variable, then find the other and check both.",
        "example": [],
        "question": "Solve x + y = 8 and x − y = 2.",
        "options": [
          "(3, 5)",
          "(5, 3)",
          "(4, 4)"
        ],
        "correct": 1,
        "feedback": [
          "The difference is −2, not +2.",
          "Correct. Adding gives 2x = 10, so x = 5 and y = 3.",
          "The sum works, but the difference is 0."
        ],
        "hints": [
          "Add the equations to cancel y.",
          "2x = 10; then use x + y = 8."
        ]
      },
      {
        "id": "exit-classify",
        "section": 5,
        "title": "Your turn: read the relationship",
        "intro": "Decide how the lines are related before doing unnecessary algebra.",
        "simple": "An equation and its non-zero multiple describe the same line.",
        "example": [],
        "question": "Classify 2x + y = 6 and 4x + 2y = 12.",
        "options": [
          "Inconsistent: no solution",
          "Consistent: a unique solution",
          "Dependent and consistent: infinitely many solutions"
        ],
        "correct": 2,
        "feedback": [
          "The equations agree rather than contradict.",
          "The second equation is a multiple of the first, so it adds no new constraint.",
          "Yes. The lines coincide, giving infinitely many shared points."
        ],
        "hints": [
          "Multiply the first equation by 2.",
          "It becomes exactly the second equation."
        ]
      }
    ]
  },
  {
    "number": 4,
    "slug": "quadratic-equations",
    "title": "Quadratic Equations",
    "sections": [
      "4.1 Introduction",
      "4.2 Quadratic Equations",
      "4.3 Solution of a Quadratic Equation by Factorisation",
      "4.4 Nature of Roots",
      "4.5 Summary"
    ],
    "summary": [
      [
        "Standard form",
        "Simplify to ax² + bx + c = 0 with a ≠ 0, keeping the signs of coefficients."
      ],
      [
        "Factorisation",
        "If two factors multiply to zero, set each factor equal to zero."
      ],
      [
        "Discriminant",
        "D = b² − 4ac: positive gives two distinct real roots, zero gives two equal real roots, negative gives no real roots."
      ],
      [
        "Check the context",
        "Verify roots in the original equation and reject values that make the real-world model impossible."
      ]
    ],
    "challenge": "Solve x² − 9x + 20 = 0 by factorisation, verify both roots and predict their nature using D.",
    "steps": [
      {
        "id": "model",
        "section": 0,
        "title": "When an unknown is multiplied by itself",
        "intro": "A rectangle has width x metres and length x + 2 metres. If its area is 24 m², the model is x(x + 2) = 24. Expanding gives x² + 2x − 24 = 0.",
        "simple": "Area multiplies two lengths. If both depend on x, an x² term can appear.",
        "example": [
          "Area = width × length.",
          "x(x + 2) = 24 → x² + 2x − 24 = 0."
        ],
        "question": "A rectangle has width x and length x + 3. Its area is 40. Which equation models it?",
        "options": [
          "2x + 3 = 40",
          "x(x + 3) = 40",
          "x² + 3 = 40"
        ],
        "correct": 1,
        "feedback": [
          "This adds the lengths instead of multiplying them.",
          "Correct. Multiply width x by length x + 3.",
          "Expanding x(x + 3) gives x² + 3x, not x² + 3."
        ],
        "hints": [
          "Use area = length × width.",
          "The two dimensions are x and x + 3."
        ]
      },
      {
        "id": "standard",
        "section": 1,
        "title": "Put everything on one side",
        "intro": "A quadratic equation is ax² + bx + c = 0 with real a, b, c and a ≠ 0. The highest remaining power after simplification must be 2.",
        "simple": "Collect terms and move them to one side before deciding the degree. An x² term that cancels does not count.",
        "example": [
          "x(x + 1) = 6 → x² + x − 6 = 0.",
          "x² + x = x² + 3 → x − 3 = 0, which is linear."
        ],
        "question": "Which equation is quadratic after simplification?",
        "options": [
          "x² + 2x = x² + 5",
          "x(x + 2) = 8",
          "0x² + 4x − 1 = 0"
        ],
        "correct": 1,
        "feedback": [
          "The x² terms cancel, leaving a linear equation.",
          "Yes. It becomes x² + 2x − 8 = 0.",
          "The x² coefficient is zero, so this is linear."
        ],
        "hints": [
          "Simplify both sides and move all terms to one side.",
          "A genuine quadratic must retain a non-zero x² coefficient."
        ]
      },
      {
        "id": "coefficients",
        "section": 1,
        "title": "Keep the signs with the coefficients",
        "intro": "Read a, b and c only after writing standard form. Missing terms have coefficient 0. A minus sign is part of the coefficient.",
        "simple": "The coefficient includes its sign. If there is no x term, b is zero.",
        "example": [
          "3x² − 5x = 2 → 3x² − 5x − 2 = 0.",
          "a = 3, b = −5, c = −2."
        ],
        "question": "For 2x² − 7 = 0, what are a, b and c?",
        "options": [
          "a = 2, b = −7, c = 0",
          "a = 2, b = 0, c = −7",
          "a = 2, b = 0, c = 7"
        ],
        "correct": 1,
        "feedback": [
          "−7 is the constant term, not the x coefficient.",
          "Exactly. There is no x term, so b = 0.",
          "The constant retains its negative sign."
        ],
        "hints": [
          "Imagine writing 2x² + 0x − 7 = 0.",
          "Read the coefficients of x², x and 1 in order."
        ]
      },
      {
        "id": "roots",
        "section": 1,
        "title": "A root makes the equation true",
        "intro": "A real root is a real value of x that makes the equation true. Verify by substituting into the original equation.",
        "simple": "A root is an answer that actually works, not just a number produced by a calculation.",
        "example": [
          "For x² − 5x + 6 = 0, x = 2 gives 4 − 10 + 6 = 0.",
          "x = 3 gives 9 − 15 + 6 = 0 too."
        ],
        "question": "Is x = −2 a root of x² − 4 = 0?",
        "options": [
          "Yes, because (−2)² − 4 = 0",
          "No, roots cannot be negative",
          "No, because (−2)² = −4"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Negative numbers can be roots.",
          "A root may be negative; the equation decides.",
          "Squaring −2 gives +4."
        ],
        "hints": [
          "Substitute −2 with parentheses.",
          "(−2) × (−2) = 4."
        ]
      },
      {
        "id": "zero-product",
        "section": 2,
        "title": "A product of zero gives two routes",
        "intro": "If AB = 0 for real numbers A and B, then A = 0 or B = 0. This is the zero-product principle used in factorisation.",
        "simple": "At least one bracket must be zero. Solve each bracket separately.",
        "example": [
          "(x − 4)(x + 1) = 0.",
          "x − 4 = 0 or x + 1 = 0.",
          "So x = 4 or x = −1."
        ],
        "question": "Solve (x − 5)(x + 2) = 0.",
        "options": [
          "x = −5 or 2",
          "x = 5 or 2",
          "x = 5 or −2"
        ],
        "correct": 2,
        "feedback": [
          "Set each bracket to zero; the signs reverse when solving.",
          "x + 2 = 0 gives x = −2.",
          "Yes. Each value makes one factor zero."
        ],
        "hints": [
          "Solve x − 5 = 0 and x + 2 = 0.",
          "The two answers are on opposite sides of zero."
        ]
      },
      {
        "id": "split",
        "section": 2,
        "title": "Find the pair that fits",
        "intro": "For a monic quadratic x² + bx + c, find two numbers with sum b and product c. Use them to factor, then set each factor equal to zero.",
        "simple": "The two numbers build the brackets. The roots are the values that make those brackets zero.",
        "example": [
          "x² − 7x + 12 = x² − 3x − 4x + 12.",
          "= x(x − 3) − 4(x − 3) = (x − 3)(x − 4).",
          "Roots: 3 and 4."
        ],
        "question": "Which factorisation matches x² − 8x + 15?",
        "options": [
          "(x − 3)(x − 5)",
          "(x + 3)(x + 5)",
          "(x − 1)(x − 15)"
        ],
        "correct": 0,
        "feedback": [
          "Correct. The middle terms sum to −8x, and the constant is 15.",
          "The middle coefficient would be +8.",
          "The middle coefficient would be −16."
        ],
        "hints": [
          "Find two numbers with product 15 and sum −8.",
          "Both numbers are negative: −3 and −5."
        ]
      },
      {
        "id": "nonmonic",
        "section": 2,
        "title": "When the leading coefficient is not 1",
        "intro": "For ax² + bx + c, split bx into two terms whose coefficients have sum b and product ac. Then group and factor.",
        "simple": "Multiply a and c first to find the split. Do not forget the leading coefficient.",
        "example": [
          "2x² − 5x + 2 = 2x² − 4x − x + 2.",
          "= 2x(x − 2) − 1(x − 2) = (2x − 1)(x − 2).",
          "Roots: 1/2 and 2."
        ],
        "question": "What are the roots of 2x² − 5x + 2 = 0?",
        "options": [
          "1 and 2",
          "1/2 and 2",
          "−1/2 and −2"
        ],
        "correct": 1,
        "feedback": [
          "2x − 1 = 0 gives x = 1/2, not 1.",
          "Correct. Solve each factor: 2x − 1 = 0 or x − 2 = 0.",
          "Check the signs by substituting into the factors."
        ],
        "hints": [
          "Use (2x − 1)(x − 2) = 0.",
          "For the first factor, 2x = 1."
        ]
      },
      {
        "id": "context",
        "section": 2,
        "title": "An algebraic root may not fit the story",
        "intro": "The rectangle model x(x + 2) = 24 gives (x + 6)(x − 4) = 0. The algebraic roots are −6 and 4, but a rectangle width must be positive.",
        "simple": "Check the story after solving the equation. Negative widths do not describe this rectangle.",
        "example": [
          "x = 4 gives width 4 m and length 6 m: area 24 m².",
          "x = −6 would give negative dimensions and is rejected."
        ],
        "question": "For a rectangle with width x, length x + 3 and area 40, the roots are 5 and −8. Which width is valid?",
        "options": [
          "−8 metres",
          "5 metres",
          "Both widths"
        ],
        "correct": 1,
        "feedback": [
          "A rectangle cannot have negative width.",
          "Yes. Its length is 8 m and the area is 40 m².",
          "Both solve the algebra, but only the positive width fits the model."
        ],
        "hints": [
          "A physical width must be positive.",
          "Check 5 × (5 + 3)."
        ]
      },
      {
        "id": "discriminant",
        "section": 3,
        "title": "Predict the roots before finding them",
        "intro": "The discriminant is D = b² − 4ac. D > 0 gives two distinct real roots; D = 0 gives two equal real roots; D < 0 gives no real roots. Explore all three cases below.",
        "simple": "D tells you whether the graph crosses twice, touches once, or misses the x-axis. “No real roots” does not mean “two negative roots”.",
        "example": [
          "x² − 4 = 0: D = 16 > 0.",
          "x² = 0: D = 0.",
          "x² + 4 = 0: D = −16 < 0."
        ],
        "question": "What is the nature of the roots of x² + 2x + 5 = 0?",
        "options": [
          "Two distinct real roots",
          "Two equal real roots",
          "No real roots"
        ],
        "correct": 2,
        "feedback": [
          "Calculate D first: 2² − 4 × 1 × 5 = −16.",
          "Equal real roots require D = 0.",
          "Correct. D = −16 < 0, so there are no real roots."
        ],
        "hints": [
          "a = 1, b = 2, c = 5.",
          "Compute 4 − 20."
        ],
        "explorer": "quadratic"
      },
      {
        "id": "formula",
        "section": 3,
        "title": "Read what the square root allows",
        "intro": "For ax² + bx + c = 0, the real roots are x = (−b ± √D)/(2a) when D ≥ 0. If D is negative, √D is not a real number. This explains the three discriminant cases.",
        "simple": "A positive square root gives two different values with + and −. A zero square root gives the same answer twice.",
        "example": [
          "For x² − 6x + 9 = 0, D = 36 − 36 = 0.",
          "Both roots are −b/(2a) = 6/2 = 3."
        ],
        "question": "When D = 0, what are the two equal roots?",
        "options": [
          "b/(2a)",
          "−b/(2a)",
          "−c/a"
        ],
        "correct": 1,
        "feedback": [
          "The numerator in the quadratic formula starts with −b.",
          "Yes. The ±√D part is 0.",
          "−c/a is not the repeated-root formula."
        ],
        "hints": [
          "Put √D = 0 into the quadratic formula.",
          "Both signs give (−b ± 0)/(2a)."
        ]
      },
      {
        "id": "parameter",
        "section": 3,
        "title": "Find a value for equal roots",
        "intro": "For equal real roots, set D = 0. This can determine an unknown coefficient.",
        "simple": "Use the equal-root condition to make an equation in the parameter.",
        "example": [
          "For x² − 4x + k = 0: D = 16 − 4k.",
          "Equal roots require 16 − 4k = 0, so k = 4."
        ],
        "question": "For x² − 8x + k = 0, which k gives equal real roots?",
        "options": [
          "8",
          "16",
          "64"
        ],
        "correct": 1,
        "feedback": [
          "D would be 64 − 32 = 32, which is positive.",
          "Correct. 64 − 4k = 0 gives k = 16.",
          "D would be 64 − 256 = −192, not zero."
        ],
        "hints": [
          "D = (−8)² − 4 × 1 × k.",
          "Solve 64 − 4k = 0."
        ]
      },
      {
        "id": "exit-factor",
        "section": 4,
        "title": "Your turn: factor and solve",
        "intro": "Use the zero-product principle after factorisation.",
        "simple": "Find two numbers with sum −9 and product 20.",
        "example": [],
        "question": "Solve x² − 9x + 20 = 0.",
        "options": [
          "x = 4 or 5",
          "x = −4 or −5",
          "x = 2 or 10"
        ],
        "correct": 0,
        "feedback": [
          "Yes. (x − 4)(x − 5) = 0.",
          "Those roots have sum −9, but the equation’s roots must sum to 9.",
          "The sum would be 12, not 9."
        ],
        "hints": [
          "Factor as (x − 4)(x − 5).",
          "Set each bracket equal to zero."
        ]
      },
      {
        "id": "exit-nature",
        "section": 4,
        "title": "Your turn: name the nature",
        "intro": "Keep the sign of b when identifying coefficients, then square it correctly.",
        "simple": "A negative discriminant means no real roots.",
        "example": [],
        "question": "For 2x² + 3x + 4 = 0, what are D and the nature of the roots?",
        "options": [
          "D = 41; two distinct real roots",
          "D = −23; no real roots",
          "D = 0; two equal real roots"
        ],
        "correct": 1,
        "feedback": [
          "The formula subtracts 4ac; it does not add it.",
          "Correct. 9 − 32 = −23.",
          "9 and 32 are not equal."
        ],
        "hints": [
          "D = 3² − 4 × 2 × 4.",
          "Compute 9 − 32."
        ]
      }
    ]
  },
  {
    "number": 5,
    "slug": "arithmetic-progressions",
    "title": "Arithmetic Progressions",
    "sections": [
      "5.1 Introduction",
      "5.2 Arithmetic Progressions",
      "5.3 nth Term of an AP",
      "5.4 Sum of First n Terms of an AP",
      "5.5 Summary"
    ],
    "summary": [
      [
        "Common difference",
        "Check consecutive differences. The fixed difference may be positive, negative or zero."
      ],
      [
        "nth term",
        "aₙ = a + (n − 1)d. There are n − 1 jumps from the first term to the nth."
      ],
      [
        "Sum",
        "Sₙ = n[2a + (n − 1)d]/2 = n(a + l)/2 when l is the nth term."
      ],
      [
        "Model and verify",
        "Distinguish the nth term from the total of the first n terms; n must be a positive integer."
      ]
    ],
    "challenge": "Find the 20th term and sum of the first 20 terms of 7, 11, 15, …, then explain why the formulas use 19 jumps.",
    "steps": [
      {
        "id": "pattern",
        "section": 0,
        "title": "Notice what stays the same",
        "intro": "A row of seats has 8 seats, the next has 11, and the next has 14. Each new row has 3 more seats. This fixed change is the idea behind an arithmetic progression.",
        "simple": "Look at the difference between neighbours, not just whether the numbers go up.",
        "example": [
          "8 → 11: add 3.",
          "11 → 14: add 3.",
          "The next row has 17 seats."
        ],
        "question": "What comes next in 6, 10, 14, … if the same difference continues?",
        "options": [
          "16",
          "18",
          "20"
        ],
        "correct": 1,
        "feedback": [
          "The difference is 4, not 2.",
          "Yes. Add 4 to 14.",
          "This adds 6; the repeated change is 4."
        ],
        "hints": [
          "Calculate 10 − 6 and 14 − 10.",
          "Both differences are 4."
        ]
      },
      {
        "id": "ap",
        "section": 1,
        "title": "Check every neighbouring difference",
        "intro": "An AP is a list where each term after the first is obtained by adding the same fixed number d. Its first term is a. The pattern is a, a + d, a + 2d, … .",
        "simple": "The same jump must work every time. One matching difference is not enough.",
        "example": [
          "3, 7, 11, 15: differences 4, 4, 4 → AP.",
          "2, 4, 8, 16: differences 2, 4, 8 → not an AP."
        ],
        "question": "Which list is an AP?",
        "options": [
          "2, 4, 8, 16",
          "1, 4, 9, 16",
          "9, 6, 3, 0"
        ],
        "correct": 2,
        "feedback": [
          "The differences change: 2, 4, 8.",
          "The differences change: 3, 5, 7.",
          "Correct. Each step adds −3."
        ],
        "hints": [
          "Subtract each term from the next.",
          "An AP may decrease."
        ]
      },
      {
        "id": "difference",
        "section": 1,
        "title": "The common difference can be negative",
        "intro": "Find d by subtracting a term from the next: d = a₂ − a₁. If d < 0 the AP decreases; if d = 0 it is constant. Explore the sequence builder below.",
        "simple": "Next minus previous gives the direction of the jump. Repeated numbers are an AP with zero difference.",
        "example": [
          "12, 7, 2, −3, … has d = 7 − 12 = −5.",
          "4, 4, 4, … has d = 0."
        ],
        "question": "What are a and d for 15, 11, 7, 3, …?",
        "options": [
          "a = 15, d = 4",
          "a = 15, d = −4",
          "a = 11, d = −4"
        ],
        "correct": 1,
        "feedback": [
          "The list decreases, so the common difference is negative.",
          "Yes. First term 15; common difference 11 − 15 = −4.",
          "The first term is 15, not the second term 11."
        ],
        "hints": [
          "Read the first term for a.",
          "Compute 11 − 15."
        ],
        "explorer": "ap"
      },
      {
        "id": "nth",
        "section": 2,
        "title": "Count the jumps, not just the terms",
        "intro": "The nth term is aₙ = a + (n − 1)d. Reaching the first term takes no jumps; reaching the second takes one. Reaching the nth takes n − 1.",
        "simple": "Start at a and add the common difference n − 1 times.",
        "example": [
          "For 5, 8, 11, …: a = 5 and d = 3.",
          "a₆ = 5 + (6 − 1) × 3 = 20."
        ],
        "question": "For 4, 9, 14, …, what is the 10th term?",
        "options": [
          "54",
          "49",
          "45"
        ],
        "correct": 1,
        "feedback": [
          "This uses 10 jumps. The 10th term is only 9 jumps after the first.",
          "Correct. 4 + 9 × 5 = 49.",
          "45 counts the jumps but leaves out the first term 4."
        ],
        "hints": [
          "a = 4, d = 5, n = 10.",
          "Compute 4 + 9 × 5."
        ]
      },
      {
        "id": "negative",
        "section": 2,
        "title": "The same formula works going down",
        "intro": "A negative common difference does not change the nth-term formula. Keep the minus sign in d.",
        "simple": "Adding a negative jump moves the sequence downward.",
        "example": [
          "20, 17, 14, … has a = 20 and d = −3.",
          "a₈ = 20 + 7(−3) = −1."
        ],
        "question": "What is the 6th term of 18, 14, 10, …?",
        "options": [
          "−2",
          "2",
          "−6"
        ],
        "correct": 0,
        "feedback": [
          "Yes. 18 + 5(−4) = −2.",
          "Check 18 − 20; the result is negative.",
          "This uses 6 differences instead of 5."
        ],
        "hints": [
          "d = −4.",
          "a₆ = 18 − 5 × 4."
        ]
      },
      {
        "id": "which-term",
        "section": 2,
        "title": "Work backwards to the position",
        "intro": "To find which term equals a given value, set a + (n − 1)d equal to that value and solve for n. A valid position must be a positive integer.",
        "simple": "The algebra may give a fraction or a negative number. Those are not term positions in this AP.",
        "example": [
          "For 3, 7, 11, …, ask which term is 31.",
          "3 + (n − 1)4 = 31 → n − 1 = 7 → n = 8."
        ],
        "question": "Which term of 5, 8, 11, … is 32?",
        "options": [
          "9th",
          "10th",
          "11th"
        ],
        "correct": 1,
        "feedback": [
          "The 9th term is 5 + 8 × 3 = 29.",
          "Correct. 5 + 3(n − 1) = 32 gives n = 10.",
          "The 11th term is 35."
        ],
        "hints": [
          "Set 5 + 3(n − 1) = 32.",
          "Subtract 5, divide by 3, then add 1."
        ]
      },
      {
        "id": "membership",
        "section": 2,
        "title": "Not every number belongs",
        "intro": "A candidate value belongs to the AP only if its calculated position is a positive integer.",
        "simple": "A term cannot sit at position 4.5. There is no halfway term in the list.",
        "example": [
          "For 2, 6, 10, …, solving 2 + 4(n − 1) = 15 gives n = 17/4.",
          "This is not a positive integer, so 15 is not a term."
        ],
        "question": "Is 30 a term of 4, 10, 16, …?",
        "options": [
          "Yes, it is the 5th term",
          "No, its position would not be an integer",
          "Yes, it is the 6th term"
        ],
        "correct": 1,
        "feedback": [
          "The 5th term is 4 + 4 × 6 = 28.",
          "Correct. 4 + 6(n − 1) = 30 gives n = 16/3, not an integer.",
          "The 6th term is 34."
        ],
        "hints": [
          "Set 4 + 6(n − 1) = 30.",
          "26 is not divisible by 6."
        ]
      },
      {
        "id": "find-d",
        "section": 2,
        "title": "Two terms can reveal the difference",
        "intro": "Subtract two nth-term equations to cancel a. The difference between term positions tells you how many jumps separate them.",
        "simple": "There are 5 jumps from the 3rd term to the 8th term, not 8 jumps.",
        "example": [
          "If a₃ = 10 and a₈ = 30, then a + 2d = 10 and a + 7d = 30.",
          "Subtract: 5d = 20, so d = 4. Then a = 2."
        ],
        "question": "If a₄ = 14 and a₉ = 34, what is d?",
        "options": [
          "20",
          "5",
          "4"
        ],
        "correct": 2,
        "feedback": [
          "20 is the total change across 5 jumps.",
          "5 is the number of jumps, not their size.",
          "Yes. d = (34 − 14)/(9 − 4) = 20/5 = 4."
        ],
        "hints": [
          "Subtract the term values and the positions.",
          "Divide 20 by 5."
        ]
      },
      {
        "id": "sum-pair",
        "section": 3,
        "title": "Pair the ends to see the sum",
        "intro": "For an AP with first term a and nth term l, Sₙ = n(a + l)/2. Pairing the list with its reverse makes every column total a + l, so twice the sum is n(a + l).",
        "simple": "The sum is the number of terms multiplied by the average of the first and last terms.",
        "example": [
          "2 + 5 + 8 + 11 + 14 = 40.",
          "S₅ = 5(2 + 14)/2 = 40."
        ],
        "question": "Find the sum of 3, 6, 9, 12, 15.",
        "options": [
          "15",
          "45",
          "75"
        ],
        "correct": 1,
        "feedback": [
          "15 is the last term, not the total.",
          "Correct. 5(3 + 15)/2 = 45.",
          "Multiplying the last term by 5 ignores the smaller earlier terms."
        ],
        "hints": [
          "There are 5 terms; the first is 3 and the last is 15.",
          "Calculate 5 × 18 ÷ 2."
        ]
      },
      {
        "id": "sum-formula",
        "section": 3,
        "title": "Sum without listing every term",
        "intro": "Substitute l = a + (n − 1)d into the end-pair formula: Sₙ = n[2a + (n − 1)d]/2. Use brackets carefully.",
        "simple": "The formula counts the total of the first n terms, not just the nth term.",
        "example": [
          "For 4, 7, 10, …, S₁₀ = 10[2(4) + 9(3)]/2.",
          "= 5(8 + 27) = 175."
        ],
        "question": "What is the sum of the first 8 terms of 2, 5, 8, …?",
        "options": [
          "23",
          "100",
          "184"
        ],
        "correct": 1,
        "feedback": [
          "23 is a₈ = 2 + 7 × 3, not S₈.",
          "Yes. 8[4 + 7 × 3]/2 = 4 × 25 = 100.",
          "8 × 23 overcounts by treating all terms as equal to the last one."
        ],
        "hints": [
          "a = 2, d = 3, n = 8.",
          "Compute 4 × (4 + 21)."
        ]
      },
      {
        "id": "story",
        "section": 3,
        "title": "Choose between a term and a total",
        "intro": "You save ₹20 in week 1 and increase the weekly saving by ₹5 each week. “How much in week 6?” asks for a₆. “How much over 6 weeks?” asks for S₆.",
        "simple": "One week is one term. All the weeks together require a sum.",
        "example": [
          "Week 6 saving: 20 + 5 × 5 = ₹45.",
          "Total over 6 weeks: 6(20 + 45)/2 = ₹195."
        ],
        "question": "For the same saving plan, how much is saved in total over the first 4 weeks?",
        "options": [
          "₹35",
          "₹110",
          "₹140"
        ],
        "correct": 1,
        "feedback": [
          "₹35 is only the week 4 amount.",
          "Correct. ₹20 + ₹25 + ₹30 + ₹35 = ₹110.",
          "This treats all four weeks as ₹35; earlier weeks have smaller amounts."
        ],
        "hints": [
          "List the four savings or use S₄ = 4(20 + 35)/2.",
          "Add 20 + 25 + 30 + 35."
        ]
      },
      {
        "id": "exit-difference",
        "section": 4,
        "title": "Your turn: recognise an AP",
        "intro": "Check the same change between every pair of neighbours.",
        "simple": "Zero is a valid common difference.",
        "example": [],
        "question": "Which list is an AP with common difference 0?",
        "options": [
          "0, 1, 2, 3",
          "7, 7, 7, 7",
          "1, 2, 4, 8"
        ],
        "correct": 1,
        "feedback": [
          "This is an AP, but its common difference is 1.",
          "Yes. Every difference is 0.",
          "The differences are 1, 2 and 4; they are not fixed."
        ],
        "hints": [
          "A difference of 0 means the value stays unchanged.",
          "Look for repeated equal terms."
        ]
      },
      {
        "id": "exit-term",
        "section": 4,
        "title": "Your turn: find the term",
        "intro": "Use the first term and the number of jumps.",
        "simple": "For the 12th term, make 11 jumps.",
        "example": [],
        "question": "What is the 12th term of 7, 11, 15, …?",
        "options": [
          "55",
          "48",
          "51"
        ],
        "correct": 2,
        "feedback": [
          "This uses 12 jumps, one too many.",
          "Do not omit the first term.",
          "Correct. 7 + 11 × 4 = 51."
        ],
        "hints": [
          "a = 7, d = 4.",
          "a₁₂ = 7 + (12 − 1) × 4."
        ]
      },
      {
        "id": "exit-sum",
        "section": 4,
        "title": "Your turn: find the total",
        "intro": "Use a sum formula rather than the nth-term formula.",
        "simple": "Multiply the average of the first and last terms by the number of terms.",
        "example": [],
        "question": "What is the sum of the first 10 terms of 1, 3, 5, …?",
        "options": [
          "19",
          "100",
          "190"
        ],
        "correct": 1,
        "feedback": [
          "19 is the 10th term, not the sum.",
          "Yes. The last term is 19, so S₁₀ = 10(1 + 19)/2 = 100.",
          "This counts every term as 19."
        ],
        "hints": [
          "The 10th term is 1 + 9 × 2 = 19.",
          "Use 10 × (1 + 19) ÷ 2."
        ]
      }
    ]
  }
];
export const newChapters: Chapter[] = [...foundationChapters,...geometryChapters,...partTwoChapters,...mensurationChapters,...finalChapters].map(chapter=>({...chapter,legacyIds:chapter.steps.map(s=>s.id),steps:[...chapter.steps,...(chapterExpansions[chapter.number]??[])].sort((a,b)=>a.section-b.section)}));
export const chapters = [realNumbers,...newChapters];

export {appendices};
export const additionalStudyUnits=[...newChapters,...appendices];
