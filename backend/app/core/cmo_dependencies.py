
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from app.core.security import SECRET_KEY, ALGORITHM

cmo_oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/cmo-login"
)


def get_current_cmo(
    token: str = Depends(cmo_oauth2_scheme)
):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        if payload.get("role") != "cmo":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="CMO access required."
            )

        admin_email = payload.get("sub")

        if not admin_email:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid admin token."
            )

        return admin_email

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired admin token."
        )
