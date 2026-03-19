import { query } from './database';

// Diverse professional names for comment authors
const commentAuthors = [
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
  { name: "Hiroshi Yamamoto", email: "hyamamoto@asiancapital.jp" },
  { name: "Adebayo Okafor", email: "aokafor@nigeriatech.ng" },
  { name: "Priya Mehta", email: "pmehta@mumbairealestate.in" },
  { name: "Kwame Mensah", email: "kmensah@accrafintech.gh" },
  { name: "Fatima Al-Rashid", email: "falrashid@dubailogistics.ae" },
  { name: "Rajesh Kumar", email: "rkumar@delhifinance.in" }
];

// Comment templates - professional and relevant
const commentTemplates = [
  "This is a very insightful article. The analysis of market trends is particularly valuable for those of us working in this space. I'd love to see more content on this topic.",
  "Excellent piece! The practical examples really help illustrate the key concepts. I've shared this with my team and we're discussing how to apply these insights to our own strategy.",
  "Thank you for this comprehensive overview. The international perspective is especially valuable. I'm curious about how these trends might play out in different regional markets.",
  "Well-researched and well-written. The data presented here aligns with what we're seeing in our own market. The strategic recommendations are particularly helpful.",
  "This article addresses many of the questions we've been grappling with. The author's expertise is evident throughout. Looking forward to reading more from this series.",
  "Great analysis! I particularly appreciated the section on regulatory considerations. This is exactly the kind of forward-thinking content the industry needs.",
  "The case studies mentioned here are very relevant to our current situation. It's helpful to see how similar challenges have been addressed in other markets.",
  "This is a must-read for anyone in the industry. The author has done an excellent job breaking down complex topics into digestible insights. Well done!",
  "I found the strategic recommendations particularly valuable. We're currently evaluating similar opportunities and this article provides excellent framework for our analysis.",
  "Outstanding work! The combination of data, analysis, and practical recommendations makes this one of the best articles I've read on this topic recently.",
  "The forward-looking perspective is refreshing. Too many articles focus on historical trends; this one helps us think about what's coming next. Very valuable.",
  "This article provides a balanced view that acknowledges both opportunities and challenges. The author's experience in emerging markets really shines through.",
  "I appreciate the depth of analysis here. The author clearly has deep expertise in this area. The recommendations are practical and well-reasoned.",
  "Excellent content! I've bookmarked this for future reference. The insights on market dynamics are particularly relevant to our current strategic planning.",
  "This is exactly the kind of content we need more of. Professional, insightful, and actionable. Thank you for sharing your expertise with the community.",
  "The international examples really help put things in perspective. It's valuable to see how similar strategies have been applied across different markets.",
  "Well done! The article strikes a good balance between being comprehensive and accessible. I've shared it with several colleagues who also found it valuable.",
  "I particularly enjoyed the section on implementation challenges. It's rare to see such honest assessment of both opportunities and potential pitfalls.",
  "This article has given me a lot to think about. The strategic framework presented here is something we'll definitely be incorporating into our planning.",
  "Great read! The author's experience and expertise are evident throughout. I look forward to reading more articles from this author in the future."
];

export async function seedComments() {
  console.log('🌱 Seeding article comments...');
  
  try {
    // Get all published article slugs
    const articlesResult = await query(`
      SELECT slug FROM articles WHERE published = true
    `);
    
    if (articlesResult.rows.length === 0) {
      console.log('⚠️  No published articles found. Please seed articles first.');
      return;
    }
    
    const articleSlugs = articlesResult.rows.map(row => row.slug);
    let commentCount = 0;
    
    // Generate comments for each article
    for (const slug of articleSlugs) {
      // Each article gets 2-6 comments
      const numComments = Math.floor(Math.random() * 5) + 2;
      
      for (let i = 0; i < numComments; i++) {
        const author = commentAuthors[Math.floor(Math.random() * commentAuthors.length)];
        const commentContent = commentTemplates[Math.floor(Math.random() * commentTemplates.length)];
        
        const commentId = `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        await query(`
          INSERT INTO article_comments (
            id, article_slug, author_name, author_email, content, approved
          ) VALUES ($1, $2, $3, $4, $5, $6)
        `, [
          commentId,
          slug,
          author.name,
          author.email,
          commentContent,
          true // Auto-approve seed comments
        ]);
        
        commentCount++;
      }
    }
    
    console.log(`✅ Seeded ${commentCount} article comments across ${articleSlugs.length} articles`);
  } catch (error) {
    console.error('❌ Error seeding comments:', error);
    throw error;
  }
}

