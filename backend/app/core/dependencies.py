
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core.security import SECRET_KEY, ALGORITHM
from app.db.database import get_db
from app.models.citizen import Citizen

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_citizen(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        citizen_id = payload.get("sub")

        if citizen_id is None or payload.get("role") != "citizen":
            raise credentials_exception

        citizen_id = int(citizen_id)

    except (JWTError, ValueError, TypeError):
        raise credentials_exception

    citizen = db.query(Citizen).filter(
        Citizen.id == citizen_id
    ).first()

    if citizen is None:
        raise credentials_exception

    return citizen
