import generateId from "../services/generateId.js";
import Urls from "../models/url.model.js";
import Users from "../models/user.model.js";

const shortUrl = async (req, res) => {
  const { username, longUrl, customId, expiresOn } = req.body;
  try {
    // Check for empty fields
    if (!longUrl) {
      return res.status(400).json({ message: "Long URL is required" });
    }

    //Check for usernaem
    if (!username) {
      return res.status(400).json({ message: "Security token error" });
    }

    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(300).json({ message: "Security token error" });
    }

    // Check if custom ID already exists
    if (customId) {
      const isMatch = await Urls.findOne({ shortId: customId });
      if (isMatch) {
        return res
          .status(400)
          .json({ message: "Custom short id already exists" });
      }
    }

    // Generate a short ID if no custom ID is provided
    let shortId = customId || generateId();
    let expiryDate = expiresOn || null;

    const newUrl = await Urls.create({
      username,
      longUrl,
      shortId,
      expiryDate,
    });

    if (!newUrl) {
      return res.status(500).json({ message: "Server error" });
    }

    return res.status(200).json({ longUrl, shortId });
  } catch (error) {
    console.error("Error in shortUrl:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { shortUrl };
