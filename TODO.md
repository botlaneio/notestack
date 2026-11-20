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
