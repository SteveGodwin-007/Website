import React from 'react'

export default function Contact() {
  return (
    <div className="min-h-[70vh] px-6 py-12 flex items-start justify-center">
      <div className="max-w-4xl w-full card-glass p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">Contact & Location</h3>
          <p className="text-sm text-gray-300">Email: <a className="text-stromBlue">strom2k25@licet.ac.in</a></p>
          <p className="text-sm text-gray-300">Phone: <a className="text-stromBlue">+91 93611 76702 (Sanjeev Kumar)</a></p>

          <h4 className="mt-4 font-semibold">Location</h4>
          <p className="text-sm text-gray-300">Loyola ICAM College of Engineering and Technology</p>

          <a href="https://maps.app.goo.gl/MY7oxgHZFKtAu9tm8" target="_blank" rel="noreferrer" className="mt-3 inline-block px-4 py-2 bg-stromAccent text-stromDark rounded-md">Open in Maps</a>
        </div>

        <div>
          <iframe title="LICET Map" src="https://www.google.com/maps?q=Loyola+ICAM+College+of+Engineering+and+Technology&z=15&output=embed" className="w-full h-64 rounded-md border-0" />
        </div>
      </div>
    </div>
  )
}
