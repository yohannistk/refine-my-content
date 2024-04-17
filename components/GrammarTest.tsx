"use client";
import React, { useEffect } from "react";
import Container from "./common/Container";

const GrammarTest = () => {
  useEffect(() => {
    const editableSpans = document.querySelectorAll(".editable-span"); // Get the clickable span
    const popup = document.getElementById("popup"); // Get the popup element

    const showPopup = (event: any) => {
      event.stopPropagation();
      const popupData = event.target.dataset.popupContent;
      const spanRect = event.target.getBoundingClientRect();
      popup!.style.top = `${spanRect.bottom + window.scrollY + 5}px`; // Position below span with scroll factored in
      popup!.style.left = `${spanRect.left + window.scrollX}px`; // Align left edge with span
      popup!.classList.remove("hidden");
    };

    const hidePopup = () => {
      popup!.classList.add("hidden");
    };
    editableSpans.forEach((span) => {
      span.addEventListener("click", showPopup);
    });
    // Handle clicks outside the popup (optional)
    document.addEventListener("click", (event) => {
      if (event.target !== popup && !popup!.contains(event.target as any)) {
        hidePopup();
      }
    });
  }, []);
  return (
    <Container>
      <div className="pt-72">
        <span
          className="editable-span cursor-pointer"
          data-popup-content="This is the popup data"
        >
          Click me for a popup!
        </span>
      </div>
    </Container>
  );
};

export default GrammarTest;
