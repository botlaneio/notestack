# NoteStack to-do list

- [ ] [Add shareable product pages for subject packs and the Core Collection (#4)](https://github.com/botlaneio/notestack/issues/4). Use one shared `/products/[slug]/` template for the four current offers, with direct links from the storefront and Stacky.

## Before opening paid orders

- [ ] Add a **Free Samples** page with previews for all three subjects and links to the free first chapters.
- [ ] Add a **Help & Contact** page with FAQs on accounts, packs, orders and access, plus a monitored support contact.
- [ ] Publish **Privacy, Terms and Refund Policy** pages. Link them from the footer and checkout, and confirm that they reflect how NoteStack handles student accounts and digital purchases.
- [ ] Configure the payment processor for production and connect it to checkout. Confirm prices on the server and use verified payment notifications to record orders and grant the right account access once per payment.
- [ ] Finalize pack contents, pricing and delivery details. Have a teacher review the materials and samples against the Karnataka SSLC syllabus.
- [ ] Confirm paid lessons are protected in the production build. The README notes that lesson text is currently included in publicly served JavaScript.
- [ ] Verify the production domain and transactional email. Test sign-up, email verification and password reset.
- [ ] Run an end-to-end purchase test for one subject and the Core Collection. Verify receipts and account access, and test failed payments, duplicate notifications and refunds.

## Past board papers

- [ ] Have a teacher check the worked answers, starting with the items in `docs/board-papers-review.md`. KSEAB published key answers only for 2022, so 2024 and 2025 answers are NoteStack's own.
- [ ] Add the 2023 and 2026 papers only if KSEAB publishes them on kseab.karnataka.gov.in (checked 20 Nov 2026: not there). Official papers only.
- [ ] Consider adding Exam 2 and Exam 3 papers for 2024 and 2025 (they are on KSEAB too).

## Later: paid mock board exam (₹199)

Blocked on payments (Razorpay/Cashfree). Pilot idea: one test run in Jan/Feb 2027 using last year's SSLC paper.

- [ ] Let students buy a mock board exam for ₹199 and book an exam slot.
- [ ] Unlock the question paper at the booked start time.
- [ ] Students write on paper, then upload photos of their answer sheets before a cutoff time.
- [ ] Mark MCQs automatically.
- [ ] Give teachers a marking screen for the written answers, with a 24-hour turnaround.
- [ ] Show the grade and teacher feedback on the student's account page.
