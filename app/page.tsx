"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   LOGO (base64 PNG)
   ═══════════════════════════════════════════════════════════════════════════ */
const LOGO_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0%25' stop-color='%23c9a84c'/%3E%3Cstop offset='50%25' stop-color='%23e8d48b'/%3E%3Cstop offset='100%25' stop-color='%23c9a84c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpolygon points='25,5 32,20 47,20 35,30 39,45 25,36 11,45 15,30 3,20 18,20' fill='url(%23g)'/%3E%3Ctext x='55' y='35' font-family='Playfair Display,serif' font-weight='700' font-size='22' fill='url(%23g)'%3EDIAMOND PKW%3C/text%3E%3C/svg%3E";

/* ═══════════════════════════════════════════════════════════════════════════
   TRANSLATIONS
   ═══════════════════════════════════════════════════════════════════════════ */
type Lang = "en" | "ar";

const T: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    navHome: "Home",
    navServices: "Services",
    navPackages: "Packages",
    navOffers: "Offers",
    navGallery: "Gallery",
    navAbout: "About",
    navContact: "Contact",
    navFaq: "FAQ",
    langLabel: "العربية",

    // Hero
    heroBadge: "Kuwait's Premier Detailing Studio",
    heroTitle1: "Elevate Your",
    heroTitle2: "Vehicle's",
    heroTitle3: "Brilliance",
    heroSubtitle:
      "Experience world-class paint protection, ceramic coatings, and premium detailing services that transform your vehicle into a masterpiece.",
    heroCta1: "Book Appointment",
    heroCta2: "Our Services",

    // Booking Strip
    bookingText: "Ready to transform your vehicle?",
    bookingCta: "Book Now",

    // Marquee
    marquee1: "Paint Protection Film",
    marquee2: "Ceramic Coating",
    marquee3: "Window Tinting",
    marquee4: "Interior Detailing",
    marquee5: "Exterior Polish",
    marquee6: "PPF Installation",
    marquee7: "Nano Coating",
    marquee8: "Premium Car Care",

    // Offers Section
    offersLabel: "Exclusive Offers",
    offersTitle: "Special Deals & Partnerships",
    offersSubtitle:
      "Take advantage of our exclusive partnerships and limited-time offers designed for car enthusiasts.",

    // Offer Cards
    offer1Badge: "Partnership",
    offer1Title: "Kuwait Riders Exclusive",
    offer1Desc:
      "Special pricing for Kuwait Riders community members on all PPF and ceramic coating services.",
    offer1Price: "From 85 KD",

    offer2Badge: "Partnership",
    offer2Title: "Harley Chapter Kuwait",
    offer2Desc:
      "Exclusive motorcycle detailing packages for Harley-Davidson Chapter members.",
    offer2Price: "From 45 KD",

    offer3Badge: "Brand Special",
    offer3Title: "Jetour Owners",
    offer3Desc:
      "Custom PPF packages designed specifically for Jetour vehicle models with full coverage options.",
    offer3Price: "From 120 KD",

    offer4Badge: "Brand Special",
    offer4Title: "Denza & BYD Package",
    offer4Desc:
      "Tailored protection packages for Denza and BYD electric vehicles. Full body PPF with warranty.",
    offer4Price: "From 150 KD",

    offer5Badge: "Corporate",
    offer5Title: "KOC Employee Offer",
    offer5Desc:
      "Special corporate rates for Kuwait Oil Company employees. Valid ID required at booking.",
    offer5Price: "20% OFF",

    offer6Badge: "Family",
    offer6Title: "Family Tinting Deal",
    offer6Desc:
      "Window tinting for the whole family fleet. Book 2+ vehicles and save on every car.",
    offer6Price: "From 35 KD",

    // Feature list items
    featureFullBody: "Full body coverage",
    featurePremiumFilm: "Premium film quality",
    featureWarranty: "5-year warranty",
    featureFreeInspection: "Free inspection",
    featureCustomFit: "Custom-fit templates",
    featurePaintCorrection: "Paint correction included",
    featureCeramicTop: "Ceramic top coat",
    featureDetailWash: "Detail wash included",
    featureInteriorDetail: "Interior detailing",
    featureUVProtection: "UV protection film",
    featureHeatRejection: "Heat rejection",
    featureMultiVehicle: "Multi-vehicle discount",

    // KOC Countdown
    kocCountdownDays: "Days",
    kocCountdownHours: "Hours",
    kocCountdownMins: "Mins",
    kocCountdownSecs: "Secs",

    // Common
    bookNow: "Book Now",
    learnMore: "Learn More",
    claimOffer: "Claim Offer",
    viewAll: "View All",
    sendMessage: "Send Message",
    submitFeedback: "Submit Feedback",

    // Services Section
    servicesLabel: "Our Services",
    servicesTitle: "Premium Detailing Services",
    servicesSubtitle:
      "From paint protection to interior restoration, we offer a comprehensive range of premium car care services.",

    // Service items
    svc1Title: "Paint Protection Film (PPF)",
    svc1Desc: "Ultimate paint protection",
    svc1Detail1: "Self-healing film technology",
    svc1Detail2: "Full or partial body coverage",
    svc1Detail3: "10-year manufacturer warranty",
    svc1Detail4: "Invisible protection against chips & scratches",
    svc1Price: "Starting from 250 KD",

    svc2Title: "Ceramic Coating",
    svc2Desc: "Long-lasting shine & protection",
    svc2Detail1: "9H hardness ceramic layer",
    svc2Detail2: "Hydrophobic water-repelling surface",
    svc2Detail3: "UV & chemical resistance",
    svc2Detail4: "2-5 year protection duration",
    svc2Price: "Starting from 120 KD",

    svc3Title: "Window Tinting",
    svc3Desc: "Heat rejection & privacy",
    svc3Detail1: "Premium nano-ceramic films",
    svc3Detail2: "Up to 99% UV rejection",
    svc3Detail3: "Heat reduction up to 60%",
    svc3Detail4: "Legal compliance guaranteed",
    svc3Price: "Starting from 35 KD",

    svc4Title: "Interior Detailing",
    svc4Desc: "Deep cleaning & restoration",
    svc4Detail1: "Leather conditioning & protection",
    svc4Detail2: "Steam cleaning & sanitization",
    svc4Detail3: "Odor elimination treatment",
    svc4Detail4: "Dashboard & trim restoration",
    svc4Price: "Starting from 25 KD",

    svc5Title: "Exterior Polish",
    svc5Desc: "Paint correction & enhancement",
    svc5Detail1: "Multi-stage paint correction",
    svc5Detail2: "Swirl mark & scratch removal",
    svc5Detail3: "High-gloss mirror finish",
    svc5Detail4: "Machine polish with premium compounds",
    svc5Price: "Starting from 40 KD",

    svc6Title: "Wheel & Caliper Coating",
    svc6Desc: "Protection & aesthetics",
    svc6Detail1: "Ceramic wheel coating",
    svc6Detail2: "Brake caliper painting",
    svc6Detail3: "Brake dust protection",
    svc6Detail4: "Custom color options",
    svc6Price: "Starting from 60 KD",

    svc7Title: "Headlight Restoration",
    svc7Desc: "Clarity & brightness",
    svc7Detail1: "Oxidation removal",
    svc7Detail2: "UV protective coating",
    svc7Detail3: "Improved night visibility",
    svc7Detail4: "PPF protection option",
    svc7Price: "Starting from 15 KD",

    svc8Title: "Underbody Coating",
    svc8Desc: "Rust & corrosion prevention",
    svc8Detail1: "Anti-rust rubberized coating",
    svc8Detail2: "Sound deadening properties",
    svc8Detail3: "Sand & gravel protection",
    svc8Detail4: "Chassis preservation",
    svc8Price: "Starting from 45 KD",

    // Wash Pricing
    washPricingTitle: "Wash & Quick Services",
    washType: "Service",
    washSedan: "Sedan",
    washSUV: "SUV",
    washTruck: "Truck",
    wash1: "Exterior Wash",
    wash2: "Interior Clean",
    wash3: "Full Detail Wash",
    wash4: "Engine Bay Clean",
    wash5: "Quick Wax & Shine",

    // Home Service
    homeServiceTitle: "Home Service Available",
    homeServiceDesc:
      "Can't come to us? We'll come to you! Our mobile detailing unit brings the full Diamond PKW experience to your doorstep.",
    homeServiceCta: "Book Home Service",

    // Packages Section
    packagesLabel: "Packages",
    packagesTitle: "Choose Your Package",
    packagesSubtitle:
      "Select the perfect detailing package for your vehicle. Each package includes our signature Diamond PKW quality.",

    // Package: Essential
    pkgEssentialName: "Essential",
    pkgEssentialTagline: "Perfect for regular maintenance",
    pkgEssentialPrice: "45 KD",
    pkgEssentialF1: "Exterior hand wash & dry",
    pkgEssentialF2: "Interior vacuum & wipe",
    pkgEssentialF3: "Tire dressing",
    pkgEssentialF4: "Dashboard cleaning",
    pkgEssentialF5: "Air freshener",

    // Package: Silver
    pkgSilverName: "Silver",
    pkgSilverTagline: "Enhanced care & protection",
    pkgSilverPrice: "85 KD",
    pkgSilverF1: "Everything in Essential",
    pkgSilverF2: "Clay bar treatment",
    pkgSilverF3: "One-step polish",
    pkgSilverF4: "Interior leather conditioning",
    pkgSilverF5: "Engine bay rinse",
    pkgSilverF6: "Spray sealant application",

    // Package: Gold
    pkgGoldName: "Gold",
    pkgGoldTagline: "Premium detail & correction",
    pkgGoldPrice: "150 KD",
    pkgGoldBadge: "Popular",
    pkgGoldF1: "Everything in Silver",
    pkgGoldF2: "Two-step paint correction",
    pkgGoldF3: "Ceramic spray coating (6 months)",
    pkgGoldF4: "Leather deep clean & condition",
    pkgGoldF5: "Headlight restoration",
    pkgGoldF6: "Wheel ceramic coating",
    pkgGoldF7: "Steam sanitization",

    // Package: Diamond
    pkgDiamondName: "Diamond",
    pkgDiamondTagline: "The ultimate detailing experience",
    pkgDiamondPrice: "280 KD",
    pkgDiamondBadge: "Best Value",
    pkgDiamondF1: "Everything in Gold",
    pkgDiamondF2: "Multi-stage paint correction",
    pkgDiamondF3: "Professional ceramic coating (2 years)",
    pkgDiamondF4: "Full interior restoration",
    pkgDiamondF5: "Underbody coating",
    pkgDiamondF6: "Engine bay detailing",
    pkgDiamondF7: "Complimentary maintenance wash",
    pkgDiamondF8: "Priority booking for 1 year",

    // VIP
    vipBadge: "VIP Detail Experience",
    vipTitle: "The Diamond VIP Experience",
    vipDesc:
      "Our most exclusive service. A full multi-day transformation including paint correction, PPF installation, ceramic coating, and complete interior overhaul. By appointment only.",
    vipF1: "Full Paint Correction",
    vipF2: "Full Body PPF",
    vipF3: "Ceramic Coating",
    vipF4: "Interior Overhaul",
    vipF5: "3-Day Process",
    vipF6: "Pickup & Delivery",
    vipPrice: "From 800 KD",
    vipCta: "Inquire About VIP",

    // Gallery Section
    galleryLabel: "Gallery",
    galleryTitle: "Our Work Speaks",
    gallerySubtitle:
      "Browse our portfolio of premium detailing transformations. Every vehicle receives our signature Diamond PKW attention to detail.",

    // Spotlight
    spotlightTitle: "Spotlight Builds",

    // Before/After
    beforeAfterTitle: "Before & After",
    beforeLabel: "Before",
    afterLabel: "After",

    // Filter
    filterAll: "All",
    filterPPF: "PPF",
    filterCeramic: "Ceramic",
    filterTinting: "Tinting",
    filterInterior: "Interior",
    filterPolish: "Polish",

    // About Section
    aboutLabel: "About Us",
    aboutTitle: "Why Diamond PKW",
    aboutSubtitle:
      "Dedicated to perfection, powered by passion for automotive excellence.",
    aboutHeading: "Kuwait's Trusted Detailing Studio",
    aboutP1:
      "Founded with a passion for automotive perfection, Diamond PKW has grown to become Kuwait's most trusted name in premium car care. Our team of certified detailing professionals brings years of experience and an unwavering commitment to quality.",
    aboutP2:
      "We use only the finest products from globally recognized brands, ensuring every vehicle that leaves our studio looks nothing short of spectacular. From daily drivers to exotic supercars, we treat every car with the same meticulous care.",

    // Stats
    stat1Num: "5000+",
    stat1Label: "Cars Detailed",
    stat2Num: "8+",
    stat2Label: "Years Experience",
    stat3Num: "4.9",
    stat3Label: "Google Rating",
    stat4Num: "50+",
    stat4Label: "5-Star Reviews",

    // Reviews
    reviewsTitle: "What Our Clients Say",

    // Feedback
    feedbackTitle: "Leave Your Review",
    feedbackDesc: "We'd love to hear about your experience with Diamond PKW.",
    feedbackName: "Your Name",
    feedbackEmail: "Email Address",
    feedbackMessage: "Your Review",
    feedbackRating: "Your Rating",

    // Contact Section
    contactLabel: "Contact Us",
    contactTitle: "Get In Touch",
    contactSubtitle:
      "Ready to give your vehicle the Diamond treatment? Reach out to us through any of these channels.",
    contactWhatsappText: "Chat with us on WhatsApp for instant booking",
    contactWhatsappBtn: "Open WhatsApp",

    // Info Cards
    infoPhone: "Phone",
    infoPhoneVal1: "+965 9553 6344",
    infoPhoneVal2: "+965 9553 9114",
    infoEmail: "Email",
    infoEmailVal: "info@diamond-pkw.com",
    infoLocation: "Location",
    infoLocationVal: "Shuwaikh Industrial, Kuwait",
    infoHours: "Working Hours",
    infoHoursVal1: "Sat-Thu: 8AM - 10PM",
    infoHoursVal2: "Friday: 2PM - 10PM",

    // Booking Form
    bookingFormTitle: "Book Your Appointment",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formVehicle: "Vehicle Make & Model",
    formService: "Select Service",
    formServiceOpt1: "Paint Protection Film (PPF)",
    formServiceOpt2: "Ceramic Coating",
    formServiceOpt3: "Window Tinting",
    formServiceOpt4: "Interior Detailing",
    formServiceOpt5: "Exterior Polish",
    formServiceOpt6: "Full Detail Package",
    formServiceOpt7: "Other",
    formDate: "Preferred Date",
    formNotes: "Additional Notes",
    formSubmit: "Submit Booking",

    // FAQ Section
    faqLabel: "FAQ",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle:
      "Find answers to common questions about our services, pricing, and booking process.",

    faq1Q: "How long does PPF installation take?",
    faq1A:
      "Full body PPF installation typically takes 3-5 working days depending on the vehicle size and complexity. Partial installations (front bumper, hood, fenders) can be completed in 1-2 days.",
    faq2Q: "What is the warranty on ceramic coating?",
    faq2A:
      "Our ceramic coatings come with warranties ranging from 2 to 5 years depending on the package selected. The coating is backed by the manufacturer's guarantee.",
    faq3Q: "Do you offer mobile/home service?",
    faq3A:
      "Yes! We offer mobile detailing services for wash, interior cleaning, and basic detailing. PPF and ceramic coating services must be performed at our studio for quality assurance.",
    faq4Q: "How do I book an appointment?",
    faq4A:
      "You can book through WhatsApp, by calling us directly, or by filling out the booking form on this page. We recommend booking at least 2-3 days in advance for major services.",
    faq5Q: "What payment methods do you accept?",
    faq5A:
      "We accept cash, K-Net, Visa, Mastercard, and bank transfers. Payment plans are available for services over 200 KD.",
    faq6Q: "Can I wait while my car is being serviced?",
    faq6A:
      "Yes, we have a comfortable waiting lounge with refreshments, Wi-Fi, and TV. For longer services, we can arrange pickup and drop-off.",
    faq7Q: "Do you work on all vehicle types?",
    faq7A:
      "We work on all types of vehicles — sedans, SUVs, trucks, sports cars, luxury vehicles, and motorcycles. We also service electric vehicles including Tesla, BYD, and Denza.",
    faq8Q: "Is there a warranty on window tinting?",
    faq8A:
      "Yes, our premium window tinting films come with a lifetime warranty against bubbling, peeling, and discoloration. Installation warranty covers any defects for 2 years.",

    // Footer
    footerDesc:
      "Kuwait's premier car detailing studio. Transforming vehicles with passion and precision since 2016.",
    footerQuickLinks: "Quick Links",
    footerServices: "Services",
    footerContact: "Contact",
    footerRights: "All rights reserved.",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
  },
  ar: {
    // Nav
    navHome: "الرئيسية",
    navServices: "الخدمات",
    navPackages: "الباقات",
    navOffers: "العروض",
    navGallery: "المعرض",
    navAbout: "من نحن",
    navContact: "اتصل بنا",
    navFaq: "الأسئلة",
    langLabel: "English",

    // Hero
    heroBadge: "أفضل استديو تلميع في الكويت",
    heroTitle1: "ارتقِ",
    heroTitle2: "بتألق",
    heroTitle3: "سيارتك",
    heroSubtitle:
      "اختبر خدمات حماية الطلاء والطلاء السيراميكي والتفصيل المتميز على مستوى عالمي والتي تحول سيارتك إلى تحفة فنية.",
    heroCta1: "احجز موعد",
    heroCta2: "خدماتنا",

    // Booking Strip
    bookingText: "مستعد لتحويل سيارتك؟",
    bookingCta: "احجز الآن",

    // Marquee
    marquee1: "فيلم حماية الطلاء",
    marquee2: "طلاء سيراميك",
    marquee3: "تظليل النوافذ",
    marquee4: "تفصيل داخلي",
    marquee5: "تلميع خارجي",
    marquee6: "تركيب PPF",
    marquee7: "طلاء نانو",
    marquee8: "عناية متميزة بالسيارات",

    // Offers Section
    offersLabel: "عروض حصرية",
    offersTitle: "صفقات وشراكات خاصة",
    offersSubtitle:
      "استفد من شراكاتنا الحصرية وعروضنا المحدودة المصممة لعشاق السيارات.",

    // Offer Cards
    offer1Badge: "شراكة",
    offer1Title: "حصري لـ Kuwait Riders",
    offer1Desc:
      "أسعار خاصة لأعضاء مجتمع Kuwait Riders على جميع خدمات PPF والطلاء السيراميكي.",
    offer1Price: "من 85 د.ك",

    offer2Badge: "شراكة",
    offer2Title: "Harley Chapter الكويت",
    offer2Desc:
      "باقات تفصيل دراجات نارية حصرية لأعضاء فصل هارلي ديفيدسون.",
    offer2Price: "من 45 د.ك",

    offer3Badge: "عرض خاص",
    offer3Title: "مالكي Jetour",
    offer3Desc:
      "باقات PPF مخصصة مصممة خصيصًا لموديلات Jetour مع خيارات تغطية كاملة.",
    offer3Price: "من 120 د.ك",

    offer4Badge: "عرض خاص",
    offer4Title: "باقة Denza و BYD",
    offer4Desc:
      "باقات حماية مخصصة لسيارات Denza و BYD الكهربائية. PPF كامل مع ضمان.",
    offer4Price: "من 150 د.ك",

    offer5Badge: "شركات",
    offer5Title: "عرض موظفي KOC",
    offer5Desc:
      "أسعار خاصة لموظفي شركة نفط الكويت. يتطلب هوية صالحة عند الحجز.",
    offer5Price: "خصم 20%",

    offer6Badge: "عائلي",
    offer6Title: "عرض تظليل العائلة",
    offer6Desc:
      "تظليل نوافذ لجميع سيارات العائلة. احجز سيارتين أو أكثر ووفر على كل سيارة.",
    offer6Price: "من 35 د.ك",

    // Feature list items
    featureFullBody: "تغطية كاملة للجسم",
    featurePremiumFilm: "جودة فيلم متميزة",
    featureWarranty: "ضمان 5 سنوات",
    featureFreeInspection: "فحص مجاني",
    featureCustomFit: "قوالب مخصصة",
    featurePaintCorrection: "تصحيح الطلاء مشمول",
    featureCeramicTop: "طبقة سيراميك علوية",
    featureDetailWash: "غسيل تفصيلي مشمول",
    featureInteriorDetail: "تفصيل داخلي",
    featureUVProtection: "فيلم حماية UV",
    featureHeatRejection: "رفض الحرارة",
    featureMultiVehicle: "خصم متعدد السيارات",

    // KOC Countdown
    kocCountdownDays: "أيام",
    kocCountdownHours: "ساعات",
    kocCountdownMins: "دقائق",
    kocCountdownSecs: "ثوانٍ",

    // Common
    bookNow: "احجز الآن",
    learnMore: "اعرف المزيد",
    claimOffer: "احصل على العرض",
    viewAll: "عرض الكل",
    sendMessage: "إرسال الرسالة",
    submitFeedback: "إرسال التقييم",

    // Services Section
    servicesLabel: "خدماتنا",
    servicesTitle: "خدمات التفصيل المتميزة",
    servicesSubtitle:
      "من حماية الطلاء إلى ترميم الداخلية، نقدم مجموعة شاملة من خدمات العناية المتميزة بالسيارات.",

    // Service items
    svc1Title: "فيلم حماية الطلاء (PPF)",
    svc1Desc: "حماية الطلاء المطلقة",
    svc1Detail1: "تقنية فيلم ذاتي الشفاء",
    svc1Detail2: "تغطية كاملة أو جزئية للجسم",
    svc1Detail3: "ضمان الشركة المصنعة 10 سنوات",
    svc1Detail4: "حماية غير مرئية ضد الرقائق والخدوش",
    svc1Price: "يبدأ من 250 د.ك",

    svc2Title: "الطلاء السيراميكي",
    svc2Desc: "لمعان وحماية طويلة الأمد",
    svc2Detail1: "طبقة سيراميك بصلابة 9H",
    svc2Detail2: "سطح طارد للماء",
    svc2Detail3: "مقاومة الأشعة فوق البنفسجية والمواد الكيميائية",
    svc2Detail4: "مدة حماية 2-5 سنوات",
    svc2Price: "يبدأ من 120 د.ك",

    svc3Title: "تظليل النوافذ",
    svc3Desc: "رفض الحرارة والخصوصية",
    svc3Detail1: "أفلام نانو سيراميك متميزة",
    svc3Detail2: "رفض يصل إلى 99% من الأشعة فوق البنفسجية",
    svc3Detail3: "تقليل الحرارة حتى 60%",
    svc3Detail4: "ضمان الامتثال القانوني",
    svc3Price: "يبدأ من 35 د.ك",

    svc4Title: "التفصيل الداخلي",
    svc4Desc: "تنظيف عميق وترميم",
    svc4Detail1: "تكييف وحماية الجلد",
    svc4Detail2: "تنظيف بالبخار والتعقيم",
    svc4Detail3: "علاج إزالة الروائح",
    svc4Detail4: "ترميم لوحة القيادة والتشطيبات",
    svc4Price: "يبدأ من 25 د.ك",

    svc5Title: "التلميع الخارجي",
    svc5Desc: "تصحيح الطلاء وتعزيزه",
    svc5Detail1: "تصحيح الطلاء متعدد المراحل",
    svc5Detail2: "إزالة علامات الدوامة والخدوش",
    svc5Detail3: "لمسة نهائية لامعة عالية",
    svc5Detail4: "تلميع آلي بمركبات متميزة",
    svc5Price: "يبدأ من 40 د.ك",

    svc6Title: "طلاء العجلات والمكابح",
    svc6Desc: "حماية وجماليات",
    svc6Detail1: "طلاء سيراميك للعجلات",
    svc6Detail2: "طلاء مكابح الفرامل",
    svc6Detail3: "حماية من غبار المكابح",
    svc6Detail4: "خيارات ألوان مخصصة",
    svc6Price: "يبدأ من 60 د.ك",

    svc7Title: "ترميم المصابيح",
    svc7Desc: "وضوح وسطوع",
    svc7Detail1: "إزالة الأكسدة",
    svc7Detail2: "طلاء واقي من الأشعة فوق البنفسجية",
    svc7Detail3: "تحسين الرؤية الليلية",
    svc7Detail4: "خيار حماية PPF",
    svc7Price: "يبدأ من 15 د.ك",

    svc8Title: "طلاء الأسفل",
    svc8Desc: "منع الصدأ والتآكل",
    svc8Detail1: "طلاء مطاطي مضاد للصدأ",
    svc8Detail2: "خصائص عزل الصوت",
    svc8Detail3: "حماية من الرمل والحصى",
    svc8Detail4: "حفظ الهيكل",
    svc8Price: "يبدأ من 45 د.ك",

    // Wash Pricing
    washPricingTitle: "خدمات الغسيل السريعة",
    washType: "الخدمة",
    washSedan: "سيدان",
    washSUV: "دفع رباعي",
    washTruck: "شاحنة",
    wash1: "غسيل خارجي",
    wash2: "تنظيف داخلي",
    wash3: "غسيل تفصيلي كامل",
    wash4: "تنظيف حجرة المحرك",
    wash5: "شمع سريع ولمعان",

    // Home Service
    homeServiceTitle: "خدمة منزلية متاحة",
    homeServiceDesc:
      "لا تستطيع القدوم إلينا؟ سنأتي إليك! وحدة التفصيل المتنقلة لدينا تجلب تجربة Diamond PKW الكاملة إلى باب منزلك.",
    homeServiceCta: "احجز خدمة منزلية",

    // Packages Section
    packagesLabel: "الباقات",
    packagesTitle: "اختر باقتك",
    packagesSubtitle:
      "اختر باقة التفصيل المثالية لسيارتك. كل باقة تتضمن جودة Diamond PKW المميزة.",

    // Package: Essential
    pkgEssentialName: "الأساسية",
    pkgEssentialTagline: "مثالية للصيانة الدورية",
    pkgEssentialPrice: "45 د.ك",
    pkgEssentialF1: "غسيل خارجي يدوي وتجفيف",
    pkgEssentialF2: "تنظيف وتلميع داخلي",
    pkgEssentialF3: "تلميع الإطارات",
    pkgEssentialF4: "تنظيف لوحة القيادة",
    pkgEssentialF5: "معطر هواء",

    // Package: Silver
    pkgSilverName: "الفضية",
    pkgSilverTagline: "عناية وحماية معززة",
    pkgSilverPrice: "85 د.ك",
    pkgSilverF1: "كل ما في الأساسية",
    pkgSilverF2: "معالجة بالصلصال",
    pkgSilverF3: "تلميع بخطوة واحدة",
    pkgSilverF4: "تكييف الجلد الداخلي",
    pkgSilverF5: "شطف حجرة المحرك",
    pkgSilverF6: "تطبيق مانع التسرب بالرش",

    // Package: Gold
    pkgGoldName: "الذهبية",
    pkgGoldTagline: "تفصيل وتصحيح متميز",
    pkgGoldPrice: "150 د.ك",
    pkgGoldBadge: "الأكثر شعبية",
    pkgGoldF1: "كل ما في الفضية",
    pkgGoldF2: "تصحيح الطلاء بخطوتين",
    pkgGoldF3: "طلاء سيراميك بالرش (6 أشهر)",
    pkgGoldF4: "تنظيف عميق وتكييف الجلد",
    pkgGoldF5: "ترميم المصابيح",
    pkgGoldF6: "طلاء سيراميك للعجلات",
    pkgGoldF7: "تعقيم بالبخار",

    // Package: Diamond
    pkgDiamondName: "الماسية",
    pkgDiamondTagline: "تجربة التفصيل المطلقة",
    pkgDiamondPrice: "280 د.ك",
    pkgDiamondBadge: "أفضل قيمة",
    pkgDiamondF1: "كل ما في الذهبية",
    pkgDiamondF2: "تصحيح الطلاء متعدد المراحل",
    pkgDiamondF3: "طلاء سيراميك احترافي (سنتين)",
    pkgDiamondF4: "ترميم داخلي كامل",
    pkgDiamondF5: "طلاء الأسفل",
    pkgDiamondF6: "تفصيل حجرة المحرك",
    pkgDiamondF7: "غسيل صيانة مجاني",
    pkgDiamondF8: "أولوية الحجز لمدة سنة",

    // VIP
    vipBadge: "تجربة VIP التفصيلية",
    vipTitle: "تجربة Diamond VIP",
    vipDesc:
      "خدمتنا الأكثر حصرية. تحول كامل متعدد الأيام يشمل تصحيح الطلاء وتركيب PPF والطلاء السيراميكي وإعادة تأهيل داخلية كاملة. بالموعد فقط.",
    vipF1: "تصحيح الطلاء الكامل",
    vipF2: "PPF كامل الجسم",
    vipF3: "طلاء سيراميك",
    vipF4: "إعادة تأهيل الداخلية",
    vipF5: "عملية 3 أيام",
    vipF6: "استلام وتوصيل",
    vipPrice: "من 800 د.ك",
    vipCta: "استفسر عن VIP",

    // Gallery Section
    galleryLabel: "المعرض",
    galleryTitle: "أعمالنا تتحدث",
    gallerySubtitle:
      "تصفح محفظة تحولات التفصيل المتميزة لدينا. كل سيارة تتلقى اهتمام Diamond PKW المميز بالتفاصيل.",

    // Spotlight
    spotlightTitle: "أبرز الأعمال",

    // Before/After
    beforeAfterTitle: "قبل وبعد",
    beforeLabel: "قبل",
    afterLabel: "بعد",

    // Filter
    filterAll: "الكل",
    filterPPF: "PPF",
    filterCeramic: "سيراميك",
    filterTinting: "تظليل",
    filterInterior: "داخلي",
    filterPolish: "تلميع",

    // About Section
    aboutLabel: "من نحن",
    aboutTitle: "لماذا Diamond PKW",
    aboutSubtitle:
      "مكرسون للكمال، مدعومون بالشغف للتميز في السيارات.",
    aboutHeading: "استديو التفصيل الموثوق في الكويت",
    aboutP1:
      "تأسست بشغف للكمال في السيارات، نمت Diamond PKW لتصبح الاسم الأكثر ثقة في الكويت في مجال العناية المتميزة بالسيارات. يجلب فريقنا من محترفي التفصيل المعتمدين سنوات من الخبرة والتزاماً لا يتزعزع بالجودة.",
    aboutP2:
      "نستخدم فقط أجود المنتجات من العلامات التجارية المعترف بها عالمياً، مما يضمن أن كل سيارة تغادر استديونا تبدو رائعة. من السيارات اليومية إلى السيارات الخارقة الفاخرة، نعامل كل سيارة بنفس العناية الدقيقة.",

    // Stats
    stat1Num: "+5000",
    stat1Label: "سيارة مفصلة",
    stat2Num: "+8",
    stat2Label: "سنوات خبرة",
    stat3Num: "4.9",
    stat3Label: "تقييم Google",
    stat4Num: "+50",
    stat4Label: "تقييم 5 نجوم",

    // Reviews
    reviewsTitle: "ماذا يقول عملاؤنا",

    // Feedback
    feedbackTitle: "اترك تقييمك",
    feedbackDesc: "نود أن نسمع عن تجربتك مع Diamond PKW.",
    feedbackName: "اسمك",
    feedbackEmail: "البريد الإلكتروني",
    feedbackMessage: "تقييمك",
    feedbackRating: "تقييمك",

    // Contact Section
    contactLabel: "اتصل بنا",
    contactTitle: "تواصل معنا",
    contactSubtitle:
      "مستعد لمنح سيارتك معاملة Diamond؟ تواصل معنا عبر أي من هذه القنوات.",
    contactWhatsappText: "تحدث معنا على واتساب للحجز الفوري",
    contactWhatsappBtn: "فتح واتساب",

    // Info Cards
    infoPhone: "الهاتف",
    infoPhoneVal1: "+965 9553 6344",
    infoPhoneVal2: "+965 9553 9114",
    infoEmail: "البريد الإلكتروني",
    infoEmailVal: "info@diamond-pkw.com",
    infoLocation: "الموقع",
    infoLocationVal: "الشويخ الصناعية، الكويت",
    infoHours: "ساعات العمل",
    infoHoursVal1: "السبت-الخميس: 8 ص - 10 م",
    infoHoursVal2: "الجمعة: 2 م - 10 م",

    // Booking Form
    bookingFormTitle: "احجز موعدك",
    formName: "الاسم الكامل",
    formPhone: "رقم الهاتف",
    formEmail: "البريد الإلكتروني",
    formVehicle: "نوع وموديل السيارة",
    formService: "اختر الخدمة",
    formServiceOpt1: "فيلم حماية الطلاء (PPF)",
    formServiceOpt2: "طلاء سيراميك",
    formServiceOpt3: "تظليل النوافذ",
    formServiceOpt4: "تفصيل داخلي",
    formServiceOpt5: "تلميع خارجي",
    formServiceOpt6: "باقة تفصيل كاملة",
    formServiceOpt7: "أخرى",
    formDate: "التاريخ المفضل",
    formNotes: "ملاحظات إضافية",
    formSubmit: "إرسال الحجز",

    // FAQ Section
    faqLabel: "الأسئلة الشائعة",
    faqTitle: "الأسئلة المتكررة",
    faqSubtitle:
      "اعثر على إجابات للأسئلة الشائعة حول خدماتنا وأسعارنا وعملية الحجز.",

    faq1Q: "كم يستغرق تركيب PPF؟",
    faq1A:
      "يستغرق تركيب PPF للجسم الكامل عادة 3-5 أيام عمل حسب حجم السيارة وتعقيدها. يمكن إكمال التركيبات الجزئية (المصد الأمامي، الغطاء، الجناحات) في يوم إلى يومين.",
    faq2Q: "ما هو ضمان الطلاء السيراميكي؟",
    faq2A:
      "تأتي طلاءاتنا السيراميكية مع ضمانات تتراوح من 2 إلى 5 سنوات حسب الباقة المختارة. الطلاء مدعوم بضمان الشركة المصنعة.",
    faq3Q: "هل تقدمون خدمة منزلية/متنقلة؟",
    faq3A:
      "نعم! نقدم خدمات التفصيل المتنقلة للغسيل والتنظيف الداخلي والتفصيل الأساسي. يجب إجراء خدمات PPF والطلاء السيراميكي في الاستديو لضمان الجودة.",
    faq4Q: "كيف أحجز موعد؟",
    faq4A:
      "يمكنك الحجز عبر واتساب أو الاتصال بنا مباشرة أو ملء نموذج الحجز في هذه الصفحة. نوصي بالحجز قبل 2-3 أيام على الأقل للخدمات الرئيسية.",
    faq5Q: "ما طرق الدفع المقبولة؟",
    faq5A:
      "نقبل النقد و K-Net و Visa و Mastercard والتحويلات البنكية. خطط الدفع متاحة للخدمات التي تزيد عن 200 د.ك.",
    faq6Q: "هل يمكنني الانتظار أثناء خدمة سيارتي؟",
    faq6A:
      "نعم، لدينا صالة انتظار مريحة مع مرطبات و Wi-Fi وتلفزيون. للخدمات الأطول، يمكننا ترتيب الاستلام والتوصيل.",
    faq7Q: "هل تعملون على جميع أنواع السيارات؟",
    faq7A:
      "نعمل على جميع أنواع السيارات — سيدان، دفع رباعي، شاحنات، سيارات رياضية، سيارات فاخرة، ودراجات نارية. نخدم أيضًا السيارات الكهربائية بما في ذلك Tesla و BYD و Denza.",
    faq8Q: "هل هناك ضمان على تظليل النوافذ؟",
    faq8A:
      "نعم، تأتي أفلام تظليل النوافذ المتميزة لدينا مع ضمان مدى الحياة ضد الفقاعات والتقشر وتغير اللون. يغطي ضمان التركيب أي عيوب لمدة سنتين.",

    // Footer
    footerDesc:
      "أفضل استديو تفصيل سيارات في الكويت. نحوّل السيارات بشغف ودقة منذ 2016.",
    footerQuickLinks: "روابط سريعة",
    footerServices: "الخدمات",
    footerContact: "اتصل بنا",
    footerRights: "جميع الحقوق محفوظة.",
    footerPrivacy: "سياسة الخصوصية",
    footerTerms: "شروط الخدمة",
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const SERVICE_ICONS = ["🛡️", "💎", "🪟", "🧹", "✨", "🔧", "💡", "🔩"];

const WASH_PRICES = [
  { sedan: "3 KD", suv: "4 KD", truck: "5 KD" },
  { sedan: "5 KD", suv: "6 KD", truck: "7 KD" },
  { sedan: "8 KD", suv: "10 KD", truck: "12 KD" },
  { sedan: "5 KD", suv: "6 KD", truck: "7 KD" },
  { sedan: "4 KD", suv: "5 KD", truck: "6 KD" },
];

const OFFER_ICONS = ["🏍️", "🏍️", "🚗", "🔋", "🏢", "👨‍👩‍👧‍👦"];

const REVIEWS = [
  {
    nameEn: "Ahmed K.",
    nameAr: "أحمد ك.",
    dateEn: "2 weeks ago",
    dateAr: "قبل أسبوعين",
    textEn:
      "Incredible work on my Range Rover. The PPF installation was flawless and the team was very professional. Highly recommend Diamond PKW!",
    textAr:
      "عمل رائع على سيارتي رينج روفر. تركيب PPF كان مثالياً والفريق كان محترفاً جداً. أنصح بشدة بـ Diamond PKW!",
    stars: 5,
    initial: "A",
  },
  {
    nameEn: "Sarah M.",
    nameAr: "سارة م.",
    dateEn: "1 month ago",
    dateAr: "قبل شهر",
    textEn:
      "Best ceramic coating in Kuwait. My car looks brand new even after months. The attention to detail is unmatched.",
    textAr:
      "أفضل طلاء سيراميك في الكويت. سيارتي تبدو جديدة حتى بعد أشهر. الاهتمام بالتفاصيل لا مثيل له.",
    stars: 5,
    initial: "S",
  },
  {
    nameEn: "Mohammed R.",
    nameAr: "محمد ر.",
    dateEn: "3 weeks ago",
    dateAr: "قبل 3 أسابيع",
    textEn:
      "Had my windows tinted and interior detailed. Fair pricing and excellent quality. Will definitely come back for more services.",
    textAr:
      "ظللت نوافذ سيارتي وعملت تفصيل داخلي. أسعار عادلة وجودة ممتازة. سأعود بالتأكيد لمزيد من الخدمات.",
    stars: 5,
    initial: "M",
  },
  {
    nameEn: "Fatima A.",
    nameAr: "فاطمة أ.",
    dateEn: "1 week ago",
    dateAr: "قبل أسبوع",
    textEn:
      "The Diamond package was worth every fils. My BMW looks absolutely stunning. Professional team and great customer service.",
    textAr:
      "باقة الماسية كانت تستحق كل فلس. سيارتي BMW تبدو مذهلة تماماً. فريق محترف وخدمة عملاء رائعة.",
    stars: 5,
    initial: "F",
  },
  {
    nameEn: "Khalid H.",
    nameAr: "خالد ح.",
    dateEn: "2 months ago",
    dateAr: "قبل شهرين",
    textEn:
      "Brought my Porsche for a full detail. The paint correction was outstanding — all swirl marks gone. True professionals.",
    textAr:
      "أحضرت سيارتي بورش لتفصيل كامل. تصحيح الطلاء كان رائعاً — جميع علامات الدوامة اختفت. محترفون حقيقيون.",
    stars: 5,
    initial: "K",
  },
  {
    nameEn: "Nora S.",
    nameAr: "نورة س.",
    dateEn: "3 months ago",
    dateAr: "قبل 3 أشهر",
    textEn:
      "Great home service option! They came to my house and detailed my car perfectly. Very convenient and high quality work.",
    textAr:
      "خيار الخدمة المنزلية رائع! جاؤوا إلى منزلي وفصلوا سيارتي بشكل مثالي. مريح جداً وعمل عالي الجودة.",
    stars: 4,
    initial: "N",
  },
];

const GALLERY_ITEMS = [
  { category: "ppf", labelEn: "Full Body PPF — Mercedes AMG GT", labelAr: "PPF كامل — مرسيدس AMG GT" },
  { category: "ceramic", labelEn: "Ceramic Coating — Porsche 911", labelAr: "طلاء سيراميك — بورش 911" },
  { category: "tinting", labelEn: "Window Tinting — Range Rover", labelAr: "تظليل — رينج روفر" },
  { category: "interior", labelEn: "Interior Detail — BMW 7 Series", labelAr: "تفصيل داخلي — بي ام دبليو 7" },
  { category: "polish", labelEn: "Paint Correction — Audi RS6", labelAr: "تصحيح الطلاء — أودي RS6" },
  { category: "ppf", labelEn: "Partial PPF — Lamborghini Urus", labelAr: "PPF جزئي — لامبورغيني أوروس" },
  { category: "ceramic", labelEn: "Ceramic Coat — Tesla Model S", labelAr: "طلاء سيراميك — تيسلا موديل S" },
  { category: "tinting", labelEn: "Tinting — Lexus LX600", labelAr: "تظليل — لكزس LX600" },
  { category: "polish", labelEn: "Full Polish — Rolls Royce Ghost", labelAr: "تلميع كامل — رولز رويس غوست" },
  { category: "interior", labelEn: "Interior Overhaul — Bentley Bentayga", labelAr: "إعادة تأهيل — بنتلي بنتايجا" },
  { category: "ppf", labelEn: "Front PPF — Toyota Land Cruiser", labelAr: "PPF أمامي — تويوتا لاند كروزر" },
  { category: "ceramic", labelEn: "Graphene Coating — GMC Yukon", labelAr: "طلاء جرافين — جي ام سي يوكن" },
];

const SPOTLIGHT_BUILDS = [
  {
    titleEn: "Mercedes AMG GT — Full Stealth PPF",
    titleAr: "مرسيدس AMG GT — PPF خفي كامل",
    descEn: "Matte PPF wrap with ceramic top coat",
    descAr: "تغليف PPF مطفي مع طبقة سيراميك",
  },
  {
    titleEn: "Porsche 992 GT3 — Track Detail",
    titleAr: "بورش 992 GT3 — تفصيل المسار",
    descEn: "Paint correction and ceramic protection",
    descAr: "تصحيح الطلاء وحماية سيراميك",
  },
  {
    titleEn: "Rolls Royce Cullinan — VIP Detail",
    titleAr: "رولز رويس كولينان — تفصيل VIP",
    descEn: "Complete interior and exterior transformation",
    descAr: "تحول كامل للداخلية والخارجية",
  },
];


/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [bookingStripVisible, setBookingStripVisible] = useState(false);
  const [openServices, setOpenServices] = useState<Set<number>>(new Set());
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());
  const [activeFilter, setActiveFilter] = useState("all");
  const [starRating, setStarRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [kocCountdown, setKocCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Array<{
    x: number; y: number;
    vy: number; vx: number;
    size: number; opacity: number;
    wobbleSpeed: number; wobbleAmp: number; wobbleOffset: number;
    life: number; maxLife: number;
    popping: boolean; popFrame: number;
  }>>([]);
  const animFrameRef = useRef<number>(0);

  const t = useCallback((key: string) => T[lang][key] || key, [lang]);

  // ─── Toggle language ───
  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  // ─── Body class for RTL ───
  useEffect(() => {
    if (lang === "ar") {
      document.body.classList.add("ar-active");
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    } else {
      document.body.classList.remove("ar-active");
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "en");
    }
  }, [lang]);

  // ─── Scroll handler (header + booking strip + reveal) ───
  useEffect(() => {
    const onScroll = () => {
      setHeaderScrolled(window.scrollY > 50);
      setBookingStripVisible(window.scrollY > 600);

      // Reveal
      document.querySelectorAll(".reveal:not(.revealed)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          el.classList.add("revealed");
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─── Close mobile menu on nav click ───
  const handleNavClick = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // ─── Service accordion ───
  const toggleService = useCallback((idx: number) => {
    setOpenServices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  // ─── FAQ toggle ───
  const toggleFaq = useCallback((idx: number) => {
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  // ─── KOC Countdown ───
  useEffect(() => {
    // Set target date to end of current month + 30 days
    const target = new Date();
    target.setDate(target.getDate() + 30);
    target.setHours(23, 59, 59, 0);

    const tick = () => {
      const now = new Date().getTime();
      const diff = target.getTime() - now;
      if (diff <= 0) {
        setKocCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setKocCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);


  // ─── Champagne Bubbles ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const BUBBLE_COUNT = 120;

    const w = canvas.width;
    const h = canvas.height;

    function makeBubble(startFromBottom = true) {
      const size = Math.random() * 3.5 + 1;
      return {
        x: Math.random() * w,
        y: startFromBottom
          ? h + Math.random() * 100
          : Math.random() * h,
        vy: -(Math.random() * 1.2 + 0.3),
        vx: 0,
        size,
        opacity: Math.random() * 0.4 + 0.15,
        wobbleSpeed: Math.random() * 0.03 + 0.01,
        wobbleAmp: Math.random() * 30 + 10,
        wobbleOffset: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: (h + 200) / (Math.random() * 1.2 + 0.3),
        popping: false,
        popFrame: 0,
      };
    }

    // Seed initial bubbles spread across the screen
    bubblesRef.current = Array.from({ length: BUBBLE_COUNT }, () =>
      makeBubble(false)
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bubbles = bubblesRef.current;

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];

        if (b.popping) {
          // Pop animation: expanding ring that fades
          b.popFrame++;
          const progress = b.popFrame / 12;
          if (progress >= 1) {
            bubbles[i] = makeBubble(true);
            continue;
          }
          const popRadius = b.size + progress * 8;
          const popOpacity = b.opacity * (1 - progress) * 0.6;
          ctx.beginPath();
          ctx.arc(b.x, b.y, popRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(201, 168, 76, ${popOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          continue;
        }

        // Move upward
        b.life++;
        b.y += b.vy;
        // Wobble side to side
        b.x += Math.sin(b.life * b.wobbleSpeed + b.wobbleOffset) * 0.5;

        // If bubble reaches top area, start popping
        if (b.y < -10) {
          b.popping = true;
          b.popFrame = 0;
          continue;
        }

        // Draw bubble
        const alpha = b.opacity;

        // Glow
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${alpha * 0.08})`;
        ctx.fill();

        // Outer ring
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(220, 190, 100, ${alpha * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Inner fill
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${alpha * 0.35})`;
        ctx.fill();

        // Highlight reflection dot
        if (b.size > 1.5) {
          ctx.beginPath();
          ctx.arc(b.x - b.size * 0.3, b.y - b.size * 0.3, b.size * 0.25, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 240, 200, ${alpha * 0.6})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // ─── Gallery filter ───
  const filteredGallery =
    activeFilter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  // ─── Marquee items (doubled for infinite scroll) ───
  const marqueeKeys = ["marquee1", "marquee2", "marquee3", "marquee4", "marquee5", "marquee6", "marquee7", "marquee8"];
  const marqueeItems = [...marqueeKeys, ...marqueeKeys];


  /* ═══════════════════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════════════════ */
  return (
    <>
      {/* Particle canvas */}
      <canvas ref={canvasRef} id="particles-canvas" />

      {/* ─── HEADER ─── */}
      <header className={`header${headerScrolled ? " scrolled" : ""}`}>
        <a href="#hero">
          <img src={LOGO_SRC} alt="Diamond PKW" className="header-logo" />
        </a>

        <nav className="nav-links">
          <a href="#hero" onClick={handleNavClick}>{t("navHome")}</a>
          <a href="#services" onClick={handleNavClick}>{t("navServices")}</a>
          <a href="#packages" onClick={handleNavClick}>{t("navPackages")}</a>
          <a href="#offers" onClick={handleNavClick}>{t("navOffers")}</a>
          <a href="#gallery" onClick={handleNavClick}>{t("navGallery")}</a>
          <a href="#about" onClick={handleNavClick}>{t("navAbout")}</a>
          <a href="#contact" onClick={handleNavClick}>{t("navContact")}</a>
          <a href="#faq" onClick={handleNavClick}>{t("navFaq")}</a>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button className="lang-toggle" onClick={toggleLang}>
            <svg className="globe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {t("langLabel")}
          </button>

          <button
            className={`mobile-menu-btn${mobileMenuOpen ? " active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ─── MOBILE MENU ─── */}
      <div className={`mobile-menu${mobileMenuOpen ? " open" : ""}`}>
        <a href="#hero" onClick={handleNavClick}>{t("navHome")}</a>
        <a href="#services" onClick={handleNavClick}>{t("navServices")}</a>
        <a href="#packages" onClick={handleNavClick}>{t("navPackages")}</a>
        <a href="#offers" onClick={handleNavClick}>{t("navOffers")}</a>
        <a href="#gallery" onClick={handleNavClick}>{t("navGallery")}</a>
        <a href="#about" onClick={handleNavClick}>{t("navAbout")}</a>
        <a href="#contact" onClick={handleNavClick}>{t("navContact")}</a>
        <a href="#faq" onClick={handleNavClick}>{t("navFaq")}</a>
        <button className="lang-toggle" onClick={toggleLang} style={{ marginTop: "16px" }}>
          <svg className="globe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          {t("langLabel")}
        </button>
      </div>

      {/* ─── HERO ─── */}
      <section className="hero" id="hero">
        <div className="hero-gradient" />
        <div className="hero-content hero-centered">
          <h1 className="hero-title">
            DIAMOND <span className="gold-text">PKW</span>
          </h1>
          <div className="hero-tags">
            {(lang === "ar"
              ? ["PPF", "طلاء سيراميك", "تظليل", "غسيل"]
              : ["PPF", "Ceramic Coating", "Tinting", "Wash"]
            ).map((tag, i, arr) => (
              <span key={i}>
                {tag}
                {i < arr.length - 1 && <span className="hero-tag-dot">·</span>}
              </span>
            ))}
          </div>
          <p className="hero-slogan">
            {lang === "ar"
              ? "حيث يلتقي الكمال بالحماية"
              : "Where Perfection Meets Protection"}
          </p>
          <div className="hero-cta-group" style={{ justifyContent: "center" }}>
            <a
              href="https://wa.me/96595536344?text=Hi%20Diamond%20PKW%2C%20I'd%20like%20to%20book%20a%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              {t("heroCta1")}
            </a>
            <a href="#services" className="btn btn-secondary btn-lg">
              {t("heroCta2")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE TICKER ─── */}
      <div className="marquee-section">
        <div className="marquee-track">
          {marqueeItems.map((key, i) => (
            <span className="marquee-item" key={i}>
              <span className="diamond-sep" />
              {t(key)}
            </span>
          ))}
        </div>
      </div>

      {/* ─── OFFERS SECTION ─── */}
      <section className="section" id="offers">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="line" />
            {t("offersLabel")}
            <span className="line" />
          </div>
          <h2 className="section-title">{t("offersTitle")}</h2>
          <p className="section-subtitle">{t("offersSubtitle")}</p>
        </div>

        <div className="offers-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => {
            const isKOC = n === 5;
            const featureKeys =
              n === 1 ? ["featureFullBody", "featurePremiumFilm", "featureWarranty"] :
              n === 2 ? ["featureCustomFit", "featureFreeInspection", "featureDetailWash"] :
              n === 3 ? ["featureFullBody", "featureCustomFit", "featurePaintCorrection"] :
              n === 4 ? ["featureFullBody", "featureCeramicTop", "featureWarranty"] :
              n === 5 ? ["featureFreeInspection", "featurePremiumFilm", "featureInteriorDetail"] :
                        ["featureUVProtection", "featureHeatRejection", "featureMultiVehicle"];

            return (
              <div className="offer-card reveal" key={n}>
                <div className="offer-card-icon">{OFFER_ICONS[n - 1]}</div>
                <div className="offer-card-label">{t(`offer${n}Badge`)}</div>
                <h3 className="offer-card-title">{t(`offer${n}Title`)}</h3>
                <p className="offer-card-desc">{t(`offer${n}Desc`)}</p>
                <div className="offer-card-price">
                  <span className="current">{t(`offer${n}Price`)}</span>
                </div>

                {isKOC && (
                  <div className="offer-countdown">
                    <div className="countdown-box">
                      <span className="num">{String(kocCountdown.days).padStart(2, "0")}</span>
                      <span className="label">{t("kocCountdownDays")}</span>
                    </div>
                    <div className="countdown-box">
                      <span className="num">{String(kocCountdown.hours).padStart(2, "0")}</span>
                      <span className="label">{t("kocCountdownHours")}</span>
                    </div>
                    <div className="countdown-box">
                      <span className="num">{String(kocCountdown.mins).padStart(2, "0")}</span>
                      <span className="label">{t("kocCountdownMins")}</span>
                    </div>
                    <div className="countdown-box">
                      <span className="num">{String(kocCountdown.secs).padStart(2, "0")}</span>
                      <span className="label">{t("kocCountdownSecs")}</span>
                    </div>
                  </div>
                )}

                <ul className="offer-card-features">
                  {featureKeys.map((fk) => (
                    <li key={fk}>
                      <span className="check">&#10003;</span>
                      {t(fk)}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/96595536344"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-block btn-sm"
                >
                  {t("claimOffer")}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── SERVICES SECTION ─── */}
      <section className="section" id="services">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="line" />
            {t("servicesLabel")}
            <span className="line" />
          </div>
          <h2 className="section-title">{t("servicesTitle")}</h2>
          <p className="section-subtitle">{t("servicesSubtitle")}</p>
        </div>

        <div className="services-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
            const isOpen = openServices.has(n);
            return (
              <div className={`service-card reveal${isOpen ? " open" : ""}`} key={n}>
                <div className="service-card-header" onClick={() => toggleService(n)}>
                  <div className="service-card-icon">{SERVICE_ICONS[n - 1]}</div>
                  <div className="service-card-info">
                    <h3>{t(`svc${n}Title`)}</h3>
                    <p>{t(`svc${n}Desc`)}</p>
                  </div>
                  <div className="service-card-toggle">+</div>
                </div>
                <div className="service-card-body">
                  <div className="service-card-content">
                    <ul>
                      <li><span className="bullet" />{t(`svc${n}Detail1`)}</li>
                      <li><span className="bullet" />{t(`svc${n}Detail2`)}</li>
                      <li><span className="bullet" />{t(`svc${n}Detail3`)}</li>
                      <li><span className="bullet" />{t(`svc${n}Detail4`)}</li>
                    </ul>
                    <div className="service-price">{t(`svc${n}Price`)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wash Pricing Table */}
        <div className="wash-pricing reveal">
          <h3 className="section-title" style={{ fontSize: "24px", marginBottom: "24px", textAlign: "center" }}>
            {t("washPricingTitle")}
          </h3>
          <table className="wash-pricing-table">
            <thead>
              <tr>
                <th>{t("washType")}</th>
                <th>{t("washSedan")}</th>
                <th>{t("washSUV")}</th>
                <th>{t("washTruck")}</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((n) => (
                <tr key={n}>
                  <td className="wash-type">{t(`wash${n}`)}</td>
                  <td className="wash-price">{WASH_PRICES[n - 1].sedan}</td>
                  <td className="wash-price">{WASH_PRICES[n - 1].suv}</td>
                  <td className="wash-price">{WASH_PRICES[n - 1].truck}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Home Service Banner */}
        <div className="home-service-banner reveal">
          <div className="home-service-banner-content">
            <h3>🏠 {t("homeServiceTitle")}</h3>
            <p>{t("homeServiceDesc")}</p>
          </div>
          <a
            href="https://wa.me/96595536344"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {t("homeServiceCta")}
          </a>
        </div>
      </section>

      {/* ─── PACKAGES SECTION ─── */}
      <section className="section" id="packages">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="line" />
            {t("packagesLabel")}
            <span className="line" />
          </div>
          <h2 className="section-title">{t("packagesTitle")}</h2>
          <p className="section-subtitle">{t("packagesSubtitle")}</p>
        </div>

        <div className="packages-grid">
          {/* Essential */}
          <div className="package-card reveal">
            <h3 className="package-card-name">{t("pkgEssentialName")}</h3>
            <p className="package-card-tagline">{t("pkgEssentialTagline")}</p>
            <div className="package-card-price">
              <span className="amount">{t("pkgEssentialPrice")}</span>
            </div>
            <ul className="package-card-features">
              {["F1", "F2", "F3", "F4", "F5"].map((f) => (
                <li key={f}><span className="check-icon">&#10003;</span>{t(`pkgEssential${f}`)}</li>
              ))}
            </ul>
            <a href="https://wa.me/96595536344" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-block">
              {t("bookNow")}
            </a>
          </div>

          {/* Silver */}
          <div className="package-card reveal">
            <h3 className="package-card-name">{t("pkgSilverName")}</h3>
            <p className="package-card-tagline">{t("pkgSilverTagline")}</p>
            <div className="package-card-price">
              <span className="amount">{t("pkgSilverPrice")}</span>
            </div>
            <ul className="package-card-features">
              {["F1", "F2", "F3", "F4", "F5", "F6"].map((f) => (
                <li key={f}><span className="check-icon">&#10003;</span>{t(`pkgSilver${f}`)}</li>
              ))}
            </ul>
            <a href="https://wa.me/96595536344" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-block">
              {t("bookNow")}
            </a>
          </div>

          {/* Gold */}
          <div className="package-card featured reveal">
            <div className="package-card-badge">{t("pkgGoldBadge")}</div>
            <h3 className="package-card-name">{t("pkgGoldName")}</h3>
            <p className="package-card-tagline">{t("pkgGoldTagline")}</p>
            <div className="package-card-price">
              <span className="amount">{t("pkgGoldPrice")}</span>
            </div>
            <ul className="package-card-features">
              {["F1", "F2", "F3", "F4", "F5", "F6", "F7"].map((f) => (
                <li key={f}><span className="check-icon">&#10003;</span>{t(`pkgGold${f}`)}</li>
              ))}
            </ul>
            <a href="https://wa.me/96595536344" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-block">
              {t("bookNow")}
            </a>
          </div>

          {/* Diamond */}
          <div className="package-card featured reveal">
            <div className="package-card-badge">{t("pkgDiamondBadge")}</div>
            <h3 className="package-card-name">{t("pkgDiamondName")}</h3>
            <p className="package-card-tagline">{t("pkgDiamondTagline")}</p>
            <div className="package-card-price">
              <span className="amount">{t("pkgDiamondPrice")}</span>
            </div>
            <ul className="package-card-features">
              {["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"].map((f) => (
                <li key={f}><span className="check-icon">&#10003;</span>{t(`pkgDiamond${f}`)}</li>
              ))}
            </ul>
            <a href="https://wa.me/96595536344" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-block">
              {t("bookNow")}
            </a>
          </div>
        </div>

        {/* VIP Experience */}
        <div className="vip-experience reveal">
          <div className="vip-badge">
            <span>💎</span>
            {t("vipBadge")}
          </div>
          <h3>{t("vipTitle")}</h3>
          <p>{t("vipDesc")}</p>
          <div className="vip-features">
            {["vipF1", "vipF2", "vipF3", "vipF4", "vipF5", "vipF6"].map((k) => (
              <span className="vip-feature" key={k}>
                <span className="icon">&#10003;</span>
                {t(k)}
              </span>
            ))}
          </div>
          <div className="vip-price">{t("vipPrice")}</div>
          <a
            href="https://wa.me/96595536344"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            {t("vipCta")}
          </a>
        </div>
      </section>

      {/* ─── GALLERY SECTION ─── */}
      <section className="section" id="gallery">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="line" />
            {t("galleryLabel")}
            <span className="line" />
          </div>
          <h2 className="section-title">{t("galleryTitle")}</h2>
          <p className="section-subtitle">{t("gallerySubtitle")}</p>
        </div>

        {/* Spotlight Builds */}
        <div className="spotlight-builds reveal">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>
            {t("spotlightTitle")}
          </h3>
          <div className="spotlight-grid">
            {SPOTLIGHT_BUILDS.map((build, i) => (
              <div className="spotlight-card" key={i}>
                <div
                  className="spotlight-card-img"
                  style={{
                    background: `linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(10,10,15,0.8) 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "48px",
                  }}
                >
                  💎
                </div>
                <div className="spotlight-card-overlay">
                  <div>
                    <h4>{lang === "en" ? build.titleEn : build.titleAr}</h4>
                    <p>{lang === "en" ? build.descEn : build.descAr}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Before & After */}
        <div className="before-after reveal">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>
            {t("beforeAfterTitle")}
          </h3>
          <div className="before-after-grid">
            {[1, 2].map((n) => (
              <div className="before-after-card" key={n}>
                <div className="side">
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      background: "linear-gradient(135deg, rgba(120,80,40,0.3), rgba(10,10,15,0.8))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      color: "var(--text-muted)",
                    }}
                  >
                    {t("beforeLabel")}
                  </div>
                  <span className="label">{t("beforeLabel")}</span>
                </div>
                <div className="side">
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      background: "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(10,10,15,0.6))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      color: "var(--text-muted)",
                    }}
                  >
                    {t("afterLabel")}
                  </div>
                  <span className="label">{t("afterLabel")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar reveal">
          {["all", "ppf", "ceramic", "tinting", "interior", "polish"].map((cat) => {
            const labelKey =
              cat === "all" ? "filterAll" :
              cat === "ppf" ? "filterPPF" :
              cat === "ceramic" ? "filterCeramic" :
              cat === "tinting" ? "filterTinting" :
              cat === "interior" ? "filterInterior" : "filterPolish";
            return (
              <button
                key={cat}
                className={`filter-btn${activeFilter === cat ? " active" : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {t(labelKey)}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredGallery.map((item, i) => (
            <div className="gallery-item reveal" key={`${item.category}-${i}`}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(135deg, rgba(201,168,76,${0.05 + i * 0.02}), rgba(10,10,15,0.9))`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                }}
              >
                🚗
              </div>
              <div className="gallery-item-overlay">
                <span>{lang === "en" ? item.labelEn : item.labelAr}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT SECTION ─── */}
      <section className="section" id="about">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="line" />
            {t("aboutLabel")}
            <span className="line" />
          </div>
          <h2 className="section-title">{t("aboutTitle")}</h2>
          <p className="section-subtitle">{t("aboutSubtitle")}</p>
        </div>

        <div className="about-content reveal">
          <div className="about-text">
            <h3>{t("aboutHeading")}</h3>
            <p>{t("aboutP1")}</p>
            <p>{t("aboutP2")}</p>
          </div>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(201,168,76,0.1), rgba(10,10,15,0.6))",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--glass-border)",
              height: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "64px",
            }}
          >
            💎
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid reveal">
          {[1, 2, 3, 4].map((n) => (
            <div className="stat-card" key={n}>
              <div className="stat-number">{t(`stat${n}Num`)}</div>
              <div className="stat-label">{t(`stat${n}Label`)}</div>
            </div>
          ))}
        </div>

        {/* Partners Carousel */}
        <div className="partners-section reveal">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 700, marginBottom: "24px", textAlign: "center", color: "var(--text-dim)" }}>
            {lang === "en" ? "Trusted by Leading Brands" : "موثوق من العلامات التجارية الرائدة"}
          </h3>
          <div style={{ overflow: "hidden" }}>
            <div className="partners-track">
              {["XPEL", "SunTek", "3M", "Gtechniq", "Gyeon", "Koch Chemie", "Meguiar's", "XPEL", "SunTek", "3M", "Gtechniq", "Gyeon", "Koch Chemie", "Meguiar's"].map((brand, i) => (
                <span
                  key={i}
                  className="partner-logo"
                  style={{
                    height: "auto",
                    fontFamily: "var(--font-display)",
                    fontSize: "18px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="reviews-section reveal">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 700, marginBottom: "24px", textAlign: "center" }}>
            {t("reviewsTitle")}
          </h3>
          <div className="reviews-grid">
            {REVIEWS.map((review, i) => (
              <div className="review-card" key={i}>
                <div className="review-stars">
                  {Array.from({ length: 5 }, (_, j) => (
                    <span key={j} className="star" style={{ color: j < review.stars ? "var(--gold)" : "rgba(255,255,255,0.15)" }}>
                      &#9733;
                    </span>
                  ))}
                </div>
                <p className="review-text">
                  &ldquo;{lang === "en" ? review.textEn : review.textAr}&rdquo;
                </p>
                <div className="review-author">
                  <div className="review-avatar">{review.initial}</div>
                  <div className="review-author-info">
                    <div className="name">{lang === "en" ? review.nameEn : review.nameAr}</div>
                    <div className="date">{lang === "en" ? review.dateEn : review.dateAr}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Form */}
        <div className="feedback-section reveal">
          <h3>{t("feedbackTitle")}</h3>
          <p>{t("feedbackDesc")}</p>

          {/* Star Rating Picker */}
          <div className="star-rating-picker">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star-btn${star <= (hoverRating || starRating) ? " active" : ""}`}
                onClick={() => setStarRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                type="button"
              >
                &#9733;
              </button>
            ))}
          </div>

          <form
            action="https://formsubmit.co/info@diamond-pkw.com"
            method="POST"
          >
            <input type="hidden" name="_subject" value="New Feedback — Diamond PKW" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="rating" value={starRating} />
            <div className="form-group">
              <label>{t("feedbackName")}</label>
              <input type="text" name="name" required placeholder={t("feedbackName")} />
            </div>
            <div className="form-group">
              <label>{t("feedbackEmail")}</label>
              <input type="email" name="email" required placeholder={t("feedbackEmail")} />
            </div>
            <div className="form-group">
              <label>{t("feedbackMessage")}</label>
              <textarea name="message" required placeholder={t("feedbackMessage")} />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              {t("submitFeedback")}
            </button>
          </form>
        </div>
      </section>

      {/* ─── CONTACT SECTION ─── */}
      <section className="section" id="contact">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="line" />
            {t("contactLabel")}
            <span className="line" />
          </div>
          <h2 className="section-title">{t("contactTitle")}</h2>
          <p className="section-subtitle">{t("contactSubtitle")}</p>
        </div>

        {/* WhatsApp Hero */}
        <div className="contact-hero reveal">
          <p style={{ fontSize: "16px", color: "var(--text-dim)", marginBottom: "8px" }}>
            {t("contactWhatsappText")}
          </p>
          <a
            href="https://wa.me/96595536344"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-big-btn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.486a.75.75 0 0 0 .921.921l4.452-1.495A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.33 0-4.487-.764-6.234-2.058l-.436-.328-3.017 1.012 1.012-3.017-.328-.436A9.723 9.723 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
            </svg>
            {t("contactWhatsappBtn")}
          </a>
        </div>

        {/* Info Cards */}
        <div className="contact-info-cards reveal">
          <div className="contact-info-card">
            <div className="icon">📞</div>
            <h4>{t("infoPhone")}</h4>
            <p>
              <a href="tel:+96595536344">{t("infoPhoneVal1")}</a>
              <br />
              <a href="tel:+96595539114">{t("infoPhoneVal2")}</a>
            </p>
          </div>
          <div className="contact-info-card">
            <div className="icon">✉️</div>
            <h4>{t("infoEmail")}</h4>
            <p>
              <a href="mailto:info@diamond-pkw.com">{t("infoEmailVal")}</a>
            </p>
          </div>
          <div className="contact-info-card">
            <div className="icon">📍</div>
            <h4>{t("infoLocation")}</h4>
            <p>{t("infoLocationVal")}</p>
          </div>
          <div className="contact-info-card">
            <div className="icon">🕐</div>
            <h4>{t("infoHours")}</h4>
            <p>
              {t("infoHoursVal1")}
              <br />
              {t("infoHoursVal2")}
            </p>
          </div>
        </div>

        {/* Booking Form + Map */}
        <div className="booking-form-section reveal">
          <div className="booking-form">
            <h3>{t("bookingFormTitle")}</h3>
            <form
              action="https://formsubmit.co/info@diamond-pkw.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="New Booking — Diamond PKW" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="form-group">
                <label>{t("formName")}</label>
                <input type="text" name="name" required placeholder={t("formName")} />
              </div>
              <div className="form-group">
                <label>{t("formPhone")}</label>
                <input type="tel" name="phone" required placeholder={t("formPhone")} />
              </div>
              <div className="form-group">
                <label>{t("formEmail")}</label>
                <input type="email" name="email" placeholder={t("formEmail")} />
              </div>
              <div className="form-group">
                <label>{t("formVehicle")}</label>
                <input type="text" name="vehicle" required placeholder={t("formVehicle")} />
              </div>
              <div className="form-group">
                <label>{t("formService")}</label>
                <select name="service" required>
                  <option value="">{t("formService")}</option>
                  <option value="ppf">{t("formServiceOpt1")}</option>
                  <option value="ceramic">{t("formServiceOpt2")}</option>
                  <option value="tinting">{t("formServiceOpt3")}</option>
                  <option value="interior">{t("formServiceOpt4")}</option>
                  <option value="polish">{t("formServiceOpt5")}</option>
                  <option value="full-detail">{t("formServiceOpt6")}</option>
                  <option value="other">{t("formServiceOpt7")}</option>
                </select>
              </div>
              <div className="form-group">
                <label>{t("formDate")}</label>
                <input type="date" name="date" required />
              </div>
              <div className="form-group">
                <label>{t("formNotes")}</label>
                <textarea name="notes" placeholder={t("formNotes")} />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                {t("formSubmit")}
              </button>
            </form>
          </div>

          {/* Google Maps */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.6!2d47.95!3d29.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDIxJzAwLjAiTiA0N8KwNTcnMDAuMCJF!5e0!3m2!1sen!2skw!4v1234567890"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Diamond PKW Location"
            />
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section className="section" id="faq">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="line" />
            {t("faqLabel")}
            <span className="line" />
          </div>
          <h2 className="section-title">{t("faqTitle")}</h2>
          <p className="section-subtitle">{t("faqSubtitle")}</p>
        </div>

        <div className="faq-list">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
            const isOpen = openFaqs.has(n);
            return (
              <div className={`faq-item reveal${isOpen ? " open" : ""}`} key={n}>
                <div className="faq-question" onClick={() => toggleFaq(n)}>
                  <h4>{t(`faq${n}Q`)}</h4>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-content">
                    {t(`faq${n}A`)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src={LOGO_SRC} alt="Diamond PKW" className="footer-logo" />
            <p>{t("footerDesc")}</p>
            <div className="footer-socials">
              <a href="https://wa.me/96595536344" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/diamond.pkw" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>{t("footerQuickLinks")}</h4>
            <ul>
              <li><a href="#hero">{t("navHome")}</a></li>
              <li><a href="#services">{t("navServices")}</a></li>
              <li><a href="#packages">{t("navPackages")}</a></li>
              <li><a href="#offers">{t("navOffers")}</a></li>
              <li><a href="#gallery">{t("navGallery")}</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{t("footerServices")}</h4>
            <ul>
              <li><a href="#services">{t("svc1Title")}</a></li>
              <li><a href="#services">{t("svc2Title")}</a></li>
              <li><a href="#services">{t("svc3Title")}</a></li>
              <li><a href="#services">{t("svc4Title")}</a></li>
              <li><a href="#services">{t("svc5Title")}</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{t("footerContact")}</h4>
            <ul>
              <li><a href="tel:+96595536344">{t("infoPhoneVal1")}</a></li>
              <li><a href="tel:+96595539114">{t("infoPhoneVal2")}</a></li>
              <li><a href="mailto:info@diamond-pkw.com">{t("infoEmailVal")}</a></li>
              <li><a href="https://www.instagram.com/diamond.pkw" target="_blank" rel="noopener noreferrer">@diamond.pkw</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Diamond PKW. {t("footerRights")}</p>
          <div className="footer-bottom-links">
            <a href="#">{t("footerPrivacy")}</a>
            <a href="#">{t("footerTerms")}</a>
          </div>
        </div>
      </footer>

      {/* ─── STICKY BOOKING STRIP ─── */}
      <div className={`booking-strip${bookingStripVisible ? " visible" : ""}`}>
        <span className="booking-strip-text">
          {t("bookingText")} <span className="gold">Diamond PKW</span>
        </span>
        <a
          href="https://wa.me/96595536344"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
        >
          {t("bookingCta")}
        </a>
      </div>

      {/* ─── FLOATING WHATSAPP BUTTON ─── */}
      <a
        href="https://wa.me/96595536344"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="WhatsApp"
      >
        <span className="wa-pulse" />
        <svg viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.486a.75.75 0 0 0 .921.921l4.452-1.495A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.33 0-4.487-.764-6.234-2.058l-.436-.328-3.017 1.012 1.012-3.017-.328-.436A9.723 9.723 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/>
        </svg>
      </a>
    </>
  );
}
