exports.getTestAPI = async (req, res) => {
  const now = new Date();
  const utcNow = now.toISOString();
  const helloWorld = `Hello world from chatterbackend! Server time is now ${utcNow}`;

  return res.status(200).set("Content-Type", "application/json").json({
    success: true,
    time: utcNow,
    message: helloWorld,
  });
};
