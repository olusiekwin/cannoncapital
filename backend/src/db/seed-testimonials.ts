import { query } from './database';

// Diverse professional testimonials with real-sounding names and companies
const testimonialsData = [
  {
    name: "Adebayo Okafor",
    role: "CEO",
    company: "Nigerian Tech Ventures",
    content: "Cannon Capital Partners transformed our business. Their strategic guidance and capital injection enabled us to scale from a local startup to a regional leader. The team's deep understanding of African markets and commitment to our success made all the difference.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    approved: true
  },
  {
    name: "Priya Mehta",
    role: "Managing Director",
    company: "Mumbai Real Estate Group",
    content: "Working with Cannon Capital on our mixed-use development project was exceptional. Their expertise in real estate finance and project management helped us navigate complex regulatory requirements and deliver ahead of schedule. Highly professional and results-driven.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    approved: true
  },
  {
    name: "Kwame Mensah",
    role: "Founder & CEO",
    company: "Accra FinTech Solutions",
    content: "The venture capital support from Cannon Capital was instrumental in our growth. Beyond funding, they provided invaluable mentorship, network access, and strategic advice. We've grown 10x since their investment and couldn't be happier with the partnership.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    approved: true
  },
  {
    name: "Fatima Al-Rashid",
    role: "Chief Operating Officer",
    company: "Dubai Logistics Holdings",
    content: "Cannon Capital's infrastructure finance team structured a complex deal that seemed impossible. Their creativity, persistence, and deep market knowledge made our port expansion project a reality. The project has created thousands of jobs and transformed our operations.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    approved: true
  },
  {
    name: "Rajesh Kumar",
    role: "Chairman",
    company: "Delhi Manufacturing Industries",
    content: "The M&A advisory services from Cannon Capital were outstanding. They guided us through a complex cross-border acquisition, handling regulatory approvals, due diligence, and integration planning flawlessly. Their team's attention to detail and strategic thinking was impressive.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    approved: true
  },
  {
    name: "Amina Hassan",
    role: "Executive Director",
    company: "Nairobi Energy Solutions",
    content: "Cannon Capital helped us secure financing for our renewable energy project when traditional lenders were hesitant. Their innovative structuring and relationships with development finance institutions made the difference. The project is now generating clean energy for thousands of homes.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    approved: true
  },
  {
    name: "Chen Wei",
    role: "President",
    company: "Singapore Technology Group",
    content: "As a strategic advisor, Cannon Capital provided insights that transformed our market entry strategy. Their understanding of Asian markets and ability to connect us with the right partners accelerated our expansion significantly. Professional, knowledgeable, and results-oriented.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    approved: true
  },
  {
    name: "Lindiwe Dlamini",
    role: "CEO",
    company: "Johannesburg Property Development",
    content: "The private equity investment from Cannon Capital came at a critical time. Their operational expertise and strategic guidance helped us optimize our portfolio and expand into new markets. The partnership has been transformative for our business.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    approved: true
  },
  {
    name: "Mohammed Ibrahim",
    role: "Managing Partner",
    company: "Cairo Infrastructure Partners",
    content: "Cannon Capital's approach to infrastructure investment is exceptional. They don't just provide capital - they bring deep expertise, strategic thinking, and a commitment to long-term value creation. Our smart city project wouldn't have been possible without their support.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    approved: true
  },
  {
    name: "Anjali Reddy",
    role: "Founder",
    company: "Bangalore HealthTech Innovations",
    content: "Cannon Capital believed in our vision when others didn't. Their venture capital investment and strategic support helped us scale our telemedicine platform across India. The team's healthcare sector expertise and network were invaluable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    approved: true
  },
  {
    name: "Tunde Adebayo",
    role: "Chief Financial Officer",
    company: "Lagos Commercial Bank",
    content: "We engaged Cannon Capital for strategic advisory on our digital transformation initiative. Their insights on FinTech trends, regulatory landscape, and technology adoption were game-changing. The project has significantly improved our customer experience and operational efficiency.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    approved: true
  },
  {
    name: "Yuki Tanaka",
    role: "Director of Investments",
    company: "Tokyo Capital Management",
    content: "Cannon Capital's cross-border M&A expertise is impressive. They facilitated our acquisition of an African logistics company, navigating complex regulatory environments and cultural differences seamlessly. The integration has been successful, and we're seeing strong returns.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    approved: true
  },
  {
    name: "Zainab Mohammed",
    role: "CEO",
    company: "Riyadh Real Estate Development",
    content: "The real estate investment partnership with Cannon Capital exceeded our expectations. Their market analysis, deal structuring, and project management capabilities are top-notch. We've completed three successful projects together and look forward to more.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    approved: true
  },
  {
    name: "Vikram Singh",
    role: "Managing Director",
    company: "Mumbai Infrastructure Group",
    content: "Cannon Capital's infrastructure finance team structured a PPP that worked for all stakeholders. Their ability to balance public interest with private sector returns is remarkable. The project is delivering on all metrics and creating significant social impact.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    approved: true
  },
  {
    name: "Grace Osei",
    role: "Founder & CEO",
    company: "Accra EdTech Solutions",
    content: "As a startup, we needed more than just capital - we needed strategic partners. Cannon Capital provided both, along with mentorship and access to their network. Their support has been instrumental in our growth from a local startup to a regional education technology leader.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    approved: true
  },
  {
    name: "Hassan Ali",
    role: "Chief Investment Officer",
    company: "Dubai Sovereign Wealth Fund",
    content: "Cannon Capital's private equity team has consistently delivered strong returns. Their sector expertise, operational capabilities, and network make them valuable partners. We've co-invested in multiple deals and have been impressed with their execution.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    approved: true
  },
  {
    name: "Meera Desai",
    role: "Executive Vice President",
    company: "Mumbai Financial Services",
    content: "The strategic advisory engagement with Cannon Capital helped us navigate a complex market entry. Their analysis was thorough, recommendations were actionable, and execution support was excellent. We successfully entered three new markets based on their guidance.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    approved: true
  },
  {
    name: "David Mwangi",
    role: "CEO",
    company: "Nairobi Agricultural Technology",
    content: "Cannon Capital's venture capital investment enabled us to scale our agritech platform across East Africa. Beyond funding, their strategic guidance on market expansion and technology adoption was invaluable. We've reached over 50,000 farmers and are growing rapidly.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    approved: true
  },
  {
    name: "Fatou Diallo",
    role: "Managing Director",
    company: "Dakar Energy Solutions",
    content: "Cannon Capital structured the financing for our solar energy project when others couldn't. Their creativity in deal structuring and relationships with development finance institutions made the project viable. The facility is now generating clean energy and creating jobs.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    approved: true
  },
  {
    name: "Ravi Patel",
    role: "Founder",
    company: "Ahmedabad Manufacturing Co.",
    content: "The M&A transaction facilitated by Cannon Capital was complex, involving multiple jurisdictions and regulatory approvals. Their team's expertise and persistence ensured a successful outcome. The acquisition has strengthened our market position significantly.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    approved: true
  }
];

export async function seedTestimonials() {
  console.log('🌱 Seeding testimonials...');
  
  try {
    for (const testimonial of testimonialsData) {
      const id = `testimonial_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      await query(`
        INSERT INTO testimonials (
          id, name, role, company, content, rating, image, approved
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO NOTHING
      `, [
        id,
        testimonial.name,
        testimonial.role,
        testimonial.company,
        testimonial.content,
        testimonial.rating,
        testimonial.image,
        testimonial.approved
      ]);
    }
    
    console.log(`✅ Seeded ${testimonialsData.length} testimonials`);
  } catch (error) {
    console.error('❌ Error seeding testimonials:', error);
    throw error;
  }
}

