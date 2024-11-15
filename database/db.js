import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://tcklrcucjstnykkjhiqt.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRja2xyY3VjanN0bnlra2poaXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzMzY4NTEsImV4cCI6MjA0NTkxMjg1MX0.1K9WZKLAK6PJ1w2_x8Vwudc6UR0x2ip8S0V0TnFh9tQ"

const db = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    db.auth.startAutoRefresh()
  } else {
    db.auth.stopAutoRefresh()
  }
});

export default db;