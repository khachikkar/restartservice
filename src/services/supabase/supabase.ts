import {createClient} from "@supabase/supabase-js";
const SUPABASE_URL = 'https://grvmrfcaoijjkwosfekd.supabase.co'
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdydm1yZmNhb2lqamt3b3NmZWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MTcwMDYsImV4cCI6MjA0NjQ5MzAwNn0.6tsyxNznDpcnHOiKepP_WHdCWbKX29d-GkgmLS-uxdY"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)