import { useState } from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Original Package",
    price: "80 DT",
    period: "per song",
    badge: "Best Value",
    highlight: true,
    delivery: "Ready in 2 days",
    deliveryIcon: "⚡",
    descEn: "Recording + Mixing & Mastering. Your song, fully finished.",
    descAr: "تسجيل + ميكساج وماستيرينج. أغنيتك جاهزة بالكامل.",
    pros: [
      { en: "Complete end-to-end production", ar: "إنتاج متكامل من البداية للنهاية" },
      { en: "Faster turnaround — 48h delivery", ar: "تسليم سريع خلال 48 ساعة" },
      { en: "Best value for a polished release", ar: "أفضل قيمة لإصدار احترافي" },
    ],
    cons: [
      { en: "Less flexible — full bundle only", ar: "أقل مرونة — الباقة الكاملة فقط" },
      { en: "Fixed 2-day timeline", ar: "مدة ثابتة يومين" },
      { en: "One revision included", ar: "تعديل واحد مشمول" },
    ],
  },
  {
    name: "Hours Package",
    price: "25 DT",
    period: "per hour / per service",
    badge: null,
    highlight: false,
    delivery: "Flexible scheduling",
    deliveryIcon: "🎛️",
    descEn: "1h Recording and 1h Mixing & Mastering — book what you need.",
    descAr: "ساعة تسجيل وساعة ميكساج وماستيرينج — احجز ما تحتاجه.",
    pros: [
      { en: "Full flexibility — pick one or both", ar: "مرونة كاملة — اختر واحدة أو الاثنتين" },
      { en: "Pay only for what you use", ar: "ادفع فقط على ما تستخدمه" },
      { en: "Great for artists with existing sessions", ar: "مثالي للفنانين الذين لديهم جلسات سابقة" },
    ],
    cons: [
      { en: "More expensive if booking both", ar: "أغلى عند حجز الاثنتين" },
      { en: "Scheduling depends on availability", ar: "الجدولة تعتمد على التوفر" },
      { en: "Results vary by session length", ar: "النتائج تختلف حسب مدة الجلسة" },
    ],
  },
];

function PricingCard({ plan }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full cursor-pointer"
      style={{ perspective: "1000px", height: "clamp(38rem, 65vw, 52rem)" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* FRONT — English */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className={`absolute inset-0 rounded-3xl flex flex-col border transition-all duration-300 ${
            plan.highlight
              ? "bg-white text-black border-white shadow-2xl shadow-white/10"
              : "bg-transparent text-white border-white/10"
          }`}
          style2={{}}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", padding: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          {plan.badge && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/20 whitespace-nowrap">
              {plan.badge}
            </div>
          )}
          <div className="mb-4">
            <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${plan.highlight ? "text-black/40" : "text-white/40"}`}>
              {plan.name}
            </p>
            <div className="flex items-end gap-2 mb-1">
              <span className="font-black" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}>
                {plan.price}
              </span>
              <span className={`text-sm mb-2 ${plan.highlight ? "text-black/50" : "text-white/40"}`}>{plan.period}</span>
            </div>
            <div className={`flex items-center gap-2 text-sm font-medium mb-3 ${plan.highlight ? "text-black/60" : "text-white/50"}`}>
              <span>{plan.deliveryIcon}</span>
              <span>{plan.delivery}</span>
            </div>
            <p className={`text-sm leading-relaxed ${plan.highlight ? "text-black/60" : "text-white/50"}`}>{plan.descEn}</p>
          </div>
          <div className={`h-px mb-4 ${plan.highlight ? "bg-black/10" : "bg-white/10"}`} />
          <div className="mb-3">
            <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${plan.highlight ? "text-black/40" : "text-white/30"}`}>Advantages</p>
            <ul className="flex flex-col gap-2">
              {plan.pros.map((pro, j) => (
                <li key={j} className="flex items-start gap-3 text-sm">
                  <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${plan.highlight ? "bg-black text-white" : "bg-white/10 text-white"}`}>✓</span>
                  <span className={plan.highlight ? "text-black/70" : "text-white/60"}>{pro.en}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${plan.highlight ? "text-black/40" : "text-white/30"}`}>Limitations</p>
            <ul className="flex flex-col gap-2">
              {plan.cons.map((con, j) => (
                <li key={j} className="flex items-start gap-3 text-sm">
                  <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${plan.highlight ? "bg-black/10 text-black" : "bg-white/5 text-white/40"}`}>✕</span>
                  <span className={plan.highlight ? "text-black/50" : "text-white/40"}>{con.en}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto">
            <Link
              to={`/book?package=${encodeURIComponent(plan.name)}`}
              className={`w-full py-4 rounded-2xl font-bold text-base text-center block transition-all duration-200 active:scale-95 ${
                plan.highlight ? "bg-black text-white hover:bg-gray-900" : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              Book Now
            </Link>
          </div>
          <p className={`text-xs tracking-widest uppercase mt-4 text-center ${plan.highlight ? "text-black/20" : "text-white/20"}`}>Hover to see Arabic →</p>
        </div>

        {/* BACK — Arabic */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            padding: "clamp(1.5rem, 3vw, 2rem)"
          }}
          className={`absolute inset-0 rounded-3xl flex flex-col border ${
            plan.highlight
              ? "bg-white text-black border-white shadow-2xl shadow-white/10"
              : "bg-white/[0.06] text-white border-white/20"
          }`}
        >
          {plan.badge && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/20 whitespace-nowrap">
              {plan.badge}
            </div>
          )}
          <div className="mb-4" dir="rtl">
            <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${plan.highlight ? "text-black/40" : "text-white/40"}`}>
              {plan.name}
            </p>
            <div className="flex items-end gap-2 mb-1 flex-row-reverse">
              <span className="font-black" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}>
                {plan.price}
              </span>
              <span className={`text-sm mb-2 ${plan.highlight ? "text-black/50" : "text-white/40"}`}>{plan.period}</span>
            </div>
            <div className={`flex items-center gap-2 text-sm font-medium mb-3 flex-row-reverse ${plan.highlight ? "text-black/60" : "text-white/50"}`}>
              <span>{plan.deliveryIcon}</span>
              <span>{plan.delivery}</span>
            </div>
            <p className={`text-sm leading-relaxed text-right ${plan.highlight ? "text-black/60" : "text-white/50"}`}>{plan.descAr}</p>
          </div>
          <div className={`h-px mb-4 ${plan.highlight ? "bg-black/10" : "bg-white/10"}`} />
          <div className="mb-3" dir="rtl">
            <p className={`text-xs font-bold tracking-widest uppercase mb-3 text-right ${plan.highlight ? "text-black/40" : "text-white/30"}`}>المزايا</p>
            <ul className="flex flex-col gap-2">
              {plan.pros.map((pro, j) => (
                <li key={j} className="flex items-start gap-3 text-sm flex-row-reverse">
                  <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${plan.highlight ? "bg-black text-white" : "bg-white/10 text-white"}`}>✓</span>
                  <span className={`text-right ${plan.highlight ? "text-black/70" : "text-white/60"}`}>{pro.ar}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6" dir="rtl">
            <p className={`text-xs font-bold tracking-widest uppercase mb-3 text-right ${plan.highlight ? "text-black/40" : "text-white/30"}`}>القيود</p>
            <ul className="flex flex-col gap-2">
              {plan.cons.map((con, j) => (
                <li key={j} className="flex items-start gap-3 text-sm flex-row-reverse">
                  <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${plan.highlight ? "bg-black/10 text-black" : "bg-white/5 text-white/40"}`}>✕</span>
                  <span className={`text-right ${plan.highlight ? "text-black/50" : "text-white/40"}`}>{con.ar}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto">
            <Link
              to={`/book?package=${encodeURIComponent(plan.name)}`}
              className={`w-full py-4 rounded-2xl font-bold text-base text-center block transition-all duration-200 active:scale-95 ${
                plan.highlight ? "bg-black text-white hover:bg-gray-900" : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              احجز الآن
            </Link>
          </div>
          <p className={`text-xs tracking-widest uppercase mt-4 text-center ${plan.highlight ? "text-black/20" : "text-white/20"}`}>← اقلب لتري الانجليزية</p>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section className="w-full bg-[#050505] py-32 px-6 md:px-16">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <p className="text-white/40 text-sm tracking-widest uppercase mb-4">Studio Services</p>
        <h2
          className="text-white font-black uppercase"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            letterSpacing: "-0.02em",
            fontFamily: "'Georgia', serif",
          }}
        >
          Simple Pricing
        </h2>
        <p className="mt-6 text-white/50 text-lg">Professional studio quality. No surprises.</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {plans.map((plan, i) => (
          <PricingCard key={i} plan={plan} />
        ))}
      </div>
    </section>
  );
}