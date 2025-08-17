// C:\Users\karan\OneDrive\Desktop\insta\instagram-backend\controllers\commentController.js

// This is a placeholder function to get the server running.
// We are exporting 'addComment'.
exports.addComment = async (req, res) => {
    try {
      // A simple success response. We can add real logic later.
      res.status(200).json({ message: "Comment controller is working" });
    } catch (error) {
      res.status(500).json({ message: "Error in comment controller" });
    }
  };
  