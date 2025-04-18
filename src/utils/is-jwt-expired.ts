export function IsJwtExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return now >= exp;
  } catch (e) {
    return true; // 파싱 실패 시 만료된 것으로 간주
  }
}
