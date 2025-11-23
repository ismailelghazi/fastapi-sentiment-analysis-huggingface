from dotenv import dotenv_values

env = dotenv_values("../.env", encoding="utf-8-sig")

print(f"DB_USER: {env.get('POSTGRES_USER')}")
print(f"DB_PASSWORD: {'*' * len(env.get('POSTGRES_PASSWORD', ''))}")
print(f"DB_HOST: {env.get('POSTGRES_SERVER')}")
print(f"DB_PORT: {env.get('POSTGRES_PORT')}")
print(f"DB_NAME: {env.get('POSTGRES_DB')}")
print(f"SECRET_KEY: {'*' * len(env.get('SECRET_KEY', ''))}")
print(f"HF_API_KEY: {env.get('HF_API_KEY')}")