const logout = async (req, res) => {
  const {
    headers: { shib_logout_url: shibLogoutUrl },
  } = req;

  res.send({
    url: shibLogoutUrl ?? null,
  });
};

module.exports = logout;
