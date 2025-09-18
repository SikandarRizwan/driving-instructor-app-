import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ftrlypmmlbvhnskcxkgh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0cmx5cG1tbGJ2aG5za2N4a2doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMDA3MjAsImV4cCI6MjA3Mzc3NjcyMH0.ypVoRdhC42qU-NeHZ4-hRu5l4IXd6lSfhVzWIkufCHw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
