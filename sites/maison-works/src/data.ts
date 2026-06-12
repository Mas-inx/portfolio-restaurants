export interface PlanningCard {
  title: string;
  icon: string;
  description: string;
  details: string[];
}

export interface RenovationType {
  title: string;
  description: string;
  details: string[];
  image: string;
  timeline: string;
}

export interface MaterialItem {
  category: string;
  name: string;
  specification: string;
  image: string;
  tone: string;
}

export interface BeforeAfter {
  id: string;
  title: string;
  location: string;
  beforeImage: string;
  afterImage: string;
  scope: string;
  duration: string;
  style: string;
}

export interface LivingCommitment {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessPhase {
  number: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export const siteData = {
  company: {
    name: "Maison Works",
    tagline: "Architectural Renovation Studio",
    description: "We transform homes with reverence for their original character and vision for how you'll live in them next. Design-build renovation for kitchens, bathrooms, additions, and full-home remodels.",
    phone: "(415) 229-8471",
    email: "studio@maisonworks.co",
    established: "Est. 2011 · San Francisco",
  },

  hero: {
    headline: "Renovation with a design mind and a builder's discipline.",
    subheadline: "We are a design-build studio for homeowners who want beautiful interiors and disciplined construction. Every project begins with listening and ends with a home that feels inevitable.",
    stats: [
      { value: "180+", label: "Homes Transformed" },
      { value: "13", label: "Years of Practice" },
      { value: "94%", label: "Repeat & Referral" },
    ],
  },

  beforeBuild: {
    title: "Before the Build",
    subtitle: "Every renovation begins with a plan worth following. We lay out the full scope before a single wall comes down.",
    cards: [
      {
        title: "Scope & Vision",
        icon: "◇",
        description: "What's changing, what's staying, and why. We map every room, every intention, every constraint.",
        details: ["Room-by-room assessment", "Structural opportunities", "Lifestyle alignment"],
      },
      {
        title: "Drawings & Design",
        icon: "△",
        description: "Architectural drawings that translate your vision into buildable plans. Floor plans, elevations, and 3D perspectives.",
        details: ["Floor plans & elevations", "Material specifications", "Lighting & electrical plans"],
      },
      {
        title: "Budget & Timeline",
        icon: "□",
        description: "Transparent, line-item estimates with realistic schedules. No surprises, no scope creep, no hidden costs.",
        details: ["Line-item breakdown", "Contingency planning", "Phased scheduling"],
      },
      {
        title: "Material Direction",
        icon: "○",
        description: "A curated palette of materials that work together—stone, wood, metal, tile—selected for beauty and durability.",
        details: ["Material samples", "Finish selections", "Lead time coordination"],
      },
    ],
  },

  renovationTypes: [
    {
      title: "Kitchens",
      description: "The heart of the home, reimagined for how you cook, gather, and connect. Custom cabinetry, artisan tile, and layouts that flow naturally from prep to plate.",
      details: ["Custom millwork", "Natural stone counters", "Professional-grade appliances", "Butler's pantry", "Island design"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      timeline: "3–5 months",
    },
    {
      title: "Bathrooms",
      description: "Spa-inspired primary suites and elegant powder rooms. Heated floors, rainfall showers, and the kind of quiet luxury that makes mornings better.",
      details: ["Heated flooring", "Custom vanities", "Wet room design", "Freestanding tubs", "Steam showers"],
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop",
      timeline: "2–4 months",
    },
    {
      title: "Additions",
      description: "Seamless expansions that feel like they were always meant to be there. New space that honors the original architecture while opening new possibilities.",
      details: ["Second-story additions", "Rear extensions", "Sunroom & conservatory", "Bump-outs", "Covered porches"],
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      timeline: "4–8 months",
    },
    {
      title: "Whole-Home",
      description: "Comprehensive transformations that reimagine every room while maintaining architectural coherence throughout the entire house.",
      details: ["Full interior redesign", "Structural modifications", "Systems upgrades", "Period-appropriate details", "Landscape integration"],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      timeline: "6–12 months",
    },
    {
      title: "Historic Refresh",
      description: "Sensitive restoration of period homes—Victorian, Craftsman, Edwardian, Mid-Century. We preserve what matters and update what doesn't.",
      details: ["Period millwork restoration", "Original hardware sourcing", "Lead & asbestos abatement", "Seismic retrofit", "Historic review compliance"],
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
      timeline: "4–9 months",
    },
    {
      title: "Basement Suites",
      description: "Transform unfinished basements into legal rental units, in-law suites, or expanded living space. Full egress, proper ceiling height, and thoughtful design.",
      details: ["Egress window installation", "Ceiling height solutions", "Separate entrance", "Kitchenette design", "Sound isolation"],
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      timeline: "3–6 months",
    },
  ],

  beforeAfter: [
    {
      id: "ba1",
      title: "Victorian Kitchen Revival",
      location: "Pacific Heights, San Francisco",
      beforeImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      scope: "Full kitchen gut + structural wall removal",
      duration: "4 months",
      style: "Victorian meets contemporary",
    },
    {
      id: "ba2",
      title: "Craftsman Bathroom Suite",
      location: "Berkeley Hills",
      beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop",
      scope: "Primary bath + water closet + linen storage",
      duration: "3 months",
      style: "Craftsman warmth, spa function",
    },
    {
      id: "ba3",
      title: "Edwardian Whole-Home",
      location: "Noe Valley, San Francisco",
      beforeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      scope: "Complete interior renovation, 3 floors",
      duration: "9 months",
      style: "Edwardian preservation, modern living",
    },
    {
      id: "ba4",
      title: "Mid-Century Kitchen Expansion",
      location: "Oakmore, Berkeley",
      beforeImage: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
      scope: "Kitchen + dining area expansion + new rear wall",
      duration: "5 months",
      style: "Mid-century revival",
    },
  ],

  materialBoard: [
    { category: "Cabinetry", name: "Quarter-Sawn White Oak", specification: "Natural oil finish, soft-close hardware, dovetail joinery", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop", tone: "Warm honey" },
    { category: "Cabinetry", name: "Painted Shaker — Dove White", specification: "Spray-finished maple, integrated pulls, full-overlay doors", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop", tone: "Soft neutral" },
    { category: "Stone", name: "Calacatta Gold Marble", specification: "Book-matched slabs, honed finish, 3cm countertop thickness", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=800&fit=crop", tone: "White with warm veining" },
    { category: "Stone", name: "Honed Absolute Granite", specification: "Leathered finish, 2cm profile, waterfall edge detail", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=800&fit=crop", tone: "Charcoal depth" },
    { category: "Tile", name: "Handmade Zellige", specification: "Moroccan clay, 4×4 field tile, natural color variation", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&h=800&fit=crop", tone: "Sage & cream" },
    { category: "Tile", name: "Large-Format Porcelain", specification: "12×24 rectified, wood-look grain, 900°F fired", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=800&fit=crop", tone: "Warm grey" },
    { category: "Lighting", name: "Hand-Blown Glass Pendants", specification: "Mouth-blown borosilicate, brass socket, dimmable LED", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop", tone: "Amber warmth" },
    { category: "Lighting", name: "Reeded Glass Sconces", specification: "Textured glass diffuser, brushed brass backplate, wall-mount", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=800&fit=crop", tone: "Soft diffusion" },
    { category: "Flooring", name: "French White Oak", specification: "Wide plank 7\", wire-brushed, matte lacquer finish", image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=600&h=800&fit=crop", tone: "Natural blonde" },
    { category: "Flooring", name: "Honed Limestone", specification: "Tumbled edge, 18×18 format, fossil-bearing", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=800&fit=crop", tone: "Warm beige" },
    { category: "Fixtures", name: "Brushed Brass Mixers", specification: "Living finish, ceramic disc cartridge, widespread mount", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=800&fit=crop", tone: "Satin gold" },
    { category: "Fixtures", name: "Matte Black Plumbing", specification: "PVD coating, thermostatic valve, rain + hand shower", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=800&fit=crop", tone: "Graphite" },
  ],

  livingThrough: {
    title: "Living Through Renovation",
    subtitle: "Renovation is an act of trust. We honor that trust by keeping your home livable, your schedule clear, and your stress low.",
    commitments: [
      { title: "Dust Control", description: "Negative air pressure systems, sealed zip-wall barriers, and HEPA filtration keep construction zones completely isolated from living spaces.", icon: "◈" },
      { title: "Temporary Kitchen", description: "If your kitchen is out of commission, we set up a fully functional temporary kitchen with microwave, mini-fridge, sink, and coffee maker.", icon: "◇" },
      { title: "Schedule Updates", description: "Weekly schedule emails every Monday. Daily photo updates in your shared portal. You always know what's happening and what's next.", icon: "△" },
      { title: "Site Protection", description: "Ram board on floors, protective wrap on furniture, dedicated entry paths. Your home stays clean and protected throughout construction.", icon: "□" },
    ],
  },

  process: [
    { number: "01", title: "Discovery", duration: "2–3 weeks", description: "In-depth conversations about your vision, lifestyle, and priorities. We walk through your home, listen to your story, and understand what matters most.", deliverables: ["Home assessment", "Lifestyle interview", "Inspiration review", "Budget alignment"] },
    { number: "02", title: "Design", duration: "6–10 weeks", description: "Schematic design through construction documents. Floor plans, elevations, material selections, and 3D visualizations that bring the vision to life.", deliverables: ["Concept design", "Material palette", "3D visualization", "Construction documents"] },
    { number: "03", title: "Estimate", duration: "2–3 weeks", description: "Detailed line-item estimate with transparent pricing. We walk through every cost together so there are no surprises when we break ground.", deliverables: ["Line-item budget", "Allowance schedule", "Payment timeline", "Contingency plan"] },
    { number: "04", title: "Build", duration: "3–12 months", description: "Skilled craftsmen execute the design with daily attention to detail. Weekly walkthroughs and a shared photo portal keep you informed at every stage.", deliverables: ["Demolition & prep", "Framing & systems", "Finishes & fixtures", "Final touches"] },
    { number: "05", title: "Punch List", duration: "1–2 weeks", description: "A meticulous walkthrough together. Every detail is noted, every imperfection addressed. We don't move on until everything is exactly right.", deliverables: ["Detailed walkthrough", "Itemized list", "Touch-up schedule", "Quality verification"] },
    { number: "06", title: "Handover", duration: "1 day", description: "The moment you walk into your transformed home. We provide complete documentation, maintenance guides, and warranty information.", deliverables: ["Final inspection", "Deep clean", "Documentation package", "Warranty activation"] },
  ],

  cta: {
    title: "Begin Your Renovation Story",
    description: "Every great home transformation starts with a conversation. Tell us about your space and your vision—we'll listen carefully and share our initial thoughts within 48 hours.",
    buttonText: "Schedule Consultation",
  },
};
