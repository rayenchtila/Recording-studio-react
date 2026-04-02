import { useState } from "react";

const features = [
  {
    icon: "🤝",
    titleAr: "أحسن تعامل مع الفنان",
    titleEn: "Best Artist Treatment",
    descAr: "توفير جوّ مريح واحترافي للفنان، الاستماع لطلباته، والتواصل الواضح باش يعطي أفضل أداء أثناء التسجيل",
    descEn: "Providing a comfortable and professional atmosphere, listening to the artist's needs, and clear communication for the best recording performance."
  },
  {
    icon: "🧠",
    titleAr: "أحسن فهم للفنان",
    titleEn: "Best Artist Understanding",
    descAr: "فهم أسلوب الفنان وصوته وإحساسه بسرعة، حتى يكون التوجيه والمكس مناسبين له من أول مرة",
    descEn: "Quickly understanding the artist's style, voice, and feel so that direction and mixing are perfectly suited from the very first take."
  },
  {
    icon: "⚡",
    titleAr: "أغنية جاهزة في أقل وقت",
    titleEn: "Song Ready in Record Time",
    descAr: "تنظيم العمل بكفاءة، تجهيز القوالب مسبقًا، وتسريع التسجيل والمكساج باش تخرج الأغنية جاهزة في وقت قياسي",
    descEn: "Efficient workflow, pre-prepared templates, and accelerated recording and mixing so your song is ready in record time."
  }
];

function FlipCard({ feature }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full h-96 cursor-pointer"
      style={{ perspective: "1000px" }}
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
          className="absolute inset-0 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-12 flex flex-col justify-between shadow-2xl backdrop-blur-3xl hover:border-white/20"
        >
          <div>
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-4xl mb-8">
              {feature.icon}
            </div>
            <h3 className="text-white font-bold text-2xl mb-4">{feature.titleEn}</h3>
            <p className="text-gray-400 leading-relaxed text-lg">{feature.descEn}</p>
          </div>
          <p className="text-white/20 text-sm tracking-widest uppercase mt-6">Hover to see Arabic →</p>
        </div>

        {/* BACK — Arabic */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 bg-white/[0.06] border border-white/20 rounded-[2.5rem] p-12 flex flex-col justify-between shadow-2xl backdrop-blur-3xl"
        >
          <div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-4xl mb-8">
              {feature.icon}
            </div>
            <h3 className="text-white font-bold text-2xl mb-4 text-right" dir="rtl">{feature.titleAr}</h3>
            <p className="text-gray-300 leading-relaxed text-lg text-right" dir="rtl">{feature.descAr}</p>
          </div>
          <p className="text-white/20 text-sm tracking-widest uppercase mt-6 text-right">← اقلب لتري الانجليزية</p>
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="w-full bg-[#050505] py-32 px-6 md:px-16">
      <div className="max-w-3xl mx-auto text-center mb-24">
        <p className="text-white/40 text-sm tracking-[0.3em] uppercase mb-4">Why 21 Records ?</p>
        <h2
          className="text-white font-black uppercase"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.02em", fontFamily: "'Georgia', serif" }}
        >
          Everything You Need
        </h2>
        <p className="text-white/30 mt-4 text-lg">Hover each card to switch language</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <FlipCard key={i} feature={f} />
        ))}
      </div>
    </section>
  );
}