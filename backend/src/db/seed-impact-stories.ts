import { query } from './database';

const impactStoriesData = [
  {
    title: "Empowering Women Entrepreneurs in Rural Kenya",
    category: "Economic Empowerment",
    location: "Kisumu, Kenya",
    impact: "Transformed 500+ women-led businesses through microfinance and training programs",
    description: "Through our partnership with local microfinance institutions, we've provided capital and business training to over 500 women entrepreneurs in rural Kenya. These women have created sustainable businesses that support their families and communities, generating over $2.5M in annual revenue collectively.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200",
    metrics: [
      { label: "Women Entrepreneurs Supported", value: "500+" },
      { label: "Jobs Created", value: "1,200+" },
      { label: "Annual Revenue Generated", value: "$2.5M" },
      { label: "Communities Impacted", value: "25" }
    ],
    orderIndex: 1,
    published: true
  },
  {
    title: "Clean Water Initiative in Northern Nigeria",
    category: "Infrastructure Development",
    location: "Kano State, Nigeria",
    impact: "Provided clean water access to 50,000+ residents across 15 communities",
    description: "We funded the construction of 15 water treatment facilities and distribution networks in underserved communities in Northern Nigeria. This initiative has dramatically improved health outcomes, reduced waterborne diseases by 60%, and freed up time for education and economic activities, particularly for women and children who previously spent hours fetching water.",
    image: "https://images.unsplash.com/photo-1544376664-80b17f09d399?w=1200",
    metrics: [
      { label: "People Served", value: "50,000+" },
      { label: "Water Facilities Built", value: "15" },
      { label: "Disease Reduction", value: "60%" },
      { label: "Time Saved Daily", value: "4 hours" }
    ],
    orderIndex: 2,
    published: true
  },
  {
    title: "Tech Skills Training for Youth in Ghana",
    category: "Education & Training",
    location: "Accra, Ghana",
    impact: "Trained 2,000+ young people in digital skills, with 75% securing employment",
    description: "Our technology skills training program has equipped over 2,000 young Ghanaians with in-demand digital skills including software development, data analysis, and digital marketing. Partnering with local tech companies, we've created pathways to employment in the growing technology sector, with 75% of graduates securing jobs within 6 months of completion.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
    metrics: [
      { label: "Youth Trained", value: "2,000+" },
      { label: "Employment Rate", value: "75%" },
      { label: "Partner Companies", value: "45" },
      { label: "Average Salary Increase", value: "180%" }
    ],
    orderIndex: 3,
    published: true
  },
  {
    title: "Renewable Energy for Rural Schools in Tanzania",
    category: "Energy Access",
    location: "Arusha, Tanzania",
    impact: "Installed solar power systems in 30 schools, benefiting 12,000+ students",
    description: "We've installed solar power systems in 30 rural schools across Tanzania, providing reliable electricity for lighting, computer labs, and educational technology. This initiative has extended study hours, improved educational outcomes, and created opportunities for digital learning in communities previously without grid electricity.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959fcaeec0?w=1200",
    metrics: [
      { label: "Schools Powered", value: "30" },
      { label: "Students Benefited", value: "12,000+" },
      { label: "Solar Capacity", value: "450 kW" },
      { label: "CO2 Emissions Avoided", value: "180 tons/year" }
    ],
    orderIndex: 4,
    published: true
  },
  {
    title: "Healthcare Access Program in Rural India",
    category: "Healthcare",
    location: "Rajasthan, India",
    impact: "Established mobile health clinics serving 35,000+ patients annually",
    description: "Through our healthcare access initiative, we've funded mobile health clinics that bring medical services to remote villages in Rajasthan. These clinics provide primary healthcare, maternal and child health services, and health education, significantly improving health outcomes in communities with limited access to medical facilities.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200",
    metrics: [
      { label: "Patients Served Annually", value: "35,000+" },
      { label: "Mobile Clinics", value: "8" },
      { label: "Villages Covered", value: "120" },
      { label: "Health Screenings", value: "50,000+" }
    ],
    orderIndex: 5,
    published: true
  },
  {
    title: "Agricultural Innovation Hub in Ethiopia",
    category: "Agriculture & Food Security",
    location: "Addis Ababa, Ethiopia",
    impact: "Supported 1,500+ farmers with modern farming techniques and market access",
    description: "Our agricultural innovation hub connects smallholder farmers with modern farming techniques, quality inputs, and direct market access. Through training programs and technology adoption, participating farmers have increased yields by an average of 40% and improved their incomes by 65%, contributing to food security and economic stability in the region.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200",
    metrics: [
      { label: "Farmers Supported", value: "1,500+" },
      { label: "Yield Increase", value: "40%" },
      { label: "Income Improvement", value: "65%" },
      { label: "Hectares Under Improved Practices", value: "3,500" }
    ],
    orderIndex: 6,
    published: true
  },
  {
    title: "Financial Literacy Program in South Africa",
    category: "Financial Inclusion",
    location: "Cape Town, South Africa",
    impact: "Educated 8,000+ individuals in financial management and investment basics",
    description: "Our comprehensive financial literacy program has reached over 8,000 individuals in underserved communities, teaching essential skills in budgeting, saving, investing, and managing credit. Participants have shown significant improvements in financial decision-making, with 60% opening savings accounts and 45% starting small investment portfolios.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200",
    metrics: [
      { label: "People Educated", value: "8,000+" },
      { label: "Savings Accounts Opened", value: "4,800" },
      { label: "Investment Portfolios Started", value: "3,600" },
      { label: "Average Savings Increase", value: "85%" }
    ],
    orderIndex: 7,
    published: true
  },
  {
    title: "Affordable Housing Development in Senegal",
    category: "Housing",
    location: "Dakar, Senegal",
    impact: "Built 800 affordable housing units, providing homes for 3,200+ residents",
    description: "We've developed 800 affordable housing units in Dakar, addressing the critical need for quality, accessible housing. The project includes community facilities, green spaces, and sustainable design features. All units were sold at below-market rates to low and middle-income families, with flexible financing options including rent-to-own programs.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
    metrics: [
      { label: "Housing Units Built", value: "800" },
      { label: "Residents Housed", value: "3,200+" },
      { label: "Jobs Created", value: "450" },
      { label: "Affordability", value: "30% below market" }
    ],
    orderIndex: 8,
    published: true
  },
  {
    title: "Digital Connectivity for Remote Communities in Bangladesh",
    category: "Technology Access",
    location: "Dhaka, Bangladesh",
    impact: "Connected 25,000+ people in remote areas to high-speed internet",
    description: "Through infrastructure investment and partnerships with telecommunications providers, we've extended high-speed internet connectivity to remote communities in Bangladesh. This connectivity has enabled access to online education, telemedicine, e-commerce, and remote work opportunities, transforming economic prospects for thousands of families.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200",
    metrics: [
      { label: "People Connected", value: "25,000+" },
      { label: "Communities Served", value: "18" },
      { label: "Internet Speed", value: "50 Mbps" },
      { label: "Economic Impact", value: "$1.2M annually" }
    ],
    orderIndex: 9,
    published: true
  },
  {
    title: "Small Business Support Network in Morocco",
    category: "Economic Development",
    location: "Casablanca, Morocco",
    impact: "Supported 600+ small businesses with financing and mentorship",
    description: "Our small business support network provides financing, mentorship, and market access to entrepreneurs in Morocco. Through a combination of micro-loans, business training, and networking opportunities, we've helped 600+ businesses grow and create employment. The program has generated over 2,000 jobs and $8M in additional revenue for participating businesses.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200",
    metrics: [
      { label: "Businesses Supported", value: "600+" },
      { label: "Jobs Created", value: "2,000+" },
      { label: "Revenue Generated", value: "$8M" },
      { label: "Success Rate", value: "82%" }
    ],
    orderIndex: 10,
    published: true
  }
];

export async function seedImpactStories() {
  console.log('🌱 Seeding impact stories...');
  
  try {
    for (const story of impactStoriesData) {
      const id = `impact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      await query(`
        INSERT INTO impact_stories (
          id, title, category, location, impact, description, image, metrics, order_index, published
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (id) DO NOTHING
      `, [
        id,
        story.title,
        story.category,
        story.location,
        story.impact,
        story.description,
        story.image,
        JSON.stringify(story.metrics),
        story.orderIndex,
        story.published
      ]);
    }
    
    console.log(`✅ Seeded ${impactStoriesData.length} impact stories`);
  } catch (error) {
    console.error('❌ Error seeding impact stories:', error);
    throw error;
  }
}

