import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const FaqData = [
    {
      question: "What is the Purdue Living Lab?",
      answer: "The Purdue Living Lab is an initiative that utilizes our campus infrastructure, facilities, and operations as a testing ground for innovative, sustainable, and educational projects."
    },
    {
      question: "Who can submit a project proposal?",
      answer: "Current Purdue University students, faculty, and staff are eligible to submit project proposals. Collaborative projects involving multiple departments are highly encouraged."
    },
    {
      question: "How do I submit my project?",
      answer: "You can submit your project by navigating to the 'Documents' tab, downloading the proposal template, and submitting the completed form to the Living Lab review committee."
    },
    {
      question: "How long does the approval process take?",
      answer: "Most project proposals are reviewed within 2-4 weeks. You will be contacted by the committee if further clarification or revisions are needed."
    },
    {
      question: "Is funding available for Living Lab projects?",
      answer: "Limited funding opportunities are available for approved projects that demonstrate significant value to the campus ecosystem. Please check the 'Help' section for more details on grants."
    }
  ];
  
function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (

    <div className="min-h-screen bg-white font-sans text-gray-900">

      <Header />
      
     


      
      <section className="text-center py-14">
        <h1 className="text-4xl font-medium">FAQ</h1>
      </section>

     
      <main className="max-w-4xl mx-auto px-6 pb-20">
        <div className="space-y-4">
          {FaqData.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-sm overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <button
                className="w-full text-left px-6 py-5 bg-gray-50 hover:bg-gray-100 flex justify-between items-center focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <span className="text-2xl text-gray-400">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-5 bg-white text-gray-700 leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>   

      
      <footer className="text-center py-10 text-sm text-gray-600">
      </footer>

    </div>
  );
}

export default Faq;
