"use client";
import { faqs } from "@/Data/FAQData/FAQData";
import React, { useState } from "react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="w-full pl-20 pr-4 py-6 mt-8  pt-20">
      <h1 className="text-2xl font-bold mb-12 text-center">
        Frequently Asked Questions
      </h1>

      <div className="flex flex-col gap-8">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md overflow-hidden transition-all "
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 font-medium text-left"
            >
              <span>{faq.question}</span>
              <span
                className={`transform transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {openIndex === index && (
              <div className="p-4 bg-white border-t border-gray-200 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
