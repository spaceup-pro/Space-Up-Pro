"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Cpu, Stethoscope, Briefcase, Palette, Atom, GraduationCap, Building2, Microscope, Code, Heart } from "lucide-react";

const aiTopics = [
  {
    id: 1,
    title: "Công Nghệ Thông Tin",
    subtitle: "Technology",
    description: "Khám phá các ngành CNTT, AI, Machine Learning và phát triển phần mềm.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    icon: Cpu,
    color: "from-blue-500 to-cyan-400",
    bgColor: "bg-blue-500/20",
    textColor: "text-blue-400",
    link: "/majors?category=tech",
    stats: "50+ ngành học"
  },
  {
    id: 2,
    title: "Y Khoa & Dược",
    subtitle: "Medicine & Pharmacy",
    description: "Theo đuổi nghề y, dược sĩ, điều dưỡng và các ngành y tế.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    icon: Stethoscope,
    color: "from-red-500 to-pink-400",
    bgColor: "bg-red-500/20",
    textColor: "text-red-400",
    link: "/majors?category=medical",
    stats: "30+ ngành học"
  },
  {
    id: 3,
    title: "Kinh Tế & Quản Trị",
    subtitle: "Business & Management",
    description: "Kinh doanh, marketing, tài chính, kế toán và quản trị kinh doanh.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    icon: Briefcase,
    color: "from-amber-500 to-yellow-400",
    bgColor: "bg-amber-500/20",
    textColor: "text-amber-400",
    link: "/majors?category=business",
    stats: "40+ ngành học"
  },
  {
    id: 4,
    title: "Nghệ Thuật & Thiết Kế",
    subtitle: "Art & Design",
    description: "Thiết kế đồ họa, nội thất, thời trang và các ngành nghệ thuật.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    icon: Palette,
    color: "from-purple-500 to-violet-400",
    bgColor: "bg-purple-500/20",
    textColor: "text-purple-400",
    link: "/majors?category=art",
    stats: "25+ ngành học"
  },
  {
    id: 5,
    title: "Khoa Học Tự Nhiên",
    subtitle: "Natural Sciences",
    description: "Vật lý, hóa học, sinh học, toán học và các ngành khoa học cơ bản.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
    icon: Atom,
    color: "from-green-500 to-emerald-400",
    bgColor: "bg-green-500/20",
    textColor: "text-green-400",
    link: "/majors?category=science",
    stats: "35+ ngành học"
  },
  {
    id: 6,
    title: "Kỹ Thuật",
    subtitle: "Engineering",
    description: "Cơ khí, điện, xây dựng, hàng không và các ngành kỹ thuật.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80",
    icon: Building2,
    color: "from-orange-500 to-red-400",
    bgColor: "bg-orange-500/20",
    textColor: "text-orange-400",
    link: "/majors?category=engineering",
    stats: "45+ ngành học"
  },
  {
    id: 7,
    title: "Sinh Học & Môi Trường",
    subtitle: "Biology & Environment",
    description: "Sinh học, công nghệ sinh học, môi trường và các ngành liên quan.",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80",
    icon: Microscope,
    color: "from-teal-500 to-cyan-400",
    bgColor: "bg-teal-500/20",
    textColor: "text-teal-400",
    link: "/majors?category=bio",
    stats: "20+ ngành học"
  },
  {
    id: 8,
    title: "Luật & Chính Trị",
    subtitle: "Law & Politics",
    description: "Luật, quan hệ quốc tế, chính trị học và các ngành xã hội.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
    icon: GraduationCap,
    color: "from-slate-500 to-zinc-400",
    bgColor: "bg-slate-500/20",
    textColor: "text-slate-400",
    link: "/majors?category=law",
    stats: "15+ ngành học"
  },
];

export function AICardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {aiTopics.map((topic, index) => {
        const IconComponent = topic.icon;
        return (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ y: -8 }}
            className="group relative bg-charcoal-900 rounded-2xl overflow-hidden border border-charcoal-800 hover:border-violet-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-violet-500/15"
          >
            {/* Image Section */}
            <div className="relative h-40 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent z-10" />
              <img
                src={topic.image}
                alt={topic.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient overlay on image */}
              <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />

              {/* Icon badge */}
              <div className={`absolute top-3 right-3 ${topic.bgColor} p-2.5 rounded-xl z-20 backdrop-blur-sm`}>
                <IconComponent className={`w-5 h-5 ${topic.textColor}`} />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-medium ${topic.textColor} uppercase tracking-wider`}>
                  {topic.subtitle}
                </span>
                <div className="h-px flex-1 bg-charcoal-700" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                {topic.title}
              </h3>

              <p className="text-sm text-charcoal-400 group-hover:text-charcoal-300 line-clamp-2 mb-4">
                {topic.description}
              </p>

              {/* Stats & Link */}
              <div className="flex items-center justify-between pt-3 border-t border-charcoal-800">
                <div className="flex items-center gap-1.5">
                  <Sparkles className={`w-4 h-4 ${topic.textColor}`} />
                  <span className="text-xs text-charcoal-400">{topic.stats}</span>
                </div>
                <Link
                  href={topic.link}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 group-hover:text-white transition-colors"
                >
                  <span>Khám phá</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Decorative glow effect */}
            <div className={`absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-br ${topic.color} rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-all duration-500`} />
          </motion.div>
        );
      })}
    </div>
  );
}