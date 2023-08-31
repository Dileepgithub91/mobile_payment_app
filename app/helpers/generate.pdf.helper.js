const puppeteer = require("puppeteer");
const fs = require("fs");

const generatePDF = async (htmlContent, userId, filename) => {
  try {
    //Create Pdf folder path
    if (!fs.existsSync("uploads/PdfDocuments/")) {
      fs.mkdir("uploads/PdfDocuments/", function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("New directory successfully created.");
        }
      });
    }
    if (!fs.existsSync("uploads/PdfDocuments/" + userId)) {
      fs.mkdir("uploads/PdfDocuments/" + userId, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("New directory successfully created.");
        }
      });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);
    // Generate PDF
    await page.pdf({
      path:
        "uploads/PdfDocuments/" + userId+"/" + filename + ".pdf",
      format: "A4",
    });

    await browser.close();
    return {
      success: true,
      filepath:
        "../../uploads/PdfDocuments/" + userId.toString() + filename + ".pdf",
    };
  } catch (error) {
    throw error;
  }
};

module.exports = generatePDF;
