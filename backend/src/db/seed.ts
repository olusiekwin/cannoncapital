import { seedProjects } from './seed-projects';
import { seedServices } from './seed-services';
import { seedInsights } from './seed-insights';
import { seedImpactStories } from './seed-impact-stories';

async function main() {
  console.log('🚀 Starting database seeding...\n');
  
  try {
    // Seed in order
    await seedProjects();
    await seedServices();
    await seedInsights();
    await seedImpactStories();
    
    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { main as seedDatabase };

