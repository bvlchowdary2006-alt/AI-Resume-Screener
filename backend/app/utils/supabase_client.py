import os
from app.utils.config import settings

supabase_client = None

def init_supabase():
    """Initialize Supabase client if credentials are available."""
    global supabase_client
    if settings.SUPABASE_URL and settings.SUPABASE_KEY:
        try:
            from supabase import create_client
            supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
            return supabase_client
        except Exception as e:
            print(f"Supabase connection failed: {e}")
    return None

# Try to initialize on import
init_supabase()
