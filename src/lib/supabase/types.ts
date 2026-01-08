export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      solutions: {
        Row: {
          id: string;
          created_at: string;
          slug: string;
          title: string;
      excerpt: string;
      hero_url: string | null;
      pdf_url: string | null;
      problem: string | null;
      solution: string | null;
      benefits: Json | null;
      is_published: boolean;
    };
    Insert: {
      id?: string;
      created_at?: string;
          slug: string;
          title: string;
      excerpt: string;
      hero_url?: string | null;
      pdf_url?: string | null;
      problem?: string | null;
      solution?: string | null;
      benefits?: Json | null;
      is_published?: boolean;
    };
    Update: Partial<Database["public"]["Tables"]["solutions"]["Insert"]>;
  };
      products: {
        Row: {
          id: string;
          created_at: string;
          slug: string;
          name: string;
          category: string | null;
          excerpt: string | null;
          description: string | null;
          usage: string | null;
          unit: string | null;
          price: number | null;
          is_published: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          slug: string;
          name: string;
          category?: string | null;
          excerpt?: string | null;
          description?: string | null;
          usage?: string | null;
          unit?: string | null;
          price?: number | null;
          is_published?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      news: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          excerpt: string | null;
          content: string | null;
          image_url: string | null;
          link_url: string | null;
          sort_order: number | null;
          is_published: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          link_url?: string | null;
          sort_order?: number | null;
          is_published?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["news"]["Insert"]>;
      };
      partners: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          logo_url: string | null;
          website_url: string | null;
          sort_order: number | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          logo_url?: string | null;
          website_url?: string | null;
          sort_order?: number | null;
          is_active?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["partners"]["Insert"]>;
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          url: string;
          is_primary: boolean;
        };
        Insert: {
          id?: string;
          product_id: string;
          url: string;
          is_primary?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["product_images"]["Insert"]>;
      };
      solution_products: {
        Row: {
      solution_id: string;
      product_id: string;
      quantity: number;
    };
    Insert: Database["public"]["Tables"]["solution_products"]["Row"];
    Update: Database["public"]["Tables"]["solution_products"]["Row"];
      };
      solution_combos: {
        Row: {
          id: string;
          solution_id: string;
          name: string;
          slug: string;
          description: string | null;
          price: number | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          solution_id: string;
          name: string;
          slug: string;
          description?: string | null;
          price?: number | null;
          is_active?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["solution_combos"]["Insert"]>;
      };
      combo_items: {
        Row: {
          combo_id: string;
          product_id: string;
          quantity: number;
        };
        Insert: Database["public"]["Tables"]["combo_items"]["Row"];
        Update: Database["public"]["Tables"]["combo_items"]["Row"];
      };
      orders: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          phone: string;
          address: string;
          note: string | null;
          payment_method: "cod" | "bank_transfer";
          status: "pending" | "confirmed" | "shipped" | "completed" | "cancelled";
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          phone: string;
          address: string;
          note?: string | null;
          payment_method: "cod" | "bank_transfer";
          status?: "pending" | "confirmed" | "shipped" | "completed" | "cancelled";
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      order_items: {
        Row: {
          order_id: string;
          product_id: string;
          quantity: number;
          price: number | null;
        };
        Insert: Database["public"]["Tables"]["order_items"]["Row"];
        Update: Database["public"]["Tables"]["order_items"]["Row"];
      };
    };
  };
};
