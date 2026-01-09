import { query } from './database';

const servicesData = [
  {
    slug: "private-equity",
    title: "Private Equity",
    subtitle: "Strategic Capital for Growth",
    description: "We provide strategic private equity investments to help businesses scale, optimize operations, and achieve market leadership. Our approach combines capital with operational expertise to drive sustainable growth.",
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
    overview: "Our private equity practice focuses on growth-stage companies with strong fundamentals and clear expansion potential. We partner with management teams to implement strategic initiatives, operational improvements, and market expansion strategies that create long-term value.",
    capabilities: [
      "Growth Capital Investments",
      "Buyout Transactions",
      "Minority & Majority Stakes",
      "Portfolio Company Optimization",
      "Exit Strategy Planning",
      "Value Creation Initiatives"
    ],
    approach: [
      {
        title: "Investment Sourcing",
        description: "We identify opportunities through our extensive network across Africa, Asia, and the Middle East, focusing on sectors with strong growth potential and favorable market dynamics."
      },
      {
        title: "Due Diligence",
        description: "Comprehensive analysis of financial performance, market position, competitive landscape, and management capabilities to ensure investment quality and alignment with our strategy."
      },
      {
        title: "Value Creation",
        description: "Post-investment, we work closely with management teams to implement strategic initiatives, operational improvements, and growth strategies that drive measurable results."
      },
      {
        title: "Exit Planning",
        description: "We develop clear exit strategies from the outset, whether through strategic sales, IPOs, or secondary transactions, ensuring optimal returns for all stakeholders."
      }
    ],
    stats: [
      { value: "$2.5B+", label: "Assets Under Management" },
      { value: "45+", label: "Portfolio Companies" },
      { value: "28%", label: "Average IRR" },
      { value: "12", label: "Years of Experience" }
    ],
    icon: "TrendingUp",
    orderIndex: 1,
    published: true
  },
  {
    slug: "venture-capital",
    title: "Venture Capital",
    subtitle: "Fueling Innovation & Entrepreneurship",
    description: "We invest in early and growth-stage technology companies with disruptive potential. Our venture capital practice supports innovative entrepreneurs building solutions for emerging markets.",
    heroImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200",
    overview: "Our venture capital arm focuses on technology-enabled businesses in fintech, healthtech, edtech, and enterprise software. We provide not just capital, but strategic guidance, network access, and operational support to help startups scale successfully.",
    capabilities: [
      "Seed & Series A Investments",
      "Growth Stage Funding",
      "Strategic Mentorship",
      "Network & Partnership Access",
      "Go-to-Market Support",
      "Follow-on Investment Management"
    ],
    approach: [
      {
        title: "Sector Focus",
        description: "We concentrate on high-growth sectors where we have deep expertise: financial technology, healthcare innovation, education technology, and enterprise software solutions."
      },
      {
        title: "Founder Partnership",
        description: "We work as true partners with founders, providing strategic guidance, operational expertise, and access to our network of customers, partners, and advisors."
      },
      {
        title: "Market Expansion",
        description: "We help portfolio companies expand across emerging markets, leveraging our regional presence and understanding of local market dynamics and regulatory environments."
      },
      {
        title: "Value-Add Support",
        description: "Beyond capital, we provide hands-on support in areas like product development, customer acquisition, talent recruitment, and strategic partnerships."
      }
    ],
    stats: [
      { value: "$850M+", label: "Venture Capital Deployed" },
      { value: "120+", label: "Portfolio Companies" },
      { value: "15", label: "Unicorns Created" },
      { value: "35%", label: "Success Rate" }
    ],
    icon: "Rocket",
    orderIndex: 2,
    published: true
  },
  {
    slug: "real-estate-investment",
    title: "Real Estate Investment",
    subtitle: "Building Value Through Strategic Property Development",
    description: "We identify and develop high-potential real estate opportunities across commercial, residential, and mixed-use sectors. Our expertise spans the entire development lifecycle from acquisition to asset management.",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
    overview: "Our real estate investment practice focuses on strategic property development and acquisition in high-growth markets. We combine deep market knowledge with financial expertise to create value through development, repositioning, and active asset management.",
    capabilities: [
      "Commercial Real Estate Development",
      "Residential Development",
      "Mixed-Use Projects",
      "Property Acquisition & Disposition",
      "Asset Management",
      "Real Estate Fund Management"
    ],
    approach: [
      {
        title: "Market Analysis",
        description: "Comprehensive analysis of demographic trends, economic indicators, and supply-demand dynamics to identify high-potential investment opportunities."
      },
      {
        title: "Development Execution",
        description: "End-to-end project management from land acquisition through design, construction, and leasing, ensuring quality delivery on time and within budget."
      },
      {
        title: "Asset Optimization",
        description: "Active management of properties to maximize value through strategic improvements, tenant mix optimization, and operational efficiency enhancements."
      },
      {
        title: "Exit Strategy",
        description: "Strategic timing of asset sales or refinancing to optimize returns, whether through direct sales, portfolio transactions, or REIT listings."
      }
    ],
    stats: [
      { value: "$1.8B+", label: "Real Estate Assets Managed" },
      { value: "85+", label: "Projects Completed" },
      { value: "22%", label: "Average ROI" },
      { value: "15M+", label: "Square Feet Developed" }
    ],
    icon: "Building",
    orderIndex: 3,
    published: true
  },
  {
    slug: "infrastructure-finance",
    title: "Infrastructure Finance",
    subtitle: "Powering Economic Growth Through Infrastructure",
    description: "We finance and develop critical infrastructure projects that drive economic growth and improve quality of life. Our focus includes energy, transportation, telecommunications, and social infrastructure.",
    heroImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200",
    overview: "Infrastructure development is fundamental to economic growth. We structure and finance large-scale infrastructure projects, working with governments, development finance institutions, and private sector partners to deliver critical infrastructure.",
    capabilities: [
      "Project Finance Structuring",
      "Public-Private Partnerships (PPP)",
      "Energy Infrastructure",
      "Transportation Projects",
      "Telecommunications Infrastructure",
      "Social Infrastructure Development"
    ],
    approach: [
      {
        title: "Project Identification",
        description: "We identify infrastructure projects with strong economic and social impact potential, focusing on sectors that drive long-term economic growth and development."
      },
      {
        title: "Financial Structuring",
        description: "Complex financial structuring that combines various funding sources including equity, debt, development finance, and government support to make projects financially viable."
      },
      {
        title: "Risk Management",
        description: "Comprehensive risk assessment and mitigation strategies covering construction, operational, regulatory, and financial risks to ensure project success."
      },
      {
        title: "Stakeholder Management",
        description: "Coordination with multiple stakeholders including governments, regulators, communities, and contractors to ensure smooth project execution and long-term sustainability."
      }
    ],
    stats: [
      { value: "$3.2B+", label: "Infrastructure Projects Financed" },
      { value: "28", label: "Major Projects" },
      { value: "2.5M+", label: "People Impacted" },
      { value: "45,000+", label: "Jobs Created" }
    ],
    icon: "Zap",
    orderIndex: 4,
    published: true
  },
  {
    slug: "mergers-acquisitions",
    title: "Mergers & Acquisitions",
    subtitle: "Strategic Transactions for Business Growth",
    description: "We advise on and execute strategic M&A transactions that create value for our clients. Our expertise spans cross-border deals, industry consolidation, and strategic partnerships.",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
    overview: "Our M&A practice helps companies achieve strategic objectives through mergers, acquisitions, divestitures, and joint ventures. We provide end-to-end transaction support from strategy to integration.",
    capabilities: [
      "Merger & Acquisition Advisory",
      "Divestiture Services",
      "Joint Venture Structuring",
      "Cross-Border Transactions",
      "Due Diligence",
      "Post-Merger Integration"
    ],
    approach: [
      {
        title: "Strategic Planning",
        description: "We work with clients to define M&A strategy aligned with business objectives, identifying target companies or assets that create strategic value and competitive advantage."
      },
      {
        title: "Transaction Execution",
        description: "End-to-end transaction management including valuation, negotiation, due diligence, and deal structuring to ensure optimal outcomes for our clients."
      },
      {
        title: "Integration Planning",
        description: "Comprehensive integration planning to ensure smooth post-transaction execution, capturing synergies and maintaining business continuity."
      },
      {
        title: "Value Realization",
        description: "Ongoing support post-transaction to ensure value creation through successful integration, operational improvements, and strategic initiatives."
      }
    ],
    stats: [
      { value: "$5.8B+", label: "Transaction Value" },
      { value: "95+", label: "Transactions Completed" },
      { value: "18", label: "Countries" },
      { value: "92%", label: "Client Satisfaction" }
    ],
    icon: "Handshake",
    orderIndex: 5,
    published: true
  },
  {
    slug: "advisory-services",
    title: "Strategic Advisory",
    subtitle: "Expert Guidance for Complex Business Decisions",
    description: "We provide strategic advisory services to help businesses navigate complex challenges and capitalize on opportunities. Our team brings deep industry expertise and analytical rigor to every engagement.",
    heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
    overview: "Our advisory practice helps clients make informed strategic decisions through rigorous analysis, market insights, and industry expertise. We work across sectors to provide actionable recommendations that drive results.",
    capabilities: [
      "Strategic Planning",
      "Market Entry Strategy",
      "Financial Restructuring",
      "Operational Improvement",
      "Digital Transformation",
      "Regulatory Compliance"
    ],
    approach: [
      {
        title: "Problem Definition",
        description: "We begin by deeply understanding the client's challenge, objectives, and context to ensure our recommendations are tailored and actionable."
      },
      {
        title: "Analysis & Research",
        description: "Rigorous data analysis, market research, and benchmarking to develop evidence-based insights and recommendations."
      },
      {
        title: "Solution Development",
        description: "Collaborative development of strategic solutions that balance ambition with feasibility, incorporating client input and industry best practices."
      },
      {
        title: "Implementation Support",
        description: "Ongoing support during implementation to ensure successful execution and adaptation as circumstances evolve."
      }
    ],
    stats: [
      { value: "200+", label: "Advisory Engagements" },
      { value: "15", label: "Industry Sectors" },
      { value: "98%", label: "Client Retention" },
      { value: "25+", label: "Senior Advisors" }
    ],
    icon: "Briefcase",
    orderIndex: 6,
    published: true
  }
];

export async function seedServices() {
  console.log('🌱 Seeding services...');
  
  try {
    for (const service of servicesData) {
      const id = `service_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      await query(`
        INSERT INTO services (
          id, slug, title, subtitle, description, hero_image, overview,
          capabilities, approach, stats, icon, order_index, published
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT (slug) DO NOTHING
      `, [
        id,
        service.slug,
        service.title,
        service.subtitle,
        service.description,
        service.heroImage,
        service.overview,
        JSON.stringify(service.capabilities),
        JSON.stringify(service.approach),
        JSON.stringify(service.stats),
        service.icon,
        service.orderIndex,
        service.published
      ]);
    }
    
    console.log(`✅ Seeded ${servicesData.length} services`);
  } catch (error) {
    console.error('❌ Error seeding services:', error);
    throw error;
  }
}

