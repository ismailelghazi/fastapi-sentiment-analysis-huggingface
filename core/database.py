from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import time
import psycopg2
from urllib.parse import quote_plus
from dotenv import dotenv_values

env = dotenv_values(".env", encoding="utf-8-sig")
DB_USER = env.get("POSTGRES_USER", "postgres")
DB_PASS = env.get("POSTGRES_PASSWORD", "")
DB_HOST = env.get("POSTGRES_SERVER", "db")
DB_PORT = env.get("POSTGRES_PORT", "5432")
DB_NAME = env.get("POSTGRES_DB", "sentimentdb")

if not DB_PASS:
    raise ValueError("POSTGRES_PASSWORD est vide dans .env !")

DB_PASS_ENCODED = quote_plus(DB_PASS)
DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASS_ENCODED}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Wait until Postgres is ready
for i in range(10):
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST, port=DB_PORT
        )
        conn.close()
        break
    except psycopg2.OperationalError:
        print("Postgres not ready, waiting 2 seconds...")
        time.sleep(2)

print(f"Connexion à: {DB_USER}@{DB_HOST}:{DB_PORT}/{DB_NAME}")
# SQLAlchemy
Base = declarative_base()
engine = create_engine(DATABASE_URL, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    """Dependency pour obtenir une session DB"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()