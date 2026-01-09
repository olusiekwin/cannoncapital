import { query } from './database';

// Diverse professional names and contacts
const projectData = [
  {
    title: "Nairobi Tech Hub Expansion",
    category: "Real Estate Development",
    value: "$45M",
    status: "Active",
    duration: "18 months",
    location: "Nairobi, Kenya",
    description: "A comprehensive expansion project for a state-of-the-art technology hub in Westlands, Nairobi. This project includes modern office spaces, innovation labs, and collaborative workspaces designed to attract leading tech companies and startups.",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
    challenge: "The client needed to expand their existing tech hub to accommodate growing demand from international tech companies looking to establish operations in East Africa. Challenges included zoning regulations, infrastructure requirements, and maintaining operations during construction.",
    strategy: "We developed a phased approach that allowed for continuous operations while expanding capacity. This included strategic partnerships with local contractors, comprehensive stakeholder management, and innovative financing structures that minimized risk.",
    outcomes: [
      "Increased capacity by 300% with minimal disruption to existing operations",
      "Attracted 15+ international tech companies as anchor tenants",
      "Created 2,500+ direct and indirect employment opportunities",
      "Achieved LEED Gold certification for sustainable building practices"
    ],
    tools: [
      "Project Management Software",
      "Financial Modeling Tools",
      "Stakeholder Management Platform",
      "Risk Assessment Framework"
    ],
    isActive: true,
    published: true
  },
  {
    title: "Lagos Port Infrastructure Modernization",
    category: "Infrastructure",
    value: "$120M",
    status: "Completed",
    duration: "24 months",
    location: "Lagos, Nigeria",
    description: "Modernization of critical port infrastructure to increase capacity and efficiency. This project involved upgrading cargo handling systems, implementing digital logistics solutions, and expanding container storage facilities.",
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200",
    challenge: "The port was operating at 95% capacity with outdated infrastructure causing significant delays. The modernization needed to be completed without disrupting ongoing operations, which handle over $50B in trade annually.",
    strategy: "Implemented a modular upgrade approach with parallel systems, allowing seamless transition. Coordinated with multiple government agencies and international shipping companies to ensure minimal disruption.",
    outcomes: [
      "Increased port capacity by 60%",
      "Reduced average cargo processing time by 45%",
      "Enhanced digital infrastructure for real-time tracking",
      "Created 3,200+ jobs during construction and operations"
    ],
    tools: [
      "Port Management Systems",
      "Logistics Optimization Software",
      "Supply Chain Analytics",
      "Digital Twin Technology"
    ],
    isActive: false,
    published: true
  },
  {
    title: "Mumbai Financial District Redevelopment",
    category: "Real Estate Development",
    value: "$280M",
    status: "Active",
    duration: "36 months",
    location: "Mumbai, India",
    description: "Comprehensive redevelopment of a 15-acre financial district, transforming it into a modern mixed-use development with commercial towers, luxury residences, and retail spaces. The project aims to establish Mumbai as a premier financial hub in Asia.",
    heroImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200",
    challenge: "Redeveloping a densely populated area with existing businesses and residents required careful planning, extensive community engagement, and innovative relocation strategies. Regulatory approvals from multiple agencies added complexity.",
    strategy: "Developed a comprehensive stakeholder engagement plan with transparent communication. Created phased relocation programs with financial assistance. Leveraged public-private partnership models to share risks and benefits.",
    outcomes: [
      "Secured all regulatory approvals within 8 months",
      "Successfully relocated 450+ businesses with 98% satisfaction rate",
      "Attracted $150M in pre-commitments from anchor tenants",
      "Implemented sustainable design achieving 40% energy reduction"
    ],
    tools: [
      "BIM (Building Information Modeling)",
      "Stakeholder Engagement Platform",
      "Financial Structuring Tools",
      "Environmental Impact Assessment Software"
    ],
    isActive: true,
    published: true
  },
  {
    title: "Johannesburg Renewable Energy Park",
    category: "Energy & Utilities",
    value: "$85M",
    status: "Completed",
    duration: "20 months",
    location: "Johannesburg, South Africa",
    description: "Development of a 150MW solar and wind energy park to provide clean energy to the greater Johannesburg metropolitan area. The project includes energy storage systems and smart grid integration.",
    heroImage: "https://images.unsplash.com/photo-1509391366360-2e959fcaeec0?w=1200",
    challenge: "South Africa's energy crisis required rapid deployment while navigating complex regulatory environment and securing long-term power purchase agreements. The project needed to be financially viable while contributing to national energy security.",
    strategy: "Structured innovative financing combining development finance, private equity, and government incentives. Partnered with leading renewable energy technology providers to ensure optimal performance and reliability.",
    outcomes: [
      "Generated 150MW of clean energy, powering 120,000+ homes",
      "Reduced carbon emissions by 180,000 tons annually",
      "Created 800+ jobs during construction and 150 permanent positions",
      "Achieved 98.5% uptime in first year of operations"
    ],
    tools: [
      "Energy Management Systems",
      "Financial Modeling Software",
      "Project Management Tools",
      "Grid Integration Technology"
    ],
    isActive: false,
    published: true
  },
  {
    title: "Singapore FinTech Innovation Center",
    category: "Technology Infrastructure",
    value: "$65M",
    status: "Active",
    duration: "15 months",
    location: "Singapore",
    description: "Development of a cutting-edge FinTech innovation center in the heart of Singapore's financial district. The facility will house startups, established financial institutions, and regulatory sandbox environments.",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
    challenge: "Creating a facility that meets the unique needs of FinTech companies while ensuring regulatory compliance and security standards. The center needed to attract both local and international companies.",
    strategy: "Collaborated with Monetary Authority of Singapore (MAS) to design regulatory-compliant infrastructure. Incorporated flexible workspace designs and state-of-the-art security systems. Developed partnership programs with leading financial institutions.",
    outcomes: [
      "Pre-leased 70% of space to 25+ FinTech companies",
      "Established regulatory sandbox partnerships with MAS",
      "Created 1,200+ tech jobs",
      "Positioned Singapore as leading FinTech hub in Asia-Pacific"
    ],
    tools: [
      "Smart Building Management Systems",
      "Cybersecurity Infrastructure",
      "Regulatory Compliance Software",
      "Innovation Management Platforms"
    ],
    isActive: true,
    published: true
  },
  {
    title: "Cairo Smart City Development",
    category: "Urban Development",
    value: "$350M",
    status: "Active",
    duration: "48 months",
    location: "Cairo, Egypt",
    description: "Development of a new smart city district on the outskirts of Cairo, featuring integrated technology infrastructure, sustainable design, and modern amenities. The project aims to create a model for future urban development in the region.",
    heroImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200",
    challenge: "Creating a sustainable, technologically advanced city district in a challenging desert environment. The project required innovative solutions for water management, energy efficiency, and transportation while maintaining affordability.",
    strategy: "Integrated smart city technologies from the ground up, including IoT sensors, AI-powered traffic management, and renewable energy systems. Partnered with leading technology companies and urban planning experts to create a holistic solution.",
    outcomes: [
      "Designed for 50,000+ residents with sustainable infrastructure",
      "Implemented smart water management reducing consumption by 40%",
      "Integrated renewable energy meeting 60% of district needs",
      "Created 8,000+ construction jobs and 5,000+ permanent positions"
    ],
    tools: [
      "Smart City Management Platform",
      "IoT Integration Systems",
      "Urban Planning Software",
      "Sustainability Analytics"
    ],
    isActive: true,
    published: true
  },
  {
    title: "Dubai Logistics Hub Expansion",
    category: "Logistics & Supply Chain",
    value: "$95M",
    status: "Completed",
    duration: "22 months",
    location: "Dubai, UAE",
    description: "Expansion of a major logistics hub to serve as a gateway for trade between Asia, Africa, and Europe. The project included automated warehouses, cold storage facilities, and advanced cargo handling systems.",
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200",
    challenge: "Dubai's strategic location required handling diverse cargo types with varying temperature requirements. The expansion needed to maintain 24/7 operations while doubling capacity and implementing automation.",
    strategy: "Phased implementation with parallel systems ensuring zero downtime. Integrated advanced automation and robotics for efficiency. Developed specialized facilities for pharmaceuticals, perishables, and high-value goods.",
    outcomes: [
      "Doubled handling capacity to 2.5M tons annually",
      "Reduced processing time by 50% through automation",
      "Established temperature-controlled zones for specialized cargo",
      "Created 1,500+ jobs with focus on technology skills"
    ],
    tools: [
      "Warehouse Management Systems",
      "Automated Material Handling",
      "Supply Chain Visibility Platforms",
      "Cold Chain Management Systems"
    ],
    isActive: false,
    published: true
  },
  {
    title: "Accra Affordable Housing Initiative",
    category: "Affordable Housing",
    value: "$42M",
    status: "Active",
    duration: "30 months",
    location: "Accra, Ghana",
    description: "Development of 2,500 affordable housing units across multiple sites in Accra. The project uses innovative construction techniques and sustainable materials to provide quality housing at accessible prices.",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
    challenge: "Providing quality affordable housing in a market with high construction costs and limited financing options. The project needed to be financially viable while remaining accessible to low and middle-income families.",
    strategy: "Partnered with government housing agencies to secure land and subsidies. Used modular construction techniques to reduce costs and construction time. Developed innovative financing models including rent-to-own options.",
    outcomes: [
      "Completed 1,200 units in Phase 1 with 100% occupancy",
      "Reduced construction costs by 30% through innovative techniques",
      "Created 1,800+ construction jobs and 200+ permanent positions",
      "Provided housing for 5,000+ residents"
    ],
    tools: [
      "Modular Construction Systems",
      "Project Management Software",
      "Financial Structuring Tools",
      "Community Engagement Platforms"
    ],
    isActive: true,
    published: true
  }
];

export async function seedProjects() {
  console.log('🌱 Seeding projects...');
  
  try {
    for (const project of projectData) {
      const id = `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      await query(`
        INSERT INTO projects (
          id, title, category, value, status, duration, location,
          description, hero_image, challenge, strategy, outcomes, tools,
          is_active, published
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        ON CONFLICT (id) DO NOTHING
      `, [
        id,
        project.title,
        project.category,
        project.value,
        project.status,
        project.duration,
        project.location,
        project.description,
        project.heroImage,
        project.challenge,
        project.strategy,
        JSON.stringify(project.outcomes),
        JSON.stringify(project.tools),
        project.isActive,
        project.published
      ]);
    }
    
    console.log(`✅ Seeded ${projectData.length} projects`);
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    throw error;
  }
}

