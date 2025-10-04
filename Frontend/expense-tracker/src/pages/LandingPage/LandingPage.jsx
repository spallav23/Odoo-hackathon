import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 

const LandingPage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="landing-page-v2">
      <header className="hero-section-v2">
        <div className="hero-content-v2 animate-on-scroll">
          <h1 className="hero-title">
            Finally, Expense Management
            <span>That Just Works.</span>
          </h1>
          <p className="hero-subtitle">
            Automate approvals, eliminate errors, and gain complete control over company spending with our intelligent, intuitive platform.
          </p>
          <div className="hero-cta-group">
            <Link to="/login" className="cta-button-v2 primary">
              Get Started
            </Link>
            <Link to="#" className="cta-button-v2 secondary">
              Request a Demo
            </Link>
          </div>
        </div>
        <div className="hero-visual-v2 animate-on-scroll">
          <div className="dashboard-mockup">
            <div className="mockup-header"></div>
            <div className="expense-card card1">
              <span>Marketing Event</span> <strong>$2,450.00</strong> <span className="status pending">Pending</span>
            </div>
            <div className="expense-card card2">
              <span>Client Dinner</span> <strong>$320.50</strong> <span className="status approved">Approved</span>
            </div>
            <div className="expense-card card3">
              <span>Software Subscription</span> <strong>$99.00</strong> <span className="status approved">Approved</span>
            </div>
          </div>
        </div>
      </header>
      <section className="trusted-by-section">
        <p>TRUSTED BY LEADING COMPANIES WORLDWIDE</p>
        <div className="logos-marquee">
          <div className="logos-slide">
            <span>Innovate Inc.</span><span>Quantum Corp</span><span>Apex Solutions</span><span>Starlight Co.</span><span>Meridian</span><span>Nexus</span>
          </div>
           <div className="logos-slide">
            <span>Innovate Inc.</span><span>Quantum Corp</span><span>Apex Solutions</span><span>Starlight Co.</span><span>Meridian</span><span>Nexus</span>
          </div>
        </div>
      </section>
      <section className="feature-showcase-section">
        <div className="section-header">
            <h2 className="section-title-v2">Streamline Everything</h2>
            <p className="section-subtitle-v2">From submission to reimbursement, we automate the entire workflow.</p>
        </div>

        <div className="feature-item">
            <div className="feature-text animate-on-scroll">
                <h3>Custom Approval Chains</h3>
                <p>Build multi-step approval workflows that match your company's hierarchy. Set rules based on expense amounts, categories, or departments to automatically route requests to the right people—from line managers to finance.</p>
            </div>
            <div className="feature-visual animate-on-scroll">
                <img src="https://placehold.co/500x350/E9F5FF/4A90E2?text=Approval+Flow+UI" alt="Approval Workflow UI Mockup"/>
            </div>
        </div>
        <div className="feature-item">
            <div className="feature-text animate-on-scroll">
                <h3>Intelligent Policy Rules</h3>
                <p>Enforce spending policies before the money is spent. Set up conditional rules, such as requiring CFO approval for expenses over $5,000, or auto-approving based on a percentage of approvers. Stop out-of-policy spending in its tracks.</p>
            </div>
            <div className="feature-visual animate-on-scroll">

                <img src="https://placehold.co/500x350/E9F5FF/4A90E2?text=Policy+Rules+UI" alt="Policy Rules UI Mockup"/>
            </div>
        </div>
        <div className="feature-item">
            <div className="feature-text animate-on-scroll">
                <h3>Effortless Receipt Scanning</h3>
                <p>Say goodbye to manual data entry. Our AI-powered OCR automatically reads and digitizes receipt data in seconds. Employees just snap a photo, and we fill in the vendor, amount, date, and more with industry-leading accuracy.</p>
            </div>
            <div className="feature-visual ocr-visual animate-on-scroll">
                <img src="https://placehold.co/500x350/E9F5FF/4A90E2?text=OCR+Scanning+UI" alt="OCR Scanning UI Mockup"/>
            </div>
        </div>
      </section>
      <section className="final-cta-section-v2">
        <div className="cta-content animate-on-scroll">
            <h2 className="section-title-v2">Transform Your Expense Management Today</h2>
            <p>Reclaim countless hours, empower your teams, and make smarter financial decisions.</p>
            <Link to="/login" className="cta-button-v2 primary large">
              Get Started for Free
            </Link>
        </div>
      </section>
      
      <footer className="landing-footer-v2">
        <p>&copy; 2025 ExpensoTracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

