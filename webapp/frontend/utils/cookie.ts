/**
 * 任意の名称に対応するcookieの値を取得します.
 * @param {string} name - cookieの名前.
 * @returns {string|null} cookieの値, 対応する値がない場合はnullを返す.
 */
export const getCookie = (name: string): string | null => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName)) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
};
