const jwt = require("jsonwebtoken");

function verificaToken(req, res, next) {
    const token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).json({
        status: "Forbidden",
        message: "Token não fornecido.",
      });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: "Unauthorized",
          message: "Token inválido.",
        });
      }
  
      req.userid = decoded.userid;
      req.nivel_permissao = decoded.nivel_permissao;
      req.auth = true;
  
      next();
    });
  }

module.exports = verificaToken;
