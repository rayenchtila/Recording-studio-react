import { useState } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Book() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedPackage = queryParams.get("package");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  const gmailRegex = /^[^\s@]+@gmail\.com$/i;

  const validate = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        error = "Name must only contain letters (a-z, A-Z)";
      }
    }
    if (name === "email") {
      if (value && !gmailRegex.test(value)) {
        error = "Please use a valid Gmail address (e.g., example@gmail.com)";
      }
    }
    if (name === "phone") {
      if (value && !/^\d*$/.test(value)) {
        error = "Phone number must contain digits only (0-9)";
      } else if (value && value.length !== 8) {
        error = "Phone number must be exactly 8 digits";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === "phone" && !/^\d*$/.test(value)) return;
    setForm({ ...form, [name]: value });
    const error = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = () => {
    const isGmailValid = gmailRegex.test(form.email);
    const isPhoneValid = /^\d{8}$/.test(form.phone);
    if (!isGmailValid || !form.name || !form.date || !isPhoneValid) {
      setErrors({
        email: !isGmailValid ? "A Gmail address is required (@gmail.com)" : "",
        name: !form.name ? "Name is required" : "",
        date: !form.date ? "Please select a weekend date" : "",
        phone: !form.phone ? "Phone number is required" : !isPhoneValid ? "Phone number must be exactly 8 digits" : "",
      });
      return;
    }

    setLoading(true);

    emailjs
      .send(
        "service_fsk48of",
        "template_x127lvb",
        {
          name: form.name,
          tel: form.phone,
          email: form.email,
          date: form.date,
          time: form.time,
          message: form.message,
          package: selectedPackage || "No package selected",
        },
        "9V3Vm2_afq5sBVlxU"
      )
      .then(
        () => {
          setLoading(false);
          setBooked(true);
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
        }
      );
  };

  const isInvalid = !form.name || !gmailRegex.test(form.email) || !form.date || !/^\d{8}$/.test(form.phone) || Object.values(errors).some(x => x);

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-2xl">
        {booked ? (
          <div className="text-center space-y-6">
            <div className="text-8xl">✓</div>
            <h2 className="text-white font-black text-5xl">You're Booked!</h2>
            <p className="text-white/50 text-xl">
              We'll reach out shortly at{" "}
              <span className="text-white font-medium">{form.email}</span>
            </p>
            {selectedPackage && (
              <p className="text-white/30 text-lg italic">Package: {selectedPackage}</p>
            )}
          </div>
        ) : (
          <>
            <div className="mb-16 space-y-4">
              <p className="text-white/40 text-sm tracking-[0.3em] uppercase">21 Records</p>
              <h1 className="text-white font-black text-6xl leading-tight">Book Your Session</h1>

              {selectedPackage && (
                <div className="inline-block bg-white/10 border border-white/20 rounded-2xl px-6 py-3 mt-4">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Selected Package</p>
                  <p className="text-white font-bold text-xl">{selectedPackage}</p>
                </div>
              )}

              <p className="text-white/50 text-xl mt-4">Fill in your details and we'll contact you shortly.</p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  className={`w-full bg-white/5 border rounded-3xl px-8 py-6 text-xl text-white placeholder-white/20 transition-all duration-300 focus:outline-none 
                    ${errors.name ? "border-red-500 bg-red-500/5" : "border-white/10 focus:border-white/40"}`}
                />
                {errors.name && <p className="text-red-500 text-sm font-medium px-4">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <div className={`w-full flex items-center bg-white/5 border rounded-3xl px-8 py-6 transition-all duration-300 focus-within:bg-white/10
                  ${errors.phone ? "border-red-500 bg-red-500/5" : "border-white/10 focus-within:border-white/40"}`}>
                  <span className="text-white/50 text-xl font-medium mr-3 select-none">+216</span>
                  <div className="w-px h-6 bg-white/20 mr-3"></div>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="12345678"
                    maxLength={8}
                    className="flex-1 bg-transparent text-xl text-white placeholder-white/20 focus:outline-none"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm font-medium px-4">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email (must be @gmail.com)"
                  className={`w-full bg-white/5 border rounded-3xl px-8 py-6 text-xl text-white placeholder-white/20 transition-all duration-300 focus:outline-none 
                    ${errors.email ? "border-red-500 bg-red-500/5" : "border-white/10 focus:border-white/40"}`}
                />
                {errors.email && <p className="text-red-500 text-sm font-medium px-4">{errors.email}</p>}
              </div>

              <div className="space-y-3">
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const day = selectedDate.getDay();
                    if ([5, 6, 0].includes(day)) {
                      setForm((prev) => ({ ...prev, date: e.target.value }));
                      setErrors((prev) => ({ ...prev, date: "" }));
                    } else {
                      setErrors((prev) => ({ ...prev, date: "Please select Friday, Saturday, or Sunday ONLY !" }));
                    }
                  }}
                  className={`w-full bg-white/5 border rounded-3xl px-8 py-6 text-xl text-white transition-all duration-300 focus:outline-none 
                    color-scheme-dark 
                    [&::-webkit-calendar-picker-indicator]:invert 
                    [&::-webkit-calendar-picker-indicator]:cursor-pointer
                    ${errors.date ? "border-red-500 bg-red-500/5" : "border-white/10 focus:border-white/40"}`}
                />
                {errors.date ? (
                  <p className="text-red-500 text-sm font-medium px-4">{errors.date}</p>
                ) : (
                  <p className="text-white/30 text-sm tracking-wide px-4">( Friday / Saturday / Sunday ) ONLY !</p>
                )}
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 text-xl text-white transition-all duration-300 focus:outline-none focus:border-white/40
                    [&::-webkit-calendar-picker-indicator]:invert
                    [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
                <p className="text-white/30 text-sm tracking-wide px-4">Select your preferred time</p>
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 text-xl text-white placeholder-white/20 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 resize-none"
              />

              <button
                onClick={handleSubmit}
                disabled={loading || isInvalid}
                className={`w-full mt-4 py-6 rounded-3xl font-black text-lg tracking-widest uppercase transition-all duration-300
                  ${loading || isInvalid
                    ? "bg-white/10 text-white/30 cursor-not-allowed"
                    : "bg-white text-black hover:bg-white/90 hover:scale-[1.03] active:scale-95 shadow-2xl shadow-white/10"
                  }`}
              >
                {loading ? "Booking..." : "Book Now →"}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}