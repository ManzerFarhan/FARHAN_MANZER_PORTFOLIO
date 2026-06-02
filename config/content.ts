export const content = {
  hero: {
    name: "Mohd Farhan Manzer",
    tagline: "BUILDING AI SYSTEMS FOR REAL WORLD.",
  },
  about: {
    title: "About Me",
    description: "I'm an Artificial Intelligence and Data Science student based in New Delhi, turning machine learning research into solutions that actually work in the real world. I've won a national hackathons across Artificial Intelligence , Machine Learning , and Computer Vision building a solution in the field of Healthcare. Outside the terminal, I've led 300+ volunteers at a college fest with 5,000+ footfall, and run a campus media house reaching 200k+ Instagram impressions. I build things that matter, and I lead the people who build them with me, because great engineers build teams, not just code.",
    image: "/right.png",
    achievements: [
      "Led development of multiple high-traffic web applications",
      "Award-winning interactive portfolio design",
      "Contributor to open-source UI libraries",
    ],
    timeline: [
      { year: "2024", role: "Senior Frontend Engineer", company: "TechCorp" },
      { year: "2022", role: "UI/UX Developer", company: "DesignStudio" },
      { year: "2020", role: "Web Developer", company: "Freelance" },
    ],
  },
  skills: [
    "Python", "SQL", "HTML", "Google", "AWS", "Kaggle", "Vercel", 
    "Jupyter Notebook", "GitHub", "Power BI", "Excel", "PowerPoint", 
    "Editing", "VN", "CapCut", "Snapseed", "Photography", "Videography", 
    "Leadership", "Teamwork", "Team Management"
  ],
  projects: [
    {
      id: 1,
      title: "PREDICT WELL AI",
      category: "HEALTHCARE · ML",
      description: "End-to-end ML system predicting diabetes from blood test data with 88% accuracy. Automated PDF extraction, anomaly detection, and normalization — classified using SVM on the PIMA dataset.",
      image: "/PP1.png",
      link: "/BLOOD TEST .pdf",
      github: "https://github.com/ManzerFarhan/Predict-Well-AI",
      tags: ["Python", "SVM", "Scikit-learn", "Pandas"],
    },
    {
      id: 2,
      title: "FIZIO AI",
      category: "COMPUTER VISION",
      description: "Real-time posture assistant using MediaPipe — detects joint misalignments, counts reps, and gives live corrective feedback through a camera.",
      image: "/PP2.jpeg",
      link: "/FIZIO.pdf",
      github: "https://github.com/ManzerFarhan/POSTURE-ANALYSIS-SYSTEM",
      tags: ["OpenCV", "MediaPipe", "Real-time analysis"],
    },
    {
      id: 3,
      title: "CRYPTO MARKET ML",
      category: "FINANCE · FORECASTING",
      description: "5 years of Bitcoin data. Two models stress-tested against real volatility. Linear Regression hit R² of 0.928. Random Forest revealed the hard limits of tree-based models on time-series. The gap between them was the real finding.",
      image: "/PP3.jpeg",
      link: "/CRYPTO.pdf",
      github: "https://github.com/ManzerFarhan/Crypto_Price_Analysis",
      tags: ["Python", "Linear Regression", "Random Forest", "LSTM", "EDA"],
      stats: [
        { label: "R² SCORE", value: "0.928" },
        { label: "DATASET", value: "5 YRS BTC" }
      ]
    },
  ],
  events: [
    {
      id: 1,
      title: "Zero to One Hackathon",
      date: "Winner",
      description: "Built an AI-driven solution that won first place and earned a ticket to the Campus Tank finale.",
      images: [
        "/P1.jpg",
        "/P2.png",
        "/P3.png",
        "/P4.png",
        "/P5.png",
        "/P6.png",
        "/P7.jpg",
        "/P8.png",
        "/P9.jpg"
      ]
    },
    {
      id: 2,
      title: "AI Impact Summit",
      date: "Speaker & Exhibitor",
      description: "Represented and demoed our project to 1,000+ attendees within 5hrs at AI summit stall.",
      images: [
        "/A1.jpg",
        "/A2.jpg",
        "/A3.jpg",
        "/A4.jpg",
        "/A5.jpg",
        "/A6.jpg",
        "/A7.jpg",
        "/A8.jpg"
      ]
    },
    {
      id: 3,
      title: "The Campus Chronicles",
      date: "Vice President",
      description: "Led the Official Media House as a Vice President and got a reach of 200k+ Instagram impressions.",
      images: [
        "/T1.jpg",
        "/T2.jpg",
        "/T3.jpg",
        "/T4.jpg",
        "/T5.jpg",
        "/T6.JPG",
        "/T7.jpg",
        "/T8.jpg",
        "/T9.jpg",
        "/T10.jpg",
        "/T11.jpg",
        "/T12.jpg",
        "/T13.jpg"
      ]
    },
    {
      id: 4,
      title: "Tales Factory",
      date: "SEASON 3",
      description: "Creative content platform and digital storytelling collective publishing curated anthologies, campus narratives, and student-run media productions.",
      images: [
        "/S1.jpg",
        "/S2.png",
        "/S3.jpg",
        "/S4.jpg",
        "/S5.jpg",
        "/S6.HEIC",
        "/S7.jpg",
        "/S8.JPG",
        "/S9.jpg",
        "/S10.jpg"
      ]
    },
    {
      id: 5,
      title: "UTKARSH",
      date: "ADDITIONAL GEN SEC",
      description: "Managed 300+ volunteers, handled headliners, stage flow, and coordinated large-scale events for the Annual Techno-Cultural Fest with 5,000+ footfall.",
      images: [
        "/U1.jpg",
        "/U2.jpg",
        "/U3.jpg",
        "/U4.jpg",
        "/U5.jpg",
        "/U6.jpeg",
        "/U7.jpg",
        "/U8.jpg",
        "/U9.jpg",
        "/U10.jpg",
        "/U11.jpg",
        "/U12.heif",
        "/U13.jpg",
        "/U14.JPG",
        "/U15.jpg",
        "/U16.jpg",
        "/U17.jpg",
        "/U18.jpg",
        "/U19.jpg",
        "/U20.jpg",
        "/U21.jpg",
        "/U22.JPG"
      ]
    }
  ],
  news: [
    {
      id: 1,
      title: "Students Win National Hackathon with AI-Driven Solution",
      description: "Featured for securing 1st place among 600+ teams at Chandigarh University's Zero-to-One Hackathon.",
      link: "https://www.aninews.in/news/business/400-young-innovators-from-15-states-compete-in-north-indias-largest-university-led-hackathon-at-cu20250822164123/",
      source: "ANI NEWS · NATIONAL WIRE",
      watermark: "ANI"
    },
    {
      id: 2,
      title: "AI Innovators Making Waves at the National Level",
      description: "Covered alongside the hackathon win — recognized for building a real-world AI solution that stood out.",
      link: "https://madeinmedia.in/400-young-innovators-compete-in-chandigarh-universitys-zero-to-one-hackathon/",
      source: "MADEINMEDIA · DIGITAL FEATURE",
      watermark: "MIM"
    },
    {
      id: 3,
      title: "From Campus to National Stage — Meet the Winners",
      description: "Highlighted for the Zero-to-One win and Runner-Up finish at HackLLM, IIIT Delhi.",
      link: "https://insysdnet.com/business_updates/400-young-innovators-from-15-states-compete-in-north-indias-largest-university-led-hackathon-at-cu/",
      source: "INSYSDNET · TECH MEDIA",
      watermark: "INS"
    }
  ],
  socials: {
    github: "https://github.com/ManzerFarhan",
    linkedin: "https://www.linkedin.com/in/mohd-farhan-manzer-9050b5203?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/manzer_farhan?igsh=aWs5NzV6OXVxYmI3",
    email: "mailto:farhanmanzer68@gmail.com",
    resume: "/resume"
  },
};
