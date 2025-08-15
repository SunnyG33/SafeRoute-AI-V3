export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          preferred_name: string | null
          phone: string | null
          role: "civilian" | "responder" | "elder" | "government" | "admin"
          status: "active" | "inactive" | "pending"
          is_indigenous: boolean
          elder_status: boolean
          nation_affiliation: string | null
          traditional_territory: string | null
          home_territory: string | null
          current_location: any | null
          emergency_contacts: any | null
          cultural_permissions: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          preferred_name?: string | null
          phone?: string | null
          role?: "civilian" | "responder" | "elder" | "government" | "admin"
          status?: "active" | "inactive" | "pending"
          is_indigenous?: boolean
          elder_status?: boolean
          nation_affiliation?: string | null
          traditional_territory?: string | null
          home_territory?: string | null
        }
        Update: {
          email?: string
          first_name?: string
          last_name?: string
          preferred_name?: string | null
          phone?: string | null
          role?: "civilian" | "responder" | "elder" | "government" | "admin"
          status?: "active" | "inactive" | "pending"
          updated_at?: string
        }
      }
      incidents: {
        Row: {
          id: string
          incident_number: string
          title: string
          description: string
          type: "medical" | "fire" | "search_rescue" | "natural_disaster" | "security" | "other"
          priority: "low" | "medium" | "high" | "critical"
          status: "reported" | "dispatched" | "in_progress" | "resolved" | "cancelled"
          location: any
          address: string | null
          what3words: string | null
          traditional_territory: string | null
          reported_by: string
          reported_at: string
          assigned_responders: string[] | null
          involves_indigenous_territory: boolean
          cultural_protocols_required: boolean
          elder_approval_needed: boolean
          elder_approved_by: string | null
          elder_approved_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          incident_number?: string
          title: string
          description: string
          type: "medical" | "fire" | "search_rescue" | "natural_disaster" | "security" | "other"
          priority?: "low" | "medium" | "high" | "critical"
          status?: "reported" | "dispatched" | "in_progress" | "resolved" | "cancelled"
          location?: any
          address?: string | null
          traditional_territory?: string | null
          reported_by: string
          involves_indigenous_territory?: boolean
          cultural_protocols_required?: boolean
          elder_approval_needed?: boolean
        }
      }
    }
  }
}
