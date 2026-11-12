from app.db.database import Base, engine
from app.models import Citizen, Grievance

try:
    Base.metadata.create_all(bind=engine)

    print("Database tables created successfully!")
    print("Citizen table:", Citizen.__tablename__)
    print("Grievance table:", Grievance.__tablename__)

except Exception as error:
    print("Table creation failed!")
    print(error)python test_db.py