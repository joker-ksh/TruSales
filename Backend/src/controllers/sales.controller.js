const salesService = require("../services/sales.service");

exports.getSales = async (req, res) => {
  try {
    const data = await salesService.getSales(req.query);

    res.json({
      success: true,
      count: data.length,
      data
    });

  } catch (err) {
    console.error("ERROR in getSales:", err);

    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error"
    });
  }
};
