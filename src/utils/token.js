// 设置token
export const setToken = (token = createToken()) => {
  sessionStorage.setItem("token", token);
  return token;
};

// 获取token
export const getToken = () => sessionStorage.getItem("token");

// 删除token
export const delToken = () => sessionStorage.removeItem("token");

// 创建token
function createToken(len = 32) {
  const cert = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM123456789";
  let token = "";
  for (let i = 0; i < len; i++) {
    token += cert[~~(Math.random() * cert.length)];
  }
  return token;
}
