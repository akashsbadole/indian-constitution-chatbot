import { ChatInterface } from '../components/ChatInterface';
import { ContactForm } from '../components/ContactForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-saffron via-white to-indianGreen py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-navy mb-6">
            Indian Constitution AI Assistant
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Your intelligent guide to understanding India's constitution and legal framework. Ask questions and get expert insights powered by AI.
          </p>
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ChatInterface />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-8">Contact Us</h2>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Indian Constitution AI Assistant. All rights reserved.</p>
        </div>
      </footer>

      {/* Google Analytics Comment */}
      {/* 
        Add Google Analytics Script Here:
        <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'YOUR-GA-ID');
        </script>
      */}
    </div>
  );
};

export default Index;