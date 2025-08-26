// src/components/FAQAccordion.jsx
import React from "react";
import { Accordion } from "react-bootstrap";
import faqData from "../data/faqData";
import "../styles/FAQAccordion.css"; // New CSS for sporty styling

const FAQAccordion = () => {
  return (
    <div className="my-5 faq-container">
      <h2 className="text-center mb-4 text-warning fw-bold faq-title">
        Frequently Asked Questions
      </h2>
      <Accordion defaultActiveKey="0" flush>
        {faqData.map((faq, index) => (
          <Accordion.Item eventKey={index.toString()} key={index} className="faq-item">
            <Accordion.Header className="faq-header">{faq.question}</Accordion.Header>
            <Accordion.Body className="faq-body">
              {Array.isArray(faq.answer) ? (
                <ul className="list-unstyled mb-0">
                  {faq.answer.map((section, i) => (
                    <li key={i} className="mb-2">
                      <strong>{section.category}:</strong> {section.details}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{faq.answer}</p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
