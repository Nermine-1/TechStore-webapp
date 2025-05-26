import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="mb-2 text-xl font-semibold">1. Introduction</h2>
            <p>Welcome to Tech Store ("we", "our", "us"). These Terms of Service govern your use of our website located at [Your Website URL] (the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
            <p className="mt-2 font-semibold text-destructive">Please note: Tech Store is a demonstration application. No real products are sold, and no real transactions occur.</p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">2. Use of Service</h2>
            <p>You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>In any way that violates any applicable national or international law or regulation.</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">3. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Tech Store and its licensors. The Service is protected by copyright, trademark, and other laws of both the [Your Country] and foreign countries.</p>
          </section>
          
          <section>
            <h2 className="mb-2 text-xl font-semibold">4. Disclaimer</h2>
            <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Tech Store makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content, or materials included therein. You expressly agree that your use of these services, their content, and any services or items obtained from us is at your sole risk.</p>
            <p className="mt-2">As this is a demo application, all product information, pricing, and availability are for illustrative purposes only and are not real.</p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">5. Limitation of Liability</h2>
            <p>In no event shall Tech Store, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">6. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">7. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at [your-email@example.com].</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
