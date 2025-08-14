-- SafeRoute AI Database Functions
-- Supporting functions for emergency response operations

-- Function to find nearest emergency resources
CREATE OR REPLACE FUNCTION find_nearest_resources(
    user_lat DECIMAL,
    user_lng DECIMAL,
    resource_type TEXT,
    max_distance_km INTEGER DEFAULT 50
)
RETURNS TABLE (
    id UUID,
    name VARCHAR(255),
    type VARCHAR(100),
    address TEXT,
    distance_km DECIMAL,
    is_available BOOLEAN,
    contact_info JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        er.id,
        er.name,
        er.type,
        er.address,
        ROUND(
            ST_Distance(
                er.location::geometry,
                ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geometry
            ) / 1000, 2
        ) AS distance_km,
        er.is_available,
        er.contact_info
    FROM emergency_resources er
    WHERE er.type = resource_type
    AND er.is_available = true
    AND ST_DWithin(
        er.location::geometry,
        ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geometry,
        max_distance_km * 1000
    )
    ORDER BY distance_km ASC
    LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- Function to check if location is within traditional territory
CREATE OR REPLACE FUNCTION check_traditional_territory(
    check_lat DECIMAL,
    check_lng DECIMAL
)
RETURNS TABLE (
    territory_name VARCHAR(255),
    nation_name VARCHAR(255),
    cultural_protocols TEXT[],
    elder_contacts UUID[]
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        tt.name,
        tt.nation_name,
        tt.cultural_protocols,
        tt.elder_contacts
    FROM traditional_territories tt
    WHERE ST_Contains(
        tt.boundary::geometry,
        ST_SetSRID(ST_MakePoint(check_lng, check_lat), 4326)::geometry
    );
END;
$$ LANGUAGE plpgsql;

-- Function to calculate response time estimates
CREATE OR REPLACE FUNCTION calculate_response_time(
    responder_lat DECIMAL,
    responder_lng DECIMAL,
    incident_lat DECIMAL,
    incident_lng DECIMAL,
    transport_type TEXT DEFAULT 'vehicle'
)
RETURNS INTERVAL AS $$
DECLARE
    distance_km DECIMAL;
    speed_kmh INTEGER;
    estimated_minutes INTEGER;
BEGIN
    -- Calculate distance
    distance_km := ST_Distance(
        ST_SetSRID(ST_MakePoint(responder_lng, responder_lat), 4326)::geometry,
        ST_SetSRID(ST_MakePoint(incident_lng, incident_lat), 4326)::geometry
    ) / 1000;
    
    -- Set speed based on transport type
    CASE transport_type
        WHEN 'helicopter' THEN speed_kmh := 200;
        WHEN 'ambulance' THEN speed_kmh := 60;
        WHEN 'fire_truck' THEN speed_kmh := 50;
        WHEN 'police' THEN speed_kmh := 80;
        WHEN 'vehicle' THEN speed_kmh := 60;
        WHEN 'foot' THEN speed_kmh := 5;
        ELSE speed_kmh := 60;
    END CASE;
    
    -- Calculate estimated time in minutes
    estimated_minutes := CEIL((distance_km / speed_kmh) * 60);
    
    -- Add buffer time for preparation and navigation
    estimated_minutes := estimated_minutes + 5;
    
    RETURN MAKE_INTERVAL(mins => estimated_minutes);
END;
$$ LANGUAGE plpgsql;

-- Function to update incident statistics
CREATE OR REPLACE FUNCTION update_incident_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update responder statistics when incident status changes
    IF NEW.status = 'resolved' AND OLD.status != 'resolved' THEN
        UPDATE responders 
        SET 
            response_count = response_count + 1,
            average_response_time = (
                COALESCE(average_response_time, INTERVAL '0') * (response_count - 1) + 
                (NEW.resolved_at - NEW.reported_at)
            ) / response_count
        WHERE user_id = ANY(NEW.assigned_responders);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for incident statistics
CREATE TRIGGER update_incident_stats_trigger
    AFTER UPDATE ON incidents
    FOR EACH ROW
    EXECUTE FUNCTION update_incident_stats();

-- Function to automatically expire old LAB beacons
CREATE OR REPLACE FUNCTION expire_old_lab_beacons()
RETURNS INTEGER AS $$
DECLARE
    expired_count INTEGER;
BEGIN
    UPDATE lab_beacons 
    SET is_active = false
    WHERE is_active = true 
    AND beacon_time < NOW() - INTERVAL '24 hours'
    AND is_emergency = false;
    
    GET DIAGNOSTICS expired_count = ROW_COUNT;
    RETURN expired_count;
END;
$$ LANGUAGE plpgsql;

-- Function to generate incident reports
CREATE OR REPLACE FUNCTION generate_incident_report(
    start_date DATE,
    end_date DATE,
    territory_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
    total_incidents BIGINT,
    resolved_incidents BIGINT,
    average_response_time INTERVAL,
    incidents_by_type JSONB,
    incidents_by_priority JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_incidents,
        COUNT(*) FILTER (WHERE status = 'resolved') as resolved_incidents,
        AVG(resolved_at - reported_at) FILTER (WHERE status = 'resolved') as average_response_time,
        jsonb_object_agg(type, type_count) as incidents_by_type,
        jsonb_object_agg(priority, priority_count) as incidents_by_priority
    FROM (
        SELECT 
            type,
            priority,
            status,
            resolved_at,
            reported_at,
            COUNT(*) OVER (PARTITION BY type) as type_count,
            COUNT(*) OVER (PARTITION BY priority) as priority_count
        FROM incidents 
        WHERE created_at::date BETWEEN start_date AND end_date
        AND (territory_filter IS NULL OR traditional_territory = territory_filter)
    ) subquery;
END;
$$ LANGUAGE plpgsql;
