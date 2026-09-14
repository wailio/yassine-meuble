"use client"

export default function MapContent() {
  return (
    <div
      className="overflow-hidden shadow-lg border-0 sticky top-20 z-40 w-full h-56 md:h-96"
      style={{ 
        borderLeft: "3px solid #a98661",
        borderRight: "3px solid #a98661",
        minHeight: "400px"
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25590.335787715285!2d3.033506074316419!3d36.703536500000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fadd347613117%3A0xfc8ed47908ab92e9!2zQXJ0IGhvbWUg2KjZitiqINin2YTZgdmG!5e0!3m2!1sfr!2sdz!4v1788902144829!5m2!1sfr!2sdz"
        width="100%"
        height="100%"
        style={{ border: "0" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  )
}
