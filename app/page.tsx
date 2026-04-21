"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   LOGO (base64 PNG)
   ═══════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   TRANSLATIONS
   ═══════════════════════════════════════════════════════════════════════════ */
type Lang = "en" | "ar";

const T: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    navHome: "Home",
    navServices: "Services",
    navPackages: "Pricing",
    navOffers: "Offers",
    navGallery: "Gallery",
    navAbout: "Reviews",
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
    servicesLabel: "Services",
    servicesTitle: "What We Do",
    servicesSubtitle: "We don't cut corners, we protect them.",

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
    navPackages: "الأسعار",
    navOffers: "العروض",
    navGallery: "المعرض",
    navAbout: "التقييمات",
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
    servicesTitle: "ما نقوم به",
    servicesSubtitle: "ما نقصّر، نحمي سيارتك",

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

const REVIEWS = [
  { name: "Bashar Alsarraf", text: "Very professional work. They used top grade materials and truly restored the car to its original state. Good value for the money.", stars: 5, initial: "B" },
  { name: "أحمد الأثري", text: "من أفضل الأماكن في الكويت لتفصيل وتلميع سيارتك أو دراجتك. عندهم فيلم حماية وتظليل نوافذ بجودة ممتازة.", stars: 5, initial: "أ" },
  { name: "Khaled Alkhawari", text: "One of the best companies in Kuwait offering protection, window tinting, and heat insulation services for cars.", stars: 5, initial: "K" },
  { name: "مشعل النجادي", text: "من أفضل محلات الحماية اللي تعاملت معاهم. كانت عندي سيارة بايعها وديتها لهم يغسلونها ويلمعونها، رجعوها لي كأنها جديدة وباعتها بسرعة.", stars: 5, initial: "م" },
  { name: "Mohammed Almoumen", text: "Neat work, excellent customer service, and reasonable prices. May God grant them success.", stars: 5, initial: "M" },
  { name: "عبدالله قنبر", text: "أرقى طريقة تدلل فيها سيارتك. محترفين في شغلهم وخدمتهم فوق الممتاز.", stars: 5, initial: "ع" },
  { name: "Ali Al", text: "The staff is attentive to details and is honest. The owner of the shop is a special person.", stars: 5, initial: "A" },
  { name: "محمد القاعد", text: "أفضل أنواع الحماية والتظليل، معاملة راقية وتعامل ممتاز من الإدارة والفنيين، والأسعار مناسبة.", stars: 5, initial: "م" },
  { name: "Ali Ghuloum", text: "Best gift to have for your ride — the strongest protection ever.", stars: 5, initial: "A" },
  { name: "محمد علي", text: "مواد ممتازة، شغل سريع، وتشطيب دقيق. شكراً لكم.", stars: 5, initial: "م" },
  { name: "Husain Alsarraf", text: "I tried their cleaning service; it was excellent, and they use high-quality materials I haven't seen at any other company.", stars: 5, initial: "H" },
  { name: "رفعت ضاحي", text: "من أفضل مراكز خدمة السيارات في مجال التظليل الحراري وحماية السيارات بكل أنواعها، واستقبالهم يفوق التوقعات.", stars: 5, initial: "ر" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   OUR WORK SLIDESHOW
   ═══════════════════════════════════════════════════════════════════════════ */
const OW_DURATION = 4000;

const SERVICE_MINI_CARDS = [
  { key: "ppf", label: "PPF", labelAr: "فيلم حماية الطلاء", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { key: "tinting", label: "Tinting", labelAr: "تظليل النوافذ", icon: "M2 3h20v14H2zM8 21h8M12 17v4" },
  { key: "polish", label: "Polish", labelAr: "تلميع وتصحيح الطلاء", icon: "M12 3v1m0 16v1m-7.07-2.93l.7-.7m12.73-12.73l.7-.7M3 12h1m16 0h1M5.64 5.64l.7.7m12.02 12.02l.7.7" },
  { key: "full-wash", label: "Full Wash", labelAr: "غسيل كامل", icon: "M4 10h16c1 0 2 1 2 2v2c0 4-4 8-10 8S2 18 2 14v-2c0-1 1-2 2-2zM12 2v4M8 4l1 2M16 4l-1 2" },
  { key: "home-service", label: "Home Service", labelAr: "خدمات منازل", icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10" },
];

/* Most Booked cards (right panel of the Our Work / Most Booked section) */
type BookingCard = {
  key: string;
  badge?: string;
  badgeAr?: string;
  title: string;
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  features: string[];
  featuresAr?: string[];
  price: string;
  priceAr?: string;
  hasCountdown?: boolean;
};
const MOST_BOOKED_CARDS: BookingCard[] = [
  {
    key: "vip-wash",
    badge: "1 WASH",
    badgeAr: "غسلة وحدة",
    title: "VIP Wash Experience",
    titleAr: "غسلة VIP",
    features: [
      "Exterior wash",
      "Full interior clean",
      "AC vent cleaning",
      "Light scratch removal",
      "Exterior wax polish",
    ],
    featuresAr: [
      "غسيل خارجي",
      "تنظيف داخلي كامل",
      "تنظيف فتحات التكييف",
      "إزالة خدوش خفيفة",
      "تلميع الشمع الخارجي",
    ],
    price: "15 KD",
    priceAr: "١٥ د.ك",
  },
  {
    key: "gold",
    badge: "Membership",
    badgeAr: "عضوية",
    title: "Gold",
    titleAr: "الذهبية",
    subtitle: "8 washes per month",
    subtitleAr: "٨ غسلات بالشهر",
    features: [
      "Priority booking",
      "Interior & exterior clean",
      "Unlimited reschedules",
    ],
    featuresAr: [
      "أولوية بالحجز",
      "تنظيف داخلي وخارجي",
      "تغيير المواعيد بدون حدود",
    ],
    price: "30 KD",
    priceAr: "٣٠ د.ك",
  },
  {
    key: "denza-byd",
    badge: "Club",
    badgeAr: "نادي",
    title: "Denza & BYD Club",
    titleAr: "نادي دينزا و BYD",
    features: [
      "Complete PPF & nano ceramic coverage",
      "Offer extends to family members",
      "Full body paint protection included",
    ],
    featuresAr: [
      "تغطية كاملة PPF وطلاء نانو سيراميك",
      "العرض يشمل أفراد العائلة",
      "حماية كاملة لطلاء الجسم",
    ],
    price: "500 KD",
    priceAr: "٥٠٠ د.ك",
  },
  {
    key: "koc",
    badge: "KOC Staff — Limited Time",
    badgeAr: "موظفي KOC — لفترة محدودة",
    title: "KOC Staff",
    titleAr: "موظفي KOC",
    features: [
      "Professional window tinting for 3 vehicles",
      "Nano Guard Certified",
      "Exclusive rate",
    ],
    featuresAr: [
      "تظليل نوافذ احترافي لـ ٣ سيارات",
      "معتمد من نانو جارد",
      "سعر حصري",
    ],
    price: "Limited Time",
    priceAr: "عرض محدود",
    hasCountdown: true,
  },
];
const BOOKING_CARD_DURATION = 8000;
// KOC countdown ends 2026-05-11 00:00:00 local time.
const KOC_DEADLINE = new Date(2026, 4, 11, 0, 0, 0).getTime();

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATED COUNTER HOOK + STAT CARDS
   ═══════════════════════════════════════════════════════════════════════════ */
function useAnimatedCounter(target: number, started: boolean, duration = 2000, decimals = 0) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return decimals ? val.toFixed(decimals) : String(Math.round(val));
}

function StatCards({ lang }: { lang: Lang }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isAr = lang === "ar";

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const ratingDisplay = useAnimatedCounter(4.9, visible, 2000, 1);
  const clientsDisplay = useAnimatedCounter(194, visible, 2200, 0);
  const yearsDisplay = useAnimatedCounter(5, visible, 1600, 0);

  return (
    <div className="stat-cards-wrap" ref={wrapRef}>
      {/* Google Rating */}
      <div className={`sc-card${visible ? " sc-visible" : ""}`} style={{ animationDelay: "0s" }}>
        <div className="sc-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#a8b0b8"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#8a929a"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#c8ced6"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#6e7680"/></svg>
        </div>
        <div className="sc-num">{isAr ? "٤٫٩" : ratingDisplay}</div>
        <div className="sc-stars">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ color: "#c9a84c", fontSize: "14px" }}>&#9733;</span>
          ))}
        </div>
        <div className="sc-divider" />
        <div className="sc-label">{isAr ? "تقييم جوجل" : "Google Rating"}</div>
      </div>

      {/* Happy Clients */}
      <div className={`sc-card${visible ? " sc-visible" : ""}`} style={{ animationDelay: "0.15s" }}>
        <div className="sc-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
        </div>
        <div className="sc-num sc-num-gold">{isAr ? "١٩٤" : clientsDisplay}<span className="sc-plus">+</span></div>
        <div className="sc-stars sc-stars-placeholder" aria-hidden="true" />
        <div className="sc-divider" />
        <div className="sc-label">{isAr ? "عملاء سعداء" : "Satisfied Drivers"}</div>
      </div>

      {/* Years */}
      <div className={`sc-card${visible ? " sc-visible" : ""}`} style={{ animationDelay: "0.3s" }}>
        <div className="sc-icon">
          <svg width="24" height="24" viewBox="0 0 40 40" fill="none"><path d="M20 2L38 16L20 38L2 16L20 2Z" stroke="var(--gold)" strokeWidth="2" fill="none"/><path d="M8 16H32M20 2L14 16L20 38L26 16L20 2Z" stroke="var(--gold)" strokeWidth="1.5" fill="none" opacity="0.4"/></svg>
        </div>
        <div className="sc-num">{isAr ? "٥" : yearsDisplay}<span className="sc-plus">+</span></div>
        <div className="sc-stars sc-stars-placeholder" aria-hidden="true" />
        <div className="sc-divider" />
        <div className="sc-label">{isAr ? "سنوات التميز" : "Years of Excellence"}</div>
      </div>
    </div>
  );
}

function KocCountdown({ isAr }: { isAr?: boolean }) {
  // Render zeros initially so SSR + first client render match. Tick on mount.
  const [cd, setCd] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, KOC_DEADLINE - Date.now());
      setCd({
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff / 36e5) % 24),
        m: Math.floor((diff / 6e4) % 60),
        s: Math.floor((diff / 1e3) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => {
    const s = String(n).padStart(2, "0");
    if (!isAr) return s;
    const arDigits = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];
    return s.split("").map(ch => /[0-9]/.test(ch) ? arDigits[parseInt(ch, 10)] : ch).join("");
  };
  const labels = isAr
    ? [[cd.d, "أيام"], [cd.h, "ساعات"], [cd.m, "دقائق"], [cd.s, "ثوانٍ"]] as const
    : [[cd.d, "DAYS"], [cd.h, "HRS"], [cd.m, "MIN"], [cd.s, "SEC"]] as const;
  return (
    <div className="bk-countdown">
      {labels.map(([v, l]) => (
        <div key={l as string} className="bk-cd-cell">
          <span className="bk-cd-num">{pad(v as number)}</span>
          <span className="bk-cd-lbl">{l}</span>
        </div>
      ))}
    </div>
  );
}

const SPOTLIGHT_CARS = [
  { key: "ferrari", name: "Ferrari 488", img: "/ferarri.jpg" },
  { key: "goldwing", name: "Honda Goldwing", img: "/honda.jpg" },
  { key: "denza", name: "BYD Denza 5", img: "/byd.jpg" },
];

function SpotlightCards() {
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const startX = useRef<number | null>(null);
  const total = SPOTLIGHT_CARS.length;

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(p => (p + 1) % total);
    }, 5000);
    return () => clearInterval(id);
  }, [total]);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setDragX(0);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    setDragX(e.touches[0].clientX - startX.current);
  };
  const onTouchEnd = () => {
    if (startX.current === null) return;
    const threshold = 50;
    if (dragX > threshold) setCurrent(p => (p - 1 + total) % total);
    else if (dragX < -threshold) setCurrent(p => (p + 1) % total);
    startX.current = null;
    setDragX(0);
  };

  return (
    <>
      {/* Desktop: static 3-column grid */}
      <div className="spotlight-grid reveal spotlight-grid-desktop">
        {SPOTLIGHT_CARS.map((car) => (
          <div className="spotlight-card" key={car.key}>
            <div className="spotlight-card-image" aria-label={car.name} style={{
              backgroundImage: `url(${car.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }} />
            <div className="spotlight-card-body">
              <h3 className="spotlight-card-title">{car.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: single-card carousel auto-rotating every 5s (swipeable) */}
      <div
        className="spotlight-carousel reveal"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="spotlight-carousel-track"
          style={{
            transform: `translateX(calc(-${current * 100}% + ${dragX}px))`,
            transition: dragX === 0 ? "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
          }}
        >
          {SPOTLIGHT_CARS.map((car) => (
            <div className="spotlight-card spotlight-card-mobile" key={car.key}>
              <div className="spotlight-card-image" aria-label={car.name} style={{
                backgroundImage: `url(${car.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }} />
              <div className="spotlight-card-body">
                <h3 className="spotlight-card-title">{car.name}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="spotlight-carousel-dots">
          {SPOTLIGHT_CARS.map((_, i) => (
            <button
              key={i}
              className={`spotlight-dot${i === current ? " active" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function BookingCardSlide({ card, visible, isAr }: { card: BookingCard; visible: boolean; isAr?: boolean }) {
  const badge = isAr && card.badgeAr ? card.badgeAr : card.badge;
  const title = isAr && card.titleAr ? card.titleAr : card.title;
  const subtitle = isAr && card.subtitleAr ? card.subtitleAr : card.subtitle;
  const features = isAr && card.featuresAr ? card.featuresAr : card.features;
  const price = isAr && card.priceAr ? card.priceAr : card.price;
  return (
    <div className="bk-slide" style={{ opacity: visible ? 1 : 0 }}>
      <div className={`bk-card${isAr ? " bk-card-ar" : ""}`}>
        {badge && <div className="bk-badge">{badge}</div>}
        <h3 className="bk-title">{title}</h3>
        {subtitle && <div className="bk-subtitle">{subtitle}</div>}
        <ul className="bk-features">
          {features.map((f, i) => (
            <li key={i}><span className="bk-check">✓</span>{f}</li>
          ))}
        </ul>
        {card.hasCountdown && <KocCountdown isAr={isAr} />}
        <div className="bk-footer">
          <div className="bk-price">{price}</div>
          <a href={`/contact?service=${encodeURIComponent(card.key)}`} className="bk-book">
            {isAr ? "احجز الآن" : "BOOK NOW"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

type SlideItem = { image?: string; gradient?: string; label: string };

function OurWorkPanel({ slides, cards, serviceCards, side, lang, eyebrow, title, subtitle, ctaText, ctaLink, cta2Text, cta2Link }: {
  slides?: SlideItem[];
  cards?: BookingCard[];
  serviceCards?: boolean;
  side: "left" | "right"; lang: Lang; eyebrow?: string; title: React.ReactNode; subtitle: string; ctaText?: string; ctaLink?: string; cta2Text?: string; cta2Link?: string;
}) {
  const usingCards = !!cards;
  const usingServices = !!serviceCards;
  const total = usingCards ? cards!.length : usingServices ? 0 : slides!.length;
  const tickMs = usingCards ? BOOKING_CARD_DURATION : OW_DURATION;
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const isRight = side === "right";

  useEffect(() => {
    if (usingServices || total === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => { setCurrent(p => (p + 1) % total); setFade(true); }, 600);
    }, tickMs);
    return () => clearInterval(interval);
  }, [total, tickMs]);

  return (
    <div className={`ow-panel${isRight ? " ow-panel-mirrored" : ""}`}>
      {/* Media side */}
      <div className={`ow-panel-slides${usingServices ? " ow-panel-services" : ""}`}>
        {usingServices
          ? (
            <div className="svc-stack">
              {SERVICE_MINI_CARDS.map((svc, i) => (
                <a
                  key={svc.key}
                  href="/services"
                  className="svc-mini"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <svg className="svc-mini-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={svc.icon} />
                  </svg>
                  <span className="svc-mini-label">{lang === "ar" ? svc.labelAr : svc.label}</span>
                  <svg className="svc-mini-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          )
          : usingCards
            ? cards!.map((card, i) => (
                <BookingCardSlide
                  key={card.key}
                  card={card}
                  visible={i === current && fade}
                  isAr={lang === "ar"}
                />
              ))
            : slides!.map((slide: SlideItem, i: number) => (
                <div key={i} className={`ow-slide${i === current ? " ow-slide-active" : ""}`} style={{ background: slide.gradient || "#000", opacity: i === current && fade ? 1 : 0 }}>
                  {slide.image && <img src={slide.image} alt={slide.label} className="ow-slide-img" />}
                  {!slide.image && <div className="ow-slide-silhouette" />}
                </div>
              ))}
        {/* Card-area nav: arrows + dots, sitting under the cards themselves */}
        {usingCards && (
          <div className="ow-cards-nav">
            <button
              type="button"
              className="ow-arrow"
              aria-label="Previous"
              onClick={() => { setCurrent(p => (p - 1 + total) % total); setFade(true); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="ow-dots">
              {Array.from({ length: total }, (_, i) => (
                <button key={i} className={`ow-dot${i === current ? " ow-dot-active" : ""}`} onClick={() => { setCurrent(i); setFade(true); }} />
              ))}
            </div>
            <button
              type="button"
              className="ow-arrow"
              aria-label="Next"
              onClick={() => { setCurrent(p => (p + 1) % total); setFade(true); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Text content */}
      <div className={`ow-panel-text${lang === "ar" ? " ow-text-rtl" : ""}`}>
        <div className="ow-eyebrow">
          <div className="ow-eyebrow-line" />
          <span>{eyebrow || "DIAMOND PKW"}</span>
        </div>
        <h2 className="ow-title">
          {title}
        </h2>
        <div className="ow-divider" />
        <p className="ow-desc">{subtitle}</p>
        <div className="ow-cta-group">
          <a href={ctaLink || "/services"} className="ow-cta">
            {ctaText || (lang === "ar" ? "عرض الخدمات" : "VIEW SERVICES")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          {cta2Text && (
            <a href={cta2Link || "/packages"} className="ow-cta">
              {cta2Text}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
        {!usingCards && !usingServices && (
          <>
            <div className="ow-nav">
              <div className="ow-dots">
                {Array.from({ length: total }, (_, i) => (
                  <button key={i} className={`ow-dot${i === current ? " ow-dot-active" : ""}`} onClick={() => { setCurrent(i); setFade(true); }} />
                ))}
              </div>
              <span className="ow-counter">
                <span className="ow-counter-current">{String(current + 1).padStart(2, "0")}</span>
                <span>/</span>
                <span>{String(total).padStart(2, "0")}</span>
              </span>
            </div>
            <div className="ow-progress">
              <div className="ow-progress-bar" key={current} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function OurWorkSection({ lang }: { lang: Lang }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const isAr = lang === "ar";

  useEffect(() => {
    const pathEl = lineRef.current;
    const svgEl = svgRef.current;
    const section = sectionRef.current;
    if (!pathEl || !svgEl || !section) return;

    let totalLength = 0;
    let h1 = 0;
    let sectionH = 0;
    let L1 = 0; // length of panel-1 diagonal
    let L2 = 0; // length of horizontal seam
    let L3 = 0; // length of panel-2 diagonal

    // viewBox uses real pixel dimensions of the section so x and y stay in
    // the correct ratio (preserveAspectRatio="none" would otherwise distort
    // the diagonals). The SVG is pinned top:0 + bottom:0 in CSS so its
    // rendered box matches the section exactly.
    const measureAndBuildPath = () => {
      const panels = section.querySelectorAll<HTMLElement>(".ow-panel");
      if (panels.length < 2) return;
      h1 = panels[0].offsetHeight;
      const sectionW = section.offsetWidth;
      sectionH = section.offsetHeight;
      if (!h1 || !sectionH || !sectionW) return;
      const W = sectionW;
      const p1Top = W * 0.494;
      const p1Bot = W * 0.45;
      const p2Top = W * 0.55;
      const p2Bot = W * 0.506;
      const d = `M ${p1Top} 0 L ${p1Bot} ${h1} L ${p2Top} ${h1} L ${p2Bot} ${sectionH}`;
      svgEl.setAttribute("viewBox", `0 0 ${W} ${sectionH}`);
      pathEl.setAttribute("d", d);
      totalLength = pathEl.getTotalLength();
      pathEl.style.strokeDasharray = String(totalLength);
      // Per-segment lengths so drawing can be mapped to vertical y instead
      // of raw path length — this makes both panels draw at the same speed
      // in vertical pixels per scrolled pixel.
      L1 = Math.hypot(p1Top - p1Bot, h1);
      L2 = Math.abs(p2Top - p1Bot);
      L3 = Math.hypot(p2Top - p2Bot, sectionH - h1);
    };

    let targetDrawn = 0;
    let currentDrawn = 0;
    let rafId = 0;

    const compute = () => {
      if (!totalLength) measureAndBuildPath();
      if (!totalLength || !sectionH) return;
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;

      // Snap to fully-drawn the moment the next section after Our Work enters
      // view. That used to be #reviews, but the gallery/spotlight section now
      // sits immediately below Our Work, so use whichever comes first.
      const nextEl =
        document.getElementById("gallery") ||
        document.getElementById("reviews");
      if (nextEl && nextEl.getBoundingClientRect().top <= viewH) {
        targetDrawn = totalLength;
        return;
      }

      // Slow the draw down: stretch the active scroll range so the line
      // completes ~30% later than the section's bottom hitting viewH.
      const distance = viewH - rect.top;
      const totalScroll = sectionH * 1.3;
      const yProgress = Math.max(0, Math.min(distance / totalScroll, 1));
      const targetY = yProgress * sectionH;
      // Convert vertical y → drawn path length, accounting for the seam jog.
      if (targetY <= h1) {
        targetDrawn = (targetY / h1) * L1;
      } else {
        const yIn2 = targetY - h1;
        targetDrawn = L1 + L2 + (yIn2 / (sectionH - h1)) * L3;
      }
    };

    const animate = () => {
      // Smooth ease toward the scroll-driven target.
      currentDrawn += (targetDrawn - currentDrawn) * 0.1;
      if (Math.abs(targetDrawn - currentDrawn) < 0.5) currentDrawn = targetDrawn;
      pathEl.style.strokeDashoffset = String(totalLength - currentDrawn);
      if (currentDrawn !== targetDrawn) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = 0;
      }
    };

    const update = () => {
      compute();
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    const rebuildAndUpdate = () => { measureAndBuildPath(); update(); };

    requestAnimationFrame(rebuildAndUpdate);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", rebuildAndUpdate);

    // Rebuild whenever the section's measured size changes (image loads,
    // font swap, slide transitions, anything that might shift layout).
    const ro = new ResizeObserver(rebuildAndUpdate);
    ro.observe(section);
    section.querySelectorAll<HTMLElement>(".ow-panel").forEach(p => ro.observe(p));

    // Also rebuild after every image inside the section finishes loading.
    section.querySelectorAll<HTMLImageElement>("img").forEach(img => {
      if (!img.complete) img.addEventListener("load", rebuildAndUpdate, { once: true });
    });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", rebuildAndUpdate);
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  // Gold line path follows the diagonal clip-path edges of both panels
  // Panel 1: text is right side, clip starts at ~49% top to ~45% bottom
  // Horizontal bridge at the seam
  // Panel 2: text is left side, clip starts at ~55% top to ~51% bottom

  return (
    <div className="ow-dual" ref={sectionRef}>
      {/* Scroll-driven gold line following panel edges */}
      <svg ref={svgRef} className="ow-gold-line-svg" viewBox="0 0 1000 1040">
        <path
          ref={lineRef}
          d="M 494 0 L 450 520 L 550 520 L 506 1040"
          fill="none"
          stroke="#a8b0b8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Panel 1: service cards left, text right */}
      <OurWorkPanel
        serviceCards
        side="left"
        lang={lang}
        eyebrow={isAr ? "خدماتنا" : "SERVICES"}
        title={isAr ? "ما نقوم به" : <>WHAT WE <span className="gold-text">DO</span></>}
        subtitle={isAr
          ? "ما نقصّر، نحمي سيارتك"
          : "We don't cut corners, we protect them"}
      />

      {/* Panel 2: text left, cards right (mirrored) */}
      <OurWorkPanel
        cards={MOST_BOOKED_CARDS}
        side="right"
        lang={lang}
        eyebrow={isAr ? "الأسعار" : "PRICING"}
        title={isAr ? "الأكثر حجزاً" : <>MOST <span className="gold-text">BOOKED</span></>}
        subtitle={isAr
          ? "الباقات اللي عملاءنا يرجعون لها دايم"
          : "The packages our clients keep coming back for"}
        ctaText={isAr ? "عرض الأسعار" : "VIEW PRICING"}
        ctaLink="/packages"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);


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

  // ─── Sync with SiteHeader lang toggle + restore from localStorage ───
  useEffect(() => {
    const saved = localStorage.getItem("dpkw-lang") as Lang | null;
    if (saved === "ar") setLang("ar");

    const handler = (e: Event) => {
      const next = (e as CustomEvent).detail as Lang;
      setLang(next);
    };
    window.addEventListener("lang-change", handler);
    return () => window.removeEventListener("lang-change", handler);
  }, []);

  // ─── Scroll handler (header + booking strip + reveal + hero parallax) ───
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setHeaderScrolled(scrollY > 50);


      // Hero parallax: zoom out bg + fade out content
      const hero = heroRef.current;
      if (hero) {
        const heroH = hero.offsetHeight;
        const progress = Math.min(scrollY / heroH, 1); // 0 at top, 1 when hero scrolled past

        const bgImg = hero.querySelector(".hero-bg-image") as HTMLElement;
        const content = hero.querySelector(".hero-content") as HTMLElement;
        const overlays = hero.querySelectorAll(".hero-bg-beams, .hero-prism-wrap, .hero-gradient, .hero-vignette, .hero-bg-noise");

        if (bgImg) {
          // Start zoomed in (1.15), zoom out to 1.0 as you scroll
          const scale = 1.15 - progress * 0.15;
          bgImg.style.transform = `scale(${scale})`;
          bgImg.style.opacity = String(0.4 - progress * 0.35);
        }
        if (content) {
          content.style.opacity = String(1 - progress * 1.5);
          content.style.transform = `translateY(${progress * -60}px)`;
        }
        overlays.forEach((el) => {
          (el as HTMLElement).style.opacity = String(1 - progress * 1.2);
        });
      }

      // Reveal
      document.querySelectorAll(".reveal:not(.revealed)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          el.classList.add("revealed");
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─── Close mobile menu on nav click ───
  const handleNavClick = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);





  // ─── Marquee items (doubled for infinite scroll) ───


  /* ═══════════════════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════════════════ */
  return (
    <>

      {/* ─── HERO ─── */}
      <section className="hero" id="hero" ref={heroRef}>
        {/* Background video */}
        <video
          className="hero-bg-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />

        {/* Layered atmospheric backgrounds */}
        <div className="hero-bg-noise" />
        <div className="hero-gradient" />
        <div className="hero-vignette" />

        {/* Champagne bubbles */}
        <div className="hero-bubbles" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <span key={i} className="hero-bubble" style={{
              left: `${8 + Math.random() * 84}%`,
              animationDuration: `${6 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 10}s`,
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              opacity: 0.15 + Math.random() * 0.2,
            }} />
          ))}
        </div>


        <div className="hero-content hero-centered">
          <h1 className="hero-title hero-reveal hero-reveal-1">
            <span className="hero-title-line">DIAMOND</span>
            <span className="hero-title-line hero-title-accent">PKW</span>
          </h1>

          <div className="hero-eyebrow hero-reveal hero-reveal-2">
            <span className="hero-eyebrow-line" />
            <span>{lang === "ar" ? "الكويت" : "KUWAIT"}</span>
            <span className="hero-eyebrow-diamond">◆</span>
            <span>{lang === "ar" ? "منذ ٢٠١٩" : "EST. 2019"}</span>
            <span className="hero-eyebrow-line" />
          </div>

          <p className="hero-slogan hero-reveal hero-reveal-3">
            {lang === "ar"
              ? "حيث يلتقي الكمال بالحماية"
              : "Where Perfection Meets Protection"}
          </p>

          <div className="hero-cta-group hero-reveal hero-reveal-4">
            <a
              href="https://wa.me/96595536344?text=Hi%20Diamond%20PKW%2C%20I'd%20like%20to%20book%20a%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="hero-whatsapp-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.486a.75.75 0 0 0 .921.921l4.452-1.495A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
              {lang === "ar" ? "احجز الآن" : "BOOK APPOINTMENT"}
            </a>
            <a href="/packages" className="hero-pricing-btn">
              {lang === "ar" ? "اسعارنا" : "VIEW PRICING"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Social proof strip */}
          <div className="proof-strip hero-reveal hero-reveal-5">
            <div className="proof-strip__inner">
              <svg className="proof-strip__google" width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#a8b0b8"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#8a929a"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#c8ced6"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#6e7680"/>
              </svg>
              <div className="proof-strip__rating">
                <span className="proof-strip__number">{lang === "ar" ? "٤٫٩" : "4.9"}</span>
                <div className="proof-strip__stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              <div className="proof-strip__divider" />
              <span className="proof-strip__text">{lang === "ar" ? "١٥٠+ تقييم على جوجل" : "150+ reviews on Google"}</span>
              <div className="proof-strip__divider" />
              <a href="https://www.google.com/maps/place/Diamond+protection/" target="_blank" rel="noopener noreferrer" className="proof-strip__link">
                {lang === "ar" ? "اقرأ التقييمات" : "READ REVIEWS"}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </a>
            </div>
          </div>

        </div>

      </section>

      {/* ─── OUR WORK SECTION ─── */}
      <section className="ourwork-section">
        <OurWorkSection lang={lang} />
      </section>

      {/* Divider: Pricing → Gallery */}
      <div className="section-divider reveal" />

      {/* Shared gradient wrapper for Gallery + Reviews */}
      <div className="sweep-bg">

      {/* ─── SPOTLIGHT / GALLERY SECTION ─── */}
      <section className="section spotlight-section" id="gallery">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="line" />
            {lang === "ar" ? "المعرض" : "GALLERY"}
            <span className="line" />
          </div>
          <h2 className="section-title">
            {lang === "ar" ? <>أعمالنا <span className="gold-text">المميزة</span></> : <>OUR <span className="gold-text">WORK</span></>}
          </h2>
          <p className="section-subtitle">
            {lang === "ar"
              ? "شاهد عينات من أعمالنا بمعايير دايموند عبر الإنترنت"
              : "View samples online of our Diamond standard work"}
          </p>
        </div>

        <div className="spotlight-title reveal">
          <span className="spotlight-title-line" />
          <span>{lang === "ar" ? "أعمال مختارة" : "SPOTLIGHT WORK"}</span>
          <span className="spotlight-title-line" />
        </div>

        <SpotlightCards />

        <div className="spotlight-cta reveal">
          <a href="#gallery" className="spotlight-btn">
            {lang === "ar" ? "عرض المعرض" : "VIEW GALLERY"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Divider: Gallery → Reviews */}
      <div className="section-divider reveal" />

      {/* ─── REVIEWS SECTION ─── */}
      <section className="section reviews-marquee-section" id="reviews">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="line" />
            {lang === "ar" ? "آراء" : "REVIEWS"}
            <span className="line" />
          </div>
          <h2 className="section-title">
            {lang === "ar" ? <>ماذا يقول عملاؤنا</> : <>What Our Clients <span className="gold-text">Say</span></>}
          </h2>
          <p className="section-subtitle">
            {lang === "ar"
              ? "تجارب حقيقية من عملاء حقيقيين يثقون بنا في سياراتهم"
              : "Real experiences from real clients who trust us with their vehicles"}
          </p>
        </div>
        <div className="reveal" style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
          <StatCards lang={lang} />
        </div>

        <div className="reviews-marquee-wrap">
          {/* Row 1 */}
          <div className="reviews-marquee-row reviews-marquee-row-1">
            <div className="reviews-marquee-track">
              {[...REVIEWS.slice(0, 6), ...REVIEWS.slice(0, 6)].map((review, i) => (
                <div className="review-card-compact" key={i}>
                  <div className="review-stars-compact">
                    {Array.from({ length: 5 }, (_, j) => (
                      <span key={j} style={{ color: j < review.stars ? "var(--gold)" : "rgba(255,255,255,0.12)" }}>&#9733;</span>
                    ))}
                  </div>
                  <p>&ldquo;{review.text}&rdquo;</p>
                  <div className="review-author-compact">
                    <span className="review-avatar-compact">{review.initial}</span>
                    <span className="review-name-compact">{review.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Row 2 */}
          <div className="reviews-marquee-row reviews-marquee-row-2">
            <div className="reviews-marquee-track">
              {[...REVIEWS.slice(6), ...REVIEWS.slice(6)].map((review, i) => (
                <div className="review-card-compact" key={i}>
                  <div className="review-stars-compact">
                    {Array.from({ length: 5 }, (_, j) => (
                      <span key={j} style={{ color: j < review.stars ? "var(--gold)" : "rgba(255,255,255,0.12)" }}>&#9733;</span>
                    ))}
                  </div>
                  <p>&ldquo;{review.text}&rdquo;</p>
                  <div className="review-author-compact">
                    <span className="review-avatar-compact">{review.initial}</span>
                    <span className="review-name-compact">{review.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      </div>
      {/* /sweep-bg wrapper */}

      {/* Divider: Reviews → Contact */}
      <div className="section-divider reveal" />

      {/* ─── CONTACT SECTION ─── */}
      <section className="section" id="contact">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="line" />
            {lang === "ar" ? "تواصل" : "CONTACT"}
            <span className="line" />
          </div>
          <h2 className="section-title">
            {lang === "ar" ? "احجز زيارتك" : <>BOOK YOUR <span className="gold-text">VISIT</span></>}
          </h2>
          <div className="contact-actions reveal">
            <a href="/contact" className="contact-btn contact-btn-primary">
              {lang === "ar" ? "احجز عبر الإنترنت" : "BOOK ONLINE"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="https://wa.me/96595536344"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn contact-btn-ghost"
            >
              {lang === "ar" ? "اتصل بنا" : "CONTACT US"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Info blocks (left) + Map (right) */}
        <div className="contact-layout reveal">
          <div className="contact-info-col">
            <div className="contact-info-block">
              <div className="contact-info-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h4>{lang === "ar" ? "ساعات العمل" : "Opening Hours"}</h4>
              <p>
                {lang === "ar" ? "السبت – الخميس" : "Sat – Thu"}
                <br />
                {lang === "ar" ? "٩:٠٠ صباحاً — ٨:٠٠ مساءً" : "9:00 AM — 8:00 PM"}
              </p>
            </div>
            <div className="contact-info-block">
              <div className="contact-info-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h4>{lang === "ar" ? "الهاتف" : "Phone Numbers"}</h4>
              <p>
                <a href="tel:+96595536344">{lang === "ar" ? "+٩٦٥ ٩٥٥٣ ٦٣٤٤" : "+965 9553 6344"}</a>
                <br />
                <a href="tel:+96595539114">{lang === "ar" ? "+٩٦٥ ٩٥٥٣ ٩١١٤" : "+965 9553 9114"}</a>
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/ur5bt2FnjcnQxq91A"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-block"
              style={{ textDecoration: "none" }}
            >
              <div className="contact-info-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h4>{lang === "ar" ? "الموقع" : "Location"}</h4>
              <p>{lang === "ar" ? "شارع ١٦، مدينة الكويت" : "16 St, Kuwait City"}</p>
            </a>
          </div>

          <a
            href="https://maps.app.goo.gl/ur5bt2FnjcnQxq91A"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-map"
            style={{ display: "block", textDecoration: "none" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3478.0!2d47.9374304!3d29.3068046!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9badf21eb609%3A0x98209be21c50f629!2sDiamond%20protection!5e0!3m2!1sen!2skw!4v1700000000000"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Diamond PKW Location"
              style={{ pointerEvents: "none" }}
            />
          </a>
        </div>
      </section>


      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <img src="/diamond_logo_transparent.png" alt="Diamond PKW" className="footer-logo" />
              <h3 className="footer-brand-name">DIAMOND PKW</h3>
            </div>
            <p className="footer-brand-tagline">
              {lang === "ar" ? "حيث يلتقي الإتقان بالحماية" : "Where Perfection Meets Protection"}
            </p>
            <div className="footer-socials">
              <a href="https://wa.me/96595536344" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.486a.75.75 0 0 0 .921.921l4.452-1.495A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/diamond.pkw" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>
              <a href="https://www.google.com/maps/place/Diamond+protection/" target="_blank" rel="noopener noreferrer" aria-label="Google Maps">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>{t("footerQuickLinks")}</h4>
            <ul>
              <li><a href="#hero">{t("navHome")}</a></li>
              <li><a href="/services">{t("navServices")}</a></li>
              <li><a href="/packages">{t("navPackages")}</a></li>
              <li><a href="#gallery">{t("navGallery")}</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{lang === "ar" ? "قانوني" : "Legal"}</h4>
            <ul>
              <li><a href="#">{lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}</a></li>
              <li><a href="#">{lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}</a></li>
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
        </div>
      </footer>

      {/* ─── STICKY BOOKING STRIP ─── */}
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
