export interface FacilityType {
  category: string;
  title: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  facility: string;
  location: string;
  sqft: string;
  value: string;
  duration: string;
  image: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
}

export interface FlowNode {
  id: string;
  label: string;
  description: string;
  connections: string[];
}

export const siteData = {
  company: {
    name: "Yardage Industrial",
    tagline: "Warehouse & Industrial Construction",
    description: "We build the facilities that power modern supply chains. Precision-engineered warehouses, distribution centers, and manufacturing plants designed around operational flow.",
    phone: "(214) 555-0187",
    email: "facilities@yardageindustrial.com",
    founded: "2008",
  },

  hero: {
    headline: "Facilities Engineered for Flow.",
    subheadline: "We design and build industrial facilities around how goods actually move—optimizing every square foot for throughput, efficiency, and scale.",
    metrics: [
      { value: "42M+", label: "Square Feet Built", detail: "Across 180+ facilities" },
      { value: "99.2%", label: "On-Time Delivery", detail: "Industry-leading rate" },
      { value: "6.2", label: "Avg. Months", detail: "Ground to operations" },
      { value: "$3.8B", label: "Client Investment", detail: "Total project value" },
    ],
  },

  facilityTypes: [
    {
      category: "Distribution",
      title: "Distribution Centers",
      description: "High-throughput facilities optimized for cross-docking, sortation, and last-mile delivery operations.",
      specs: [
        { label: "Clear Height", value: "36'-40'" },
        { label: "Dock Doors", value: "Up to 200+" },
        { label: "Floor Flatness", value: "FF50/FL36" },
        { label: "Column Spacing", value: "50'×50'" },
      ],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
    },
    {
      category: "Manufacturing",
      title: "Manufacturing Plants",
      description: "Production facilities with heavy power, specialized HVAC, and clean room capabilities for advanced manufacturing.",
      specs: [
        { label: "Power Capacity", value: "Up to 20MW" },
        { label: "Floor Load", value: "500 PSF" },
        { label: "Crane Capacity", value: "Up to 50 tons" },
        { label: "Clean Class", value: "ISO 7-8" },
      ],
      image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=500&fit=crop",
    },
    {
      category: "Cold Storage",
      title: "Cold Storage & Freezer",
      description: "Temperature-controlled facilities from cooler to deep freeze, with energy-efficient refrigeration systems.",
      specs: [
        { label: "Temperature Range", value: "+55° to -20°F" },
        { label: "Panel Insulation", value: "R-40+" },
        { label: "Floor Heating", value: "Glycol systems" },
        { label: "Dock Seals", value: "Insulated" },
      ],
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop",
    },
    {
      category: "Flex",
      title: "Flex & Light Industrial",
      description: "Multi-tenant and single-user flex spaces combining office, warehouse, and light manufacturing under one roof.",
      specs: [
        { label: "Office Ratio", value: "20-40%" },
        { label: "Clear Height", value: "20'-24'" },
        { label: "Loading", value: "Grade doors" },
        { label: "Parking", value: "4:1,000 SF" },
      ],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
    },
  ],

  flowDiagram: {
    title: "Planning Around Flow",
    subtitle: "Every facility we design starts with operational flow analysis—understanding how people, products, and equipment move through the space.",
    nodes: [
      { id: "inbound", label: "Inbound", description: "Receiving docks, staging areas, and quality inspection zones designed for rapid unloading.", connections: ["staging"] },
      { id: "staging", label: "Staging & QC", description: "Temporary holding areas with integrated quality control and inventory verification systems.", connections: ["storage", "crossdock"] },
      { id: "storage", label: "Storage", description: "High-density racking systems, AS/RS integration, and bulk storage optimized for SKU velocity.", connections: ["picking"] },
      { id: "crossdock", label: "Cross-Dock", description: "Direct transfer zones minimizing touch points for high-velocity SKUs and perishable goods.", connections: ["outbound"] },
      { id: "picking", label: "Picking", description: "Ergonomic pick modules with zone routing, batch picking, and goods-to-person automation.", connections: ["packing"] },
      { id: "packing", label: "Packing & Sort", description: "Automated packing stations, cartonization engines, and sortation for carrier manifesting.", connections: ["outbound"] },
      { id: "outbound", label: "Outbound", description: "Staged lanes by carrier, automated load balancing, and yard management integration.", connections: [] },
    ],
  },

  preConstruction: {
    title: "Pre-Construction Intelligence",
    subtitle: "Before we break ground, we build a complete digital twin of your facility—testing every operational scenario before a single cubic yard of concrete is poured.",
    capabilities: [
      { title: "Flow Simulation", description: "Discrete event modeling to validate throughput capacity and identify bottlenecks before construction." },
      { title: "Structural Analysis", description: "Finite element analysis for floor systems, mezzanines, and heavy equipment support." },
      { title: "MEP Coordination", description: "Clash detection and system optimization for mechanical, electrical, and plumbing networks." },
      { title: "Energy Modeling", description: "Whole-building energy simulation to optimize HVAC, lighting, and envelope performance." },
      { title: "Logistics Planning", description: "Traffic studies, truck queuing analysis, and yard layout optimization." },
      { title: "Phasing Strategy", description: "Expansion planning and future-proofing for operational growth scenarios." },
    ],
  },

  caseStudies: [
    {
      id: "cs1",
      client: "Apex Logistics",
      facility: "Regional Distribution Center",
      location: "Dallas-Fort Worth, TX",
      sqft: "1.2M SF",
      value: "$89M",
      duration: "11 months",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
      challenge: "Build a 1.2M SF automated distribution center in 11 months while maintaining 99.5% uptime for existing operations 200 feet away.",
      solution: "Phased construction with temporary operational bridges, parallel MEP installation, and 24/6 shift scheduling.",
      metrics: [
        { label: "Delivery", value: "11 months" },
        { label: "Uptime Maintained", value: "99.7%" },
        { label: "Safety Record", value: "Zero lost-time" },
      ],
    },
    {
      id: "cs2",
      client: "FreshCold Inc.",
      facility: "Multi-Temp Food Distribution",
      location: "Atlanta, GA",
      sqft: "680K SF",
      value: "$124M",
      duration: "14 months",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop",
      challenge: "Design and build a four-temperature-zone facility (-20°F to +55°F) with seamless flow between zones and energy efficiency targets 30% below code.",
      solution: "Integrated refrigeration plant with heat recovery, thermal break construction details, and automated door systems between zones.",
      metrics: [
        { label: "Energy Savings", value: "34% vs code" },
        { label: "Temp Zones", value: "4 zones" },
        { label: "Commissioning", value: "3 weeks" },
      ],
    },
    {
      id: "cs3",
      client: "TechManufacture Co.",
      facility: "Semiconductor Assembly Plant",
      location: "Austin, TX",
      sqft: "420K SF",
      value: "$210M",
      duration: "18 months",
      image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=500&fit=crop",
      challenge: "Deliver ISO Class 7 clean rooms with vibration criteria VC-E, 99.99% ULPA filtration, and redundant process utilities in a fast-track schedule.",
      solution: "Prefabricated clean room modules, raised access floor with underfloor utility distribution, and 2N redundant systems throughout.",
      metrics: [
        { label: "Clean Class", value: "ISO 7" },
        { label: "Vibration", value: "VC-E met" },
        { label: "Startup", value: "On schedule" },
      ],
    },
  ],

  scheduleRisk: {
    title: "Schedule & Risk Management",
    subtitle: "Industrial projects live or die by their schedule. Our integrated approach combines predictive analytics with proactive risk mitigation.",
    tools: [
      { name: "Critical Path Method", description: "Dynamic CPM scheduling with resource loading and what-if scenario analysis." },
      { name: "Pull Planning", description: "Lean construction methodology with weekly work plans and constraint removal." },
      { name: "Risk Register", description: "Quantified risk analysis with probability-weighted impacts and mitigation strategies." },
      { name: "Supply Chain Tracking", description: "Real-time tracking of long-lead equipment with expediting and backup sourcing." },
      { name: "Weather Intelligence", description: "Hyperlocal weather forecasting with proactive schedule adjustments for outdoor work." },
      { name: "Earned Value", description: "SPI/CPI tracking with forecasting to predict schedule and cost outcomes 90 days out." },
    ],
  },

  safetyCompliance: {
    title: "Safety & Compliance",
    stats: [
      { value: "0.62", label: "EMR", detail: "Experience Modification Rate" },
      { value: "0.78", label: "TRIR", detail: "Total Recordable Incident Rate" },
      { value: "2.1M", label: "Safe Hours", detail: "Without lost-time incident" },
      { value: "100%", label: "OSHA 300", detail: "Compliance rate" },
    ],
    certifications: [
      "OSHA VPP Star Site",
      "ISO 45001:2018 Certified",
      "ANSI/ASSP Z10 Compliant",
      "NFPA 241 Fire Prevention",
      "LEED Accredited Staff",
      "Designated Competent Persons",
    ],
  },

  cta: {
    title: "Build Your Next Facility",
    description: "Whether you're expanding operations, relocating, or building from scratch, our team is ready to deliver a facility that performs.",
    buttonText: "Request Facility Assessment",
    contactInfo: {
      phone: "(214) 555-0187",
      email: "facilities@yardageindustrial.com",
    },
  },
};
