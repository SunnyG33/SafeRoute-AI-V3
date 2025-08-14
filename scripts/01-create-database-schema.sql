-- SafeRoute AI Database Schema
-- Foundation for Emergency Response Coordination Platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- User Types and Authentication
CREATE TYPE user_role AS ENUM ('citizen', 'elder', 'responder', 'government', 'admin');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'pending');

-- Users table with role-based access
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role user_role NOT NULL DEFAULT 'citizen',
    status user_status NOT NULL DEFAULT 'pending',
    
    -- Personal Information
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    preferred_name VARCHAR(100),
    date_of_birth DATE,
    
    -- Location and Territory
    current_location GEOGRAPHY(POINT, 4326),
    home_territory VARCHAR(255),
    traditional_territory VARCHAR(255),
    
    -- Indigenous Governance (OCAP Compliance)
    is_indigenous BOOLEAN DEFAULT FALSE,
    nation_affiliation VARCHAR(255),
    band_number VARCHAR(50),
    elder_status BOOLEAN DEFAULT FALSE,
    cultural_permissions JSONB DEFAULT '{}',
    
    -- Emergency Profile
    medical_conditions TEXT[],
    emergency_contacts JSONB DEFAULT '[]',
    accessibility_needs TEXT[],
    preferred_language VARCHAR(10) DEFAULT 'en',
    
    -- System Fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active TIMESTAMP WITH TIME ZONE,
    
    -- Verification
    verified_at TIMESTAMP WITH TIME ZONE,
    verification_documents JSONB DEFAULT '[]'
);

-- Responder specific information
CREATE TABLE responders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Certifications and Skills
    certifications TEXT[],
    skills TEXT[],
    specializations TEXT[],
    experience_years INTEGER DEFAULT 0,
    
    -- Availability and Status
    is_available BOOLEAN DEFAULT TRUE,
    current_status VARCHAR(50) DEFAULT 'off_duty',
    max_response_distance INTEGER DEFAULT 50, -- kilometers
    
    -- Equipment and Resources
    equipment_available TEXT[],
    vehicle_type VARCHAR(100),
    has_medical_supplies BOOLEAN DEFAULT FALSE,
    
    -- Performance Metrics
    response_count INTEGER DEFAULT 0,
    average_response_time INTERVAL,
    rating DECIMAL(3,2) DEFAULT 5.00,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Government Users and Agencies
CREATE TABLE government_agencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    agency_type VARCHAR(100), -- federal, provincial, municipal, indigenous_nation
    jurisdiction VARCHAR(255),
    contact_info JSONB DEFAULT '{}',
    
    -- Indigenous Nation Specific
    nation_name VARCHAR(255),
    treaty_number VARCHAR(50),
    traditional_territory GEOGRAPHY(POLYGON, 4326),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE government_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    agency_id UUID REFERENCES government_agencies(id),
    
    position_title VARCHAR(255),
    department VARCHAR(255),
    clearance_level VARCHAR(50),
    permissions JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Incident Management System
CREATE TYPE incident_status AS ENUM ('reported', 'dispatched', 'in_progress', 'resolved', 'closed');
CREATE TYPE incident_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE incident_type AS ENUM ('medical', 'fire', 'flood', 'accident', 'missing_person', 'other');

CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Basic Information
    type incident_type NOT NULL,
    priority incident_priority NOT NULL DEFAULT 'medium',
    status incident_status NOT NULL DEFAULT 'reported',
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Location Information
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    address TEXT,
    what3words VARCHAR(50),
    traditional_territory VARCHAR(255),
    
    -- Reporting Information
    reported_by UUID REFERENCES users(id),
    reported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Assignment and Response
    assigned_responders UUID[],
    dispatched_at TIMESTAMP WITH TIME ZONE,
    arrived_at TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    
    -- Cultural Considerations (OCAP Compliance)
    involves_indigenous_territory BOOLEAN DEFAULT FALSE,
    cultural_protocols_required BOOLEAN DEFAULT FALSE,
    elder_approval_needed BOOLEAN DEFAULT FALSE,
    elder_approved_by UUID REFERENCES users(id),
    elder_approved_at TIMESTAMP WITH TIME ZONE,
    
    -- Media and Documentation
    photos TEXT[],
    documents TEXT[],
    audio_recordings TEXT[],
    
    -- System Fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LAB (Last Active Beacon) System
CREATE TABLE lab_beacons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    incident_id UUID REFERENCES incidents(id),
    
    -- Location Data
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    accuracy_meters DECIMAL(10,2),
    altitude_meters DECIMAL(10,2),
    
    -- Beacon Status
    is_active BOOLEAN DEFAULT TRUE,
    battery_level INTEGER, -- percentage
    signal_strength INTEGER, -- percentage
    
    -- Emergency Context
    is_emergency BOOLEAN DEFAULT FALSE,
    emergency_type VARCHAR(100),
    auto_generated BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    beacon_time TIMESTAMP WITH TIME ZONE NOT NULL,
    received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Real-time Communication System
CREATE TYPE message_type AS ENUM ('text', 'voice', 'image', 'location', 'status_update', 'alert');
CREATE TYPE message_priority AS ENUM ('low', 'normal', 'high', 'urgent');

CREATE TABLE communications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Message Details
    type message_type NOT NULL DEFAULT 'text',
    priority message_priority NOT NULL DEFAULT 'normal',
    subject VARCHAR(255),
    content TEXT,
    
    -- Participants
    sender_id UUID REFERENCES users(id),
    recipient_ids UUID[],
    incident_id UUID REFERENCES incidents(id),
    
    -- Delivery and Status
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    delivered_at TIMESTAMP WITH TIME ZONE,
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- Media Attachments
    attachments JSONB DEFAULT '[]',
    
    -- Cultural Compliance
    requires_elder_approval BOOLEAN DEFAULT FALSE,
    elder_approved BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Traditional Territory and Cultural Data
CREATE TABLE traditional_territories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Territory Information
    name VARCHAR(255) NOT NULL,
    traditional_name VARCHAR(255),
    nation_name VARCHAR(255),
    
    -- Geographic Boundaries
    boundary GEOGRAPHY(POLYGON, 4326),
    center_point GEOGRAPHY(POINT, 4326),
    
    -- Cultural Information
    languages TEXT[],
    cultural_protocols TEXT[],
    sacred_sites GEOGRAPHY(MULTIPOINT, 4326),
    
    -- Governance
    elder_contacts UUID[],
    governance_structure JSONB DEFAULT '{}',
    
    -- OCAP Compliance
    data_sharing_permissions JSONB DEFAULT '{}',
    access_restrictions TEXT[],
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emergency Resources and Assets
CREATE TABLE emergency_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Resource Information
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100), -- aed, hospital, fire_station, police, shelter
    description TEXT,
    
    -- Location
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    address TEXT,
    
    -- Availability
    is_available BOOLEAN DEFAULT TRUE,
    operating_hours JSONB DEFAULT '{}',
    capacity INTEGER,
    current_usage INTEGER DEFAULT 0,
    
    -- Contact Information
    contact_info JSONB DEFAULT '{}',
    
    -- Cultural Considerations
    indigenous_friendly BOOLEAN DEFAULT FALSE,
    cultural_services TEXT[],
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for Performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_location ON users USING GIST(current_location);
CREATE INDEX idx_users_territory ON users(traditional_territory);

CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_incidents_location ON incidents USING GIST(location);
CREATE INDEX idx_incidents_priority ON incidents(priority);
CREATE INDEX idx_incidents_created ON incidents(created_at);

CREATE INDEX idx_lab_beacons_user ON lab_beacons(user_id);
CREATE INDEX idx_lab_beacons_location ON lab_beacons USING GIST(location);
CREATE INDEX idx_lab_beacons_active ON lab_beacons(is_active);

CREATE INDEX idx_communications_incident ON communications(incident_id);
CREATE INDEX idx_communications_sender ON communications(sender_id);

CREATE INDEX idx_territories_boundary ON traditional_territories USING GIST(boundary);
CREATE INDEX idx_resources_location ON emergency_resources USING GIST(location);
CREATE INDEX idx_resources_type ON emergency_resources(type);

-- Row Level Security (RLS) for OCAP Compliance
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE traditional_territories ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (will be expanded)
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Incidents visible to involved parties" ON incidents
    FOR SELECT USING (
        reported_by = auth.uid() OR 
        auth.uid() = ANY(assigned_responders) OR
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('government', 'elder', 'admin'))
    );
