import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mvpumfqkjaybssiffkqb.supabase.co'
const supabaseKey = 'sb_publishable_6aVOghFz7fQWVDxg2k5AqQ_2gpJ1F1d'
export const supabase = createClient(supabaseUrl, supabaseKey)