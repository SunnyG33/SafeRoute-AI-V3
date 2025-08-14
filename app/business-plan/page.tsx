"use client"

import { useState } from "react"
import UniversalNavigation from "@/components/navigation/UniversalNavigation"
import {
  Target,
  TrendingUp,
  DollarSign,
  Zap,
  Award,
  ChevronRight,
  ChevronDown,
  Building,
  Users,
  BarChart3,
  Lightbulb,
  MapPin,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const businessPlanSections = [
  {
    title: "Executive Summary",
    icon: Target,
    color: "from-blue-500 to-indigo-500",
    content: `
**Our Core Mission**
"Some go first where it is most CONVENIENT. We go first where we are most NEEDED."

SafeRoute AI is building the world's first national-grade emergency response infrastructure designed to save lives today, prevent disasters tomorrow, and fund itself forever. Our mission is simple but transformative: connect communities, governments, and responders through a unified platform that delivers immediate life-saving support and long-term resilience.

**The Opportunity**
The world faces an escalating emergency response crisis. Natural disasters cost the global economy over $300 billion annually, with recovery costs climbing each year. In Canada alone, over 35,000 preventable deaths occur each year from cardiac arrest, trauma, and delayed emergency care.

**The Solution**
Built on 12 core patents (4 filed, 8 ready for submission) with 10 supporting technologies, SafeRoute AI creates a modular system where each component operates independently, yet achieves its full potential when integrated.

**Investment Highlights**
- Massive Market: $300B+ annual disaster losses creating urgent demand
- Proven Model: CSF framework validated across multiple billion-dollar companies
- First Mover: No comparable prevention-first platform exists
- Patent Protection: 12-patent portfolio creating 20-year defensible moat
- High Margins: 70%+ gross margins on software/prevention services

**The Ask**
SafeRoute AI seeks $3.5M CAD in initial funding (preferably non-dilutive) to complete MVP backend integration, launch pilots in 5 Indigenous communities, secure regulatory approvals, establish partnerships, and file remaining 8 patents.
    `,
  },
  {
    title: "Company Overview",
    icon: Building,
    color: "from-emerald-500 to-teal-500",
    content: `
**The SafeRoute AI Vision**
SafeRoute AI exists to ensure that no one dies waiting for help. We are building critical infrastructure that transforms emergency response from a reactive cost center into a proactive, self-sustaining system that saves lives, prevents disasters, and strengthens communities.

**Core Mission & Values**
Our Mission: "Some go first where it is most CONVENIENT. We go first where we are most NEEDED."

Core Objectives:
1. SAVE LIVES - Connect people to emergency help in seconds, not minutes
2. Get people to safety - Dynamic evacuation routing that adapts in real-time
3. Get rescue services to those who cannot get to safety - Bidirectional communication and location sharing
4. Coordinate post-disaster relief - Unified system for communities, responders, and government
5. Open communication pathways - Connect all stakeholders

**Core Values:**
- Life First: Every decision prioritizes saving lives and reducing suffering
- Indigenous Leadership: Centering Indigenous governance, knowledge, and economic participation
- Universal Access: Core emergency features remain free to all civilians forever
- Verified Impact: All outcomes are measurable, auditable, and transparent
- Sustainable Economics: Prevention funds itself through demonstrated value creation
- Global Responsibility: Canadian innovation solving worldwide challenges
- Data Sovereignty: Respecting Indigenous data governance through OCAP® principles

**Strategic Positioning**
SafeRoute AI is positioned at the convergence of three megatrends:
1. Climate Crisis Acceleration: Increasing frequency and severity of natural disasters
2. Indigenous Reconciliation: Growing recognition of Indigenous rights and knowledge systems
3. Digital Transformation: Widespread adoption of AI, IoT, and satellite connectivity
    `,
  },
  {
    title: "Market Opportunity",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    content: `
**The Global Emergency Response Crisis**

**The Human Cost**
- 500,000+ preventable deaths annually from delayed emergency response globally
- 35,000 preventable deaths per year in Canada alone from cardiac arrest, trauma, and delayed care
- 2.4 billion people affected by disasters in the last decade
- Emergency services hours away from remote locations in many regions

**The Economic Burden**
- $300+ billion in annual global disaster losses
- $275 billion in 2022 disaster damages (single year record)
- Recovery costs climbing each year with climate change acceleration
- 4-7x ROI on prevention investments (World Bank, UNDRR)

**The Infrastructure Gap**
- 70% of rural/remote communities lack adequate emergency systems
- $349 billion Indigenous infrastructure funding gap in Canada by 2030 (Assembly of First Nations)
- 85% of disaster spending occurs after events, not on prevention

**The Fraud Crisis in Disaster Relief**
- $1B+ annually lost to disaster relief fraud and scams globally
- 48 hours - Average time for fake donation sites to appear after major disasters
- 65% of disaster victims report encountering relief-related fraud attempts
- No centralized verification system exists for legitimate relief efforts

**Market Size & Growth Dynamics**

Total Addressable Market (TAM):
- Global Emergency Response: $177.7B (2025) → $244.4B (2030) - 6.6% CAGR
- Homeland Security & Emergency Management: $631.4B (2023) → $914.1B (2030) - 5.4% CAGR
- Next-Gen Emergency Systems: $2.77B (2025) → $3.94B (2030) - 7.3% CAGR
- Energy-as-a-Service (Comparable): $77.6B → $145B (2030) - 12% CAGR

**Canadian Market Opportunity**
- Emergency Management Market: $4.2B annually in 2025, projected CAGR of 6.8% through 2030
- Indigenous Services Canada: $16.48B invested, with $349B gap remaining
- Disaster Mitigation and Adaptation Fund (DMAF): $4.2B committed since 2018
    `,
  },
  {
    title: "The SafeRoute Solution",
    icon: Zap,
    color: "from-cyan-500 to-blue-500",
    content: `
**Technology Architecture - The Emergency Response Technology Stack**

SafeRoute AI's platform consists of 12 patented modules plus supporting technologies that work independently or as an integrated system.

**Complete Patent Portfolio (12 Core + Supporting Technologies)**

**Filed Patents (4):**
1. SafeRoute AI (FILED) - Master platform orchestrating all emergency response
2. SafeRoute OS (FILED) - Backend system managing multi-portal operations
3. HERO™ CP (FILED) - AI-guided first aid for civilians
4. HERO™ OS (FILED) - Professional responder coordination system

**Ready for Filing (8):**
5. RAPTRnav™ - Satellite-optimized evacuation routing with real-time adaptation
6. ShareSafe™ - Encrypted, consent-based medical and scene data transfer
7. SkyBridge™ - Multi-layer fallback communications (LTE → mesh → satellite → beacon)
8. LAB™ System - Last Active Beacon for encrypted location tracking
9. LOGIQ™ - Evidence-based learning engine updating medical protocols
10. VITALsync™ - Real-time synchronization between field and hospitals
11. BodyGuard™ - Government-facing civic alert and evacuation infrastructure
12. Community Governance Interface - OCAP®-aligned data sovereignty layer

**Supporting Technologies:**
- DOROTHY™ - Dynamic Orchestrated Routing for Optimal Tactical Hazard Yield
- Mesh Networking SDK - Hardware integration layer
- Elder Portal - Indigenous leadership systems integration
- Disaster Risk Mapping - Predictive analytics and prevention
- Community Training OS - Scalable education platform
- Multi-Agency Coordination - Cross-jurisdictional response management

**What SafeRoute AI Will Enable**

**Emergency Response & First Aid (HERO™ System)**
- Connect civilians to first responders in seconds via video, voice, or chat
- Guide untrained bystanders through CPR with VR overlays and step-by-step instructions
- Locate nearest AEDs with real-time mapping and turn-by-turn directions
- Share vital medical information securely through ShareSafe™ portal
- Transmit location and medical data directly to 911 and responding units

**Dynamic Evacuation & Navigation (RAPTRnav™)**
- Real-time disaster navigation that adapts as conditions change
- Satellite-optimized routing when cell towers fail
- Multi-route planning avoiding danger zones
- Traditional territory overlays with Indigenous place names
- Family reunification point coordination

**Indigenous-Led Innovation Model**
SafeRoute AI is the first global emergency platform to structurally embed Indigenous leadership and governance through formal partnerships, governance structures, and economic opportunities.
    `,
  },
  {
    title: "Business Model",
    icon: DollarSign,
    color: "from-green-600 to-emerald-600",
    content: `
**Revenue Architecture**

SafeRoute AI employs a diversified, recurring revenue model designed for scalability, resilience, and measurable impact:

**Revenue Streams:**
1. **Community Success Fees (CSF)** - Payment for verified prevention outcomes (5-10% of verified savings, 85% margin, Annual/Per-Event)
2. **Government Licensing** - Platform access for agencies ($50K-500K/year per agency, 90% margin, Annual)
3. **Insurance Partnerships** - Shared savings from reduced claims (15-25% of claim reduction, 80% margin, Annual)
4. **Enterprise Solutions** - Corporate emergency systems ($100K-1M/year, 75% margin, Multi-year)
5. **Fraud Prevention Services** - Verified relief ecosystem ($5K-25K/org + 0.5-1% transactions, 92% margin)
6. **Subscription Services** - Civilian and responder apps ($4.99/month premium, 95% margin, Monthly)

**Community Success Fee (CSF) Framework**

The CSF model transforms disaster prevention into a sustainable economic engine:

**How It Works:**
1. Baseline Establishment: Historical disaster costs documented
2. Deployment & Prevention: SafeRoute systems implemented
3. Outcome Measurement: Reduction tracked using IoT, AI, and satellite verification
4. Independent Verification: Third-party validation of results
5. Payment Trigger: Invoice issued for agreed percentage of verified savings
6. Revenue Sharing: Portion flows back to Indigenous communities

**Example Calculations:**
- Wildfire Prevention - BC Indigenous Community: $10M historical cost → $5M with SafeRoute → $5M savings → 8% CSF rate → $400K annual revenue
- Flood Mitigation - Northern Community: $8M → $2M → $6M savings → 7% CSF → $420K annual revenue

**Proven Economic Precedents**

The CSF model mirrors performance-based finance structures already thriving:
- Ameresco (Energy): $1.3B+ annual revenue
- Vitality Life (Insurance): $8B+ market value
- Forest Resilience Bond (Environment): $25M+ in California
- Veolia (Water): $45B revenue
- DC Water (Municipal): $25M+ bonds

**Financial Projections**

Year 1: 5 Communities, $2.0M Revenue
Year 2: 25 Communities, $5.4M Revenue (170% Growth)
Year 3: 100 Communities, $12.8M Revenue (137% Growth)
Year 4: 250 Communities, $23.7M Revenue (85% Growth)
Year 5: 500 Communities, $39.5M Revenue (67% Growth)

**Unit Economics & Scalability**
- Per Community Deployment: $50K setup, $25K annual operating, $200K CSF revenue → 62.5% gross margin
- At Scale (100+ deployments): $15K setup, $10K operating, $250K revenue → 94% gross margin
- CLV/CAC Ratio: 75x by Year 5
    `,
  },
  {
    title: "Go-to-Market Strategy",
    icon: MapPin,
    color: "from-purple-500 to-pink-500",
    content: `
**Launch Geography & Sequencing**

**Phase 1: Canadian Launch (Months 0-18)**

**Primary Target: Indigenous Communities**
- 600+ First Nations communities across Canada
- Direct federal funding available through ISC programs
- Highest need and impact potential
- Aligned with reconciliation priorities

**Secondary Target: Rural Municipalities**
- 3,000+ communities under 10,000 population
- Limited emergency infrastructure
- Provincial funding programs available

**Initial Focus Regions:**
- British Columbia (wildfire zones, Indigenous partnerships)
- Alberta (resource sector, rural communities)
- Northern Territories (extreme remoteness, Indigenous majority)

**Phase 2: North American Expansion (Years 2-3)**

**United States Entry**
- 574 federally recognized tribes
- Southwest focus (high wildfire risk, large Indigenous populations)
- Partner with FEMA and state emergency agencies
- Leverage NAFTA/USMCA frameworks

**Strategic Approach:**
- Begin with Native American reservations
- Expand to rural counties with disaster history
- Target states with progressive emergency policies
- Partner with RapidSOS for 911 integration nationwide

**Phase 3: Global Deployment (Years 3-5)**

**Priority Markets:**
1. Australia/New Zealand - Similar Indigenous contexts, high disaster risk
2. Northern Europe - Advanced emergency systems, prevention focus
3. Emerging Markets - UN/World Bank funded deployments

**Partnership Acceleration Strategy**

**Primary Channels:**
- Government & Indigenous Councils: Direct engagement with Indigenous Services Canada ($340M+ emergency management budget)
- Telecom Providers: Rogers, TELUS, Starlink for national reach
- Emergency Integration Partners: RapidSOS (99% US coverage), FirstNet, Everbridge
- Insurance Carriers: Focus on property insurers in high-risk areas

**Pilot Program Strategy**

**Community Selection Criteria:**
- High disaster risk profile (wildfire, flood, isolation)
- Strong Indigenous leadership and governance
- Federal/provincial funding eligibility
- Willingness to co-design solutions
- Data sharing agreements in place (OCAP® compliant)

**Pilot Objectives:**
- Demonstrate 25% response time improvement
- Verify prevention cost savings of $250K+ per community
- Gather user testimonials and case studies
- Document best practices for scaling
- Create replicable deployment model

**Key Performance Indicators**
- Target 60%+ adoption in pilot communities within 3 months
- 25% reduction in response times
- 30% decrease in preventable incidents
- CAC < $25,000 per community
- 95% annual retention rate
    `,
  },
  {
    title: "Competitive Advantage",
    icon: Award,
    color: "from-indigo-500 to-purple-500",
    content: `
**Market Positioning - Green-Space Leadership**

SafeRoute AI operates in a green-space market with no direct competitors offering our complete integrated solution:

**Unique Advantages:**
- **Prevention Payment Model**: Built-in CSF vs. None (First to market with proven economics)
- **Indigenous Governance**: Structural integration vs. Token consultation (True partnership and ownership)
- **Offline Capability**: Complete offline operation vs. Partial/None (Works when infrastructure fails)
- **Modular Architecture**: 12 independent modules vs. Monolithic systems (Flexible deployment and scaling)
- **Patent Protection**: 12-patent portfolio vs. Limited IP (20-year defensible moat)
- **Verification Systems**: IoT/AI/Satellite vs. Manual reporting (Automated, trusted outcomes)
- **Fraud Prevention**: Built-in verified relief vs. None (Only platform with anti-fraud infrastructure)

**Unique Anti-Fraud Position**

SafeRoute AI as the Trusted Disaster Response Hub - We are uniquely positioned to solve the $1B+ annual disaster fraud problem:

- **Central Authority**: As the emergency response platform, we're already the first point of contact
- **Verification Infrastructure**: Our existing identity and credential systems extend naturally to relief workers
- **Community Trust**: Indigenous governance provides local verification that remote organizations can't match
- **Real-time Capability**: Our platform already tracks resources, people, and needs in real-time
- **Government Integration**: Official partnerships make us the natural verification authority

**Defensible Moat**

**1. Patent Fortress (20-Year Protection)**
- 12 core patents covering entire emergency response stack
- Broad claims on methods and systems
- Blocking patents on key integration points
- Trade secrets on implementation details

**2. Network Effects**
- Each deployment strengthens platform value
- Community data improves AI models
- Responder training creates switching costs
- Government integration creates lock-in

**3. Indigenous Trust & Relationships**
- Years of relationship building
- Cultural alignment and respect
- Formal governance structures
- Cannot be quickly replicated by competitors

**4. Data & Learning Advantages**
- Proprietary emergency response data
- Traditional knowledge integration
- Continuous learning from deployments
- Verification data for CSF model

**5. Regulatory & Compliance Barriers**
- OCAP® compliance for Indigenous data
- Medical protocol certifications
- Government security clearances
- Multi-jurisdiction approvals

**Strategic Partnerships**

Key partnerships in development:
- **Rogers**: National connectivity provider (Distribution to 11M+ customers, 5G infrastructure)
- **Starlink**: Satellite coverage (Global reach, offline capability)
- **RapidSOS**: 911 integration (Instant access to 99% of US dispatchers)
- **First Nations Health Authority**: Indigenous health (Credibility, adoption, funding access)
- **Indigenous Services Canada**: Federal funding ($340M+ emergency management budget)

**Competitive Advantages Summary**

**First-Mover Advantages:**
- First prevention-payment model in emergency response
- First Indigenous-governed emergency platform
- First fully offline-capable comprehensive solution

**Structural Advantages:**
- Modular architecture allows partial adoption
- Multiple revenue streams reduce risk
- Community ownership increases retention

**Sustainable Advantages:**
- Indigenous partnerships built on trust
- Patent protection for 20 years
- Network effects compound over time
- Switching costs increase with integration
    `,
  },
  {
    title: "Financial Projections",
    icon: BarChart3,
    color: "from-teal-500 to-green-500",
    content: `
**Five-Year Revenue Forecast**

| Year | Communities | CSF Revenue | Licensing | Subscriptions | Other | Total Revenue | Growth |
|------|-------------|-------------|-----------|---------------|-------|---------------|---------|
| Year 1 | 5 | $0.5M | $0.8M | $0.2M | $0.5M | $2.0M | - |
| Year 2 | 25 | $1.5M | $2.0M | $0.6M | $1.3M | $5.4M | 170% |
| Year 3 | 100 | $4.0M | $4.5M | $1.5M | $2.8M | $12.8M | 137% |
| Year 4 | 250 | $8.0M | $8.0M | $3.0M | $4.7M | $23.7M | 85% |
| Year 5 | 500 | $15.0M | $12.0M | $5.0M | $7.5M | $39.5M | 67% |

**Operating Expenses**

| Year | R&D | Sales & Marketing | Operations | G&A | Total OpEx | % of Revenue |
|------|-----|-------------------|------------|-----|------------|--------------|
| Year 1 | $0.8M | $0.3M | $0.4M | $0.3M | $1.8M | 90% |
| Year 2 | $1.5M | $0.8M | $1.0M | $0.6M | $3.9M | 72% |
| Year 3 | $2.5M | $1.8M | $2.0M | $1.2M | $7.5M | 59% |
| Year 4 | $3.5M | $3.0M | $3.5M | $2.0M | $12.0M | 51% |
| Year 5 | $4.5M | $4.5M | $5.0M | $3.0M | $17.0M | 43% |

**Path to Profitability**

| Metric | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|--------|--------|--------|--------|--------|--------|
| Revenue | $2.0M | $5.4M | $12.8M | $23.7M | $39.5M |
| Gross Profit | $1.4M | $4.1M | $10.2M | $19.5M | $33.6M |
| Gross Margin | 70% | 76% | 80% | 82% | 85% |
| Operating Income | $(0.4M) | $0.2M | $2.7M | $7.5M | $16.6M |
| EBITDA | $(0.2M) | $0.5M | $3.3M | $8.5M | $18.1M |
| EBITDA Margin | -10% | 9% | 26% | 36% | 46% |
| Cash Flow Positive | Month 18 | ✓ | ✓ | ✓ | ✓ |

**Key Business Metrics**

| Metric | Year 1 | Year 3 | Year 5 |
|--------|--------|--------|--------|
| Annual Recurring Revenue (ARR) | $1.5M | $10M | $35M |
| Customer Acquisition Cost (CAC) | $60K | $25K | $10K |
| Customer Lifetime Value (CLV) | $200K | $500K | $750K |
| CLV/CAC Ratio | 3.3x | 20x | 75x |
| Monthly Burn Rate | $150K | $625K | Profitable |
| Gross Margin | 70% | 80% | 85% |
| Customer Retention | - | 95% | 98% |

**Funding Requirements & Use of Funds**

**Total Funding Need: $3.5M CAD**

| Category | Amount | Percentage | Specific Use |
|----------|--------|------------|--------------|
| Product Development | $1.6M | 45% | Backend completion, API integration, remaining 15-30% development |
| Pilot Deployments | $0.9M | 25% | 5 Indigenous communities, training, support, equipment |
| Compliance & Validation | $0.5M | 15% | Regulatory approvals, security audits, medical certification |
| Partnership Activation | $0.35M | 10% | Rogers/Starlink integration, RapidSOS connection |
| Operating Reserve | $0.15M | 5% | Working capital, contingencies |

**Return on Investment**

**Financial Returns (5-Year):**
- Revenue Multiple: 20x on initial investment
- IRR: 85%+
- Exit Valuation: $500M-1B (12-15x revenue multiple)
- Break-even: Month 18

**Impact Returns:**
- Lives Saved: 10,000+ over 5 years
- Economic Value: $500M+ in prevented losses
- Jobs Created: 1,000+ direct, 5,000+ indirect
- Communities Served: 500+ with critical infrastructure

**Revenue Mix Target (5 Years):**
- 38% Community Success Fees (CSF)
- 30% Government/Enterprise Licensing
- 13% Subscription Services
- 10% Insurance Partnerships
- 9% Other (Training, Data, Partnerships, Carbon Credits)
    `,
  },
  {
    title: "Implementation Roadmap",
    icon: Lightbulb,
    color: "from-orange-500 to-red-500",
    content: `
**Current Status - De-Risking Through Progress**

**Already Completed:**
✅ 70-85% of civilian-facing interfaces complete
✅ 100% of front-end design for core portals
✅ 4 foundational patents filed
✅ Medical protocols validated by physician advisory board
✅ Technical architecture designed for 20+ year sustainability
✅ UI/UX optimized for Indigenous communities and high-stress scenarios
✅ Backend architecture scoped with technical specifications ready

**Ready for Immediate Action:**
- 8 additional patents ready for filing
- Indigenous medical advisory network in place
- Rogers, Starlink, and RapidSOS pre-identified as partners
- IRAP and federal grant processes initiated

**Implementation Timeline**

**Phase 1: Foundation (Months 0-6)**

**Q1 2026**
- Secure funding (grants preferred, strategic investment backup)
- Complete backend integration (15-30% remaining)
- File remaining 8 patents
- Establish Indigenous Advisory Council
- Formalize first 3 pilot community agreements

**Q2 2026**
- Deploy MVP in first 2 Indigenous communities
- Integrate offline sync engine
- Complete security audit and compliance certification
- Launch HERO Mode™, RAPTRnav™, ShareSafe™ modules
- Begin responder training programs

**Phase 2: Pilot & Validation (Months 6-12)**

**Q3 2026**
- Expand to 5 total pilot communities
- Gather performance and impact data
- Iterate based on community feedback
- Sign Rogers and Starlink partnership agreements
- Complete OCAP® compliance features

**Q4 2026**
- Launch first Community Success Fee contracts
- Verify prevention savings with insurers/government
- Document best practices and case studies
- Finalize Series A investor materials
- Achieve first revenue milestone ($500K)

**Phase 3: Scale Preparation (Months 12-18)**

**Q1 2027**
- National launch across Canada
- 25 community deployments
- Hospital integration module launch
- Insurance partnerships activated
- Hire key leadership (CTO, COO, VP Indigenous Partnerships)

**Q2 2027**
- Begin US pilot programs
- Launch premium subscription service
- Implement credential tracking system
- Expand to 50+ communities
- Close Series A funding (if needed)

**Phase 4: North American Expansion (Months 18-36)**

**2027-2028**
- US commercial launch
- 100+ community deployments
- White-label offerings for governments
- NGO and relief agency integrations
- International partnership development

**Phase 5: Global Leadership (Years 3-5)**

**2029-2030**
- Deploy in Australia, New Zealand, Europe
- 500+ communities globally
- UN and World Bank partnerships
- Carbon credit monetization
- IPO preparation or strategic exit

**Key Milestones & Success Metrics**

| Milestone | Target Date | Success Criteria |
|-----------|-------------|------------------|
| MVP Complete | Month 3 | All modules functional, tested |
| First Pilot Live | Month 4 | Community adoption >60% |
| CSF Contract Signed | Month 9 | First prevention payment secured |
| Cash Flow Positive | Month 18 | Monthly revenue exceeds burn |
| 100 Communities | Month 24 | National presence established |
| US Launch | Month 30 | Cross-border operations |
| Profitability | Month 36 | EBITDA positive operations |

**Risk Mitigation Checkpoints**

**Monthly Reviews:**
- Technical development progress
- Community engagement metrics
- Regulatory compliance status
- Partnership negotiations
- Financial burn rate

**Quarterly Gates:**
- Go/No-go decisions on expansion
- Funding requirement assessments
- Strategic pivot evaluations
- Performance against KPIs
    `,
  },
  {
    title: "Management & Governance",
    icon: Users,
    color: "from-pink-500 to-rose-500",
    content: `
**Leadership Team**

**Current Leadership**

**Sundeep Singh Gill - Founder & Chief Executive Officer**
- Inventor of SafeRoute AI's 12-patent emergency response portfolio
- 15+ years in healthcare technology and medical device sales
- Deep expertise in hospital systems and critical care equipment
- Extensive network in emergency services and Indigenous health
- Former hospital medical equipment specialist
- Leads product vision, partnerships, and IP strategy

**Immediate Key Hires (0-6 Months)**

**Chief Technology Officer (CTO)**
- Lead system architecture and platform development
- Manage 12-patent IP portfolio and R&D initiatives
- Oversee backend completion and API integrations
- Scale engineering team from 5 to 25+ developers
- 10+ years emergency/healthcare tech required

**Chief Operating Officer (COO)**
- Oversee deployment and implementation across communities
- Manage strategic partnerships (Rogers, Starlink, RapidSOS)
- Drive operational excellence and scaling processes
- Build deployment teams across regions
- Indigenous community experience preferred

**VP Indigenous Partnerships**
- Build and maintain relationships with 600+ Indigenous communities
- Ensure cultural alignment and governance integration
- Lead reconciliation and economic participation initiatives
- Manage Indigenous Advisory Council
- Must have deep Indigenous community trust

**Advisory Structure**

**Medical Advisory Board (Established)**
- 4+ Emergency Medicine Physicians providing clinical validation
- Includes physicians with Indigenous health leadership roles
- First Nations Health Authority representation
- Continuous validation of all medical protocols
- Integration of traditional healing practices

**Indigenous Advisory Council (Forming)**
- Chiefs and designated community representatives
- Elder council with advisory authority
- Indigenous emergency management professionals
- Traditional knowledge keepers (compensated)
- Youth representatives for multi-generational planning

**Strategic Advisory Board (To Be Appointed)**
- Former government emergency management officials
- Telecom and satellite industry executives
- Insurance industry leaders
- International disaster relief experts
- Technology and AI specialists

**Organizational Structure**

- **Sundeep Singh Gill - Founder & Chief Executive Officer**
  - Inventor of SafeRoute AI's 12-patent emergency response portfolio
  - 15+ years in healthcare technology and medical device sales
  - Deep expertise in hospital systems and critical care equipment
  - Extensive network in emergency services and Indigenous health
  - Former hospital medical equipment specialist
  - Leads product vision, partnerships, and IP strategy

- **Chief Technology Officer (CTO)**
  - Lead system architecture and platform development
  - Manage 12-patent IP portfolio and R&D initiatives
  - Oversee backend completion and API integrations
  - Scale engineering team from 5 to 25+ developers
  - 10+ years emergency/healthcare tech required

- **Chief Operating Officer (COO)**
  - Oversee deployment and implementation across communities
  - Manage strategic partnerships (Rogers, Starlink, RapidSOS)
  - Drive operational excellence and scaling processes
  - Build deployment teams across regions
  - Indigenous community experience preferred

- **VP Indigenous Partnerships**
  - Build and maintain relationships with 600+ Indigenous communities
  - Ensure cultural alignment and governance integration
  - Lead reconciliation and economic participation initiatives
  - Manage Indigenous Advisory Council
  - Must have deep Indigenous community trust

- **Medical Advisory Board (Established)**
  - 4+ Emergency Medicine Physicians providing clinical validation
  - Includes physicians with Indigenous health leadership roles
  - First Nations Health Authority representation
  - Continuous validation of all medical protocols
  - Integration of traditional healing practices

- **Indigenous Advisory Council (Forming)**
  - Chiefs and designated community representatives
  - Elder council with advisory authority
  - Indigenous emergency management professionals
  - Traditional knowledge keepers (compensated)
  - Youth representatives for multi-generational planning

- **Strategic Advisory Board (To Be Appointed)**
  - Former government emergency management officials
  - Telecom and satellite industry executives
  - Insurance industry leaders
  - International disaster relief experts
  - Technology and AI specialists
    `,
  },
]

export default function BusinessPlanPage() {
  const [activeSection, setActiveSection] = useState(null)

  const toggleSection = (sectionTitle) => {
    setActiveSection(activeSection === sectionTitle ? null : sectionTitle)
  }

  return (
    <div className="bg-white p-4">
      <UniversalNavigation />
      <div className="mt-8">
        {businessPlanSections.map((section) => (
          <div key={section.title} className="mb-8">
            <Button
              onClick={() => toggleSection(section.title)}
              className={`w-full flex items-center justify-between ${section.color}`}
            >
              <section.icon className="h-6 w-6 mr-2" />
              <span className="text-lg font-bold">{section.title}</span>
              {activeSection === section.title ? (
                <ChevronDown className="h-6 w-6" />
              ) : (
                <ChevronRight className="h-6 w-6" />
              )}
            </Button>
            {activeSection === section.title && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Action Buttons */}
      <div className="text-center mt-12">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3"
            onClick={() => window.open("/SafeRoute-AI-Business-Plan-v3.0.pdf", "_blank")}
          >
            <FileText className="w-5 h-5 mr-2" />
            Download PDF Business Plan (68 Pages)
          </Button>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3">
            <FileText className="w-5 h-5 mr-2" />
            View Interactive Version
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-3"
            onClick={() => (window.location.href = "/dev-progress")}
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Development Progress
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 bg-transparent">
            Schedule Presentation
          </Button>
        </div>

        {/* Mission Statement */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl max-w-4xl mx-auto">
          <blockquote className="text-xl font-semibold text-blue-200 mb-2">
            "Some go first where it is most CONVENIENT. We go first where we are most NEEDED."
          </blockquote>
          <p className="text-gray-300 text-sm">Building the Future of Emergency Response - SafeRoute AI</p>
        </div>
      </div>
    </div>
  )
}
