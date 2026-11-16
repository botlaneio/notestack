import type {Chapter} from './maths-chapters.ts';
export const finalChapters:Chapter[]=[
  {
    "number": 13,
    "slug": "statistics",
    "title": "Statistics",
    "sections": [
      "13.1 Introduction",
      "13.2 Mean of Grouped Data",
      "13.3 Mode of Grouped Data",
      "13.4 Median of Grouped Data",
      "13.5 Summary"
    ],
    "summary": [
      [
        "Mean",
        "Use frequencies and class marks; direct, assumed-mean and step-deviation forms agree."
      ],
      [
        "Mode",
        "Locate a modal class and use its neighbouring frequencies; the class and modal estimate are not the same."
      ],
      [
        "Median",
        "Build cumulative counts, choose continuous boundaries and interpolate at N/2."
      ]
    ],
    "challenge": "Choose a suitable method for a fresh frequency table, explain its assumptions, and compare mean, median and mode without confusing an estimate with an observed value.",
    "steps": [
      {
        "id": "c13-why-group",
        "section": 0,
        "title": "Summarise a distribution",
        "intro": "Statistics turns many observations into a useful summary. A summary must still reflect how often each observation or class occurs.",
        "simple": "A frequency counts observations, not the class label itself.",
        "example": [
          "A frequency counts observations, not the class label itself.",
          "A data table can support different summaries; no one measure answers every question."
        ],
        "question": "What does a frequency represent?",
        "options": [
          "An upper boundary",
          "The number of observations in a value or class",
          "The midpoint"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. A frequency counts observations, not the class label itself.",
          "Correct. A data table can support different summaries; no one measure answers every question.",
          "Check the definition, the weights and the stated assumptions. A frequency counts observations, not the class label itself."
        ],
        "hints": [
          "A frequency counts observations, not the class label itself.",
          "A data table can support different summaries; no one measure answers every question."
        ]
      },
      {
        "id": "c13-weighted",
        "section": 1,
        "title": "A mean needs weights",
        "intro": "When a value occurs several times, multiply it by its frequency before adding.",
        "simple": "Marks 10 once and 20 three times give total 70 across 4 students.",
        "example": [
          "Marks 10 once and 20 three times give total 70 across 4 students.",
          "Mean=70/4=17.5, not the unweighted average 15."
        ],
        "question": "Which mean calculation is valid?",
        "options": [
          "(10+20)/2",
          "(1×10+3×20)/(1+3)",
          "(1+3)/(10+20)"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. Marks 10 once and 20 three times give total 70 across 4 students.",
          "Correct. Mean=70/4=17.5, not the unweighted average 15.",
          "Check the definition, the weights and the stated assumptions. Marks 10 once and 20 three times give total 70 across 4 students."
        ],
        "hints": [
          "Marks 10 once and 20 three times give total 70 across 4 students.",
          "Mean=70/4=17.5, not the unweighted average 15."
        ],
        "explorer": "statistics"
      },
      {
        "id": "c13-class-marks",
        "section": 1,
        "title": "Use the midpoint of a class",
        "intro": "A class mark is the average of its lower and upper limits. Grouped calculations use it to represent that class.",
        "simple": "The class mark for 40–55 is(40+55)/2=47.5.",
        "example": [
          "The class mark for 40–55 is(40+55)/2=47.5.",
          "This replacement is an assumption about positions within the class, not a record of every individual mark."
        ],
        "question": "What is the class mark of 100–150?",
        "options": [
          "100",
          "125",
          "150"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. The class mark for 40–55 is(40+55)/2=47.5.",
          "Correct. This replacement is an assumption about positions within the class, not a record of every individual mark.",
          "Check the definition, the weights and the stated assumptions. The class mark for 40–55 is(40+55)/2=47.5."
        ],
        "hints": [
          "The class mark for 40–55 is(40+55)/2=47.5.",
          "This replacement is an assumption about positions within the class, not a record of every individual mark."
        ]
      },
      {
        "id": "c13-boundaries",
        "section": 1,
        "title": "Place a shared endpoint in the next class",
        "intro": "The book uses lower-inclusive, upper-exclusive classes. A boundary value is not counted twice.",
        "simple": "A mark 40 belongs to 40–55, not 25–40.",
        "example": [
          "A mark 40 belongs to 40–55, not 25–40.",
          "Every observation is assigned once, preserving total frequency."
        ],
        "question": "Where does 55 belong?",
        "options": [
          "40–55",
          "55–70",
          "Both"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. A mark 40 belongs to 40–55, not 25–40.",
          "Correct. Every observation is assigned once, preserving total frequency.",
          "Check the definition, the weights and the stated assumptions. A mark 40 belongs to 40–55, not 25–40."
        ],
        "hints": [
          "A mark 40 belongs to 40–55, not 25–40.",
          "Every observation is assigned once, preserving total frequency."
        ]
      },
      {
        "id": "c13-direct",
        "section": 1,
        "title": "Direct mean from a table",
        "intro": "Multiply each class mark xᵢ by frequency fᵢ, add these products, and divide by N=Σfᵢ.",
        "simple": "Plants per house use weighted total 162 across 20 houses.",
        "example": [
          "Plants per house use weighted total 162 across 20 houses.",
          "Mean=162/20=8.1 plants."
        ],
        "question": "What belongs in the denominator?",
        "options": [
          "Number of class rows",
          "Total frequency",
          "Sum of class marks"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. Plants per house use weighted total 162 across 20 houses.",
          "Correct. Mean=162/20=8.1 plants.",
          "Check the definition, the weights and the stated assumptions. Plants per house use weighted total 162 across 20 houses."
        ],
        "hints": [
          "Plants per house use weighted total 162 across 20 houses.",
          "Mean=162/20=8.1 plants."
        ]
      },
      {
        "id": "c13-assumed",
        "section": 1,
        "title": "Choose a convenient assumed mean",
        "intro": "Subtract a central number a from each class mark to make arithmetic smaller. This is algebra, not a new estimate.",
        "simple": "Set dᵢ=xᵢ−a. Then mean=a+Σfᵢdᵢ/N.",
        "example": [
          "Set dᵢ=xᵢ−a. Then mean=a+Σfᵢdᵢ/N.",
          "You must add a back after averaging the deviations."
        ],
        "question": "What finishes an assumed-mean calculation?",
        "options": [
          "Add back a",
          "Discard negative deviations",
          "Divide by a"
        ],
        "correct": 0,
        "feedback": [
          "Correct. You must add a back after averaging the deviations.",
          "Check the definition, the weights and the stated assumptions. Set dᵢ=xᵢ−a. Then mean=a+Σfᵢdᵢ/N.",
          "Check the definition, the weights and the stated assumptions. Set dᵢ=xᵢ−a. Then mean=a+Σfᵢdᵢ/N."
        ],
        "hints": [
          "Set dᵢ=xᵢ−a. Then mean=a+Σfᵢdᵢ/N.",
          "You must add a back after averaging the deviations."
        ]
      },
      {
        "id": "c13-step",
        "section": 1,
        "title": "Scale the deviations",
        "intro": "Choose non-zero h and uᵢ=(xᵢ−a)/h. The mean is a+hΣfᵢuᵢ/N.",
        "simple": "With evenly spaced marks, a suitable h can make all uᵢ small integers.",
        "example": [
          "With evenly spaced marks, a suitable h can make all uᵢ small integers.",
          "The scale h must be multiplied back into the average step deviation."
        ],
        "question": "Which expression is correct?",
        "options": [
          "a+Σfu/N",
          "a+hΣfu/N",
          "h+aN"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. With evenly spaced marks, a suitable h can make all uᵢ small integers.",
          "Correct. The scale h must be multiplied back into the average step deviation.",
          "Check the definition, the weights and the stated assumptions. With evenly spaced marks, a suitable h can make all uᵢ small integers."
        ],
        "hints": [
          "With evenly spaced marks, a suitable h can make all uᵢ small integers.",
          "The scale h must be multiplied back into the average step deviation."
        ]
      },
      {
        "id": "c13-unequal",
        "section": 1,
        "title": "Unequal widths still have midpoints",
        "intro": "Direct and shifted weighted means can use unequal classes. A common scale h is merely an algebraic convenience.",
        "simple": "The wickets example has varying class widths but uses a=200, h=20.",
        "example": [
          "The wickets example has varying class widths but uses a=200, h=20.",
          "It still computes the same weighted midpoint sum; h need not be a class width."
        ],
        "question": "Do unequal widths invalidate the weighted-mean formula?",
        "options": [
          "Yes",
          "No",
          "Only if frequencies are integers"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. The wickets example has varying class widths but uses a=200, h=20.",
          "Correct. It still computes the same weighted midpoint sum; h need not be a class width.",
          "Check the definition, the weights and the stated assumptions. The wickets example has varying class widths but uses a=200, h=20."
        ],
        "hints": [
          "The wickets example has varying class widths but uses a=200, h=20.",
          "It still computes the same weighted midpoint sum; h need not be a class width."
        ]
      },
      {
        "id": "c13-missing",
        "section": 1,
        "title": "Use a known mean to recover frequency",
        "intro": "A missing frequency changes both the weighted total and the total number of observations.",
        "simple": "For pocket allowance, the known totals are 752 and 44; unknown f belongs to midpoint 20.",
        "example": [
          "For pocket allowance, the known totals are 752 and 44; unknown f belongs to midpoint 20.",
          "18=(752+20 f)/(44+f) gives f=20."
        ],
        "question": "Why does f appear in the denominator?",
        "options": [
          "It contributes observations to the total",
          "It changes every midpoint",
          "It is the assumed mean"
        ],
        "correct": 0,
        "feedback": [
          "Correct. 18=(752+20 f)/(44+f) gives f=20.",
          "Check the definition, the weights and the stated assumptions. For pocket allowance, the known totals are 752 and 44; unknown f belongs to midpoint 20.",
          "Check the definition, the weights and the stated assumptions. For pocket allowance, the known totals are 752 and 44; unknown f belongs to midpoint 20."
        ],
        "hints": [
          "For pocket allowance, the known totals are 752 and 44; unknown f belongs to midpoint 20.",
          "18=(752+20 f)/(44+f) gives f=20."
        ]
      },
      {
        "id": "c13-estimate",
        "section": 1,
        "title": "Grouping can change the estimate",
        "intro": "All three mean methods agree for the same grouped table. They can differ from the exact mean before grouping.",
        "simple": "The source’s discrete marks give 59.3. Their grouped midpoint calculation gives 62.",
        "example": [
          "The source’s discrete marks give 59.3. Their grouped midpoint calculation gives 62.",
          "Grouping loses information about positions inside each class; the difference is not a disagreement among the three formulas."
        ],
        "question": "Why can the grouped answer differ?",
        "options": [
          "Midpoints replace the original values",
          "Assumed mean is always wrong",
          "Frequencies are ignored"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Grouping loses information about positions inside each class; the difference is not a disagreement among the three formulas.",
          "Check the definition, the weights and the stated assumptions. The source’s discrete marks give 59.3. Their grouped midpoint calculation gives 62.",
          "Check the definition, the weights and the stated assumptions. The source’s discrete marks give 59.3. Their grouped midpoint calculation gives 62."
        ],
        "hints": [
          "The source’s discrete marks give 59.3. Their grouped midpoint calculation gives 62.",
          "Grouping loses information about positions inside each class; the difference is not a disagreement among the three formulas."
        ]
      },
      {
        "id": "c13-modal-class",
        "section": 2,
        "title": "Find the class with the highest frequency",
        "intro": "The modal class is an interval. The grouped mode is an estimated value inside that interval.",
        "simple": "For patient ages, the largest frequency 23 belongs to 35–45.",
        "example": [
          "For patient ages, the largest frequency 23 belongs to 35–45.",
          "The estimated mode is about 36.82 years, not 23 and not the whole interval itself."
        ],
        "question": "What is 23 in this example?",
        "options": [
          "The mode",
          "A frequency",
          "A class width"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. For patient ages, the largest frequency 23 belongs to 35–45.",
          "Correct. The estimated mode is about 36.82 years, not 23 and not the whole interval itself.",
          "Check the definition, the weights and the stated assumptions. For patient ages, the largest frequency 23 belongs to 35–45."
        ],
        "hints": [
          "For patient ages, the largest frequency 23 belongs to 35–45.",
          "The estimated mode is about 36.82 years, not 23 and not the whole interval itself."
        ]
      },
      {
        "id": "c13-mode-symbols",
        "section": 2,
        "title": "Use both neighbouring frequencies",
        "intro": "For one modal class of equal-width continuous intervals, mode=l+[(f₁−f₀)/(2 f₁−f₀−f₂)]h.",
        "simple": "f₁is the modal-class frequency; f₀and f₂are the preceding and succeeding frequencies.",
        "example": [
          "f₁is the modal-class frequency; f₀and f₂are the preceding and succeeding frequencies.",
          "l and h are the lower boundary and width of the modal class."
        ],
        "question": "Which is f₀?",
        "options": [
          "The preceding class frequency",
          "The preceding cumulative total",
          "The lower boundary"
        ],
        "correct": 0,
        "feedback": [
          "Correct. l and h are the lower boundary and width of the modal class.",
          "Check the definition, the weights and the stated assumptions. f₁is the modal-class frequency; f₀and f₂are the preceding and succeeding frequencies.",
          "Check the definition, the weights and the stated assumptions. f₁is the modal-class frequency; f₀and f₂are the preceding and succeeding frequencies."
        ],
        "hints": [
          "f₁is the modal-class frequency; f₀and f₂are the preceding and succeeding frequencies.",
          "l and h are the lower boundary and width of the modal class."
        ]
      },
      {
        "id": "c13-mode-vs-mean",
        "section": 2,
        "title": "A peak and a balance need not agree",
        "intro": "The mode describes the distribution’s peak; the mean uses all weighted class marks.",
        "simple": "Household expenditure has a modal estimate near₹1847.83 but mean₹2662.50.",
        "example": [
          "Household expenditure has a modal estimate near₹1847.83 but mean₹2662.50.",
          "Neither measure must always exceed the other. Interpret each in the context of its units."
        ],
        "question": "Must mean always equal mode?",
        "options": [
          "Yes",
          "No",
          "Only because both are grouped"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. Household expenditure has a modal estimate near₹1847.83 but mean₹2662.50.",
          "Correct. Neither measure must always exceed the other. Interpret each in the context of its units.",
          "Check the definition, the weights and the stated assumptions. Household expenditure has a modal estimate near₹1847.83 but mean₹2662.50."
        ],
        "hints": [
          "Household expenditure has a modal estimate near₹1847.83 but mean₹2662.50.",
          "Neither measure must always exceed the other. Interpret each in the context of its units."
        ]
      },
      {
        "id": "c13-tied-modes",
        "section": 2,
        "title": "Do not hide multiple peaks",
        "intro": "Raw data can have multiple equally frequent modes. The chapter’s grouped formula is used for a single modal class.",
        "simple": "For raw wickets 2, 6, 4, 5, 0, 2, 1, 3, 2, 3, the mode is 2.",
        "example": [
          "For raw wickets 2, 6, 4, 5, 0, 2, 1, 3, 2, 3, the mode is 2.",
          "If several classes tie at the highest frequency, do not silently choose just one as a unique modal class."
        ],
        "question": "What should you do with tied highest frequencies?",
        "options": [
          "Acknowledge that there is no unique peak",
          "Choose the first row silently",
          "Average the class labels without a rule"
        ],
        "correct": 0,
        "feedback": [
          "Correct. If several classes tie at the highest frequency, do not silently choose just one as a unique modal class.",
          "Check the definition, the weights and the stated assumptions. For raw wickets 2, 6, 4, 5, 0, 2, 1, 3, 2, 3, the mode is 2.",
          "Check the definition, the weights and the stated assumptions. For raw wickets 2, 6, 4, 5, 0, 2, 1, 3, 2, 3, the mode is 2."
        ],
        "hints": [
          "For raw wickets 2, 6, 4, 5, 0, 2, 1, 3, 2, 3, the mode is 2.",
          "If several classes tie at the highest frequency, do not silently choose just one as a unique modal class."
        ]
      },
      {
        "id": "c13-ordered",
        "section": 3,
        "title": "A median depends on order",
        "intro": "Arrange values before locating the middle position. For an even count, average the two central observed values.",
        "simple": "In the 100-student raw example, positions 50 and 51 contain 28 and 29.",
        "example": [
          "In the 100-student raw example, positions 50 and 51 contain 28 and 29.",
          "The exact raw median is 28.5."
        ],
        "question": "What is required before locating a raw median?",
        "options": [
          "Sort the data",
          "Square every value",
          "Find the largest frequency only"
        ],
        "correct": 0,
        "feedback": [
          "Correct. The exact raw median is 28.5.",
          "Check the definition, the weights and the stated assumptions. In the 100-student raw example, positions 50 and 51 contain 28 and 29.",
          "Check the definition, the weights and the stated assumptions. In the 100-student raw example, positions 50 and 51 contain 28 and 29."
        ],
        "hints": [
          "In the 100-student raw example, positions 50 and 51 contain 28 and 29.",
          "The exact raw median is 28.5."
        ]
      },
      {
        "id": "c13-cumulative",
        "section": 3,
        "title": "Cumulative means running total",
        "intro": "A less-than cumulative total through a class includes that class and all earlier classes.",
        "simple": "Frequencies 4, 7, 18 give cumulative counts 4, 11, 29.",
        "example": [
          "Frequencies 4, 7, 18 give cumulative counts 4, 11, 29.",
          "Recover ordinary frequencies by differences:4, 11−4, 29−11."
        ],
        "question": "What is the third ordinary frequency?",
        "options": [
          "29",
          "18",
          "11"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. Frequencies 4, 7, 18 give cumulative counts 4, 11, 29.",
          "Correct. Recover ordinary frequencies by differences:4, 11−4, 29−11.",
          "Check the definition, the weights and the stated assumptions. Frequencies 4, 7, 18 give cumulative counts 4, 11, 29."
        ],
        "hints": [
          "Frequencies 4, 7, 18 give cumulative counts 4, 11, 29.",
          "Recover ordinary frequencies by differences:4, 11−4, 29−11."
        ]
      },
      {
        "id": "c13-more-than",
        "section": 3,
        "title": "More-than totals run the other way",
        "intro": "A more-than-or-equal count at a lower boundary includes that class and every later class.",
        "simple": "With N=53 and 5 observations below 10, there are 48 observations at least 10.",
        "example": [
          "With N=53 and 5 observations below 10, there are 48 observations at least 10.",
          "Keep “less than” and “at least” boundaries consistent."
        ],
        "question": "How many are at least 10?",
        "options": [
          "5",
          "48",
          "53"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. With N=53 and 5 observations below 10, there are 48 observations at least 10.",
          "Correct. Keep “less than” and “at least” boundaries consistent.",
          "Check the definition, the weights and the stated assumptions. With N=53 and 5 observations below 10, there are 48 observations at least 10."
        ],
        "hints": [
          "With N=53 and 5 observations below 10, there are 48 observations at least 10.",
          "Keep “less than” and “at least” boundaries consistent."
        ]
      },
      {
        "id": "c13-median-class",
        "section": 3,
        "title": "Locate N/2 in cumulative totals",
        "intro": "For grouped data, find the class whose cumulative count reaches the middle position. Then interpolate within it.",
        "simple": "For N=68, N/2=34. Cumulative count before 125 is 22 and through 145 is 42.",
        "example": [
          "For N=68, N/2=34. Cumulative count before 125 is 22 and through 145 is 42.",
          "The median class is 125–145."
        ],
        "question": "Which is the median class?",
        "options": [
          "105–125",
          "125–145",
          "145–165"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. For N=68, N/2=34. Cumulative count before 125 is 22 and through 145 is 42.",
          "Correct. The median class is 125–145.",
          "Check the definition, the weights and the stated assumptions. For N=68, N/2=34. Cumulative count before 125 is 22 and through 145 is 42."
        ],
        "hints": [
          "For N=68, N/2=34. Cumulative count before 125 is 22 and through 145 is 42.",
          "The median class is 125–145."
        ]
      },
      {
        "id": "c13-median-formula",
        "section": 3,
        "title": "Separate cf from f",
        "intro": "Median=l+[(N/2−cf)/f]h, where cf is cumulative frequency before the median class and f is that class’s own frequency.",
        "simple": "For electricity:l 125, h 20, cf 22, f 20, N68.",
        "example": [
          "For electricity:l 125, h 20, cf 22, f 20, N68.",
          "Median=125+[(34−22)/20]20=137."
        ],
        "question": "Which value is cf here?",
        "options": [
          "22",
          "20",
          "42"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Median=125+[(34−22)/20]20=137.",
          "Check the definition, the weights and the stated assumptions. For electricity:l 125, h 20, cf 22, f 20, N68.",
          "Check the definition, the weights and the stated assumptions. For electricity:l 125, h 20, cf 22, f 20, N68."
        ],
        "hints": [
          "For electricity:l 125, h 20, cf 22, f 20, N68.",
          "Median=125+[(34−22)/20]20=137."
        ]
      },
      {
        "id": "c13-continuous",
        "section": 3,
        "title": "Convert inclusive rounded classes",
        "intro": "When measurements are rounded to the nearest unit, adjacent inclusive classes need continuous boundaries before interpolation.",
        "simple": "Leaves 118–126 and 127–135 become 117.5–126.5 and 126.5–135.5.",
        "example": [
          "Leaves 118–126 and 127–135 become 117.5–126.5 and 126.5–135.5.",
          "A class 145–153 therefore uses lower boundary 144.5 and width 9."
        ],
        "question": "Which lower boundary is correct?",
        "options": [
          "145",
          "144.5",
          "144"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. Leaves 118–126 and 127–135 become 117.5–126.5 and 126.5–135.5.",
          "Correct. A class 145–153 therefore uses lower boundary 144.5 and width 9.",
          "Check the definition, the weights and the stated assumptions. Leaves 118–126 and 127–135 become 117.5–126.5 and 126.5–135.5."
        ],
        "hints": [
          "Leaves 118–126 and 127–135 become 117.5–126.5 and 126.5–135.5.",
          "A class 145–153 therefore uses lower boundary 144.5 and width 9."
        ]
      },
      {
        "id": "c13-recover-counts",
        "section": 3,
        "title": "A less-than table must be differenced",
        "intro": "Do not substitute the cumulative count as the median-class frequency.",
        "simple": "Policy-holder cumulative totals 45 below 35 and 78 below 40 give class frequency 33 for 35–40.",
        "example": [
          "Policy-holder cumulative totals 45 below 35 and 78 below 40 give class frequency 33 for 35–40.",
          "Use f=33 and preceding cf=45 in the median formula."
        ],
        "question": "What is f for 35–40?",
        "options": [
          "78",
          "45",
          "33"
        ],
        "correct": 2,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. Policy-holder cumulative totals 45 below 35 and 78 below 40 give class frequency 33 for 35–40.",
          "Check the definition, the weights and the stated assumptions. Policy-holder cumulative totals 45 below 35 and 78 below 40 give class frequency 33 for 35–40.",
          "Correct. Use f=33 and preceding cf=45 in the median formula."
        ],
        "hints": [
          "Policy-holder cumulative totals 45 below 35 and 78 below 40 give class frequency 33 for 35–40.",
          "Use f=33 and preceding cf=45 in the median formula."
        ]
      },
      {
        "id": "c13-median-missing",
        "section": 3,
        "title": "Use the stated median to choose its class",
        "intro": "A known median tells you which class contains it, even when some frequencies are missing. Combine its formula with the total.",
        "simple": "Median 28.5 means class 20–30. Total 60 gives x+y=15.",
        "example": [
          "Median 28.5 means class 20–30. Total 60 gives x+y=15.",
          "28.5=20+[(30−5−x)/20]10 yields x 8, y 7."
        ],
        "question": "Which second equation comes from the total?",
        "options": [
          "x+y=15",
          "x+y=60",
          "x−y=15"
        ],
        "correct": 0,
        "feedback": [
          "Correct. 28.5=20+[(30−5−x)/20]10 yields x 8, y 7.",
          "Check the definition, the weights and the stated assumptions. Median 28.5 means class 20–30. Total 60 gives x+y=15.",
          "Check the definition, the weights and the stated assumptions. Median 28.5 means class 20–30. Total 60 gives x+y=15."
        ],
        "hints": [
          "Median 28.5 means class 20–30. Total 60 gives x+y=15.",
          "28.5=20+[(30−5−x)/20]10 yields x 8, y 7."
        ]
      },
      {
        "id": "c13-empirical",
        "section": 3,
        "title": "An empirical relationship is not an identity",
        "intro": "The chapter gives 3 Median≈Mode+2 Mean as a practical approximate relationship. It need not hold for every data set.",
        "simple": "When full data are available, compute the requested measures directly.",
        "example": [
          "When full data are available, compute the requested measures directly.",
          "A discrepancy from the empirical relation is not proof that the calculations are wrong."
        ],
        "question": "How should the relationship be treated?",
        "options": [
          "As an exact law for every distribution",
          "As an approximation",
          "As a definition of frequency"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. When full data are available, compute the requested measures directly.",
          "Correct. A discrepancy from the empirical relation is not proof that the calculations are wrong.",
          "Check the definition, the weights and the stated assumptions. When full data are available, compute the requested measures directly."
        ],
        "hints": [
          "When full data are available, compute the requested measures directly.",
          "A discrepancy from the empirical relation is not proof that the calculations are wrong."
        ]
      },
      {
        "id": "c13-round",
        "section": 4,
        "title": "Keep precision until the end",
        "intro": "Carry the exact fraction or enough digits through intermediate steps, then round to the requested precision.",
        "simple": "A grouped mean 35.375 rounds to 35.38 at 2 decimal places.",
        "example": [
          "A grouped mean 35.375 rounds to 35.38 at 2 decimal places.",
          "Some printed answers truncate or use fewer places; the practice prompt and model state the required precision explicitly."
        ],
        "question": "What is 35.375 to 2 decimal places?",
        "options": [
          "35.37",
          "35.38",
          "35.3"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. A grouped mean 35.375 rounds to 35.38 at 2 decimal places.",
          "Correct. Some printed answers truncate or use fewer places; the practice prompt and model state the required precision explicitly.",
          "Check the definition, the weights and the stated assumptions. A grouped mean 35.375 rounds to 35.38 at 2 decimal places."
        ],
        "hints": [
          "A grouped mean 35.375 rounds to 35.38 at 2 decimal places.",
          "Some printed answers truncate or use fewer places; the practice prompt and model state the required precision explicitly."
        ]
      },
      {
        "id": "c13-choose",
        "section": 4,
        "title": "Explain your summary",
        "intro": "Mean, median and mode answer different questions. A numerical result needs its units and a sensible interpretation.",
        "simple": "A fractional grouped modal estimate does not mean an actual person or object had that exact measured value.",
        "example": [
          "A fractional grouped modal estimate does not mean an actual person or object had that exact measured value.",
          "Use the table, method and approximation together when explaining your answer."
        ],
        "question": "Which is a valid conclusion?",
        "options": [
          "A grouped estimate summarises a distribution",
          "Every observation equals the mean",
          "The modal frequency is the mode itself"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Use the table, method and approximation together when explaining your answer.",
          "Check the definition, the weights and the stated assumptions. A fractional grouped modal estimate does not mean an actual person or object had that exact measured value.",
          "Check the definition, the weights and the stated assumptions. A fractional grouped modal estimate does not mean an actual person or object had that exact measured value."
        ],
        "hints": [
          "A fractional grouped modal estimate does not mean an actual person or object had that exact measured value.",
          "Use the table, method and approximation together when explaining your answer."
        ]
      }
    ]
  },
  {
    "number": 14,
    "slug": "probability",
    "title": "Probability",
    "sections": [
      "14.1 Probability — A Theoretical Approach",
      "14.2 Summary"
    ],
    "summary": [
      [
        "Build a sample space",
        "Count equally likely elementary outcomes, not just event labels."
      ],
      [
        "Use complements",
        "P(not E)=1−P(E), with probabilities between 0 and 1."
      ],
      [
        "Respect the experiment",
        "Ordered repetitions, replacement and uniform-area/time models change the calculation."
      ]
    ],
    "challenge": "List a complete sample space for a new experiment, justify equal likelihood, and explain an at-least-one event by both counting and complement.",
    "steps": [
      {
        "id": "c14-chance",
        "section": 0,
        "title": "Describe the experiment first",
        "intro": "Probability depends on what is being done, what outcomes are possible, and which model makes them equally likely.",
        "simple": "A fair coin has outcomes H, T. A fair die has faces 1 through 6.",
        "example": [
          "A fair coin has outcomes H, T. A fair die has faces 1 through 6.",
          "A car starting or not starting has two labels, but their chances are not automatically equal."
        ],
        "question": "Do two listed possibilities guarantee probability 1/2 each?",
        "options": [
          "Yes",
          "No",
          "Only if the labels are short"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. A fair coin has outcomes H, T. A fair die has faces 1 through 6.",
          "Correct. A car starting or not starting has two labels, but their chances are not automatically equal.",
          "Check the definition, the weights and the stated assumptions. A fair coin has outcomes H, T. A fair die has faces 1 through 6."
        ],
        "hints": [
          "A fair coin has outcomes H, T. A fair die has faces 1 through 6.",
          "A car starting or not starting has two labels, but their chances are not automatically equal."
        ]
      },
      {
        "id": "c14-experimental",
        "section": 0,
        "title": "Observed frequency is not the theoretical value",
        "intro": "Experimental probability is the fraction of observed trials showing an event. It can vary from one run to another.",
        "simple": "Seven heads in 10 tosses gives observed proportion 0.7.",
        "example": [
          "Seven heads in 10 tosses gives observed proportion 0.7.",
          "This does not change a fair coin’s theoretical probability 1/2."
        ],
        "question": "What is 7/10 in that example?",
        "options": [
          "An experimental proportion",
          "Proof the coin must have P(H)=0.7",
          "An impossible value"
        ],
        "correct": 0,
        "feedback": [
          "Correct. This does not change a fair coin’s theoretical probability 1/2.",
          "Check the definition, the weights and the stated assumptions. Seven heads in 10 tosses gives observed proportion 0.7.",
          "Check the definition, the weights and the stated assumptions. Seven heads in 10 tosses gives observed proportion 0.7."
        ],
        "hints": [
          "Seven heads in 10 tosses gives observed proportion 0.7.",
          "This does not change a fair coin’s theoretical probability 1/2."
        ],
        "explorer": "chance"
      },
      {
        "id": "c14-count-rule",
        "section": 0,
        "title": "Count only when elementary outcomes are equally likely",
        "intro": "For a finite fair sample space, P(E)=number favourable/total number of elementary outcomes.",
        "simple": "A bag with 3 red and 5 black balls has 8 individual objects; P(red)=3/8.",
        "example": [
          "A bag with 3 red and 5 black balls has 8 individual objects; P(red)=3/8.",
          "Counting only the 2 colour labels would wrongly assign 1/2 to each."
        ],
        "question": "What is the denominator for this bag?",
        "options": [
          "2",
          "3",
          "8"
        ],
        "correct": 2,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. A bag with 3 red and 5 black balls has 8 individual objects; P(red)=3/8.",
          "Check the definition, the weights and the stated assumptions. A bag with 3 red and 5 black balls has 8 individual objects; P(red)=3/8.",
          "Correct. Counting only the 2 colour labels would wrongly assign 1/2 to each."
        ],
        "hints": [
          "A bag with 3 red and 5 black balls has 8 individual objects; P(red)=3/8.",
          "Counting only the 2 colour labels would wrongly assign 1/2 to each."
        ]
      },
      {
        "id": "c14-elementary",
        "section": 0,
        "title": "An event can contain several outcomes",
        "intro": "An elementary event contains one elementary outcome. A grouped event can combine many.",
        "simple": "For a die,“greater than 4”contains 5 and 6, so probability 2/6=1/3.",
        "example": [
          "For a die,“greater than 4”contains 5 and 6, so probability 2/6=1/3.",
          "This is not an elementary event, even though it has one name."
        ],
        "question": "How many favourable faces are greater than 4?",
        "options": [
          "1",
          "2",
          "4"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. For a die,“greater than 4”contains 5 and 6, so probability 2/6=1/3.",
          "Correct. This is not an elementary event, even though it has one name.",
          "Check the definition, the weights and the stated assumptions. For a die,“greater than 4”contains 5 and 6, so probability 2/6=1/3."
        ],
        "hints": [
          "For a die,“greater than 4”contains 5 and 6, so probability 2/6=1/3.",
          "This is not an elementary event, even though it has one name."
        ]
      },
      {
        "id": "c14-range",
        "section": 0,
        "title": "Every probability lies between 0 and 1",
        "intro": "Impossible events have probability 0; sure events have probability 1. Other probabilities lie between these bounds.",
        "simple": "−1.5 cannot be a probability, but 15%=0.15 can.",
        "example": [
          "−1.5 cannot be a probability, but 15%=0.15 can.",
          "All exhaustive elementary probabilities sum to 1."
        ],
        "question": "Which value is invalid?",
        "options": [
          "2/3",
          "−1.5",
          "0.7"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. −1.5 cannot be a probability, but 15%=0.15 can.",
          "Correct. All exhaustive elementary probabilities sum to 1.",
          "Check the definition, the weights and the stated assumptions. −1.5 cannot be a probability, but 15%=0.15 can."
        ],
        "hints": [
          "−1.5 cannot be a probability, but 15%=0.15 can.",
          "All exhaustive elementary probabilities sum to 1."
        ]
      },
      {
        "id": "c14-complement",
        "section": 0,
        "title": "The complement fills the rest",
        "intro": "“Not E” contains exactly the outcomes not in E. These two events partition the sample space.",
        "simple": "P(not E)=1−P(E). If P(E)=0.05, the complement is 0.95.",
        "example": [
          "P(not E)=1−P(E). If P(E)=0.05, the complement is 0.95.",
          "The events must be actual complements; two named outcomes need not cover every possibility."
        ],
        "question": "What is the complement of “at least one head”?",
        "options": [
          "Exactly one head",
          "No heads",
          "All heads"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. P(not E)=1−P(E). If P(E)=0.05, the complement is 0.95.",
          "Correct. The events must be actual complements; two named outcomes need not cover every possibility.",
          "Check the definition, the weights and the stated assumptions. P(not E)=1−P(E). If P(E)=0.05, the complement is 0.95."
        ],
        "hints": [
          "P(not E)=1−P(E). If P(E)=0.05, the complement is 0.95.",
          "The events must be actual complements; two named outcomes need not cover every possibility."
        ]
      },
      {
        "id": "c14-fairness",
        "section": 0,
        "title": "State the fairness assumption",
        "intro": "A fair coin toss can assign one outcome to each football team. The equal-chance argument comes from the fair-coin model.",
        "simple": "Assign heads to one team and tails to the other before tossing.",
        "example": [
          "Assign heads to one team and tails to the other before tossing.",
          "Each team then has probability 1/2 of receiving the ball."
        ],
        "question": "What makes the assignment fair?",
        "options": [
          "The two outcomes are modelled as equally likely",
          "One team chooses after seeing the toss",
          "Two teams exist"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Each team then has probability 1/2 of receiving the ball.",
          "Check the definition, the weights and the stated assumptions. Assign heads to one team and tails to the other before tossing.",
          "Check the definition, the weights and the stated assumptions. Assign heads to one team and tails to the other before tossing."
        ],
        "hints": [
          "Assign heads to one team and tails to the other before tossing.",
          "Each team then has probability 1/2 of receiving the ball."
        ]
      },
      {
        "id": "c14-individuals",
        "section": 0,
        "title": "Draw individual objects, not category names",
        "intro": "Uniform random drawing gives equal chance to each individual object. Category probability depends on how many objects it contains.",
        "simple": "For 3 blue, 2 white, 4 red marbles, total 9.",
        "example": [
          "For 3 blue, 2 white, 4 red marbles, total 9.",
          "P(blue)=1/3, P(white)=2/9, P(red)=4/9."
        ],
        "question": "Which colour is most likely?",
        "options": [
          "Blue",
          "White",
          "Red"
        ],
        "correct": 2,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. For 3 blue, 2 white, 4 red marbles, total 9.",
          "Check the definition, the weights and the stated assumptions. For 3 blue, 2 white, 4 red marbles, total 9.",
          "Correct. P(blue)=1/3, P(white)=2/9, P(red)=4/9."
        ],
        "hints": [
          "For 3 blue, 2 white, 4 red marbles, total 9.",
          "P(blue)=1/3, P(white)=2/9, P(red)=4/9."
        ]
      },
      {
        "id": "c14-coins-value",
        "section": 0,
        "title": "Coin count is not monetary value",
        "intro": "If every coin is equally likely to fall out, use the number of coins in each denomination, not their total value.",
        "simple": "The piggy bank has 100+50+20+10=180 coins.",
        "example": [
          "The piggy bank has 100+50+20+10=180 coins.",
          "P(50 p)=100/180=5/9."
        ],
        "question": "What is the sample-space size?",
        "options": [
          "The total money value",
          "180 individual coins",
          "4 denomination labels"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. The piggy bank has 100+50+20+10=180 coins.",
          "Correct. P(50 p)=100/180=5/9.",
          "Check the definition, the weights and the stated assumptions. The piggy bank has 100+50+20+10=180 coins."
        ],
        "hints": [
          "The piggy bank has 100+50+20+10=180 coins.",
          "P(50 p)=100/180=5/9."
        ]
      },
      {
        "id": "c14-deck",
        "section": 0,
        "title": "Know the standard deck",
        "intro": "A standard 52-card deck without jokers has 4 suits of 13 cards. Each suit has jack, queen and king as its 3 face cards.",
        "simple": "There are 12 face cards, 6 red face cards, and 2 red kings.",
        "example": [
          "There are 12 face cards, 6 red face cards, and 2 red kings.",
          "An ace is not counted as a face card in these questions."
        ],
        "question": "How many face cards are there?",
        "options": [
          "4",
          "12",
          "16"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. There are 12 face cards, 6 red face cards, and 2 red kings.",
          "Correct. An ace is not counted as a face card in these questions.",
          "Check the definition, the weights and the stated assumptions. There are 12 face cards, 6 red face cards, and 2 red kings."
        ],
        "hints": [
          "There are 12 face cards, 6 red face cards, and 2 red kings.",
          "An ace is not counted as a face card in these questions."
        ]
      },
      {
        "id": "c14-ordered-coins",
        "section": 0,
        "title": "Two coins give four ordered outcomes",
        "intro": "Distinguish the first coin or toss from the second. HT and TH are different elementary outcomes.",
        "simple": "HH, HT, TH, TT are 4 equally likely sequences for fair independent tosses.",
        "example": [
          "HH, HT, TH, TT are 4 equally likely sequences for fair independent tosses.",
          "Exactly one head has 2 outcomes, so probability 1/2, not 1/3."
        ],
        "question": "What is P(exactly one head)?",
        "options": [
          "1/3",
          "1/2",
          "1/4"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. HH, HT, TH, TT are 4 equally likely sequences for fair independent tosses.",
          "Correct. Exactly one head has 2 outcomes, so probability 1/2, not 1/3.",
          "Check the definition, the weights and the stated assumptions. HH, HT, TH, TT are 4 equally likely sequences for fair independent tosses."
        ],
        "hints": [
          "HH, HT, TH, TT are 4 equally likely sequences for fair independent tosses.",
          "Exactly one head has 2 outcomes, so probability 1/2, not 1/3."
        ],
        "explorer": "chance"
      },
      {
        "id": "c14-three-tosses",
        "section": 0,
        "title": "Extend the ordered sample space",
        "intro": "Three fair independent tosses give 2×2×2=8 equally likely ordered sequences.",
        "simple": "HHH and TTT are the 2 sequences where all results agree.",
        "example": [
          "HHH and TTT are the 2 sequences where all results agree.",
          "The other 6 give probability 6/8=3/4 of not all agreeing."
        ],
        "question": "How many elementary sequences are there?",
        "options": [
          "3",
          "6",
          "8"
        ],
        "correct": 2,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. HHH and TTT are the 2 sequences where all results agree.",
          "Check the definition, the weights and the stated assumptions. HHH and TTT are the 2 sequences where all results agree.",
          "Correct. The other 6 give probability 6/8=3/4 of not all agreeing."
        ],
        "hints": [
          "HHH and TTT are the 2 sequences where all results agree.",
          "The other 6 give probability 6/8=3/4 of not all agreeing."
        ]
      },
      {
        "id": "c14-dice",
        "section": 0,
        "title": "Two dice give 36 ordered pairs",
        "intro": "Distinguishable dice let you identify which die showed each face. (1, 4)differs from(4, 1).",
        "simple": "There are 6 choices for the first and 6 for the second:36 ordered pairs.",
        "example": [
          "There are 6 choices for the first and 6 for the second:36 ordered pairs.",
          "Sum 8 has 5 favourable pairs and probability 5/36."
        ],
        "question": "How many outcomes make sum 8?",
        "options": [
          "1",
          "5",
          "8"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. There are 6 choices for the first and 6 for the second:36 ordered pairs.",
          "Correct. Sum 8 has 5 favourable pairs and probability 5/36.",
          "Check the definition, the weights and the stated assumptions. There are 6 choices for the first and 6 for the second:36 ordered pairs."
        ],
        "hints": [
          "There are 6 choices for the first and 6 for the second:36 ordered pairs.",
          "Sum 8 has 5 favourable pairs and probability 5/36."
        ],
        "explorer": "chance"
      },
      {
        "id": "c14-sums",
        "section": 0,
        "title": "The eleven sums are not equally likely",
        "intro": "Several ordered pairs can produce the same sum. Count the pairs before comparing sum probabilities.",
        "simple": "Sum 2 comes only from(1, 1), but sum 7 has 6 pairs.",
        "example": [
          "Sum 2 comes only from(1, 1), but sum 7 has 6 pairs.",
          "The 11 sum labels therefore do not each have chance 1/11."
        ],
        "question": "Which is more likely?",
        "options": [
          "Sum 2",
          "Sum 7",
          "They are equal because both are sums"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. Sum 2 comes only from(1, 1), but sum 7 has 6 pairs.",
          "Correct. The 11 sum labels therefore do not each have chance 1/11.",
          "Check the definition, the weights and the stated assumptions. Sum 2 comes only from(1, 1), but sum 7 has 6 pairs."
        ],
        "hints": [
          "Sum 2 comes only from(1, 1), but sum 7 has 6 pairs.",
          "The 11 sum labels therefore do not each have chance 1/11."
        ]
      },
      {
        "id": "c14-at-least",
        "section": 0,
        "title": "At least one includes two",
        "intro": "“At least one 5”includes(5, 5). A complement often prevents double counting.",
        "simple": "Of 36 dice pairs, 25 contain no 5.",
        "example": [
          "Of 36 dice pairs, 25 contain no 5.",
          "At least one 5 has probability 1−25/36=11/36."
        ],
        "question": "What is P(no 5 in two throws)?",
        "options": [
          "5/6",
          "25/36",
          "1/36"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. Of 36 dice pairs, 25 contain no 5.",
          "Correct. At least one 5 has probability 1−25/36=11/36.",
          "Check the definition, the weights and the stated assumptions. Of 36 dice pairs, 25 contain no 5."
        ],
        "hints": [
          "Of 36 dice pairs, 25 contain no 5.",
          "At least one 5 has probability 1−25/36=11/36."
        ]
      },
      {
        "id": "c14-replacement",
        "section": 0,
        "title": "Removal changes the next sample space",
        "intro": "When an object is not replaced, subtract it from both the total and the relevant category before the next draw.",
        "simple": "A20-bulb lot has 16 good and 4 defective. Removing one good leaves 15 good among 19.",
        "example": [
          "A20-bulb lot has 16 good and 4 defective. Removing one good leaves 15 good among 19.",
          "The next good probability is 15/19, not 16/20."
        ],
        "question": "What is the new total?",
        "options": [
          "20",
          "19",
          "16"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. A20-bulb lot has 16 good and 4 defective. Removing one good leaves 15 good among 19.",
          "Correct. The next good probability is 15/19, not 16/20.",
          "Check the definition, the weights and the stated assumptions. A20-bulb lot has 16 good and 4 defective. Removing one good leaves 15 good among 19."
        ],
        "hints": [
          "A20-bulb lot has 16 good and 4 defective. Removing one good leaves 15 good among 19.",
          "The next good probability is 15/19, not 16/20."
        ]
      },
      {
        "id": "c14-condition",
        "section": 0,
        "title": "Use the given first outcome",
        "intro": "A question may tell you what happened on the first draw. Use that condition rather than averaging over other first outcomes.",
        "simple": "After the queen of five specified cards is removed, no queen remains.",
        "example": [
          "After the queen of five specified cards is removed, no queen remains.",
          "P(queen on the next draw)=0; P(ace)=1/4."
        ],
        "question": "Why is a second queen impossible?",
        "options": [
          "The queen was set aside",
          "All cards are red",
          "The first draw was random"
        ],
        "correct": 0,
        "feedback": [
          "Correct. P(queen on the next draw)=0; P(ace)=1/4.",
          "Check the definition, the weights and the stated assumptions. After the queen of five specified cards is removed, no queen remains.",
          "Check the definition, the weights and the stated assumptions. After the queen of five specified cards is removed, no queen remains."
        ],
        "hints": [
          "After the queen of five specified cards is removed, no queen remains.",
          "P(queen on the next draw)=0; P(ace)=1/4."
        ]
      },
      {
        "id": "c14-numbered",
        "section": 0,
        "title": "Count endpoints and repeated labels",
        "intro": "Discs 1 through 90 include both endpoints. A repeated letter on two die faces represents two elementary outcomes.",
        "simple": "There are 81 two-digit numbers 10 through 90, and 9 perfect squares 1 through 81.",
        "example": [
          "There are 81 two-digit numbers 10 through 90, and 9 perfect squares 1 through 81.",
          "For faces A, B, C, D, E, A, P(A)=2/6."
        ],
        "question": "What is P(A)on that letter die?",
        "options": [
          "1/5",
          "1/6",
          "1/3"
        ],
        "correct": 2,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. There are 81 two-digit numbers 10 through 90, and 9 perfect squares 1 through 81.",
          "Check the definition, the weights and the stated assumptions. There are 81 two-digit numbers 10 through 90, and 9 perfect squares 1 through 81.",
          "Correct. For faces A, B, C, D, E, A, P(A)=2/6."
        ],
        "hints": [
          "There are 81 two-digit numbers 10 through 90, and 9 perfect squares 1 through 81.",
          "For faces A, B, C, D, E, A, P(A)=2/6."
        ]
      },
      {
        "id": "c14-complement-given",
        "section": 0,
        "title": "Complement the event actually given",
        "intro": "Some questions supply a probability directly. Do not replace it with a different experiment calculation.",
        "simple": "Given non-matching probability 0.992, the matching complement is 0.008.",
        "example": [
          "Given non-matching probability 0.992, the matching complement is 0.008.",
          "Name the two complementary events so that they exhaust the same experiment."
        ],
        "question": "What is 1−0.992?",
        "options": [
          "0.008",
          "0.08",
          "0.992"
        ],
        "correct": 0,
        "feedback": [
          "Correct. Name the two complementary events so that they exhaust the same experiment.",
          "Check the definition, the weights and the stated assumptions. Given non-matching probability 0.992, the matching complement is 0.008.",
          "Check the definition, the weights and the stated assumptions. Given non-matching probability 0.992, the matching complement is 0.008."
        ],
        "hints": [
          "Given non-matching probability 0.992, the matching complement is 0.008.",
          "Name the two complementary events so that they exhaust the same experiment."
        ]
      },
      {
        "id": "c14-uniform-time",
        "section": 0,
        "title": "Additional: a uniform stopping time",
        "intro": "The book’s non-examination example uses a continuous interval, with every equal-length interval assigned equal probability.",
        "simple": "Stopping uniformly within 2 minutes gives probability 0.5/2=1/4 for the first half-minute.",
        "example": [
          "Stopping uniformly within 2 minutes gives probability 0.5/2=1/4 for the first half-minute.",
          "There are infinitely many possible times; use lengths, not finite point counts."
        ],
        "question": "Which ratio applies?",
        "options": [
          "Favourable time length / total time length",
          "Number of seconds labels / number of event names",
          "Always 1/2"
        ],
        "correct": 0,
        "feedback": [
          "Correct. There are infinitely many possible times; use lengths, not finite point counts.",
          "Check the definition, the weights and the stated assumptions. Stopping uniformly within 2 minutes gives probability 0.5/2=1/4 for the first half-minute.",
          "Check the definition, the weights and the stated assumptions. Stopping uniformly within 2 minutes gives probability 0.5/2=1/4 for the first half-minute."
        ],
        "hints": [
          "Stopping uniformly within 2 minutes gives probability 0.5/2=1/4 for the first half-minute.",
          "There are infinitely many possible times; use lengths, not finite point counts."
        ]
      },
      {
        "id": "c14-uniform-area",
        "section": 0,
        "title": "Additional: a uniform landing point",
        "intro": "A uniform-area model assigns probability according to area. This is additional, non-examination source material.",
        "simple": "A diameter 1 m circle inside a 3 mby 2 mrectangle has probability(π/4)/6=π/24.",
        "example": [
          "A diameter 1 m circle inside a 3 mby 2 mrectangle has probability(π/4)/6=π/24.",
          "The model assumes a uniformly chosen landing point; the area ratio is not a finite count of points."
        ],
        "question": "Which radius belongs in the circle area?",
        "options": [
          "1 m",
          "0.5 m",
          "2 m"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. A diameter 1 m circle inside a 3 mby 2 mrectangle has probability(π/4)/6=π/24.",
          "Correct. The model assumes a uniformly chosen landing point; the area ratio is not a finite count of points.",
          "Check the definition, the weights and the stated assumptions. A diameter 1 m circle inside a 3 mby 2 mrectangle has probability(π/4)/6=π/24."
        ],
        "hints": [
          "A diameter 1 m circle inside a 3 mby 2 mrectangle has probability(π/4)/6=π/24.",
          "The model assumes a uniformly chosen landing point; the area ratio is not a finite count of points."
        ]
      },
      {
        "id": "c14-acceptance",
        "section": 0,
        "title": "Read the event criteria carefully",
        "intro": "Different people may accept different objects from the same random lot. Their favourable subsets need not be equal.",
        "simple": "Jimmy accepts only 88 good shirts out of 100. Sujatha also accepts 8 with minor defects, so she accepts 96.",
        "example": [
          "Jimmy accepts only 88 good shirts out of 100. Sujatha also accepts 8 with minor defects, so she accepts 96.",
          "The probabilities are 0.88 and 0.96 respectively."
        ],
        "question": "What is the favourable count for Sujatha?",
        "options": [
          "88",
          "92",
          "96"
        ],
        "correct": 2,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. Jimmy accepts only 88 good shirts out of 100. Sujatha also accepts 8 with minor defects, so she accepts 96.",
          "Check the definition, the weights and the stated assumptions. Jimmy accepts only 88 good shirts out of 100. Sujatha also accepts 8 with minor defects, so she accepts 96.",
          "Correct. The probabilities are 0.88 and 0.96 respectively."
        ],
        "hints": [
          "Jimmy accepts only 88 good shirts out of 100. Sujatha also accepts 8 with minor defects, so she accepts 96.",
          "The probabilities are 0.88 and 0.96 respectively."
        ]
      },
      {
        "id": "c14-model-labels",
        "section": 0,
        "title": "Outcome names alone do not prove fairness",
        "intro": "The textbook’s random true/false guess and idealised birth examples use stated equal-likelihood models. Skills, mechanisms and assumptions matter.",
        "simple": "A random guess between two answers has one correct and one incorrect choice.",
        "example": [
          "A random guess between two answers has one correct and one incorrect choice.",
          "A knowledgeable answer or a basketball shot need not have equal success/failure chances."
        ],
        "question": "What must be justified before using favourable/total counts?",
        "options": [
          "Equal likelihood of the elementary outcomes",
          "Only the number of category names",
          "That the event sounds random"
        ],
        "correct": 0,
        "feedback": [
          "Correct. A knowledgeable answer or a basketball shot need not have equal success/failure chances.",
          "Check the definition, the weights and the stated assumptions. A random guess between two answers has one correct and one incorrect choice.",
          "Check the definition, the weights and the stated assumptions. A random guess between two answers has one correct and one incorrect choice."
        ],
        "hints": [
          "A random guess between two answers has one correct and one incorrect choice.",
          "A knowledgeable answer or a basketball shot need not have equal success/failure chances."
        ]
      },
      {
        "id": "c14-retrieve",
        "section": 1,
        "title": "Rebuild the sample space",
        "intro": "For repeated experiments, use the ordered elementary outcomes and combine them into the requested event.",
        "simple": "Two dice have 36 ordered pairs; three fair coins have 8 ordered sequences.",
        "example": [
          "Two dice have 36 ordered pairs; three fair coins have 8 ordered sequences.",
          "Check that all elementary counts add to the total and complementary probabilities sum to 1."
        ],
        "question": "Which is a valid check?",
        "options": [
          "All event labels must be equally likely",
          "P(E)+P(not E)=1",
          "Every experiment has 2 outcomes"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. Two dice have 36 ordered pairs; three fair coins have 8 ordered sequences.",
          "Correct. Check that all elementary counts add to the total and complementary probabilities sum to 1.",
          "Check the definition, the weights and the stated assumptions. Two dice have 36 ordered pairs; three fair coins have 8 ordered sequences."
        ],
        "hints": [
          "Two dice have 36 ordered pairs; three fair coins have 8 ordered sequences.",
          "Check that all elementary counts add to the total and complementary probabilities sum to 1."
        ]
      },
      {
        "id": "c14-interpret",
        "section": 1,
        "title": "Keep theoretical and observed probabilities distinct",
        "intro": "A theoretical model describes chances before a trial. A finite experiment produces an observed proportion that can differ.",
        "simple": "Many trials can help investigate a model, but no fixed finite run must match it exactly.",
        "example": [
          "Many trials can help investigate a model, but no fixed finite run must match it exactly.",
          "Explain the assumptions, the event and the denominator along with a numerical fraction."
        ],
        "question": "Does one unusual run alone disprove a fair model?",
        "options": [
          "Yes",
          "No",
          "Only if it has ten trials"
        ],
        "correct": 1,
        "feedback": [
          "Check the definition, the weights and the stated assumptions. Many trials can help investigate a model, but no fixed finite run must match it exactly.",
          "Correct. Explain the assumptions, the event and the denominator along with a numerical fraction.",
          "Check the definition, the weights and the stated assumptions. Many trials can help investigate a model, but no fixed finite run must match it exactly."
        ],
        "hints": [
          "Many trials can help investigate a model, but no fixed finite run must match it exactly.",
          "Explain the assumptions, the event and the denominator along with a numerical fraction."
        ]
      }
    ]
  }
];
