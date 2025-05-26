import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="mb-2 text-xl font-semibold">1. Introduction</h2>
            <p>Tech Store ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Tech Store.</p>
            <p className="mt-2 font-semibold text-destructive">Tech Store is a demonstration application. We do not intentionally collect or store real personal data beyond what is necessary for the demonstration (e.g., items in a virtual cart stored in your browser's local storage).</p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">2. Information We Collect (Demonstration Context)</h2>
            <p>For the purpose of this demonstration application, we may "collect" the following types of information:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li><strong>Cart Information:</strong> If you add items to your shopping cart, this information is stored in your browser's local storage to persist your cart during your session. This data is not sent to our servers.</li>
              <li><strong>Form Data (Mock):</strong> Any information you enter into forms (e.g., on the checkout page) is for demonstration purposes only and is not stored or processed beyond the current browser session for the simulation.</li>
            </ul>
            <p className="mt-2">We do not use cookies for tracking or collect any personally identifiable information (PII) for storage on servers for this demo application.</p>
          </section>
          
          <section>
            <h2 className="mb-2 text-xl font-semibold">3. How We Use Your Information (Demonstration Context)</h2>
            <p>The information "collected" is used solely to provide and improve the demonstration features of the Service, such as:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>To allow you to manage a virtual shopping cart.</li>
              <li>To simulate a checkout process.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">4. Data Security</h2>
            <p>While this is a demonstration application, we would, in a real-world scenario, take reasonable measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.</p>
          </section>
          
          <section>
            <h2 className="mb-2 text-xl font-semibold">5. Third-Party Services</h2>
            <p>This demonstration does not integrate with any third-party services that would collect your personal data.</p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">6. Children's Privacy</h2>
            <p>Our Service is not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13.</p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">7. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at [your-email@example.com].</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
