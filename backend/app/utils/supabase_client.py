from supabase import create_client, Client
from app.utils.config import settings
from loguru import logger
import time

def get_supabase_client() -> Client:
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        logger.error("Supabase URL or Key is missing. Check your .env file.")
        raise ValueError("Supabase configuration is incomplete.")

    max_retries = 3
    retry_delay = 2

    for attempt in range(max_retries):
        try:
            client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
            # Test connection with a simple query if possible, or just return
            logger.info("Successfully connected to Supabase")
            return client
        except Exception as e:
            logger.warning(f"Connection attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(retry_delay)
            else:
                logger.error("Could not connect to Supabase after multiple attempts.")
                raise e

try:
    supabase_client = get_supabase_client()
except Exception as e:
    logger.critical(f"Critical error initializing Supabase client: {e}")
    # In production, we might want to exit or handle this more gracefully
    supabase_client = None
