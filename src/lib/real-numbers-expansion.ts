import type {LessonStep} from './real-numbers.ts';
export const expandedRealSteps: LessonStep[] = [
  {
    "id": "powers",
    "section": 1,
    "title": "Repeated primes become powers",
    "intro": "A factorisation may list repeated primes or combine them into powers. Both describe the same factors. Every composite positive integer can be built from primes; the number 1 is the exception to a non-empty prime product.",
    "simple": "A power counts repeated copies of the same prime. Reordering factors does not create a new factorisation.",
    "example": [
      "32760 = 2 × 2 × 2 × 3 × 3 × 5 × 7 × 13 = 2³ × 3² × 5 × 7 × 13.",
      "123456789 = 3² × 3607 × 3803. The factors 3607 and 3803 must themselves be checked for primality.",
      "To verify 3607 and 3803 are prime, test 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59 and 61. None divides either number. Both square roots are below 62, so no larger trial divisor is needed."
    ],
    "question": "Which expression combines 2 × 2 × 2 × 3 × 3 × 5 correctly?",
    "options": [
      "2³ × 3² × 5",
      "2² × 3³ × 5",
      "6² × 5"
    ],
    "correct": 0,
    "feedback": [
      "Yes. There are three copies of 2 and two of 3.",
      "The exponent counts how many copies of each prime appear.",
      "This equals 180, not 360, and 6 is not a prime base."
    ],
    "hints": [
      "Count the copies of each prime.",
      "There are three 2s and two 3s."
    ]
  },
  {
    "id": "ends-zero",
    "section": 1,
    "title": "Can a power end in zero?",
    "intro": "An integer ending in 0 is divisible by 10 = 2 × 5. Therefore its prime factorisation must include both 2 and 5. Uniqueness prevents a power from acquiring a missing prime.",
    "simple": "Multiplying more copies of 4 can add more 2s, but it cannot introduce a factor of 5.",
    "example": [
      "Book Example 1: 4ⁿ = 2²ⁿ for positive integer n. Its only prime factor is 2.",
      "If 4ⁿ ended in 0, it would have a prime factor 5. That contradicts its prime factorisation.",
      "Conclusion: no positive integer n makes 4ⁿ end in 0."
    ],
    "question": "Why can 6ⁿ never end in 0 for positive integer n?",
    "options": [
      "It is always odd",
      "Its prime factors are only 2 and 3, with no 5",
      "Every even number ends in 6"
    ],
    "correct": 1,
    "feedback": [
      "6ⁿ is even. Evenness alone does not settle the last digit.",
      "Correct. A last digit 0 would require a factor 5, which is absent.",
      "Even numbers can end in 0, 2, 4, 6 or 8. Use the prime-factor argument."
    ],
    "hints": [
      "Write 6ⁿ = 2ⁿ × 3ⁿ.",
      "A multiple of 10 needs a factor of 5."
    ]
  },
  {
    "id": "three-numbers",
    "section": 1,
    "title": "Use the rule across three numbers",
    "intro": "For an HCF, use only primes common to every number, with their smallest exponents. For an LCM, include every prime that occurs, with its greatest exponent. Treat a missing prime as exponent 0.",
    "simple": "A prime absent from even one number cannot appear in their HCF. The LCM must still supply every needed prime.",
    "example": [
      "Book Example 4: 6 = 2 × 3; 72 = 2³ × 3²; 120 = 2³ × 3 × 5.",
      "HCF = 2 × 3 = 6. LCM = 2³ × 3² × 5 = 360.",
      "For 8, 9 and 25, no prime is common to all three, so HCF = 1."
    ],
    "question": "What are the HCF and LCM of 4, 6 and 12?",
    "options": [
      "HCF 2, LCM 12",
      "HCF 4, LCM 24",
      "HCF 1, LCM 288"
    ],
    "correct": 0,
    "feedback": [
      "Correct. The only common prime copy is 2, while 2² × 3 supplies all three numbers.",
      "4 does not divide 6, and 12 is already a common multiple.",
      "2 divides all three; multiplying the numbers is not the least-multiple rule."
    ],
    "hints": [
      "4 = 2², 6 = 2 × 3 and 12 = 2² × 3.",
      "Keep the smallest shared exponents for HCF and largest required exponents for LCM."
    ]
  },
  {
    "id": "product-identity",
    "section": 1,
    "title": "The product identity is for two numbers",
    "intro": "For two positive integers a and b, HCF(a,b) × LCM(a,b) = ab. For each prime, the smaller exponent plus the larger equals the sum of the two exponents. This identity does not generally extend to three numbers.",
    "simple": "For two numbers, minimum and maximum account for both exponents. With three numbers, the middle exponent can be missed.",
    "example": [
      "Book Example 2: HCF(6,20) = 2 and LCM(6,20) = 60; 2 × 60 = 6 × 20 = 120.",
      "For 6,72,120: HCF × LCM = 6 × 360 = 2160, while the three-number product is 51840."
    ],
    "question": "Can you generally find LCM(a,b,c) by dividing abc by HCF(a,b,c)?",
    "options": [
      "Yes, for every three positive integers",
      "No; the two-number identity does not generally apply to three numbers",
      "Only if all three are even"
    ],
    "correct": 1,
    "feedback": [
      "The example above is a counterexample.",
      "Exactly. Use the prime-exponent method for three numbers.",
      "Being even does not restore the missing middle exponents."
    ],
    "hints": [
      "Compare the two products in the worked example.",
      "They are unequal for 6, 72 and 120."
    ]
  },
  {
    "id": "derive-lcm",
    "section": 1,
    "title": "Find an LCM from a known HCF",
    "intro": "Rearrange the two-number product identity: LCM(a,b) = ab/HCF(a,b). Verify that your result is divisible by both original numbers.",
    "simple": "Multiply the two numbers, then divide by their HCF. Do not multiply by the HCF again.",
    "example": [
      "Book Example 3: 96 = 2⁵ × 3 and 404 = 2² × 101, so HCF = 4.",
      "LCM = 96 × 404 / 4 = 9696.",
      "Check: 9696/96 = 101 and 9696/404 = 24."
    ],
    "question": "Given HCF(18,30) = 6, find LCM(18,30).",
    "options": [
      "3240",
      "90",
      "54"
    ],
    "correct": 1,
    "feedback": [
      "Divide by the HCF; multiplying would count common factors too many times.",
      "Correct. 18 × 30 / 6 = 90.",
      "Compute the product 540 before dividing by 6."
    ],
    "hints": [
      "Use LCM = product/HCF.",
      "540 ÷ 6 = 90."
    ]
  },
  {
    "id": "composite-sum",
    "section": 1,
    "title": "Expose a factor to prove compositeness",
    "intro": "To prove a positive integer is composite, express it as a product of two integers both greater than 1. A sum of products is not automatically composite; factor out something common.",
    "simple": "Find a factor shared by the terms. Check that both resulting factors exceed 1.",
    "example": [
      "7 × 11 × 13 + 13 = 13(7 × 11 + 1) = 13 × 78.",
      "Both factors are greater than 1, so the expression is composite.",
      "Contrast: 2 × 3 + 1 = 7 is prime."
    ],
    "question": "Why is 5 × 7 × 11 + 11 composite?",
    "options": [
      "Every sum is composite",
      "It equals 11(5 × 7 + 1) = 11 × 36",
      "It ends in an even digit"
    ],
    "correct": 1,
    "feedback": [
      "Sums can be prime; the exhibited factorisation is what proves compositeness.",
      "Yes. Both integer factors are greater than 1.",
      "The value is 396, but a general factorisation gives the intended proof."
    ],
    "hints": [
      "Both terms include a factor of 11.",
      "Factor it out and evaluate the bracket."
    ]
  },
  {
    "id": "composite-factorial",
    "section": 1,
    "title": "A long product still has a common factor",
    "intro": "When an expression contains a long product plus one of its factors, factor that number out of both terms. Do not replace a factorisation proof with a claim that the number “looks large”.",
    "simple": "Find the added number inside the long product, remove that one copy, and place the rest in brackets.",
    "example": [
      "7 × 6 × 5 × 4 × 3 × 2 × 1 + 5 = 5(7 × 6 × 4 × 3 × 2 × 1 + 1).",
      "= 5 × 1009. Both factors exceed 1, so the number is composite."
    ],
    "question": "Which factorisation proves 4 × 3 × 2 × 1 + 3 is composite?",
    "options": [
      "3(4 × 2 × 1 + 1) = 3 × 9",
      "3(4 × 3 × 2 × 1 + 1)",
      "3 + 24"
    ],
    "correct": 0,
    "feedback": [
      "Correct. One factor of 3 was removed from the product, and +3 becomes +1 inside the bracket.",
      "This keeps an extra factor of 3 inside the bracket.",
      "This is still a sum, not an exhibited product of two factors greater than 1."
    ],
    "hints": [
      "Factor 3 out of both terms.",
      "The remaining product is 4 × 2 × 1."
    ]
  },
  {
    "id": "lowest-terms",
    "section": 2,
    "title": "Why begin with a fraction in lowest terms?",
    "intro": "If a number is rational, it has a representation a/b with positive coprime integers when the number is positive. Reducing by the HCF produces that representation. This makes a later common-factor conclusion a genuine contradiction.",
    "simple": "A reducible fraction is allowed in general. The proof deliberately chooses one that has already been reduced.",
    "example": [
      "6/8 reduces to 3/4 by dividing numerator and denominator by 2.",
      "For a supposed rational √2, choose a/b with HCF(a,b) = 1 before starting the proof."
    ],
    "question": "Why is “a and b are both even” a contradiction in the √2 proof?",
    "options": [
      "Even numerators are forbidden in every fraction",
      "We specifically chose a/b in lowest terms",
      "Every denominator must be odd"
    ],
    "correct": 1,
    "feedback": [
      "2/3 is a perfectly valid fraction.",
      "Correct. A shared factor of 2 contradicts the chosen coprime representation.",
      "An even denominator is allowed; for example 1/2 is rational."
    ],
    "hints": [
      "Recall the HCF condition imposed at the start.",
      "Lowest terms means no common factor greater than 1."
    ]
  },
  {
    "id": "lemma-proof",
    "section": 2,
    "title": "Why the prime-divides-a-square theorem holds",
    "intro": "Theorem 1.2: for a positive integer a and prime p, p | a² implies p | a. Its proof uses the uniqueness of prime factorisation. The textbook marks this proof as additional material; it is included here for understanding.",
    "simple": "Squaring repeats the primes already present. It cannot introduce a new prime.",
    "example": [
      "If a > 1, write a as a product of primes q₁q₂…qₖ. Then a² has exactly the same prime types, each repeated twice.",
      "If prime p divides a², uniqueness forces p to be one of those q factors. Hence it divides a.",
      "If a = 1, no prime divides a², so the assumption cannot occur.",
      "The condition “prime” matters: 4 divides 2², but 4 does not divide 2."
    ],
    "question": "What crucial property justifies the step from a² back to a?",
    "options": [
      "Prime factorisation is unique",
      "All divisors are prime",
      "Squaring changes every prime factor"
    ],
    "correct": 0,
    "feedback": [
      "Exactly. No new prime can appear in the factorisation of the square.",
      "Composite divisors exist; the theorem specifically assumes p is prime.",
      "Squaring repeats the existing prime factors."
    ],
    "hints": [
      "Think about the prime types in a and a².",
      "The Fundamental Theorem of Arithmetic fixes those prime types."
    ]
  },
  {
    "id": "sqrt5-full",
    "section": 2,
    "title": "Write the full proof for √5",
    "intro": "Assume √5 = a/b in lowest terms, with a,b positive integers. Squaring forces 5 to divide both a and b, contradicting coprimality. This is a proof, not a decimal approximation.",
    "simple": "Assume a reduced fraction exists. Then show the numerator and denominator would both have a factor of 5.",
    "example": [
      "a² = 5b², so 5 | a² and therefore 5 | a.",
      "Write a = 5k. Substitution gives 25k² = 5b², hence b² = 5k².",
      "Thus 5 | b as well. This contradicts HCF(a,b) = 1.",
      "The rationality assumption is false; √5 is irrational."
    ],
    "question": "After substituting a = 5k into a² = 5b², what follows?",
    "options": [
      "b² = 25k²",
      "b² = 5k²",
      "b = 5k²"
    ],
    "correct": 1,
    "feedback": [
      "Divide 25k² = 5b² by 5.",
      "Correct. This lets us conclude that 5 divides b too.",
      "The equation concerns b², not b."
    ],
    "hints": [
      "Square 5k to get 25k².",
      "Divide both sides by 5."
    ]
  },
  {
    "id": "sqrt-prime",
    "section": 2,
    "title": "The same proof works for any prime p",
    "intro": "For any prime p, assume √p = a/b in lowest terms. From a² = pb² infer p | a. Substituting a = pk gives b² = pk², hence p | b: a contradiction.",
    "simple": "Replace 2, 3 or 5 by any prime. The proof needs primality at both divisibility steps.",
    "example": [
      "For p = 3, this proves √3 irrational (Book Example 5).",
      "For p = 5, it proves the first question in Exercise 1.2.",
      "This argument does not say every square root is irrational: √9 = 3."
    ],
    "question": "Which conclusion is justified by this argument?",
    "options": [
      "√p is irrational for every prime p",
      "√n is irrational for every positive integer n",
      "Every irrational number is a square root"
    ],
    "correct": 0,
    "feedback": [
      "Yes. The prime condition is the key assumption.",
      "Perfect squares such as 9 are counterexamples.",
      "The argument makes no such claim about all irrational numbers."
    ],
    "hints": [
      "The theorem applied to a² assumes a prime divisor.",
      "Retain that assumption in your conclusion."
    ]
  },
  {
    "id": "rational-shift",
    "section": 2,
    "title": "Adding or subtracting a rational number",
    "intro": "If x is irrational and r rational, then r + x and r − x are irrational. Assume the expression is rational, then isolate x using rational arithmetic to get a contradiction.",
    "simple": "Adding or subtracting a rational number cannot turn an irrational number into a rational one.",
    "example": [
      "Book Example 6: suppose t = 5 − √3 is rational. Then √3 = 5 − t would be rational. Contradiction.",
      "For t = 6 + √2, rearrange to √2 = t − 6 and use the same reasoning."
    ],
    "question": "If t = 5 − √3, which rearrangement isolates √3?",
    "options": [
      "√3 = t − 5",
      "√3 = 5 − t",
      "√3 = 5 + t"
    ],
    "correct": 1,
    "feedback": [
      "Check by adding √3 to both sides of t = 5 − √3.",
      "Correct. If t were rational, the right side would be rational.",
      "The correct operation subtracts t from 5."
    ],
    "hints": [
      "Start with t + √3 = 5.",
      "Subtract t."
    ]
  },
  {
    "id": "rational-scale",
    "section": 2,
    "title": "The rational multiplier must be non-zero",
    "intro": "If x is irrational and r is a non-zero rational number, rx is irrational. If rx were rational, dividing by r would make x rational. Zero is an important exception.",
    "simple": "A non-zero rational scale cannot remove irrationality. Multiplying by zero can: 0 × √2 = 0.",
    "example": [
      "Book Example 7: suppose t = 3√2 is rational. Then √2 = t/3 is rational: contradiction.",
      "If t = 7√5 were rational, √5 = t/7 would be rational too."
    ],
    "question": "Why must the rational multiplier be non-zero?",
    "options": [
      "Because zero is irrational",
      "Because we divide by it, and 0 × an irrational number is rational",
      "Because irrational numbers cannot be multiplied"
    ],
    "correct": 1,
    "feedback": [
      "Zero is rational: 0 = 0/1.",
      "Exactly. Both the proof step and the conclusion require the non-zero condition.",
      "Irrational numbers can be multiplied."
    ],
    "hints": [
      "Try multiplying √2 by 0.",
      "Division by 0 is undefined."
    ]
  },
  {
    "id": "reciprocal",
    "section": 2,
    "title": "The reciprocal proof needs one more step",
    "intro": "For non-zero irrational x, 1/x is irrational. If t = 1/x were rational, t could not be zero; taking its reciprocal would give x = 1/t rational, a contradiction.",
    "simple": "If an exact reciprocal were a non-zero rational fraction, turning it upside down would give a rational original number.",
    "example": [
      "For t = 1/√2, t ≠ 0. If t were rational, √2 = 1/t would be rational.",
      "For a non-zero rational r, both rx and x/r are irrational. Likewise r/x is irrational when x is non-zero irrational."
    ],
    "question": "In the proof for 1/√2, why is taking 1/t legitimate?",
    "options": [
      "Because t = 1/√2 is non-zero",
      "Because division by 0 is allowed",
      "Because every reciprocal is an integer"
    ],
    "correct": 0,
    "feedback": [
      "Correct. Establishing t ≠ 0 makes the reciprocal step valid.",
      "Division by zero is never allowed.",
      "Reciprocals need not be integers."
    ],
    "hints": [
      "The numerator of 1/√2 is 1.",
      "Its exact value cannot equal zero."
    ]
  },
  {
    "id": "irrational-traps",
    "section": 2,
    "title": "Two irrationals can behave differently",
    "intro": "The rational–irrational rules do not extend to arbitrary pairs of irrational numbers. Their sum or product can be rational or irrational. Check the exact expression.",
    "simple": "Do not label a result just because you see two irrational parts. They may cancel or multiply to a rational number.",
    "example": [
      "√2 + (−√2) = 0, rational.",
      "√2 × √2 = 2, rational.",
      "But √2 + √2 = 2√2, irrational by the non-zero rational multiplier rule."
    ],
    "question": "Which claim is correct?",
    "options": [
      "The product of two irrational numbers is always irrational",
      "The sum of two irrational numbers is always irrational",
      "Neither claim is always true"
    ],
    "correct": 2,
    "feedback": [
      "√2 × √2 = 2 is a counterexample.",
      "√2 + (−√2) = 0 is a counterexample.",
      "Yes. The proven rules involve one rational number and one irrational number, with their stated conditions."
    ],
    "hints": [
      "Use the exact examples above as counterexamples.",
      "Both “always” statements have a rational counterexample."
    ]
  }
];
