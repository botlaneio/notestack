import type {LessonStep} from './real-numbers.ts';
export const chapterExpansions:Record<number,LessonStep[]>={
  "2": [
    {
      "id": "c2-expanded-degree-cancellation",
      "section": 0,
      "title": "Simplify before finding the degree",
      "intro": "A polynomial has non-negative integer powers of its variable. Combine like terms first; the highest remaining non-zero power gives the degree.",
      "simple": "x²−x²+3 x−1=3 x−1, degree 1. 1/x and sqrt(x) are not polynomials in x.",
      "example": [
        "x²−x²+3 x−1=3 x−1, degree 1. 1/x and sqrt(x) are not polynomials in x.",
        "A non-zero constant has degree 0; the zero polynomial has no defined degree."
      ],
      "question": "What is the degree of x³−x³+2 x²−7?",
      "options": [
        "3",
        "2",
        "0"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "x²−x²+3 x−1=3 x−1, degree 1. 1/x and sqrt(x) are not polynomials in x.",
        "A non-zero constant has degree 0; the zero polynomial has no defined degree."
      ]
    },
    {
      "id": "c2-expanded-graph-bound",
      "section": 1,
      "title": "Degree gives an upper bound",
      "intro": "A degree-n polynomial has at most n distinct real zeroes. A quadratic can have 0, 1 or 2; a cubic can have 1, 2 or 3.",
      "simple": "x²+1 has no real zero; x² has one distinct zero; x²−1 has two.",
      "example": [
        "x²+1 has no real zero; x² has one distinct zero; x²−1 has two.",
        "A touch counts as one distinct intersection. Multiplicity is different from counting distinct zeroes."
      ],
      "question": "How many distinct real zeroes can a quadratic have?",
      "options": [
        "Always 2",
        "At most 2",
        "Any number"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "x²+1 has no real zero; x² has one distinct zero; x²−1 has two.",
        "A touch counts as one distinct intersection. Multiplicity is different from counting distinct zeroes."
      ]
    },
    {
      "id": "c2-expanded-derive-quadratic",
      "section": 2,
      "title": "Derive the quadratic rules",
      "intro": "If α,β are zeroes of ax²+bx+c with a≠0, expand a(x−α)(x−β).",
      "simple": "The expansion is ax²−a(α+β)x+aαβ.",
      "example": [
        "The expansion is ax²−a(α+β)x+aαβ.",
        "Compare coefficients: α+β=−b/a andαβ=c/a."
      ],
      "question": "For 4 x²−4 x+1, what is the product?",
      "options": [
        "1/4",
        "1",
        "−1/4"
      ],
      "correct": 0,
      "feedback": [
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "The expansion is ax²−a(α+β)x+aαβ.",
        "Compare coefficients: α+β=−b/a andαβ=c/a."
      ]
    },
    {
      "id": "c2-expanded-cubic-relations",
      "section": 2,
      "title": "A cubic needs three relationships",
      "intro": "For ax³+bx²+cx+d, a≠0, expand a(x−α)(x−β)(x−γ).",
      "simple": "Sum α+β+γ=−b/a; pairwise products αβ+βγ+γα=c/a; triple product αβγ=−d/a.",
      "example": [
        "Sum α+β+γ=−b/a; pairwise products αβ+βγ+γα=c/a; triple product αβγ=−d/a.",
        "For 3 x³−5 x²−11 x−3, zeroes 3, −1, −1/3 give 5/3, −11/3, 1 respectively."
      ],
      "question": "What is the triple product for that cubic?",
      "options": [
        "−1",
        "1",
        "−11/3"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "Sum α+β+γ=−b/a; pairwise products αβ+βγ+γα=c/a; triple product αβγ=−d/a.",
        "For 3 x³−5 x²−11 x−3, zeroes 3, −1, −1/3 give 5/3, −11/3, 1 respectively."
      ]
    },
    {
      "id": "c2-expanded-scale-polynomial",
      "section": 2,
      "title": "One set of zeroes, many polynomials",
      "intro": "A non-zero multiple preserves the zeroes. For sum S, product P, choose x²−Sx+P, or any non-zero multiple.",
      "simple": "Sum 1/4, product−1 gives x²−x/4−1; multiplying by 4 gives 4 x²−x−4.",
      "example": [
        "Sum 1/4, product−1 gives x²−x/4−1; multiplying by 4 gives 4 x²−x−4.",
        "The scale factor cannot be 0; a zero polynomial does not have exactly the desired zeroes."
      ],
      "question": "Which has the same zeroes as x²−3 x+2?",
      "options": [
        "2 x²−6 x+4",
        "x²−6 x+4",
        "0"
      ],
      "correct": 0,
      "feedback": [
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "Sum 1/4, product−1 gives x²−x/4−1; multiplying by 4 gives 4 x²−x−4.",
        "The scale factor cannot be 0; a zero polynomial does not have exactly the desired zeroes."
      ]
    }
  ],
  "3": [
    {
      "id": "c3-expanded-graph-tables",
      "section": 1,
      "title": "Build a graph from a table",
      "intro": "For each linear equation choose two convenient x-values and calculate y. Plot both points accurately and extend the straight line.",
      "simple": "For x+y=5 use(0, 5), (5, 0). For 2 x+y=6 use(0, 6), (3, 0).",
      "example": [
        "For x+y=5 use(0, 5), (5, 0). For 2 x+y=6 use(0, 6), (3, 0).",
        "Their intersection(1, 4) satisfies both equations. A graph gives a visual solution; substitution checks it exactly."
      ],
      "question": "Which step verifies an intersection?",
      "options": [
        "Check only one equation",
        "Substitute into both original equations",
        "Measure the line length"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "For x+y=5 use(0, 5), (5, 0). For 2 x+y=6 use(0, 6), (3, 0).",
        "Their intersection(1, 4) satisfies both equations. A graph gives a visual solution; substitution checks it exactly."
      ]
    },
    {
      "id": "c3-expanded-substitution-identity",
      "section": 2,
      "title": "An identity means a family",
      "intro": "Substitution can yield a true identity rather than one variable value. That means the second equation imposes no extra restriction.",
      "simple": "3 x−y=3 gives y=3 x−3. Substituting into 9 x−3 y=9 gives 9=9.",
      "example": [
        "3 x−y=3 gives y=3 x−3. Substituting into 9 x−3 y=9 gives 9=9.",
        "All pairs(t, 3 t−3) are solutions, not just(0, −3)."
      ],
      "question": "What does 9=9 mean here?",
      "options": [
        "No solution",
        "Infinitely many solutions",
        "x=9, y=9"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "3 x−y=3 gives y=3 x−3. Substituting into 9 x−3 y=9 gives 9=9.",
        "All pairs(t, 3 t−3) are solutions, not just(0, −3)."
      ]
    },
    {
      "id": "c3-expanded-substitution-contradiction",
      "section": 2,
      "title": "A contradiction means no intersection",
      "intro": "An impossible equation after valid substitution proves the original pair has no common solution.",
      "simple": "x+2 y=4 implies x=4−2 y. In 2 x+4 y=12 this gives 8=12.",
      "example": [
        "x+2 y=4 implies x=4−2 y. In 2 x+4 y=12 this gives 8=12.",
        "The two lines are parallel and distinct."
      ],
      "question": "What follows from 8=12?",
      "options": [
        "No common solution",
        "Any pair works",
        "x=8"
      ],
      "correct": 0,
      "feedback": [
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "x+2 y=4 implies x=4−2 y. In 2 x+4 y=12 this gives 8=12.",
        "The two lines are parallel and distinct."
      ]
    },
    {
      "id": "c3-expanded-fractional-pair",
      "section": 2,
      "title": "Clear fractions without changing solutions",
      "intro": "Multiply every term of an equation by the same non-zero denominator. Then use substitution or elimination.",
      "simple": "x/2+2 y/3=−1 becomes 3 x+4 y=−6 after multiplying by 6.",
      "example": [
        "x/2+2 y/3=−1 becomes 3 x+4 y=−6 after multiplying by 6.",
        "x−y/3=3 becomes 3 x−y=9; subtract to get 5 y=−15, soy=−3, x=2."
      ],
      "question": "What must multiplication include?",
      "options": [
        "Only the x-term",
        "Every term on both sides",
        "Only denominators"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "x/2+2 y/3=−1 becomes 3 x+4 y=−6 after multiplying by 6.",
        "x−y/3=3 becomes 3 x−y=9; subtract to get 5 y=−15, soy=−3, x=2."
      ]
    },
    {
      "id": "c3-expanded-digits-two-cases",
      "section": 2,
      "title": "“Differ by” may have two orders",
      "intro": "Two digits differing by 2 can satisfy x−y=2 or y−x=2. Keep both cases unless the wording specifies which is larger.",
      "simple": "A number plus its reverse is 66, so 11(x+y)=66 and x+y=6.",
      "example": [
        "A number plus its reverse is 66, so 11(x+y)=66 and x+y=6.",
        "The two cases give 42 and 24. Both are two-digit numbers and satisfy the conditions."
      ],
      "question": "How many numbers satisfy these conditions?",
      "options": [
        "1",
        "2",
        "0"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "A number plus its reverse is 66, so 11(x+y)=66 and x+y=6.",
        "The two cases give 42 and 24. Both are two-digit numbers and satisfy the conditions."
      ]
    },
    {
      "id": "c3-expanded-model-domains",
      "section": 2,
      "title": "Translate and check the context",
      "intro": "Name quantities with units. Translate each condition separately, solve, then check prices, counts, ages and denominator restrictions.",
      "simple": "For fixed taxi charge f and per-km r: f+10 r=105, f+15 r=155 →r 10, f 5.",
      "example": [
        "For fixed taxi charge f and per-km r: f+10 r=105, f+15 r=155 →r 10, f 5.",
        "A25 km fare is 5+25×10=255. Do not mistake the fixed charge for the per-km rate."
      ],
      "question": "Which represents a 25 km fare?",
      "options": [
        "25(f+r)",
        "f+25 r",
        "25 f+r"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "For fixed taxi charge f and per-km r: f+10 r=105, f+15 r=155 →r 10, f 5.",
        "A25 km fare is 5+25×10=255. Do not mistake the fixed charge for the per-km rate."
      ]
    }
  ],
  "4": [
    {
      "id": "c4-expanded-degree-after-expansion",
      "section": 1,
      "title": "Appearances can hide the degree",
      "intro": "A quadratic equation simplifies to ax²+bx+c=0 with a≠0. Expand both sides before deciding.",
      "simple": "(x+2)³=x³−4 simplifies to 6 x²+12 x+12=0: it is quadratic.",
      "example": [
        "(x+2)³=x³−4 simplifies to 6 x²+12 x+12=0: it is quadratic.",
        "x²+3 x+1=(x−2)² simplifies to 7 x−3=0: it is linear."
      ],
      "question": "Which decides the classification?",
      "options": [
        "Largest power before expanding",
        "Highest surviving power after simplification",
        "Number of brackets"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "(x+2)³=x³−4 simplifies to 6 x²+12 x+12=0: it is quadratic.",
        "x²+3 x+1=(x−2)² simplifies to 7 x−3=0: it is linear."
      ]
    },
    {
      "id": "c4-expanded-zero-product",
      "section": 2,
      "title": "Why factorisation produces roots",
      "intro": "Over real numbers, a product is zero only when at least one factor is zero. Apply this after moving all terms to one side.",
      "simple": "2 x²−5 x+3=(x−1)(2 x−3). Roots 1 and 3/2.",
      "example": [
        "2 x²−5 x+3=(x−1)(2 x−3). Roots 1 and 3/2.",
        "An equation(x−1)(x−2)=6 does not allow you to set either factor to zero."
      ],
      "question": "When may you set factors to zero?",
      "options": [
        "When their product is zero",
        "For any product equation",
        "Only when factors are equal"
      ],
      "correct": 0,
      "feedback": [
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "2 x²−5 x+3=(x−1)(2 x−3). Roots 1 and 3/2.",
        "An equation(x−1)(x−2)=6 does not allow you to set either factor to zero."
      ]
    },
    {
      "id": "c4-expanded-surd-factorisation",
      "section": 2,
      "title": "Surds can occur in linear factors",
      "intro": "The coefficients and roots need not be integers. You can still split the middle term or recognize a square.",
      "simple": "3 x²−2 sqrt(6)x+2=(sqrt(3)x−sqrt(2))².",
      "example": [
        "3 x²−2 sqrt(6)x+2=(sqrt(3)x−sqrt(2))².",
        "The repeated root is sqrt(2)/sqrt(3)=sqrt(6)/3."
      ],
      "question": "How many distinct roots does this square have?",
      "options": [
        "0",
        "1",
        "2"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "3 x²−2 sqrt(6)x+2=(sqrt(3)x−sqrt(2))².",
        "The repeated root is sqrt(2)/sqrt(3)=sqrt(6)/3."
      ]
    },
    {
      "id": "c4-expanded-root-domain",
      "section": 2,
      "title": "A root can fail the situation",
      "intro": "Solving the equation is only part of a word problem. Reject roots that violate lengths, ages or positive integer counts.",
      "simple": "Area 365 for sum of squares of consecutive positive integers gives x²+x−182=0.",
      "example": [
        "Area 365 for sum of squares of consecutive positive integers gives x²+x−182=0.",
        "Roots 13 and−14; only 13 is allowed, so the integers are 13 and 14."
      ],
      "question": "Why reject−14?",
      "options": [
        "Negative numbers cannot be roots",
        "The original question requires positive integers",
        "Because all quadratics have one root"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "Area 365 for sum of squares of consecutive positive integers gives x²+x−182=0.",
        "Roots 13 and−14; only 13 is allowed, so the integers are 13 and 14."
      ]
    },
    {
      "id": "c4-expanded-parameter-nonzero",
      "section": 3,
      "title": "Do not lose the leading coefficient",
      "intro": "Equal roots require D=0 and a genuine quadratic. If the leading coefficient depends on k, check it is non-zero.",
      "simple": "kx(x−2)+6=0 has D=4 k(k−6). D=0 suggests 0 or 6.",
      "example": [
        "kx(x−2)+6=0 has D=4 k(k−6). D=0 suggests 0 or 6.",
        "k=0 would give 6=0, not a quadratic. Thus k=6 only."
      ],
      "question": "Which k works?",
      "options": [
        "0 and 6",
        "6 only",
        "0 only"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "kx(x−2)+6=0 has D=4 k(k−6). D=0 suggests 0 or 6.",
        "k=0 would give 6=0, not a quadratic. Thus k=6 only."
      ]
    },
    {
      "id": "c4-expanded-possibility-discriminant",
      "section": 3,
      "title": "Use the discriminant to test possibility",
      "intro": "A quadratic model with negative D has no real solution, hence cannot describe real lengths or ages. D≥0 still requires checking the domain.",
      "simple": "Ages sum 20 and their ages 4 years ago have product 48 lead to x²−20 x+112=0.",
      "example": [
        "Ages sum 20 and their ages 4 years ago have product 48 lead to x²−20 x+112=0.",
        "D=−48, so this situation is impossible."
      ],
      "question": "What does D<0 rule out?",
      "options": [
        "Only integer roots",
        "All real roots",
        "Only positive roots"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "Ages sum 20 and their ages 4 years ago have product 48 lead to x²−20 x+112=0.",
        "D=−48, so this situation is impossible."
      ]
    }
  ],
  "5": [
    {
      "id": "c5-expanded-constant-difference-proof",
      "section": 1,
      "title": "A pattern is not always an AP",
      "intro": "Check consecutive differences. Constant ratio, repeated groups and compound interest can look regular without being arithmetic progressions.",
      "simple": "2, 4, 8, 16 has differences 2, 4, 8: not AP.",
      "example": [
        "2, 4, 8, 16 has differences 2, 4, 8: not AP.",
        "Simple interest adds the same amount yearly; compound interest multiplies the balance."
      ],
      "question": "Which sequence is an AP?",
      "options": [
        "1, 2, 4, 8",
        "1, 1, 2, 2",
        "3, 3, 3, 3"
      ],
      "correct": 2,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question."
      ],
      "hints": [
        "2, 4, 8, 16 has differences 2, 4, 8: not AP.",
        "Simple interest adds the same amount yearly; compound interest multiplies the balance."
      ]
    },
    {
      "id": "c5-expanded-index-integer",
      "section": 2,
      "title": "An index must be a positive integer",
      "intro": "Solving aₙ=t can produce a non-integer index. That means t never occurs even if the algebra produced a number.",
      "simple": "For 5, 11, 17,..., 301=5+6(n−1) gives n=151/3.",
      "example": [
        "For 5, 11, 17,..., 301=5+6(n−1) gives n=151/3.",
        "There is no 151/3-th term in this indexed sequence."
      ],
      "question": "Does 301 occur?",
      "options": [
        "Yes, round n",
        "No",
        "Only as a first term"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "For 5, 11, 17,..., 301=5+6(n−1) gives n=151/3.",
        "There is no 151/3-th term in this indexed sequence."
      ]
    },
    {
      "id": "c5-expanded-reverse-ap",
      "section": 2,
      "title": "Count from the end",
      "intro": "A finite AP read backward has first term l and common difference−d. The kth from last is l−(k−1)d.",
      "simple": "For 3, 8,..., 253, twentieth from last=253−19×5=158.",
      "example": [
        "For 3, 8,..., 253, twentieth from last=253−19×5=158.",
        "There are 19 jumps from the last term, not 20."
      ],
      "question": "How many jumps for the 20th from last?",
      "options": [
        "20",
        "19",
        "21"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "For 3, 8,..., 253, twentieth from last=253−19×5=158.",
        "There are 19 jumps from the last term, not 20."
      ]
    },
    {
      "id": "c5-expanded-derive-sum",
      "section": 3,
      "title": "Derive the sum by pairing",
      "intro": "Write the sum forward and backward, then add the two rows term by term.",
      "simple": "Each pair gives a+l; there are n pairs. Thus 2 Sₙ=n(a+l).",
      "example": [
        "Each pair gives a+l; there are n pairs. Thus 2 Sₙ=n(a+l).",
        "Sₙ=n(a+l)/2=n[2 a+(n−1)d]/2."
      ],
      "question": "Why divide by 2?",
      "options": [
        "We added two copies of the sum",
        "There are two terms",
        "The common difference is 2"
      ],
      "correct": 0,
      "feedback": [
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "Each pair gives a+l; there are n pairs. Thus 2 Sₙ=n(a+l).",
        "Sₙ=n(a+l)/2=n[2 a+(n−1)d]/2."
      ]
    },
    {
      "id": "c5-expanded-recover-term-from-sum",
      "section": 3,
      "title": "A term is the difference of two sums",
      "intro": "Sₙ includes the first n terms; Sₙ₋₁ includes all but the last. Subtract to recover aₙ.",
      "simple": "If Sₙ=4 n−n², then aₙ=Sₙ=−Sₙ₋₁=5−2 n.",
      "example": [
        "If Sₙ=4 n−n², then aₙ=Sₙ=−Sₙ₋₁=5−2 n.",
        "a₁=3, a₂=1, a₃=−1; common difference−2."
      ],
      "question": "What is a₁₀?",
      "options": [
        "−15",
        "−60",
        "15"
      ],
      "correct": 0,
      "feedback": [
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "If Sₙ=4 n−n², then aₙ=Sₙ=−Sₙ₋₁=5−2 n.",
        "a₁=3, a₂=1, a₃=−1; common difference−2."
      ]
    },
    {
      "id": "c5-expanded-sum-two-indices",
      "section": 3,
      "title": "A sum can occur at two indices",
      "intro": "When d is negative, later negative terms can bring a partial sum back down. Keep every positive integer solution for n.",
      "simple": "Sₙ=78 for 24, 21, 18,...gives(n−4)(n−13)=0.",
      "example": [
        "Sₙ=78 for 24, 21, 18,...gives(n−4)(n−13)=0.",
        "Both 4 and 13 are valid, and both sums equal 78."
      ],
      "question": "How many indices work?",
      "options": [
        "1",
        "2",
        "0"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "Sₙ=78 for 24, 21, 18,...gives(n−4)(n−13)=0.",
        "Both 4 and 13 are valid, and both sums equal 78."
      ]
    },
    {
      "id": "c5-expanded-ap-optional-domain",
      "section": 3,
      "title": "Optional problems still need valid counts",
      "intro": "The book’s optional exercise combines inequalities, quadratic models and geometric counting with APs. Its label remains optional.",
      "simple": "Rungs 25 cm apart over 250 cm have 10 gaps but 11 rungs.",
      "example": [
        "Rungs 25 cm apart over 250 cm have 10 gaps but 11 rungs.",
        "For 121, 117,..., 125−4 n<0 implies n>31.25; first negative index 32."
      ],
      "question": "How many rungs span 10 gaps?",
      "options": [
        "10",
        "11",
        "9"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "Rungs 25 cm apart over 250 cm have 10 gaps but 11 rungs.",
        "For 121, 117,..., 125−4 n<0 implies n>31.25; first negative index 32."
      ]
    }
  ],
  "6": [
    {
      "id": "c6-expanded-bpt-area-proof",
      "section": 2,
      "title": "Why the parallel cut gives equal ratios",
      "intro": "BPT can be proved using triangle areas rather than assuming similarity. Join BE and CD for D on AB, E on AC with DE∥BC.",
      "simple": "ar(ADE)/ar(BDE)=AD/DB, using a common altitude from E.",
      "example": [
        "ar(ADE)/ar(BDE)=AD/DB, using a common altitude from E.",
        "ar(ADE)/ar(CDE)=AE/EC, using a common altitude from D. BDE and CDE have the same base DE and equal heights between parallels; equate the ratios."
      ],
      "question": "Why are ar(BDE)and ar(CDE) equal?",
      "options": [
        "They share two sides",
        "Same base and equal altitudes",
        "All triangles are equal"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "ar(ADE)/ar(BDE)=AD/DB, using a common altitude from E.",
        "ar(ADE)/ar(CDE)=AE/EC, using a common altitude from D. BDE and CDE have the same base DE and equal heights between parallels; equate the ratios."
      ]
    },
    {
      "id": "c6-expanded-bpt-converse-proof",
      "section": 2,
      "title": "Prove the converse with a parallel construction",
      "intro": "If AD/DB=AE/EC, draw DE′∥BC. BPT gives AD/DB=AE′/E′C.",
      "simple": "Thus AE/EC=AE′/E′C. Both points divide the fixed segment AC in the same ratio, so E=E′.",
      "example": [
        "Thus AE/EC=AE′/E′C. Both points divide the fixed segment AC in the same ratio, so E=E′.",
        "Consequently DE is the constructed parallel line."
      ],
      "question": "What forces E=E′?",
      "options": [
        "Equal division ratios on the same segment",
        "Equal names",
        "The drawing looks parallel"
      ],
      "correct": 0,
      "feedback": [
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "Thus AE/EC=AE′/E′C. Both points divide the fixed segment AC in the same ratio, so E=E′.",
        "Consequently DE is the constructed parallel line."
      ]
    },
    {
      "id": "c6-expanded-triangle-correspondence",
      "section": 3,
      "title": "Write vertices in matching order",
      "intro": "A similarity statement records the correspondence. Reordering only one triangle changes which sides match.",
      "simple": "ABC~QRP means A↔Q, B↔R, C↔P. Thus AB/QR=BC/RP=AC/QP.",
      "example": [
        "ABC~QRP means A↔Q, B↔R, C↔P. Thus AB/QR=BC/RP=AC/QP.",
        "Always read the order before forming a proportion."
      ],
      "question": "If ABC~QRP, which side matches AC?",
      "options": [
        "QR",
        "QP",
        "RP"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "ABC~QRP means A↔Q, B↔R, C↔P. Thus AB/QR=BC/RP=AC/QP.",
        "Always read the order before forming a proportion."
      ]
    },
    {
      "id": "c6-expanded-ssa-not-criterion",
      "section": 3,
      "title": "The angle in SAS must be included",
      "intro": "Two proportional sides with an angle elsewhere do not establish SAS similarity. AAA, AA, SSS and SAS have precise requirements.",
      "simple": "For SAS, the equal angle must lie between the two compared sides in each triangle.",
      "example": [
        "For SAS, the equal angle must lie between the two compared sides in each triangle.",
        "Do not promote an SSA arrangement into a similarity proof."
      ],
      "question": "Which detail is essential for SAS?",
      "options": [
        "Included angle",
        "Longest angle",
        "A drawing to scale"
      ],
      "correct": 0,
      "feedback": [
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "For SAS, the equal angle must lie between the two compared sides in each triangle.",
        "Do not promote an SSA arrangement into a similarity proof."
      ]
    },
    {
      "id": "c6-expanded-similar-medians",
      "section": 3,
      "title": "Proportional sides lead to proportional medians",
      "intro": "For ABC~PQR and medians AD, PM, BD=BC/2 and QM=QR/2.",
      "simple": "AB/PQ=BD/QM and included angles ABD=PQM, so ABD~PQM by SAS.",
      "example": [
        "AB/PQ=BD/QM and included angles ABD=PQM, so ABD~PQM by SAS.",
        "Therefore AD/PM=AB/PQ."
      ],
      "question": "Why does BD/QM=BC/QR?",
      "options": [
        "Both numerator and denominator are halved",
        "Medians are all same",
        "Because AD=PM"
      ],
      "correct": 0,
      "feedback": [
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "AB/PQ=BD/QM and included angles ABD=PQM, so ABD~PQM by SAS.",
        "Therefore AD/PM=AB/PQ."
      ]
    },
    {
      "id": "c6-expanded-shadow-units",
      "section": 3,
      "title": "Use consistent units for shadows",
      "intro": "Similar right triangles model an upright object and its shadow under the same sun angle. Convert all lengths to the same unit.",
      "simple": "A90 cm girl is 0.9 m. With a 3.6 m lamp and 4.8 m walk, (4.8+x)/x=3.6/0.9.",
      "example": [
        "A90 cm girl is 0.9 m. With a 3.6 m lamp and 4.8 m walk, (4.8+x)/x=3.6/0.9.",
        "x=1.6 m; using 90 as metres would break the model."
      ],
      "question": "What is 90 cm in metres?",
      "options": [
        "9",
        "0.9",
        "90"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "A90 cm girl is 0.9 m. With a 3.6 m lamp and 4.8 m walk, (4.8+x)/x=3.6/0.9.",
        "x=1.6 m; using 90 as metres would break the model."
      ]
    }
  ],
  "7": [
    {
      "id": "c7-expanded-derive-distance",
      "section": 1,
      "title": "Distance comes from Pythagoras",
      "intro": "Join the points with horizontal and vertical legs. Their lengths are absolute coordinate differences.",
      "simple": "The squared distance is(x₂=−x₁)²+(y₂=−y₁)². Take the nonnegative square root.",
      "example": [
        "The squared distance is(x₂=−x₁)²+(y₂=−y₁)². Take the nonnegative square root.",
        "To the origin this becomes sqrt(x²+y²); on one horizontal line it becomes|x₂=−x₁|."
      ],
      "question": "Why cannot distance be negative?",
      "options": [
        "It is a length",
        "Coordinates are always positive",
        "Squares are always 0"
      ],
      "correct": 0,
      "feedback": [
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "The squared distance is(x₂=−x₁)²+(y₂=−y₁)². Take the nonnegative square root.",
        "To the origin this becomes sqrt(x²+y²); on one horizontal line it becomes|x₂=−x₁|."
      ]
    },
    {
      "id": "c7-expanded-collinear-distance-test",
      "section": 1,
      "title": "Use the equality case for collinearity",
      "intro": "Three distinct points are collinear when the largest pairwise distance equals the sum of the other two.",
      "simple": "For(3, 1), (6, 4), (8, 6), distances are 3 sqrt(2), 2 sqrt(2), 5 sqrt(2).",
      "example": [
        "For(3, 1), (6, 4), (8, 6), distances are 3 sqrt(2), 2 sqrt(2), 5 sqrt(2).",
        "3 sqrt(2)+2 sqrt(2)=5 sqrt(2), so the middle point lies on the joining segment."
      ],
      "question": "Which equality establishes collinearity?",
      "options": [
        "AB²+BC²=AC²",
        "AB+BC=AC",
        "AB=BC"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "For(3, 1), (6, 4), (8, 6), distances are 3 sqrt(2), 2 sqrt(2), 5 sqrt(2).",
        "3 sqrt(2)+2 sqrt(2)=5 sqrt(2), so the middle point lies on the joining segment."
      ]
    },
    {
      "id": "c7-expanded-square-needs-diagonals",
      "section": 1,
      "title": "Equal sides alone give a rhombus",
      "intro": "Compute four sides and both diagonals when classifying a possible square. A rhombus with equal diagonals is a square.",
      "simple": "For(3, 4), (6, 7), (9, 4), (6, 1), all side squares 18 and both diagonal squares 36.",
      "example": [
        "For(3, 4), (6, 7), (9, 4), (6, 1), all side squares 18 and both diagonal squares 36.",
        "Thus the classroom arrangement is a square."
      ],
      "question": "What is missing from an equal-sides-only argument?",
      "options": [
        "A check of right angles or equal diagonals",
        "Another name",
        "The origin"
      ],
      "correct": 0,
      "feedback": [
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "For(3, 4), (6, 7), (9, 4), (6, 1), all side squares 18 and both diagonal squares 36.",
        "Thus the classroom arrangement is a square."
      ]
    },
    {
      "id": "c7-expanded-equidistant-two-signs",
      "section": 1,
      "title": "Squaring can leave two coordinates",
      "intro": "When x²=k>0, keep both signs unless geometry excludes one. Recalculate any requested distances for each point.",
      "simple": "For Q(0, 1)equidistant from P(5, −3)and R(x, 6), x²=16, sox=±4.",
      "example": [
        "For Q(0, 1)equidistant from P(5, −3)and R(x, 6), x²=16, sox=±4.",
        "QR=sqrt(41)for both; PR differs with the sign."
      ],
      "question": "Which x values remain?",
      "options": [
        "4 only",
        "−4 only",
        "Both −4 and 4"
      ],
      "correct": 2,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question."
      ],
      "hints": [
        "For Q(0, 1)equidistant from P(5, −3)and R(x, 6), x²=16, sox=±4.",
        "QR=sqrt(41)for both; PR differs with the sign."
      ]
    },
    {
      "id": "c7-expanded-derive-section",
      "section": 2,
      "title": "Internal division is a weighted average",
      "intro": "For AP:PB=m:n, the point is(m B+n A)/(m+n). The coordinate nearer B gives B the larger weight.",
      "simple": "A(−2, −2), B(2, −4), AP=3 AB/7 means AP:PB=3:4.",
      "example": [
        "A(−2, −2), B(2, −4), AP=3 AB/7 means AP:PB=3:4.",
        "P=(3 B+4 A)/7=(−2/7, −20/7)."
      ],
      "question": "Why is the ratio 3:4 rather than 3:7?",
      "options": [
        "PB is the remaining 4/7",
        "All ratios must sum to 7",
        "Because A is negative"
      ],
      "correct": 0,
      "feedback": [
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "A(−2, −2), B(2, −4), AP=3 AB/7 means AP:PB=3:4.",
        "P=(3 B+4 A)/7=(−2/7, −20/7)."
      ]
    },
    {
      "id": "c7-expanded-midpoint-diameter",
      "section": 2,
      "title": "Midpoint solves diameter and parallelogram questions",
      "intro": "The midpoint is the 1:1 case of internal section. A circle’s centre is the midpoint of any diameter; parallelogram diagonals share a midpoint.",
      "simple": "If centre C=(2, −3) and endpoint A=(1, 4), the other endpoint is B=2 C−A=(3, −10).",
      "example": [
        "If centre C=(2, −3) and endpoint A=(1, 4), the other endpoint is B=2 C−A=(3, −10).",
        "For ordered parallelogram vertices A, B, C, D, A+C=B+D coordinate by coordinate."
      ],
      "question": "Which formula gives the other endpoint?",
      "options": [
        "C−A",
        "2 C−A",
        "A−2 C"
      ],
      "correct": 1,
      "feedback": [
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing.",
        "Correct. Use the same reasoning on a fresh question.",
        "Check the stated conditions and the worked reasoning above; verify the correspondence or domain before choosing."
      ],
      "hints": [
        "If centre C=(2, −3) and endpoint A=(1, 4), the other endpoint is B=2 C−A=(3, −10).",
        "For ordered parallelogram vertices A, B, C, D, A+C=B+D coordinate by coordinate."
      ]
    }
  ]
};
