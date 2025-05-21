import { createClient } from '@supabase/supabase-js';

const supabaseUrl = https://lhkieqkaepukisbwawso.supabase.co;
const supabaseKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxoa2llcWthZXB1a2lzYndhd3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4Mzg0ODcsImV4cCI6MjA2MzQxNDQ4N30.QeHEQvcGu116HNqEP9AKCys7gN1uXs8gtDYF-KUMlh4';

export const supabase = createClient(supabaseUrl, supabaseKey);
