"use client";

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to Tech Store. These Terms of Service govern your use of our
            website and services. By accessing or using our services, you agree
            to be bound by these terms.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Use of Our Services</h2>
          <p>
            You may use our services only for lawful purposes and in accordance
            with these Terms. You agree not to use our services to conduct any
            activity that would constitute a civil or criminal offense or
            violate any law.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Accounts</h2>
          <p>
            When you create an account with us, you must provide us with
            information that is accurate, complete, and current at all times.
            Failure to do so constitutes a breach of the Terms, which may
            result in immediate termination of your account on our service.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality
            are and will remain the exclusive property of Tech Store and its
            licensors.
          </p>
        </section>
      </div>
    </div>
  );
}
