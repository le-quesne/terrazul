import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qowenpbqvzwvobqufftw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvd2VucGJxdnp3dm9icXVmZnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxODE2MTcsImV4cCI6MjA3OTc1NzYxN30.cY8bPlzm5fTA8k-LzaFmSdAqWoh2fT4vrxGTpNNFoSE';

export const supabase = createClient(supabaseUrl, supabaseKey);
