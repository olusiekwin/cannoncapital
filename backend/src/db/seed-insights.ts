import { query } from './database';

// Diverse professional names (African, Asian, Indian backgrounds)
const names = {
  authors: [
    { name: "Kwame Asante", role: "Senior Partner, Private Equity", email: "kasante@cannoncapitalpartners.org" },
    { name: "Priya Sharma", role: "Head of Venture Capital", email: "psharma@cannoncapitalpartners.org" },
    { name: "Ahmed Hassan", role: "Director, Real Estate Investment", email: "ahassan@cannoncapitalpartners.org" },
    { name: "Fatima Ndiaye", role: "Managing Director, Infrastructure Finance", email: "fndiaye@cannoncapitalpartners.org" },
    { name: "Rajesh Patel", role: "Chief Investment Officer", email: "rpatel@cannoncapitalpartners.org" },
    { name: "Amina Okafor", role: "Partner, Strategic Advisory", email: "aokafor@cannoncapitalpartners.org" },
    { name: "Chen Wei", role: "Head of M&A", email: "cwei@cannoncapitalpartners.org" },
    { name: "David Mwangi", role: "Senior Analyst, Market Research", email: "dmwangi@cannoncapitalpartners.org" }
  ],
  reviewers: [
    { name: "Michael Ochieng", email: "mochieng@kenyacommercialbank.co.ke" },
    { name: "Sarah Kimani", email: "skimani@techstartup.africa" },
    { name: "James Okonkwo", email: "jokonkwo@nigerianventures.com" },
    { name: "Meera Desai", email: "mdesai@indianfinancegroup.in" },
    { name: "Hassan Ali", email: "hali@dubaibusiness.ae" },
    { name: "Lindiwe Dlamini", email: "ldlamini@southafricainvest.com" },
    { name: "Zhang Li", email: "zli@singaporecapital.sg" },
    { name: "Aisha Mohammed", email: "amohammed@egyptianenterprises.eg" },
    { name: "Kofi Mensah", email: "kmensah@ghanainvestment.gh" },
    { name: "Anjali Reddy", email: "areddy@mumbaifinance.in" },
    { name: "Tunde Adebayo", email: "tadebayo@lagosbusiness.ng" },
    { name: "Yuki Tanaka", email: "ytanaka@tokyocapital.jp" },
    { name: "Zainab Ibrahim", email: "zibrahim@saudiventures.sa" },
    { name: "Ravi Kumar", email: "rkumar@delhifinance.in" },
    { name: "Nomsa Mthembu", email: "nmthembu@johannesburgcapital.co.za" },
    { name: "Mohammed Rahman", email: "mrahman@bangladeshfinance.bd" },
    { name: "Grace Osei", email: "gosei@accrabusiness.gh" },
    { name: "Vikram Singh", email: "vsingh@chennaiventures.in" },
    { name: "Fatou Diallo", email: "fdiallo@senegalinvest.sn" },
    { name: "Hiroshi Yamamoto", email: "hyamamoto@asiancapital.jp" }
  ]
};

const articlesData = [
  {
    slug: "future-of-fintech-in-africa",
    title: "The Future of FinTech in Africa: Opportunities and Challenges",
    category: "Technology",
    date: "2024-01-15",
    author: names.authors[1].name,
    authorRole: names.authors[1].role,
    readTime: "8 min read",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
    excerpt: "Africa's FinTech sector is experiencing unprecedented growth, driven by mobile penetration, financial inclusion initiatives, and innovative solutions addressing unique market needs. This article explores the key trends, opportunities, and challenges shaping the future of financial technology across the continent.",
    content: [
      "The African FinTech landscape has transformed dramatically over the past decade. With over 600 million mobile money accounts and a rapidly growing middle class, the continent presents unique opportunities for financial technology innovation.",
      "Mobile money platforms like M-Pesa have demonstrated the potential for technology to drive financial inclusion. However, the next wave of FinTech innovation goes beyond basic money transfer services.",
      "Key growth areas include digital lending, insurance technology, wealth management platforms, and blockchain-based solutions. Each of these sectors addresses specific pain points in traditional financial services.",
      "Regulatory frameworks are evolving to support innovation while ensuring consumer protection. Countries like Kenya, Nigeria, and South Africa are leading the way with progressive FinTech regulations.",
      "Investment in African FinTech has surged, with over $2 billion raised in 2023 alone. This represents a significant increase from previous years and reflects growing confidence in the sector's potential.",
      "However, challenges remain. Infrastructure limitations, regulatory fragmentation across countries, and the need for greater financial literacy are hurdles that must be addressed.",
      "The future of FinTech in Africa will be shaped by partnerships between traditional financial institutions and innovative startups, cross-border payment solutions, and technologies that can operate effectively in low-connectivity environments."
    ],
    relatedTopics: ["Financial Technology", "Mobile Payments", "Financial Inclusion", "Digital Banking"],
    views: 12450,
    likes: 342,
    published: true
  },
  {
    slug: "real-estate-investment-trends-2024",
    title: "Real Estate Investment Trends Shaping 2024",
    category: "Real Estate",
    date: "2024-02-10",
    author: names.authors[2].name,
    authorRole: names.authors[2].role,
    readTime: "10 min read",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
    excerpt: "The real estate investment landscape is evolving rapidly, with new trends emerging in commercial, residential, and mixed-use developments. From sustainable building practices to technology integration, discover what's driving value creation in today's property markets.",
    content: [
      "Real estate investment strategies are adapting to changing market dynamics, demographic shifts, and technological advancements. Understanding these trends is crucial for investors seeking to maximize returns.",
      "Sustainability has moved from a nice-to-have to a critical factor in real estate investment decisions. Green buildings command premium rents, attract quality tenants, and provide long-term value preservation.",
      "Technology integration in buildings is becoming standard. Smart building systems that optimize energy usage, enhance security, and improve tenant experience are now expected rather than exceptional.",
      "The rise of flexible workspaces and hybrid work models is reshaping commercial real estate. Office spaces are being redesigned to support collaboration while accommodating remote work preferences.",
      "Residential markets are seeing strong demand for affordable housing, particularly in emerging markets. Innovative construction techniques and financing models are making quality housing more accessible.",
      "Mixed-use developments that combine residential, commercial, and retail spaces are gaining popularity. These projects create vibrant communities and provide diversified income streams for investors.",
      "Infrastructure development, particularly in transportation and utilities, is creating new investment opportunities. Properties with good connectivity and access to amenities command premium values."
    ],
    relatedTopics: ["Property Investment", "Sustainable Development", "Commercial Real Estate", "Urban Planning"],
    views: 9870,
    likes: 289,
    published: true
  },
  {
    slug: "infrastructure-investment-emerging-markets",
    title: "Infrastructure Investment in Emerging Markets: A Strategic Imperative",
    category: "Infrastructure",
    date: "2024-03-05",
    author: names.authors[3].name,
    authorRole: names.authors[3].role,
    readTime: "12 min read",
    heroImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200",
    excerpt: "Infrastructure development is fundamental to economic growth in emerging markets. This comprehensive analysis examines investment opportunities, financing structures, and risk management strategies for infrastructure projects across Africa, Asia, and the Middle East.",
    content: [
      "Infrastructure investment represents one of the most significant opportunities for driving economic growth in emerging markets. The infrastructure gap in these regions presents both challenges and substantial investment potential.",
      "Energy infrastructure, particularly renewable energy projects, is attracting significant investment. Solar and wind power projects are becoming increasingly viable as technology costs decrease and regulatory frameworks improve.",
      "Transportation infrastructure, including ports, airports, and road networks, is critical for facilitating trade and economic activity. These projects often generate stable, long-term returns for investors.",
      "Digital infrastructure, including fiber optic networks and data centers, is essential for supporting the digital economy. The demand for connectivity is driving investment in telecommunications infrastructure.",
      "Public-private partnerships (PPPs) are becoming the preferred model for infrastructure development. These structures allow governments to leverage private sector expertise and capital while maintaining public oversight.",
      "Financing infrastructure projects requires creative structures that combine various funding sources. Development finance institutions, commercial banks, and private equity all play important roles.",
      "Risk management is crucial for infrastructure investments. Political, regulatory, construction, and operational risks must be carefully assessed and mitigated through appropriate structures and insurance.",
      "The long-term nature of infrastructure investments requires patient capital and alignment between investors, governments, and communities. Successful projects create lasting value for all stakeholders."
    ],
    relatedTopics: ["Infrastructure Finance", "Public-Private Partnerships", "Renewable Energy", "Transportation"],
    views: 11230,
    likes: 398,
    published: true
  },
  {
    slug: "venture-capital-ecosystem-growth",
    title: "Building a Thriving Venture Capital Ecosystem: Lessons from Emerging Markets",
    category: "Venture Capital",
    date: "2024-03-20",
    author: names.authors[1].name,
    authorRole: names.authors[1].role,
    readTime: "9 min read",
    heroImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200",
    excerpt: "Venture capital ecosystems in emerging markets are maturing rapidly. This article explores the key factors driving ecosystem development, successful models from different regions, and strategies for building sustainable VC communities.",
    content: [
      "Venture capital ecosystems require multiple components working together: entrepreneurs, investors, mentors, accelerators, and supportive regulatory environments. Building these ecosystems takes time and coordinated effort.",
      "Government support plays a crucial role in ecosystem development. Policies that encourage entrepreneurship, provide tax incentives, and streamline business registration can significantly accelerate ecosystem growth.",
      "Universities and research institutions are important sources of innovation and talent. Strong connections between academia and industry help translate research into commercial opportunities.",
      "Successful ecosystems often have anchor companies that create talent pools and provide exit opportunities. These companies also serve as role models and sources of mentorship for new entrepreneurs.",
      "Access to capital at different stages is essential. From angel investors to seed funds to growth capital, entrepreneurs need funding options that match their development stage.",
      "Mentorship and support networks are invaluable for entrepreneurs. Experienced founders and investors who share knowledge and connections help new companies navigate challenges more effectively.",
      "International connections are increasingly important. Global investors, partnerships, and market access help local startups scale beyond their home markets and compete internationally."
    ],
    relatedTopics: ["Startup Ecosystem", "Entrepreneurship", "Technology Innovation", "Investment Strategy"],
    views: 8560,
    likes: 267,
    published: true
  },
  {
    slug: "sustainable-investing-esg-framework",
    title: "Sustainable Investing: Implementing ESG Frameworks in Emerging Markets",
    category: "Sustainability",
    date: "2024-04-12",
    author: names.authors[4].name,
    authorRole: names.authors[4].role,
    readTime: "11 min read",
    heroImage: "https://images.unsplash.com/photo-1509391366360-2e959fcaeec0?w=1200",
    excerpt: "Environmental, Social, and Governance (ESG) considerations are becoming central to investment decisions. This article examines how to effectively implement ESG frameworks in emerging market contexts, balancing sustainability goals with financial returns.",
    content: [
      "ESG investing has evolved from a niche approach to a mainstream strategy. Investors increasingly recognize that companies with strong ESG practices tend to perform better over the long term.",
      "In emerging markets, ESG implementation requires adaptation to local contexts. Standards developed for developed markets may not be directly applicable, requiring thoughtful customization.",
      "Environmental considerations include climate change mitigation, resource efficiency, and pollution control. These factors are particularly important in industries like energy, manufacturing, and agriculture.",
      "Social factors encompass labor practices, community relations, and product safety. Companies that invest in their employees and communities often build stronger, more sustainable businesses.",
      "Governance includes board composition, transparency, and ethical business practices. Strong governance is fundamental to building trust with stakeholders and maintaining long-term value.",
      "Measuring ESG performance requires appropriate metrics and reporting frameworks. While standardization is improving, investors must still evaluate ESG factors in context of each investment.",
      "The business case for ESG is strengthening. Companies with better ESG performance often have lower cost of capital, reduced regulatory risk, and stronger relationships with stakeholders.",
      "Implementing ESG frameworks requires commitment from leadership and integration into decision-making processes. It's not just about reporting, but about embedding sustainability into business strategy."
    ],
    relatedTopics: ["ESG Investing", "Sustainability", "Corporate Governance", "Impact Investing"],
    views: 10240,
    likes: 312,
    published: true
  },
  {
    slug: "cross-border-ma-strategies",
    title: "Cross-Border M&A: Strategies for Success in Emerging Markets",
    category: "Mergers & Acquisitions",
    date: "2024-04-28",
    author: names.authors[6].name,
    authorRole: names.authors[6].role,
    readTime: "10 min read",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
    excerpt: "Cross-border mergers and acquisitions in emerging markets present unique opportunities and challenges. This guide explores successful strategies for navigating regulatory environments, cultural differences, and integration complexities.",
    content: [
      "Cross-border M&A transactions in emerging markets offer access to high-growth markets, new customer bases, and strategic assets. However, they also involve navigating complex regulatory, cultural, and operational challenges.",
      "Regulatory approval processes vary significantly across countries. Understanding local requirements, building relationships with regulators, and allowing adequate time for approvals are critical success factors.",
      "Cultural integration is often more challenging than operational integration. Differences in business practices, communication styles, and decision-making processes can create friction if not managed carefully.",
      "Due diligence must be particularly thorough in cross-border transactions. Legal, financial, and operational risks may be less visible, requiring local expertise and extended investigation periods.",
      "Valuation can be complex when dealing with different accounting standards, currencies, and market conditions. Appropriate adjustments and risk premiums must be factored into pricing decisions.",
      "Post-merger integration requires careful planning and execution. Communication, change management, and retention of key talent are essential for realizing transaction value.",
      "Successful cross-border M&A requires strong local partnerships. Local advisors, management teams, and stakeholders can provide invaluable insights and support throughout the transaction process."
    ],
    relatedTopics: ["Mergers & Acquisitions", "International Business", "Strategic Planning", "Market Entry"],
    views: 7890,
    likes: 245,
    published: true
  },
  {
    slug: "digital-transformation-finance-sector",
    title: "Digital Transformation in the Finance Sector: Trends and Implications",
    category: "Technology",
    date: "2024-05-15",
    author: names.authors[0].name,
    authorRole: names.authors[0].role,
    readTime: "9 min read",
    heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
    excerpt: "The finance sector is undergoing rapid digital transformation, driven by changing customer expectations, regulatory requirements, and technological capabilities. This article examines key trends and their implications for financial institutions and investors.",
    content: [
      "Digital transformation in finance is not just about adopting new technologies, but fundamentally reimagining how financial services are delivered and consumed. This shift affects all aspects of the industry.",
      "Customer expectations are driving change. Digital-native consumers expect seamless, mobile-first experiences that match what they receive from technology companies in other sectors.",
      "Artificial intelligence and machine learning are enabling personalized services, fraud detection, and automated decision-making. These technologies are becoming essential competitive advantages.",
      "Blockchain and distributed ledger technology are finding applications beyond cryptocurrency, including trade finance, cross-border payments, and identity verification.",
      "Regulatory technology (RegTech) is helping financial institutions comply with increasingly complex regulations more efficiently. Automation of compliance processes reduces costs and improves accuracy.",
      "Open banking initiatives are creating new business models and partnerships. APIs enable third-party developers to build innovative financial services on top of existing infrastructure.",
      "Cybersecurity is a critical concern as financial institutions become more digital. Investment in security infrastructure and capabilities is essential to protect customer data and maintain trust.",
      "The pace of change requires financial institutions to be agile and adaptable. Those that can quickly adopt new technologies and business models will have significant competitive advantages."
    ],
    relatedTopics: ["Digital Banking", "Financial Technology", "Artificial Intelligence", "Blockchain"],
    views: 13450,
    likes: 421,
    published: true
  },
  {
    slug: "private-equity-value-creation",
    title: "Value Creation in Private Equity: Strategies and Best Practices",
    category: "Private Equity",
    date: "2024-05-30",
    author: names.authors[0].name,
    authorRole: names.authors[0].role,
    readTime: "11 min read",
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
    excerpt: "Successful private equity investing requires more than just capital. This article explores proven strategies for creating value in portfolio companies, from operational improvements to strategic initiatives.",
    content: [
      "Value creation in private equity has evolved from financial engineering to operational improvement and strategic transformation. Today's successful PE firms bring deep operational expertise to their investments.",
      "Operational improvements often drive the most significant value creation. This includes optimizing supply chains, improving manufacturing processes, and enhancing customer service capabilities.",
      "Strategic initiatives such as market expansion, product development, and M&A can accelerate growth. These initiatives require careful planning and execution to realize their potential.",
      "Talent management is critical. Recruiting strong management teams, developing existing talent, and creating performance-oriented cultures are essential for driving results.",
      "Technology adoption can be a powerful value creation lever. Digital transformation initiatives can improve efficiency, enhance customer experience, and create new revenue opportunities.",
      "Financial optimization, while less emphasized than in the past, remains important. Efficient capital structures, working capital management, and tax optimization all contribute to returns.",
      "Exit planning should begin early in the investment period. Building a company that is attractive to strategic buyers or public markets requires sustained focus on value creation throughout the hold period.",
      "Measurement and accountability are essential. Clear KPIs, regular reporting, and performance management systems help ensure value creation initiatives stay on track."
    ],
    relatedTopics: ["Private Equity", "Value Creation", "Portfolio Management", "Operational Excellence"],
    views: 9670,
    likes: 298,
    published: true
  }
];

// Review content templates
const reviewTemplates = [
  "Excellent analysis! This article provides valuable insights into the current market dynamics. The practical examples really help illustrate the key points.",
  "Very informative piece. I particularly appreciated the section on regulatory considerations. This is exactly the kind of content we need more of.",
  "Great read! The author clearly has deep expertise in this area. I've shared this with my team and we're already discussing how to apply these insights.",
  "This article addresses critical issues that many investors are facing. The strategic recommendations are practical and well-reasoned.",
  "Outstanding work! The data and analysis presented here are compelling. I look forward to reading more from this author.",
  "Very well-researched article. The international perspective is particularly valuable for those of us working across multiple markets.",
  "I found the case studies especially helpful. Real-world examples make the concepts much more tangible and applicable.",
  "This is a must-read for anyone in the industry. The author has done an excellent job breaking down complex topics into digestible insights.",
  "The forward-looking perspective is refreshing. Too many articles focus on the past; this one helps us think about what's coming next.",
  "Comprehensive and well-written. I appreciate the balanced view that acknowledges both opportunities and challenges."
];

export async function seedInsights() {
  console.log('🌱 Seeding insights/articles...');
  
  try {
    const articleSlugs: string[] = [];
    
    // Insert articles
    for (const article of articlesData) {
      const id = `article_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      articleSlugs.push(article.slug);
      
      await query(`
        INSERT INTO articles (
          id, slug, title, category, date, author, author_role, read_time,
          hero_image, excerpt, content, related_topics, likes, views, published
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        ON CONFLICT (slug) DO NOTHING
      `, [
        id,
        article.slug,
        article.title,
        article.category,
        article.date,
        article.author,
        article.authorRole,
        article.readTime,
        article.heroImage,
        article.excerpt,
        JSON.stringify(article.content),
        JSON.stringify(article.relatedTopics),
        article.likes,
        article.views,
        article.published
      ]);
    }
    
    console.log(`✅ Seeded ${articlesData.length} articles`);
    
    // Generate reviews for articles
    console.log('🌱 Seeding article reviews...');
    let reviewCount = 0;
    
    for (const slug of articleSlugs) {
      // Each article gets 3-8 reviews
      const numReviews = Math.floor(Math.random() * 6) + 3;
      
      for (let i = 0; i < numReviews; i++) {
        const reviewer = names.reviewers[Math.floor(Math.random() * names.reviewers.length)];
        const rating = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars
        const reviewContent = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
        const likes = Math.floor(Math.random() * 15) + 2; // 2-16 likes per review
        
        const reviewId = `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        await query(`
          INSERT INTO article_reviews (
            id, article_slug, author_name, author_email, rating, content, likes, approved
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
          reviewId,
          slug,
          reviewer.name,
          reviewer.email,
          rating,
          reviewContent,
          likes,
          true // Auto-approve seed reviews
        ]);
        
        reviewCount++;
      }
    }
    
    console.log(`✅ Seeded ${reviewCount} article reviews`);
    
    // Generate article likes (simulate user interactions)
    console.log('🌱 Seeding article likes...');
    let likeCount = 0;
    
    for (const article of articlesData) {
      // Generate likes based on the article's like count
      const numLikes = Math.floor(article.likes * 0.7); // 70% of displayed likes
      
      for (let i = 0; i < numLikes; i++) {
        const userIdentifier = `user_${Math.random().toString(36).substr(2, 12)}`;
        const likeId = `like_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        try {
          await query(`
            INSERT INTO article_likes (id, article_slug, user_identifier)
            VALUES ($1, $2, $3)
            ON CONFLICT (article_slug, user_identifier) DO NOTHING
          `, [likeId, article.slug, userIdentifier]);
          likeCount++;
        } catch (error) {
          // Ignore conflicts
        }
      }
    }
    
    console.log(`✅ Seeded ${likeCount} article likes`);
    
  } catch (error) {
    console.error('❌ Error seeding insights:', error);
    throw error;
  }
}

